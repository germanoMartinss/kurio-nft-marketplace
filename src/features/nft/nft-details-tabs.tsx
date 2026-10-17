import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NETWORK_LABELS } from '@/contracts/common'
import type { NftDetail } from '@/contracts/nft'

/** "Detalhes do NFT" e "Avaliações de colecionadores", como no Figma (Radix Tabs: setas alternam). */
export function NftDetailsTabs({ nft }: { nft: NftDetail }) {
  return (
    <Tabs defaultValue="detalhes" className="container-page">
      <TabsList className="gap-6 overflow-x-auto lg:gap-8">
        <TabsTrigger value="detalhes" className="text-15 lg:text-17">
          Detalhes do NFT
        </TabsTrigger>
        <TabsTrigger value="avaliacoes" className="text-15 lg:text-17">
          Avaliações de colecionadores ({nft.rating.count})
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="detalhes"
        className="flex flex-col gap-3 text-14 leading-6 text-muted-foreground"
      >
        {nft.story.map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mb-3">
            {paragraph}
          </p>
        ))}
        <DetailItem title="Rede:">
          Cunhado na {NETWORK_LABELS[nft.network]} com procedência imutável e metadados armazenados
          no IPFS.
        </DetailItem>
        <DetailItem title="Contrato:">
          Direitos autorais do criador: {nft.royaltyPercent}% nas vendas secundárias, pagos
          automaticamente pelos mercados compatíveis.
        </DetailItem>
        <DetailItem title="Direitos autorais:">
          {nft.contract} • Contrato inteligente ERC-721 verificado.
        </DetailItem>
      </TabsContent>
      <TabsContent
        value="avaliacoes"
        className="flex flex-col gap-2 text-14 leading-6 text-muted-foreground"
      >
        <p>
          <strong className="text-foreground">
            {nft.rating.average.toLocaleString('pt-BR')} de 5
          </strong>{' '}
          na média de {nft.rating.count} avaliações de colecionadores.
        </p>
        <p>Os comentários individuais das avaliações não fazem parte desta demonstração.</p>
      </TabsContent>
    </Tabs>
  )
}

function DetailItem({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-14 font-bold text-foreground">{title}</h3>
      <p>{children}</p>
    </div>
  )
}
