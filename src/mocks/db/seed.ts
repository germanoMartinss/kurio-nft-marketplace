import { createNftFixtures } from '../fixtures/nfts'
import { FAVORITE_FIXTURES, USER_FIXTURES, WALLET_FIXTURES } from '../fixtures/users'

import type { DbState } from './types'

/** Estado inicial conhecido. O reset restaura exatamente este estado. */
export function createSeedState(): DbState {
  return {
    schemaVersion: 1,
    sequence: 0,
    nfts: Object.fromEntries(createNftFixtures().map((nft) => [nft.id, nft])),
    users: Object.fromEntries(USER_FIXTURES.map((user) => [user.id, structuredClone(user)])),
    sessions: {},
    favorites: structuredClone(FAVORITE_FIXTURES),
    carts: {},
    wallets: structuredClone(WALLET_FIXTURES),
    walletConnections: {},
    quotes: {},
    orders: {},
    idempotency: {},
    newsletter: [],
  }
}
