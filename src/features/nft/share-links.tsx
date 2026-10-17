import { ShareEmail, ShareLinkedin, ShareTwitter } from '@/components/icons'

/** Compartilhamento por links reais das plataformas (abrem em nova aba) e por e-mail. */
export function ShareLinks({ name }: { name: string }) {
  const url = typeof window === 'undefined' ? '' : window.location.href
  const text = `${name} na Kurio`
  const links = [
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      Icon: ShareLinkedin,
    },
    {
      label: 'e-mail',
      href: `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`,
      Icon: ShareEmail,
    },
    {
      label: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      Icon: ShareTwitter,
    },
  ]
  return (
    <div className="flex items-center gap-2">
      <p className="text-15 leading-4 font-bold">Compartilhar este NFT:</p>
      <ul className="flex items-center gap-2">
        {links.map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={`Compartilhar por ${label}${href.startsWith('mailto:') ? '' : ' (abre em nova aba)'}`}
              className="flex size-6 items-center justify-center text-foreground hover:text-accent-text"
            >
              <Icon className="h-4 w-auto" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
