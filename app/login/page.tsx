import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from '@/components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In — Daria Shchukina',
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ logout?: string }>
}) {
  const params = await searchParams
  if (params.logout === '1') {
    const draft = await draftMode()
    draft.disable()
    redirect('/')
  }

  return (
    <div className="pt-16 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-sage mb-4 font-sans">Admin</p>
          <h1 className="font-serif text-4xl font-light text-charcoal">Sign In</h1>
          <p className="text-sm text-charcoal/50 mt-3 font-sans">
            Enter your password to enable edit mode
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
