import { Link } from 'react-router-dom'

import { Header } from '@/components/layout/Header'
import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function HomePage() {
  const features = [
    [
      '調査地点を記録',
      '地図をクリックして、店舗・空き店舗・公共施設などを登録できます。',
    ],
    [
      '地図で分布を確認',
      '登録地点を地図上で確認し、カテゴリごとに表示を切り替えられます。',
    ],
    [
      '地域の特徴を考える',
      '地点の分布を見ながら、なぜその場所に集中しているのかを考察できます。',
    ],
  ]

  return (
    <>
      <Header />

      <main>
        <section className="border-b bg-card">
          <div className="shell grid items-center gap-12 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24">
            <div>
              <p className="mb-4 text-sm font-semibold tracking-widest text-primary">
                FIELDWORK × WEB GIS
              </p>

              <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                フィールドワークの記録を、地図で振り返ろう
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
                調査した店舗や施設などを地図に登録し、
                分布や地域の特徴を確認できる学習用WebGISです。
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  className={buttonVariants({ size: 'lg' })}
                  to="/signup"
                >
                  無料で始める
                </Link>

                <Link
                  className={buttonVariants({
                    variant: 'link',
                    size: 'lg',
                  })}
                  to="/login"
                >
                  ログイン
                </Link>
              </div>
            </div>

            <div
              className="map-area min-h-80"
              aria-label="地図のイメージ"
            >
              <div className="map-label">
                調査地点の分布イメージ
              </div>

              <div className="road road-a" />
              <div className="road road-b" />

              <span className="map-pin pin-a" />
              <span className="map-pin pin-b" />
            </div>
          </div>
        </section>

        <section className="shell py-16">
          <p className="text-sm font-semibold text-primary">
            できること
          </p>

          <h2 className="mt-2 font-heading text-2xl font-semibold text-balance">
            観察した事実を、地域の理解につなげる
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {features.map(([title, description]) => (
              <Card key={title}>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription className="leading-6">
                    {description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
