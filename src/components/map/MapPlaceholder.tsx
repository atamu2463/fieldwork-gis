import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'
import type { Point } from '@/types/point'

export function MapPlaceholder({
  points,
  picking,
  onMapClick,
  onSelect,
  children,
}: {
  points: Point[]
  picking: boolean
  onMapClick: () => void
  onSelect: (point: Point) => void
  children?: ReactNode
}) {
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

      {points.slice(0, 2).map((point, index) => (
        <button
          key={point.id}
          type="button"
          aria-label={`${point.name}の地点`}
          className={cn(
            'map-pin',
            index === 0 ? 'pin-a' : 'pin-b',
          )}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(point)
          }}
        />
      ))}

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