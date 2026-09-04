import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button'

export function Header({
  authenticated = false,
}: {
  authenticated?: boolean
}) {
  return (
    <header className="border-b bg-card">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          to={authenticated ? '/projects' : '/'}
          className="font-heading text-lg font-semibold tracking-tight text-primary"
        >
          Fieldwork GIS
        </Link>

        <nav
          className="flex items-center gap-2"
          aria-label="メインナビゲーション"
        >
          {authenticated ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                山田 太郎さん
              </span>

              <Link
                className={buttonVariants({ variant: 'outline' })}
                to="/"
              >
                ログアウト
              </Link>
            </>
          ) : (
            <>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                to="/login"
              >
                ログイン
              </Link>

              <Link
                className={buttonVariants()}
                to="/signup"
              >
                新規登録
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}