import { useNavigate, useSearch } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'

import { Search } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

/**
 * Busca do desktop. O header do Figma só tem o ícone de lupa; a busca abre num diálogo (foco preso,
 * Esc fecha e devolve o foco ao ícone) e leva ao catálogo filtrado.
 */
export function SearchDialog() {
  const navigate = useNavigate()
  const current = useSearch({ strict: false }) as { busca?: string }
  const [open, setOpen] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = String(new FormData(event.currentTarget).get('busca') ?? '').trim()
    setOpen(false)
    void navigate({ to: '/', search: value ? { busca: value } : {}, hash: 'catalogo' })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger aria-label="Buscar NFTs" className="transition-colors hover:text-accent-text">
        <Search className="size-6" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogTitle>Buscar NFTs</DialogTitle>
        <DialogDescription className="text-14 text-subtle">
          Busque por nome, coleção, criador ou categoria.
        </DialogDescription>
        <form role="search" onSubmit={handleSubmit} className="flex gap-3">
          <label htmlFor="busca-desktop" className="sr-only">
            Termo de busca
          </label>
          <input
            id="busca-desktop"
            name="busca"
            type="search"
            defaultValue={current.busca ?? ''}
            placeholder="Ex.: Emerald Ape, Música, Nova Sato"
            autoComplete="off"
            className="h-10 min-w-0 flex-1 rounded-xs border border-input bg-transparent px-3 text-15 outline-none placeholder:text-subtle focus-visible:border-primary"
          />
          <Button type="submit">Buscar</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
