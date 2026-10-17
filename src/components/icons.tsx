/**
 * Ponto único de ícones da interface.
 *
 * Fonte: SVGs exportados do Figma (public/assets/icons/ e icons-mobile/), convertidos em
 * componentes com `currentColor` por scripts/generate-icons.mjs. Os nomes exportados descrevem
 * o uso, não o desenho. Phosphor só onde o Figma não exportou o ícone (marcado abaixo e
 * registrado em ARCHITECTURE.md).
 */
import { CaretDownIcon, EyeIcon, PlusIcon, WarningCircleIcon } from '@phosphor-icons/react'

import {
  ActivityIcon,
  ArrowRight2Icon,
  ArrowRightIcon,
  CartIcon,
  DangerTriangleIcon,
  DeleteIcon,
  DownloadIcon,
  EmailCompartilharIcon,
  FacebookIcon,
  FecharIcon,
  Heart1Icon,
  HideIcon,
  Image2Icon,
  InstagramIcon,
  LinkedinCompartilharIcon,
  LinkedinIcon,
  LocationIcon,
  LogoutIcon,
  MobileArrowLeft2Icon,
  MobileBotaoCentralIcon,
  MobileCoracaoPreenchidoIcon,
  MobileFacebookIcon,
  MobileFilterIcon,
  MobileGoogleIcon,
  MobileHomeIcon,
  MobileMenosIcon,
  MobileShopIcon,
  MobileUserIcon,
  MobileVerticalDotsIcon,
  MobileWalletIcon,
  SearchIcon,
  Shopping1Icon,
  StarIcon,
  ThankyouIcon,
  TwitterCompartilharIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
} from './figma-icons.generated'

// --- Figma (desktop) ---------------------------------------------------------------------------
export {
  ArrowRightIcon as ArrowRight,
  ArrowRight2Icon as ChevronRight,
  CartIcon as Cart,
  FecharIcon as Close,
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
  ThankyouIcon as ThankYou,
  // Compartilhar (detalhe do NFT)
  LinkedinCompartilharIcon as ShareLinkedin,
  EmailCompartilharIcon as ShareEmail,
  TwitterCompartilharIcon as ShareTwitter,
  // Redes sociais do footer: o quadrado com borda faz parte do ícone (32px)
  FacebookIcon as SocialFacebook,
  InstagramIcon as SocialInstagram,
  TwitterIcon as SocialTwitter,
  LinkedinIcon as SocialLinkedin,
  YoutubeIcon as SocialYoutube,
}

// --- Figma (mobile) ----------------------------------------------------------------------------
export {
  MobileArrowLeft2Icon as ChevronLeft,
  MobileHomeIcon as HomeFilled,
  MobileCoracaoPreenchidoIcon as HeartFilled,
  MobileShopIcon as CartFilled,
  MobileUserIcon as UserFilled,
  MobileBotaoCentralIcon as Scan,
  MobileFilterIcon as Filters,
  MobileMenosIcon as Minus,
  MobileVerticalDotsIcon as MoreVertical,
  MobileWalletIcon as WalletApp,
  MobileGoogleIcon as GoogleLogo,
  MobileFacebookIcon as FacebookLogo,
}

// --- Phosphor: ícones que o Figma não exportou -------------------------------------------------
export {
  CaretDownIcon as ChevronDown,
  EyeIcon as Eye,
  PlusIcon as Plus,
  WarningCircleIcon as WarningCircle,
}
