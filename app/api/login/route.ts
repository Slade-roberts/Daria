import { draftMode } from 'next/headers'
import { timingSafeEqual, createHash } from 'crypto'
import { type NextRequest } from 'next/server'

function safeHash(value: string): Buffer {
  return createHash('sha256').update(value).digest()
}

export async function POST(request: NextRequest) {
  let password: string

  try {
    const body = await request.json()
    password = body?.password
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (!password || typeof password !== 'string') {
    return new Response('Password required', { status: 400 })
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return new Response('Unauthorized', { status: 401 })
  }

  const passwordMatch = timingSafeEqual(safeHash(password), safeHash(adminPassword))
  if (!passwordMatch) {
    return new Response('Unauthorized', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  return new Response('OK', { status: 200 })
}
