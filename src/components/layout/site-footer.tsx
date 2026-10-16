import { Link } from '@tanstack/react-router'
import type { ComponentType, ReactNode } from 'react'

import { UnavailableAction } from '@/components/common/unavailable-action'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from '@/components/icons'
import { cn } from '@/lib/utils'

import { NewsletterForm } from './newsletter-form'

const FEATURES = [
  {
    letter: 'W',
    title: 'Segurança da carteira',
    text: 'Proteja sua carteira e colecione arte digital verificada com confiança.',
  },
  {
    letter: 'C',
    title: 'Criadores em destaque',
    text: 'Conheça artistas, estúdios e comunidades que moldam a cultura digital na rede.',
  },
  {
    letter: 'D',
    title: 'Alertas de lançamentos',
    text: 'Receba calendários de cunhagem, novidades de listas de acesso e análises do mercado.',
  },
]

const SOCIAL_LINKS: { label: string; href: string; Icon: ComponentType<{ className?: string }> }[] =
  [
    { label: 'Facebook', href: 'https://www.facebook.com', Icon: Facebook },
    { label: 'Instagram', href: 'https://www.instagram.com', Icon: Instagram },
    { label: 'X (Twitter)', href: 'https://x.com', Icon: Twitter },
    { label: 'LinkedIn', href: 'https://www.linkedin.com', Icon: Linkedin },
    { label: 'YouTube', href: 'https://www.youtube.com', Icon: Youtube },
  ]

const linkClass = 'text-14 leading-[22px] text-foreground transition-colors hover:text-accent-text'

export function SiteFooter() {
  // As telas mobile do Figma não têm footer; abaixo de 1024px a navegação fica na barra de abas.
  return (
    <footer className="container-page mt-20 hidden pb-6 lg:block">
      <div className="bg-card">
        <section
          aria-label="Destaques da Kurio"
          className="grid gap-8 p-6 md:grid-cols-2 md:p-8 lg:grid-cols-[1fr_1fr_1fr_1.35fr] lg:gap-0"
        >
          {FEATURES.map((feature) => (
            <div
              key={feature.letter}
              className="flex flex-col gap-3 lg:border-r lg:border-primary lg:px-4"
            >
              <span
                aria-hidden="true"
                className="flex size-[74px] items-center justify-center rounded-full bg-primary text-24 font-bold text-primary-foreground"
              >
                {feature.letter}
              </span>
              <h2 className="text-17 font-bold">{feature.title}</h2>
              <p className="text-14 leading-[22px] text-subtle">{feature.text}</p>
            </div>
          ))}
          <div className="flex flex-col gap-4 lg:px-4">
            <h2 className="text-18 leading-4 font-bold">Antecipe-se ao próximo lançamento</h2>
            <NewsletterForm />
          </div>
        </section>

        <div className="grid gap-3 bg-surface-dark p-6 text-14 md:grid-cols-2 md:items-center md:p-8 lg:grid-cols-4">
          <p className="text-14 font-bold tracking-brand">KURIO</p>
          <p className="leading-[22px]">Feito para colecionadores, criadores e cultura</p>
          <a href="mailto:contato@email.com" className="w-fit hover:text-accent-text">
            contato@email.com
          </a>
          <a href="tel:+551140028922" className="w-fit hover:text-accent-text">
            +55 11 4002 8922
          </a>
        </div>

        <div className="grid gap-8 p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-4">
          <FooterColumn title="Meu perfil">
            <Link to="/perfil" className={linkClass}>
              Meu perfil
            </Link>
            <Unavailable feature="Minha coleção" />
            <Unavailable feature="Atividade" />
            <Unavailable feature="Estúdio do criador" />
            <Link to="/perfil/favoritos" className={linkClass}>
              Lista de interesse
            </Link>
          </FooterColumn>

          <FooterColumn title="Central de ajuda">
            <Unavailable feature="Central de ajuda" />
            <Unavailable feature="Como comprar NFTs" />
            <Unavailable feature="Carteira e segurança" />
            <Unavailable feature="Política do mercado" />
            <Unavailable feature="Denunciar item" />
          </FooterColumn>

          <FooterColumn title="Coleções">
            {['Arte digital', 'Fotografia', 'Música', 'Arte 3D', 'Utilidade'].map((name) => (
              <Link
                key={name}
                to="/"
                hash="catalogo"
                activeOptions={{ includeHash: true }}
                className={linkClass}
              >
                {name}
              </Link>
            ))}
          </FooterColumn>

          <div className="flex flex-col gap-8">
            <section aria-labelledby="footer-social" className="flex flex-col gap-3">
              <h2 id="footer-social" className="text-18 font-bold">
                Redes sociais
              </h2>
              <ul className="flex gap-2.5">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${label} (abre em nova aba)`}
                      className="flex size-[30px] items-center justify-center rounded-sm border border-primary text-primary transition-colors hover:bg-primary/10"
                    >
                      <Icon className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="footer-wallets" className="flex flex-col gap-3">
              <h2 id="footer-wallets" className="text-18 font-bold">
                Carteiras compatíveis
              </h2>
              <WalletChips />
            </section>
          </div>
        </div>
      </div>
      <p className="mt-2 py-1.5 text-center text-14">
        © 2026 Kurio. Propriedade digital para todos.
      </p>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-18 font-bold">{title}</h2>
      <div className="flex flex-col items-start gap-2">{children}</div>
    </section>
  )
}

function Unavailable({ feature }: { feature: string }) {
  return (
    <UnavailableAction feature={feature} className={linkClass}>
      {feature}
    </UnavailableAction>
  )
}

/** Selo "METAMASK · WALLETCONNECT · COINBASE" usado no footer e no pagamento. */
export function WalletChips({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        'w-fit rounded-sm border border-primary/60 bg-surface-dark px-2.5 py-1.5 text-9 font-bold tracking-[0.1px] text-accent-text',
        className,
      )}
    >
      METAMASK <span aria-hidden="true">·</span> WALLETCONNECT <span aria-hidden="true">·</span>{' '}
      COINBASE
    </p>
  )
}
