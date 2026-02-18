import { NextResponse } from 'next/server'
import { getIceServers } from '../../../iceServers'

const peerjsHost = process.env.PEERJS_HOST || '0.peerjs.com'
const peerjsPath = process.env.PEERJS_PATH || '/'

export async function POST(): Promise<NextResponse> {
  const iceServers = await getIceServers()

  return NextResponse.json({
    host: peerjsHost,
    path: peerjsPath,
    iceServers,
  })
}
