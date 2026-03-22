import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const secret = searchParams.get('token')
  const shouldEnable = searchParams.get('enable') !== 'false'
  const redirectPath = searchParams.get('redirect') || '/'

  if (shouldEnable) {
    if (!process.env.DRAFT_MODE_SECRET || secret !== process.env.DRAFT_MODE_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }
  }

  const draft = await draftMode()
  if (shouldEnable) {
    draft.enable()
  } else {
    draft.disable()
  }

  redirect(redirectPath)
}
