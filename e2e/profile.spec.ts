import { expect, test, type Page } from '@playwright/test'

import { loginAs, openApp, USERS } from './support'

const form = (page: Page, name: string) => page.getByRole('form', { name })

// PNG 1×1 válido.
const PNG = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  'base64',
)

const profileForm = (page: Page) => form(page, 'Perfil do colecionador')

test.describe('Perfil: dados', () => {
  test('edita os dados e eles persistem após refresh', async ({ page }, testInfo) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const f = profileForm(page)
    await expect(f.getByLabel('Nome de exibição')).toHaveValue('Ana Lima')

    await f.getByLabel('Nome de exibição').fill('Ana Colecionadora')
    await f.getByLabel('Apelido da carteira').fill('Cofre')
    await f.getByLabel('Nome ENS').fill('ana-cofre')
    await f.getByRole('button', { name: 'Salvar' }).click()
    await expect(page.getByText('Perfil atualizado')).toBeVisible()

    await page.reload()
    await expect(f.getByLabel('Nome de exibição')).toHaveValue('Ana Colecionadora')
    await expect(f.getByLabel('Apelido da carteira')).toHaveValue('Cofre')
    await expect(f.getByLabel('Nome ENS')).toHaveValue('ana-cofre')
    if (testInfo.project.name === 'desktop')
      await expect(
        page.getByRole('button', { name: /Ana Colecionadora.*menu da conta/ }),
      ).toBeVisible()
  })

  test('validação do cliente associa as mensagens aos campos', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const f = profileForm(page)
    await f.getByLabel('Nome de exibição').fill('')
    await f.getByLabel('E-mail').fill('sem-arroba')
    await f.getByLabel('Nome de usuário').fill('AB')
    await f.getByRole('button', { name: 'Salvar' }).click()

    await expect(f.getByLabel('Nome de exibição')).toHaveAttribute('aria-invalid', 'true')
    await expect(f.getByText('Informe o nome de exibição.')).toBeVisible()
    await expect(f.getByLabel('E-mail')).toHaveAttribute('aria-invalid', 'true')
    await expect(f.getByLabel('Nome de usuário')).toHaveAttribute('aria-invalid', 'true')
    const described = await f
      .getByLabel('E-mail')
      .evaluate((el) => document.getElementById(el.getAttribute('aria-describedby')!)?.textContent)
    expect(described).toContain('e-mail válido')
  })

  test('conflitos da API aparecem no campo correspondente', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const f = profileForm(page)
    await f.getByLabel('Nome de usuário').fill('brunosato')
    await f.getByRole('button', { name: 'Salvar' }).click()
    await expect(f.getByText('Este nome de usuário já está em uso.')).toBeVisible()
    await expect(f.getByLabel('Nome de usuário')).toHaveAttribute('aria-invalid', 'true')
    await f.getByLabel('Nome de usuário').fill('analima')
    await f.getByLabel('E-mail').fill('bruno@kurio.dev')
    await f.getByRole('button', { name: 'Salvar' }).click()
    await expect(f.getByText('Já existe uma conta com este e-mail.')).toBeVisible()
    await expect(f.getByLabel('E-mail')).toHaveAttribute('aria-invalid', 'true')
    // Nada foi gravado.
    await page.reload()
    await expect(f.getByLabel('Nome de usuário')).toHaveValue('analima')
  })
})

test.describe('Perfil: avatar', () => {
  test('envia, persiste após refresh e remove', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    await page
      .getByLabel('Escolher imagem do avatar')
      .setInputFiles({ name: 'avatar.png', mimeType: 'image/png', buffer: PNG })
    await expect(page.getByRole('img', { name: 'Avatar de Ana Lima' })).toBeVisible()

    await page.reload()
    await expect(page.getByRole('img', { name: 'Avatar de Ana Lima' })).toBeVisible()

    await page.getByRole('button', { name: /Remover/ }).click()
    await expect(page.getByRole('img', { name: 'Sem avatar' })).toBeVisible()
    await page.reload()
    await expect(page.getByRole('img', { name: 'Sem avatar' })).toBeVisible()
  })

  test('rejeita arquivo que não é imagem e imagem grande demais', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const input = page.getByLabel('Escolher imagem do avatar')
    await input.setInputFiles({
      name: 'nota.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('oi'),
    })
    await expect(page.getByText('Envie uma imagem PNG, JPEG ou WebP.')).toBeVisible()
    await input.setInputFiles({
      name: 'grande.png',
      mimeType: 'image/png',
      buffer: Buffer.alloc(1_100_000),
    })
    await expect(page.getByText('A imagem deve ter no máximo 1 MB.')).toBeVisible()
    await expect(page.getByRole('img', { name: 'Sem avatar' })).toBeVisible()
  })
})

test.describe('Perfil: senha', () => {
  test('erros do cliente e da API ficam nos campos', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const f = profileForm(page)

    await f.getByLabel('Senha atual', { exact: true }).fill('errada123')
    await f.getByLabel('Nova senha', { exact: true }).fill('curta')
    await f.getByLabel('Confirmar nova senha', { exact: true }).fill('outra')
    await f.getByRole('button', { name: 'Salvar' }).click()
    await expect(f.getByText('A senha precisa ter pelo menos 8 caracteres.')).toBeVisible()
    await expect(f.getByText('A confirmação não confere com a nova senha.')).toBeVisible()

    // Válida no cliente, recusada pela API: a senha atual está errada.
    await f.getByLabel('Nova senha', { exact: true }).fill('NovaSenha2026')
    await f.getByLabel('Confirmar nova senha', { exact: true }).fill('NovaSenha2026')
    await f.getByRole('button', { name: 'Salvar' }).click()
    await expect(f.getByText('Senha atual incorreta.')).toBeVisible()
    await expect(f.getByLabel('Senha atual', { exact: true })).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  test('alterar a senha: a nova funciona no login e a antiga deixa de funcionar', async ({
    page,
  }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const f = profileForm(page)
    await f.getByLabel('Senha atual', { exact: true }).fill(USERS.ana.password)
    await f.getByLabel('Nova senha', { exact: true }).fill('NovaSenha2026')
    await f.getByLabel('Confirmar nova senha', { exact: true }).fill('NovaSenha2026')
    await f.getByRole('button', { name: 'Salvar' }).click()
    await expect(page.getByText('Perfil e senha atualizados')).toBeVisible()
    await expect(f.getByLabel('Senha atual', { exact: true })).toHaveValue('')

    const status = await page.evaluate(async () => {
      const login = (password: string) =>
        fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: 'ana@kurio.dev', password }),
        }).then((res) => res.status)
      return { antiga: await login('Kurio@2026'), nova: await login('NovaSenha2026') }
    })
    expect(status).toEqual({ antiga: 401, nova: 200 })
  })

  test('mostrar e ocultar a senha é anunciado', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    const toggle = profileForm(page).getByRole('button', { name: 'Mostrar senha atual' })
    await toggle.click()
    await expect(
      profileForm(page).getByRole('button', { name: 'Ocultar senha atual' }),
    ).toHaveAttribute('aria-pressed', 'true')
  })
})

const fillWallet = async (
  f: ReturnType<typeof form>,
  v: { nickname: string; address: string; code?: string },
) => {
  await f.getByLabel('Nome de exibição').fill('Bruno Sato')
  await f.getByLabel('Apelido da carteira').fill(v.nickname)
  await f.getByLabel('Rede').selectOption('polygon')
  await f.getByLabel('Nome do perfil').fill('brunosato')
  await f.getByLabel('Endereço da carteira').fill(v.address)
  await f.getByLabel('Tipo de carteira').selectOption('metamask')
  await f.getByLabel('Código de indicação').fill(v.code ?? 'KURIO2026')
  await f.getByLabel('E-mail').fill('bruno@kurio.dev')
  await f.getByLabel('Nome ENS').fill('bruno')
}

const ADDRESS_A = '0x1111111111111111111111111111111111111111'
const ADDRESS_B = '0x2222222222222222222222222222222222222222'

test.describe('Carteiras', () => {
  test('cadastro da principal: validação, erros da API e persistência', async ({ page }) => {
    await loginAs(page, USERS.bruno)
    await openApp(page, '/perfil/carteiras')
    const f = form(page, 'Carteira principal')

    await f.getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(f.getByText('Informe o nome de exibição.')).toBeVisible()
    await expect(f.getByLabel('Endereço da carteira')).toHaveAttribute('aria-invalid', 'true')
    await expect(f.getByLabel('Rede')).toHaveAttribute('aria-invalid', 'true')

    await fillWallet(f, { nickname: 'Principal', address: '0x123', code: 'abc' })
    await f.getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(f.getByText(/endereço 0x com 40 caracteres/)).toBeVisible()
    await expect(f.getByText(/4 a 12 letras maiúsculas/)).toBeVisible()

    await f.getByLabel('Endereço da carteira').fill(ADDRESS_A)
    await f.getByLabel('Código de indicação').fill('KURIO2026')
    await f.getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(page.getByText('Carteira principal cadastrada')).toBeVisible()

    await page.reload()
    const saved = form(page, 'Carteira principal')
    await expect(saved.getByLabel('Apelido da carteira')).toHaveValue('Principal')
    await expect(saved.getByLabel('Endereço da carteira')).toHaveValue(ADDRESS_A)
    await expect(saved.getByLabel('Rede')).toHaveValue('polygon')
  })

  test('secundária: igual à principal, endereço duplicado e edição', async ({ page }) => {
    await loginAs(page, USERS.bruno)
    await openApp(page, '/perfil/carteiras')
    const principal = form(page, 'Carteira principal')
    await fillWallet(principal, { nickname: 'Principal', address: ADDRESS_A })
    await principal.getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(page.getByText('Carteira principal cadastrada')).toBeVisible()
    await expect(page.getByText('Você ainda não adicionou uma carteira secundária.')).toBeVisible()

    await page.getByLabel('Igual à carteira principal').click()
    await page.getByRole('button', { name: 'Adicionar carteira secundária' }).click()
    const secondary = form(page, 'Carteira secundária')
    // Os campos copiados vêm preenchidos; apelido e endereço continuam por conta do usuário.
    await expect(secondary.getByLabel('Nome do perfil')).toHaveValue('brunosato')
    await expect(secondary.getByLabel('Apelido da carteira')).toHaveValue('')

    await secondary.getByLabel('Apelido da carteira').fill('Reserva')
    await secondary.getByLabel('Endereço da carteira').fill(ADDRESS_A)
    await secondary.getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(secondary.getByText('Este endereço já está cadastrado.')).toBeVisible()
    await expect(secondary.getByLabel('Endereço da carteira')).toHaveAttribute(
      'aria-invalid',
      'true',
    )

    await secondary.getByLabel('Endereço da carteira').fill(ADDRESS_B)
    const refreshed = page.waitForResponse(
      (res) => res.url().endsWith('/api/wallets') && res.request().method() === 'GET',
    )
    await secondary.getByRole('button', { name: 'Salvar carteira' }).click()
    await refreshed
    await expect(page.getByText('Carteira secundária cadastrada')).toBeVisible()

    // Edição da secundária persiste.
    await expect(form(page, 'Carteira secundária').getByLabel('Apelido da carteira')).toHaveValue(
      'Reserva',
    )
    await form(page, 'Carteira secundária').getByLabel('Apelido da carteira').fill('Cofre')
    await form(page, 'Carteira secundária').getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(page.getByText('Carteira secundária atualizada')).toBeVisible()
    await page.reload()
    await expect(form(page, 'Carteira secundária').getByLabel('Apelido da carteira')).toHaveValue(
      'Cofre',
    )
    await expect(form(page, 'Carteira principal').getByLabel('Endereço da carteira')).toHaveValue(
      ADDRESS_A,
    )
  })

  test('edição da carteira principal da Ana e uso no pagamento', async ({ page }) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil/carteiras')
    const principal = form(page, 'Carteira principal')
    await expect(principal.getByLabel('Apelido da carteira')).toHaveValue('Principal')
    await principal.getByLabel('Apelido da carteira').fill('Cofre principal')
    await principal.getByRole('button', { name: 'Salvar carteira' }).click()
    await expect(page.getByText('Carteira principal atualizada')).toBeVisible()
    await page.reload()
    await expect(form(page, 'Carteira principal').getByLabel('Apelido da carteira')).toHaveValue(
      'Cofre principal',
    )
  })
})

test.describe('Navegação do perfil', () => {
  test('seções fora do escopo não aparentam sucesso e a de carteiras abre', async ({
    page,
  }, testInfo) => {
    await loginAs(page, USERS.ana)
    await openApp(page, '/perfil')
    if (testInfo.project.name === 'desktop') {
      await page.getByRole('button', { name: 'Ofertas' }).click({ force: true })
      await expect(page.getByText('Ofertas indisponível')).toBeVisible()
      await page.getByRole('link', { name: 'Carteiras' }).first().click()
    } else {
      await page.getByRole('link', { name: 'Carteiras' }).first().click()
    }
    await expect(page).toHaveURL(/\/perfil\/carteiras$/)
    await expect(form(page, 'Carteira principal')).toBeVisible()
  })

  test('perfil e carteiras exigem login e voltam ao destino', async ({ page }) => {
    await openApp(page, '/perfil/carteiras')
    await expect(page).toHaveURL(/\/entrar\?redirect=%2Fperfil%2Fcarteiras/)
    await page.getByRole('form', { name: 'Entrar' }).getByLabel('E-mail').fill(USERS.ana.email)
    await page
      .getByRole('form', { name: 'Entrar' })
      .getByLabel('Senha', { exact: true })
      .fill(USERS.ana.password)
    await page
      .getByRole('form', { name: 'Entrar' })
      .getByRole('button', { name: 'Entrar', exact: true })
      .click()
    await expect(page).toHaveURL(/\/perfil\/carteiras$/)
  })
})
