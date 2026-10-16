import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'

import { getHealth } from '@/api/system'
import { env } from '@/env'
import { createRealtimeSocket, type RealtimeSocket } from '@/realtime/socket'

import { mockControl } from '../browser'
import { realtimeServer, type RealtimeConnection } from '../socket/server'

/**
 * Painel de diagnóstico da camada de mocks (rota /mocks). Faz parte da infraestrutura de mocks,
 * não do produto: verifica o service worker, uma ida e volta REST (Axios → MSW) e uma ida e volta
 * pelo socket.io-client (WebSocket interceptado), além de selecionar o cenário e restaurar os dados.
 */
export function MockPanel() {
  if (!env.enableMocks) {
    return (
      <PanelLayout>
        <p>Os mocks estão desativados (VITE_ENABLE_MOCKS=false).</p>
      </PanelLayout>
    )
  }
  return (
    <PanelLayout>
      <ScenarioControls />
      <ServiceWorkerStatus />
      <RestStatus />
      <SocketStatus />
    </PanelLayout>
  )
}

function PanelLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <h1 className="text-22 font-bold">Painel de mocks</h1>
      {children}
    </div>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section
      aria-labelledby={`section-${title}`}
      className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-5"
    >
      <h2 id={`section-${title}`} className="font-bold text-accent">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Field({ label, value, testId }: { label: string; value: ReactNode; testId: string }) {
  return (
    <div className="flex flex-wrap gap-x-3 text-sm">
      <dt className="text-muted-foreground">{label}:</dt>
      <dd data-testid={testId} className="break-all">
        {value}
      </dd>
    </div>
  )
}

const buttonClass =
  'bg-primary text-background w-fit rounded-md px-4 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground'

function ScenarioControls() {
  const scenarios = mockControl.scenarios.list()
  const [selected, setSelected] = useState(mockControl.scenarios.active())
  const description = scenarios.find((scenario) => scenario.id === selected)?.description

  return (
    <Section title="Cenário">
      <div className="flex flex-col gap-2">
        <label htmlFor="mock-scenario" className="text-14 text-muted-foreground">
          Cenário ativo (também por <code>?cenario=&lt;id&gt;</code> na URL)
        </label>
        <select
          id="mock-scenario"
          value={selected}
          onChange={(event) => setSelected(event.target.value)}
          aria-describedby="mock-scenario-description"
          className="h-10 rounded-xs border border-input bg-background px-3 text-15"
        >
          {scenarios.map((scenario) => (
            <option key={scenario.id} value={scenario.id}>
              {scenario.label} ({scenario.id})
            </option>
          ))}
        </select>
        <p id="mock-scenario-description" className="text-14 text-subtle">
          {description}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            mockControl.scenarios.set(selected)
            window.location.reload()
          }}
        >
          Aplicar e recarregar
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => {
            mockControl.reset()
            window.location.reload()
          }}
        >
          Restaurar dados iniciais
        </button>
      </div>
    </Section>
  )
}

function ServiceWorkerStatus() {
  const controller = typeof navigator !== 'undefined' ? navigator.serviceWorker?.controller : null
  return (
    <Section title="Service worker">
      <dl className="flex flex-col gap-1">
        <Field
          label="Controlando a página"
          value={controller ? 'sim' : 'não'}
          testId="sw-controlled"
        />
        <Field label="Script" value={controller?.scriptURL ?? '—'} testId="sw-script" />
      </dl>
    </Section>
  )
}

function RestStatus() {
  const health = useQuery({
    queryKey: ['system', 'health'],
    queryFn: ({ signal }) => getHealth(signal),
    staleTime: 0,
  })
  return (
    <Section title="REST (Axios → MSW)">
      <dl className="flex flex-col gap-1">
        <Field label="GET /api/health" value={health.status} testId="rest-status" />
        <Field
          label="Horário do servidor"
          value={health.data?.serverTime ?? '—'}
          testId="rest-server-time"
        />
        {health.error ? (
          <Field label="Erro" value={health.error.message} testId="rest-error" />
        ) : null}
      </dl>
      <button type="button" className={buttonClass} onClick={() => void health.refetch()}>
        Repetir requisição
      </button>
    </Section>
  )
}

type SocketState = {
  status: 'conectando' | 'conectado' | 'desconectado'
  transport: string | null
  reconnects: number
  lastDisconnectReason: string | null
  roundtripMs: number | null
}

function SocketStatus() {
  const socketRef = useRef<RealtimeSocket | null>(null)
  const [state, setState] = useState<SocketState>({
    status: 'conectando',
    transport: null,
    reconnects: 0,
    lastDisconnectReason: null,
    roundtripMs: null,
  })
  const [serverConnections, setServerConnections] = useState<RealtimeConnection[]>([])

  useEffect(() => {
    const socket = createRealtimeSocket()
    socketRef.current = socket

    const onConnect = () =>
      setState((s) => ({ ...s, status: 'conectado', transport: socket.io.engine.transport.name }))
    const onDisconnect = (reason: string) =>
      setState((s) => ({ ...s, status: 'desconectado', lastDisconnectReason: reason }))
    const onReconnect = () => setState((s) => ({ ...s, reconnects: s.reconnects + 1 }))
    const onPong = ({ sentAt }: { sentAt: number }) =>
      setState((s) => ({ ...s, roundtripMs: Date.now() - sentAt }))

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('diagnostics.pong', onPong)
    socket.io.on('reconnect', onReconnect)
    socket.connect()

    // Listeners liberados ao fim do ciclo de vida do componente.
    return () => {
      socket.io.off('reconnect', onReconnect)
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('diagnostics.pong', onPong)
      socket.disconnect()
      socketRef.current = null
    }
  }, [])

  const ping = useCallback(() => {
    socketRef.current?.emit('diagnostics.ping', { sentAt: Date.now() })
  }, [])

  return (
    <Section title="Socket.IO (socket.io-client → WebSocket interceptado)">
      <dl className="flex flex-col gap-1">
        <Field label="Estado" value={state.status} testId="socket-status" />
        <Field label="Transporte" value={state.transport ?? '—'} testId="socket-transport" />
        <Field label="Reconexões" value={state.reconnects} testId="socket-reconnects" />
        <Field
          label="Último motivo de desconexão"
          value={state.lastDisconnectReason ?? '—'}
          testId="socket-disconnect-reason"
        />
        <Field
          label="Ida e volta (diagnostics.ping → pong)"
          value={state.roundtripMs === null ? '—' : `${state.roundtripMs} ms`}
          testId="socket-roundtrip"
        />
        <Field
          label="Conexões no servidor simulado"
          value={serverConnections.length ? serverConnections.map((c) => c.id).join(', ') : '—'}
          testId="socket-server-connections"
        />
      </dl>
      <div className="flex flex-wrap gap-3">
        <button type="button" className={buttonClass} onClick={ping}>
          Enviar ping
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => setServerConnections(realtimeServer.connections())}
        >
          Listar conexões no servidor
        </button>
        <button
          type="button"
          className={buttonClass}
          onClick={() => realtimeServer.disconnectAll()}
        >
          Derrubar conexões (servidor)
        </button>
      </div>
    </Section>
  )
}
