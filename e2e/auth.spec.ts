import { expect, test, type Page } from '@playwright/test'

import {
  favoriteButton,
  isMobile,
  loginAs,
  logout,
  openApp,
  socketTokens,
  startCheckout,
  submitLogin,
  USERS,
} from './support'

const registerForm = (page: Page) => page.getByRole('form', { name: 'Criar conta' })

async function fillRegister(
  page: Page,
  values: { username: string; email: string; password: string; confirm?: string },
) {
  const form = registerForm(page)
  await form.getByLabel('Nome de usuário').fill(values.username)
  await form.getByLabel('Digite seu e-mail').fill(values.email)
  await form.getByLabel('Senha', { exact: true }).fill(values.password)
  await form.getByLabel('Confirmar senha').fill(values.confirm ?? values.password)
  await form.getByRole('button', { name: /^Criar (conta|perfil)$/ }).click()
}

/** Abre o menu do usuário (desktop). */
async function openUserMenu(page: Page, name: string) {
  await page.getByRole('button', { name: new RegExp(`${name}.*menu da conta`) }).click()
}

/** Alterna o favorito e espera a resposta da API (recarregar no meio cancelaria a requisição). */
async function toggleFavorite(page: Page) {
  const response = page.waitForResponse((res) => /\/api\/favorites\//.test(res.url()))
  await favoriteButton(page).click()
  return response
}

test.describe('Cadastro', () => {
  test('cria a conta, entra e mantém a sessão após refresh', async ({ page }, testInfo) => {
    await openApp(page, '/cadastro')
    await fillRegister(page, {
      username: 'novo.colecionador',
      email: 'novo@kurio.dev',
      password: 'Senha1234',
    })
    await expect(page).toHaveURL(/\/(\?|$)/)
    if (!isMobile(testInfo))
      await expect(page.getByRole('button', { name: /novo\.colecionador/ })).toBeVisible()
    await page.reload()
    await page.waitForFunction(() => window.__kurioMock !== undefined)
    // Sessão recuperada: acessar uma rota privada não leva ao login.
    await page.goto('/perfil')
    await expect(page).toHaveURL(/\/perfil$/)
  })

  test('validação no cliente: campos inválidos e senhas diferentes', async ({ page }) => {
    await openApp(page, '/cadastro')
    await registerForm(page)
      .getByRole('button', { name: /^Criar (conta|perfil)$/ })
      .click()
    await expect(page.getByText('Use pelo menos 3 caracteres.')).toBeVisible()
    await expect(page.getByText('Informe um e-mail válido.')).toBeVisible()
    await expect(page.getByText('A senha precisa ter pelo menos 8 caracteres.')).toBeVisible()
    // O erro fica associado ao campo e o campo é marcado como inválido.
    const username = registerForm(page).getByLabel('Nome de usuário')
    await expect(username).toHaveAttribute('aria-invalid', 'true')
    await expect(username).toHaveAccessibleDescription('Use pelo menos 3 caracteres.')

    await fillRegister(page, {
      username: 'maria',
      email: 'maria@kurio.dev',
      password: 'Senha1234',
      confirm: 'Outra1234',
    })
    await expect(page.getByText('As senhas não coincidem.')).toBeVisible()
    await expect(page).toHaveURL(/\/cadastro/)
  })

  test('conflito de e-mail e de nome de usuário vindos da API ficam nos campos', async ({
    page,
  }) => {
    await openApp(page, '/cadastro')
    await fillRegister(page, { username: 'maria', email: USERS.ana.email, password: 'Senha1234' })
    const email = registerForm(page).getByLabel('Digite seu e-mail')
    await expect(email).toHaveAccessibleDescription('Já existe uma conta com este e-mail.')
    await expect(page).toHaveURL(/\/cadastro/)

    await email.fill('maria@kurio.dev')
    await registerForm(page).getByLabel('Nome de usuário').fill('analima')
    await registerForm(page)
      .getByRole('button', { name: /^Criar (conta|perfil)$/ })
      .click()
    await expect(registerForm(page).getByLabel('Nome de usuário')).toHaveAccessibleDescription(
      'Este nome de usuário já está em uso.',
    )

    await registerForm(page).getByLabel('Nome de usuário').fill('admin')
    await registerForm(page)
      .getByRole('button', { name: /^Criar (conta|perfil)$/ })
      .click()
    await expect(page.getByText('Este nome de usuário é reservado.')).toBeVisible()
  })
})

test.describe('Login', () => {
  test('credenciais inválidas mostram erro sem entrar', async ({ page }) => {
    await openApp(page, '/entrar')
    await submitLogin(page, { email: USERS.ana.email, password: 'errada123' })
    await expect(
      page.getByRole('alert').filter({ hasText: 'E-mail ou senha incorretos.' }),
    ).toBeVisible()
    await expect(page).toHaveURL(/\/entrar/)
  })

  test('validação dos campos', async ({ page }) => {
    await openApp(page, '/entrar')
    await page
      .getByRole('form', { name: 'Entrar' })
      .getByRole('button', { name: 'Entrar', exact: true })
      .click()
    await expect(page.getByText('Informe um e-mail válido.')).toBeVisible()
    await expect(page.getByText('Informe a senha.')).toBeVisible()
  })

  test('rota privada leva ao login e volta ao fluxo anterior (?redirect=)', async ({ page }) => {
    await openApp(page, '/pagamento')
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fpagamento/)
    await submitLogin(page, USERS.ana)
    await expect(page).toHaveURL(/\/pagamento$/)
  })

  test('redirect externo é ignorado', async ({ page }) => {
    await openApp(page, '/entrar?redirect=https://site-malicioso.example')
    await submitLogin(page, USERS.ana)
    await expect(page).toHaveURL(/localhost:4173\/($|\?)/)
  })

  test('sessão recuperada após refresh e rotas privadas acessíveis', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await page.goto('/perfil')
    await expect(page).toHaveURL(/\/perfil$/)
    await page.reload()
    await expect(page).toHaveURL(/\/perfil$/)
  })

  test('quem já tem sessão não vê a tela de login', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await page.goto('/entrar')
    await expect(page).not.toHaveURL(/\/entrar/)
  })

  test('teclado: ordem de foco, mostrar senha e envio com Enter', async ({ page }, testInfo) => {
    await openApp(page, '/entrar')
    const form = page.getByRole('form', { name: 'Entrar' })
    await form.getByLabel('E-mail').focus()
    await page.keyboard.type(USERS.ana.email)
    await page.keyboard.press('Tab')
    await expect(form.getByLabel('Senha', { exact: true })).toBeFocused()
    await page.keyboard.type(USERS.ana.password)
    await page.keyboard.press('Tab')
    const toggle = form.getByRole('button', { name: 'Mostrar senha' })
    await expect(toggle).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(form.getByLabel('Senha', { exact: true })).toHaveAttribute('type', 'text')
    await expect(form.getByRole('button', { name: 'Ocultar senha' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await form.getByLabel('Senha', { exact: true }).focus()
    await page.keyboard.press('Enter')
    await expect(page).not.toHaveURL(/\/entrar/)
    void testInfo
  })

  test('diálogo (desktop): foco preso, Esc fecha e volta ao destino', async ({
    page,
  }, testInfo) => {
    test.skip(isMobile(testInfo), 'No mobile a tela é uma página, não um diálogo.')
    await openApp(page, '/entrar?redirect=%2Fnft%2Femerald-ape-042')
    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible()
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press('Tab')
      expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true)
    }
    await page.keyboard.press('Escape')
    await expect(page).toHaveURL(/\/nft\/emerald-ape-042$/)
  })

  test('alternar entre entrar e criar conta preserva o redirect', async ({ page }) => {
    await openApp(page, '/entrar?redirect=%2Fpagamento')
    await page.getByRole('link', { name: /^(Criar conta|Crie uma conta)$/ }).click()
    await expect(page).toHaveURL(/\/cadastro\?redirect=%2Fpagamento/)
  })

  test('login social indisponível não aparenta sucesso', async ({ page }) => {
    await openApp(page, '/entrar')
    // Anunciado como indisponível (aria-disabled): o clique é permitido e explica o motivo.
    await page.getByRole('button', { name: /Continuar com Google/ }).click({ force: true })
    await expect(page.getByText('Login com Google indisponível')).toBeVisible()
    await expect(page).toHaveURL(/\/entrar/)
  })
})

test.describe('Sessão expirada', () => {
  test('durante a navegação: avisa e volta ao destino depois de entrar', async ({
    page,
  }, testInfo) => {
    await loginAs(page, USERS.ana)
    await page.evaluate(() => window.__kurioMock!.session.expireAll())
    // Navegação no cliente (sem recarregar) para a rota privada.
    if (isMobile(testInfo)) await page.getByRole('link', { name: 'Perfil' }).click()
    else {
      await openUserMenu(page, 'Ana Lima')
      await page.getByRole('menuitem', { name: 'Meu perfil' }).click()
    }
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fperfil/)
    await expect(page.getByText('Sua sessão expirou').first()).toBeVisible()
    await submitLogin(page, USERS.ana)
    await expect(page).toHaveURL(/\/perfil$/)
  })

  test('durante o checkout: preserva o destino', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await page.goto('/')
    await page.waitForFunction(() => window.__kurioMock !== undefined)
    await page.evaluate(() => window.__kurioMock!.session.expireAll())
    await page.goto('/pagamento')
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fpagamento/)
    await submitLogin(page, USERS.ana)
    await expect(page).toHaveURL(/\/pagamento$/)
  })

  test('em página pública: continua como visitante e oferece entrar', async ({ page }) => {
    await loginAs(page, USERS.ana, 'sessao-expirada')
    // Espera as chamadas privadas do carregamento (sessão e favoritos): expirar antes delas faria
    // a expiração ser detectada por elas, e não pelo clique que o teste quer exercitar.
    const loaded = Promise.all([
      page.waitForResponse((res) => res.url().endsWith('/api/auth/session')),
      page.waitForResponse((res) => res.url().endsWith('/api/favorites')),
    ])
    await page.goto('/nft/emerald-ape-042')
    await loaded
    await page.waitForFunction(() => window.__kurioMock !== undefined)
    await page.evaluate(() => window.__kurioMock!.session.expireAll())
    // Qualquer chamada privada (favoritos) detecta a expiração.
    await favoriteButton(page).click()
    await expect(page.getByText('Sua sessão expirou').first()).toBeVisible()
    // Oferece entrar: ação do aviso (todos os viewports) e link do cabeçalho (desktop).
    await expect(
      page
        .getByRole('button', { name: 'Entrar', exact: true })
        .or(page.getByRole('link', { name: 'Entrar' }))
        .first(),
    ).toBeVisible()
  })
})

test.describe('Logout, troca de usuário e isolamento', () => {
  test('outro usuário que entra apaga o rascunho de checkout preservado da conta anterior', async ({
    page,
  }) => {
    await startCheckout(page)
    await page
      .getByRole('form', { name: 'Dados do colecionador' })
      .getByLabel('Observação do colecionador (opcional)')
      .fill('Dado pessoal da Ana')
    const anaDraft = () =>
      page.evaluate(() =>
        Object.keys(localStorage).filter((key) => key === 'kurio:app:checkout:usr_ana'),
      )
    await expect.poll(anaDraft).toHaveLength(1)

    // A sessão da Ana expira: o rascunho fica, para ela retomar.
    await page.evaluate(() => window.__kurioMock!.session.expireAll())
    await page.goto('/pagamento')
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fpagamento/)
    expect(await anaDraft()).toHaveLength(1)

    // Quem entra é o Bruno: o rascunho da Ana sai do navegador.
    await submitLogin(page, USERS.bruno)
    await expect(page).not.toHaveURL(/\/entrar/)
    await expect.poll(anaDraft).toHaveLength(0)
    expect(
      await page.evaluate(() => JSON.stringify(localStorage).includes('Dado pessoal da Ana')),
    ).toBe(false)
  })

  test('logout encerra a sessão e as subscriptions', async ({ page }, testInfo) => {
    await loginAs(page, USERS.ana)
    await expect.poll(() => socketTokens(page)).toHaveLength(1)
    expect((await socketTokens(page))[0]).not.toBe('')

    await logout(page, testInfo, 'Ana Lima')
    // O socket da conta foi encerrado; resta só a conexão de visitante (sem token).
    await expect.poll(() => socketTokens(page)).toEqual([''])
    await page.goto('/perfil')
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fperfil/)
  })

  test('dados do usuário A não aparecem para o B', async ({ page }, testInfo) => {
    // Ana favoritou o Emerald Ape; Bruno, o Neon Vessel.
    await loginAs(page, USERS.ana)
    await page.goto('/nft/emerald-ape-042')
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'true')

    // Troca de usuário na mesma aba, sem recarregar: o estado em memória é o que está em jogo.
    await logout(page, testInfo, 'Ana Lima')
    // Sem recarregar: no mobile o logout parte do perfil e volta ao início, então navega-se pelo app.
    if (!/\/nft\//.test(page.url()))
      await page
        .getByRole('link', { name: /Emerald Ape #042/ })
        .first()
        .click()
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'false')
    // Visitante favorita: vai ao login e volta ao NFT já como Bruno, sem recarregar a aplicação.
    await favoriteButton(page).click()
    await submitLogin(page, USERS.bruno)
    await expect(page).toHaveURL(/\/nft\/emerald-ape-042$/)
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'false')

    await page.goto('/nft/neon-vessel-552')
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'true')
    // E nenhuma chamada privada do Bruno devolveu dados da Ana.
    const response = await page.evaluate(async () => {
      const session = JSON.parse(localStorage.getItem('kurio:app:session')!)
      const res = await fetch('/api/favorites', {
        headers: { Authorization: `Bearer ${session.token}` },
      })
      return res.json()
    })
    expect(response.nftIds).toEqual(['neon-vessel-552'])
  })
})

test.describe('Favoritos', () => {
  test('exigem login: visitante é levado ao login e volta ao NFT', async ({ page }) => {
    await openApp(page, '/nft/emerald-ape-042')
    await favoriteButton(page).click()
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fnft%2Femerald-ape-042/)
    await submitLogin(page, USERS.bruno)
    await expect(page).toHaveURL(/\/nft\/emerald-ape-042$/)
  })

  test('persistem após refresh para o usuário autenticado', async ({ page }) => {
    await loginAs(page, USERS.bruno)
    await page.goto('/nft/emerald-ape-042')
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'false')
    await toggleFavorite(page)
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'true')
    await page.reload()
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'true')
  })

  test('falha da API reverte a atualização otimista e a nova tentativa funciona', async ({
    page,
  }) => {
    await loginAs(page, USERS.bruno, 'favoritos-falham')
    const loaded = page.waitForResponse((res) => /\/api\/favorites$/.test(res.url()))
    await page.goto('/nft/emerald-ape-042')
    await loaded
    const button = favoriteButton(page)
    await expect(button).toHaveAttribute('aria-pressed', 'false')

    expect((await toggleFavorite(page)).status()).toBe(503)
    await expect(page.getByText('Não foi possível favoritar')).toBeVisible()
    await expect(button).toHaveAttribute('aria-pressed', 'false')
    // No mobile o aviso cobre o botão enquanto está na tela: espera sumir antes de tentar de novo.
    await expect(page.getByText('Não foi possível favoritar')).toBeHidden({ timeout: 10_000 })

    expect((await toggleFavorite(page)).status()).toBe(200)
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await page.reload()
    await expect(favoriteButton(page)).toHaveAttribute('aria-pressed', 'true')
  })
})
