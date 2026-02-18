export type IceServer = { urls: string | string[]; username?: string; credential?: string }

const DEFAULT_STUN_SERVER = 'stun:stun.l.google.com:19302'
const DEFAULT_TTL_SECONDS = 3600
const CLOUDFLARE_TURN_API_URL =
  'https://rtc.live.cloudflare.com/v1/turn/keys'

function normalizeUrls(urls: string | string[]): string[] {
  return Array.isArray(urls) ? urls : [urls]
}

export function filterPort53(iceServers: IceServer[]): IceServer[] {
  return iceServers
    .map((server) => ({
      ...server,
      urls: normalizeUrls(server.urls).filter((url) => !url.includes(':53')),
    }))
    .filter((server) => server.urls.length > 0)
}

export async function getIceServers(): Promise<IceServer[]> {
  const keyId = process.env.CLOUDFLARE_TURN_KEY_ID
  const token = process.env.CLOUDFLARE_TURN_API_TOKEN
  const ttl = Number(process.env.CLOUDFLARE_TURN_TTL ?? DEFAULT_TTL_SECONDS)
  const stunServer = process.env.STUN_SERVER || DEFAULT_STUN_SERVER

  if (keyId && token) {
    const response = await fetch(
      `${CLOUDFLARE_TURN_API_URL}/${keyId}/credentials/generate-ice-servers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ttl }),
      },
    )

    if (!response.ok) {
      throw new Error(`Cloudflare TURN: ${response.status} ${await response.text()}`)
    }

    const data = (await response.json()) as { iceServers?: IceServer[] }

    if (!Array.isArray(data.iceServers)) {
      throw new Error('Cloudflare TURN: invalid response payload')
    }

    return filterPort53(data.iceServers)
  }

  return [{ urls: stunServer }]
}
