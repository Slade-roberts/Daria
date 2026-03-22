'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    startTransition(async () => {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        setError('Incorrect password. Please try again.')
        setPassword('')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="password"
          className="block text-xs tracking-widest uppercase text-muted-gray mb-3 font-sans"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
          className="w-full px-4 py-3 bg-transparent border border-muted-gray/40 text-charcoal font-sans text-sm focus:outline-none focus:border-sage transition-colors placeholder:text-charcoal/30"
          placeholder="Enter your password"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 font-sans" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending || !password}
        className="w-full px-8 py-3 bg-charcoal text-cream text-sm tracking-widest uppercase hover:bg-sage transition-colors font-sans disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? 'Signing in…' : 'Sign In'}
      </button>
    </form>
  )
}
