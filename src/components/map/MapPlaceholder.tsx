import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { Point } from '@/types/point'

export function MapPlaceholder({
  selected,
  picking,
  onMapClick,
  onSelect,
  children,
}: {
  selected?: Point
  picking: boolean
  onMapClick: () => void
  onSelect: (point: Point) => void
  children?: ReactNode
}) {
  const mockPoint = {
    ...selected,
    id: selected?.id ?? '1',
    name: selected?.name ?? '○○商店',
    category: selected?.category ?? '空き店舗',
    memo: selected?.memo ?? '',
    surveyedAt: selected?.surveyedAt ?? '',
    latitude: 0,
    longitude: 0,
  } as Point

  return (
    <div
      className={cn('map-area', picking && 'cursor-crosshair')}
      onClick={picking ? onMapClick : undefined}
      role="region"
      aria-label="地図プレースホルダー"
    >
      <div className="map-label">
        MapLibre Map Area <span>（実装予定）</span>
      </div>

      <div className="road road-a" />
      <div className="road road-b" />
      <div className="road road-c" />

      <button
        type="button"
        aria-label="○○商店の地点"
        className="map-pin pin-a"
        onClick={(e) => {
          e.stopPropagation()
          onSelect(mockPoint)
        }}
      />

      <button
        type="button"
        aria-label="△△公園の地点"
        className="map-pin pin-b"
        onClick={(e) => {
          e.stopPropagation()

          onSelect({
            ...mockPoint,
            id: '2',
            name: '△△公園',
            category: '公共施設',
            memo: 'ベンチとトイレあり',
          })
        }}
      />

      {picking && (
        <div
          className="temporary-pin"
          aria-label="仮マーカー"
        />
      )}

      {children}
    </div>
  )
}