import {
  Lightbulb,
  ListFilter,
  MapPinned,
} from 'lucide-react'
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
    {
      title: '調査地点を記録',
      description:
        '地図をクリックして、店舗・空き店舗・公共施設などを登録できます。',
      icon: MapPinned,
    },
    {
      title: '地図で分布を確認',
      description:
        '登録地点を地図上で確認し、カテゴリごとに表示を切り替えられます。',
      icon: ListFilter,
    },
    {
      title: '地域の特徴を考える',
      description:
        '地点の分布を見ながら、なぜその場所に集中しているのかを考察できます。',
      icon: Lightbulb,
    },
  ]

  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <section className="border-b bg-card">
          <div className="shell grid items-center gap-8 py-5 md:grid-cols-[1.05fr_.95fr] md:py-6">
            <div>
              <p className="mb-2 text-sm font-semibold tracking-widest text-primary">
                FIELDWORK × WEB GIS
              </p>

              <h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight tracking-tight text-balance md:text-[40px]">
                フィールドワークの記録を、
                <br className="hidden md:block" />
                地図で振り返ろう
              </h1>

              <p className="mt-3 max-w-xl text-base leading-6 text-muted-foreground">
                調査した店舗や施設などを地図に登録し、
                <br className="hidden md:block" />
                分布や地域の特徴を確認できる学習用WebGISです。
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  className={buttonVariants({
                    size: 'lg',
                  })}
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
              className="map-area h-56 min-h-0! md:h-[230px]"
              aria-label="地図のイメージ"
            >
              <div className="road road-a" />
              <div className="road road-b" />

              <span className="map-pin pin-a" />
              <span className="map-pin pin-b" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-muted/30">
          <div className="shell py-4 md:py-5">
            <div className="text-center">
              <p className="text-sm font-semibold text-primary">
                できること
              </p>

              <h2 className="mt-1 font-heading text-xl font-semibold tracking-tight text-balance md:text-2xl">
                観察した事実を、地域の理解につなげる
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                フィールドワークの記録を、地図上でシンプルに整理・振り返れます。
              </p>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {features.map(
                ({
                  title,
                  description,
                  icon: Icon,
                }) => (
                  <Card key={title}>
                    <CardHeader className="gap-2 p-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>

                      <CardTitle className="text-lg">
                        {title}
                      </CardTitle>

                      <CardDescription className="text-sm leading-5">
                        {description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ),
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}