import { AuthForm } from '@/components/auth/AuthForm'
import { Header } from '@/components/layout/Header'

export function AuthPage({
  signup = false,
}: {
  signup?: boolean
}) {
  return (
    <>
      <Header />

      <main className="shell flex min-h-[calc(100vh-64px)] items-start justify-center py-12 md:items-center md:py-16">
        <div className="w-full max-w-md">
          <AuthForm signup={signup} />
        </div>
      </main>
    </>
  )
}