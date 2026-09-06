import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { Header } from '@/components/layout/Header'
import { CategoryFilter } from '@/components/map/CategoryFilter'
import { MapView } from '@/components/map/MapView'
import { PointForm } from '@/components/point/PointForm'
import { PointList } from '@/components/point/PointList'
import { PointPopup } from '@/components/point/PointPopup'
import { Button } from '@/components/ui/button'

import { categories, points, projects } from '@/mocks/data'
import type { Point, PointFormValues } from '@/types/point'

export function MapPage() {
  const { id } = useParams()

  const project =
    projects.find((item) => item.id === id) ?? projects[0]

  const [mode, setMode] =
    useState<'list' | 'pick' | 'create' | 'edit'>('list')

  const [pickPurpose, setPickPurpose] =
    useState<'create' | 'relocate' | null>(null)

  const [selected, setSelected] = useState<Point | undefined>()
  const [filters, setFilters] = useState(categories)
  const [notice, setNotice] = useState('')
  const [pointItems, setPointItems] = useState(points)

  // 一時的にクリック位置を保持する
  const [pendingLocation, setPendingLocation] = useState<{
    longitude: number
    latitude: number
  } | null>(null)

  const filtered = pointItems.filter((point) =>
    filters.includes(point.category),
  )

  function save(message: string) {
    setMode('list')
    setSelected(undefined)
    setNotice(message)

    window.setTimeout(() => {
      setNotice('')
    }, 2600)
  }

  // 地点登録
  function handleCreatePoint(values: PointFormValues) {
    if (!pendingLocation) {
      return
    }

    const newPoint: Point = {
      id: crypto.randomUUID(),
      ...values,
      latitude: pendingLocation.latitude,
      longitude: pendingLocation.longitude,
    }

    setPointItems((currentPoints) => [
      ...currentPoints,
      newPoint,
    ])

    setPendingLocation(null)

    save('地点を登録しました')
  }

  // 地点情報更新
  function handleUpdatePoint(values: PointFormValues) {
    if (!selected) {
      return
    }

    setPointItems((currentPoints) =>
      currentPoints.map((point) =>
        point.id === selected.id
          ? {
              ...point,
              ...values,
            }
          : point,
      ),
    )

    save('地点情報を更新しました')
  }

  // 地点選択
  function selectPoint(point: Point) {
    if (mode !== 'pick') {
      setSelected(
        pointItems.find((item) => item.id === point.id) ?? point,
      )
      setMode('list')
    }
  }

  // 地図クリック時の処理切り替え
  function handleMapClick(
    longitude: number,
    latitude: number,
  ) {
    if (pickPurpose === 'relocate' && selected) {
      const relocatedPoint = {
        ...selected,
        longitude,
        latitude,
      }

      setPointItems((currentPoints) =>
        currentPoints.map((point) =>
          point.id === selected.id
            ? relocatedPoint
            : point,
        ),
      )

      setSelected(relocatedPoint)
      setPickPurpose(null)
      setMode('list')
      setNotice('地点の位置を変更しました')

      return
    }

    if (pickPurpose === 'create') {
      setPendingLocation({
        longitude,
        latitude,
      })

      setPickPurpose(null)
      setMode('create')
    }
  }

  return (
    <>
      <Header authenticated />

      <main className="flex min-h-[calc(100vh-64px)] flex-col">
        <div className="border-b bg-card">
          <div className="shell flex flex-wrap items-center justify-between gap-4 py-4">
            <div>
              <Link
                className="text-sm font-medium text-primary hover:underline"
                to="/projects"
              >
                プロジェクト一覧へ戻る
              </Link>

              <h1 className="mt-1 font-heading text-xl font-semibold">
                {project.name}
              </h1>
            </div>

            <Button
              className="md:hidden"
              onClick={() => {
                setMode('pick')
                setPickPurpose('create')
                setSelected(undefined)
              }}
            >
              地点を追加
            </Button>
          </div>
        </div>

        {mode === 'pick' && (
          <div className="bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">
            地図上で登録したい場所をクリックしてください
          </div>
        )}

        {notice && (
          <div
            className="fixed right-4 top-20 z-20 rounded-lg border bg-card px-4 py-3 text-sm font-medium text-primary shadow-lg"
            role="status"
          >
            {notice}
          </div>
        )}

        <div className="flex flex-1 flex-col md:grid md:grid-cols-[340px_minmax(0,1fr)]">
          <aside className="order-2 border-r bg-card p-5 md:order-1 md:max-h-[calc(100vh-129px)] md:overflow-y-auto">
            {mode === 'create' ? (
              <PointForm
                title="地点を登録"
                onCancel={() => setMode('list')}
                onSave={handleCreatePoint}
              />
            ) : mode === 'edit' && selected ? (
              <PointForm
                title="地点を編集"
                point={selected}
                onCancel={() => setMode('list')}
                onSave={handleUpdatePoint}
                onRelocate={() => {
                  setMode('pick')
                  setPickPurpose('relocate')
                  setNotice(
                    '地図上で新しい位置をクリックしてください',
                  )
                }}
              />
            ) : (
              <div className="flex flex-col gap-6">
                <CategoryFilter
                  selected={filters}
                  onChange={setFilters}
                />

                <Button
                  className="hidden w-full md:inline-flex"
                  onClick={() => {
                    setMode('pick')
                    setPickPurpose('create')
                    setSelected(undefined)
                  }}
                >
                  地点を追加
                </Button>

                <PointList
                  items={filtered}
                  selectedId={selected?.id}
                  onSelect={selectPoint}
                />

                <p className="border-t pt-4 text-xs leading-5 text-muted-foreground">
                  地点を選ぶと地図上に詳細が表示されます。
                </p>
              </div>
            )}
          </aside>

          <section className="order-1 min-w-0 bg-muted p-3 md:order-2 md:p-5">
            <div className="relative h-[500px]">
              <MapView
                points={filtered}
                onSelect={selectPoint}
                onMapClick={handleMapClick}
              />

              {selected && mode === 'list' && (
                <PointPopup
                  point={selected}
                  onClose={() => setSelected(undefined)}
                  onEdit={() => setMode('edit')}
                  onDelete={() => {
                    setPointItems((items) =>
                      items.filter(
                        (item) => item.id !== selected.id,
                      ),
                    )
                    save('地点を削除しました')
                  }}
                />
              )}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}