import { afterEach, describe, expect, it, vi } from 'vitest'
import { filterPort53, getIceServers } from '../../src/iceServers'

describe('filterPort53', () => {
  it('removes :53 URLs and drops empty entries', () => {
    const filtered = filterPort53([
      { urls: ['turn:turn.cloudflare.com:53', 'turn:turn.cloudflare.com:3478'] },
      { urls: 'turn:turn.cloudflare.com:53', username: 'u', credential: 'c' },
    ])

    expect(filtered).toEqual([{ urls: ['turn:turn.cloudflare.com:3478'] }])
  })
})

describe('getIceServers', () => {
  const originalEnv = { ...process.env }

  afterEach(() => {
    process.env = { ...originalEnv }
    vi.unstubAllGlobals()
    vi.restoreAllMocks()
  })

  it('returns STUN fallback when Cloudflare credentials are missing', async () => {
    process.env = {
      ...originalEnv,
      CLOUDFLARE_TURN_KEY_ID: '',
      CLOUDFLARE_TURN_API_TOKEN: '',
      STUN_SERVER: 'stun:example.com:19302',
    }

    await expect(getIceServers()).resolves.toEqual([
      { urls: 'stun:example.com:19302' },
    ])
  })

  it('fetches Cloudflare ice servers and filters port 53', async () => {
    process.env = {
      ...originalEnv,
      CLOUDFLARE_TURN_KEY_ID: 'key-id',
      CLOUDFLARE_TURN_API_TOKEN: 'api-token',
      CLOUDFLARE_TURN_TTL: '7200',
    }

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        iceServers: [
          { urls: ['turn:turn.cloudflare.com:53', 'turn:turn.cloudflare.com:3478'] },
        ],
      }),
    })

    vi.stubGlobal('fetch', fetchMock)

    await expect(getIceServers()).resolves.toEqual([
      { urls: ['turn:turn.cloudflare.com:3478'] },
    ])

    expect(fetchMock).toHaveBeenCalledWith(
      'https://rtc.live.cloudflare.com/v1/turn/keys/key-id/credentials/generate-ice-servers',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer api-token',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ttl: 7200 }),
      },
    )
  })
})
