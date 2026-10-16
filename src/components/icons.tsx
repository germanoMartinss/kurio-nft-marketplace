/**
 * Ponto único de ícones da interface.
 *
 * Fonte principal: SVGs exportados do Figma (public/assets/icons/), convertidos em componentes
 * com `currentColor` por scripts/generate-icons.mjs. Onde o Figma usa um ícone que não foi
 * exportado, usamos o equivalente do Phosphor; a lista está em ARCHITECTURE.md e cada caso está
 * marcado abaixo. Os nomes exportados descrevem o uso, não o desenho.
 */
import {
  CaretDownIcon,
  DotsThreeVerticalIcon,
  EnvelopeSimpleIcon,
  EyeIcon,
  FacebookLogoIcon,
  HeartIcon as PhosphorHeartIcon,
  HouseIcon,
  InfoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  MinusIcon,
  PlusIcon,
  ScanIcon,
  ShoppingCartSimpleIcon,
  SlidersHorizontalIcon,
  TwitterLogoIcon,
  UserIcon as PhosphorUserIcon,
  WalletIcon,
  XIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react'
import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

import {
  ActivityIcon,
  ArrowRight2Icon,
  ArrowRightIcon,
  CartIcon,
  DangerTriangleIcon,
  DeleteIcon,
  DownloadIcon,
  Heart1Icon,
  HideIcon,
  Image2Icon,
  LocationIcon,
  LogoutIcon,
  SearchIcon,
  Shopping1Icon,
  StarIcon,
  UserIcon,
} from './figma-icons.generated'

type IconProps = SVGProps<SVGSVGElement>

// --- Figma -------------------------------------------------------------------------------------
export {
  ArrowRightIcon as ArrowRight,
  ArrowRight2Icon as ChevronRight,
  CartIcon as Cart,
  DangerTriangleIcon as Support,
  DeleteIcon as Trash,
  DownloadIcon as Download,
  Heart1Icon as Heart,
  HideIcon as EyeOff,
  Image2Icon as ImagePlaceholder,
  LocationIcon as Wallet,
  LogoutIcon as SignIn,
  LogoutIcon as SignOut,
  SearchIcon as Search,
  SearchIcon as ZoomIn,
  Shopping1Icon as Activity,
  ActivityIcon as Offers,
  StarIcon as Star,
  UserIcon as User,
}

/** O Figma usa o mesmo chevron espelhado para "voltar". */
export function ChevronLeft({ className, ...props }: IconProps) {
  return <ArrowRight2Icon className={cn('-scale-x-100', className)} {...props} />
}

// --- Phosphor: ícones usados no Figma que não foram exportados ---------------------------------
export {
  CaretDownIcon as ChevronDown,
  XIcon as Close,
  EyeIcon as Eye,
  InfoIcon as Info,
  MinusIcon as Minus,
  PlusIcon as Plus,
  SlidersHorizontalIcon as Filters,
  ScanIcon as Scan,
  DotsThreeVerticalIcon as MoreVertical,
  WalletIcon as WalletApp,
  EnvelopeSimpleIcon as Mail,
  FacebookLogoIcon as Facebook,
  InstagramLogoIcon as Instagram,
  LinkedinLogoIcon as Linkedin,
  TwitterLogoIcon as Twitter,
  YoutubeLogoIcon as Youtube,
}

/** Versões preenchidas usadas na barra de abas mobile. */
export function HomeFilled(props: IconProps) {
  return <HouseIcon weight="fill" {...props} />
}
export function HeartFilled(props: IconProps) {
  return <PhosphorHeartIcon weight="fill" {...props} />
}
export function CartFilled(props: IconProps) {
  return <ShoppingCartSimpleIcon weight="fill" {...props} />
}
export function UserFilled(props: IconProps) {
  return <PhosphorUserIcon weight="fill" {...props} />
}
