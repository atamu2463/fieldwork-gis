import { useEffect, useRef } from 'react'
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

import type { Point } from '@/types/point'

type MapViewProps = {
  points: Point[]
  onSelect: (point: Point) => void
  onMapClick: (longitude: number, latitude: number) => void
}

export function MapView({
  points,
  onSelect,
  onMapClick,
}: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)

  // 地図を初期化する
  useEffect(() => {
    if (!mapContainerRef.current) {
      return
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: 'raster',
            tiles: [
              'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            ],
            tileSize: 256,
            attribution: '© OpenStreetMap contributors',
          },
        },
        layers: [
          {
            id: 'osm',
            type: 'raster',
            source: 'osm',
          },
        ],
      },
      center: [139.7671, 35.6812],
      zoom: 12,
    })

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  // 地図クリックイベントを管理する
  useEffect(() => {
    const map = mapRef.current

    if (!map) {
      return
    }

    const handleMapClick = (
      mapEvent: maplibregl.MapMouseEvent,
    ) => {
      onMapClick(
        mapEvent.lngLat.lng,
        mapEvent.lngLat.lat,
      )
    }

    map.on('click', handleMapClick)

    return () => {
      map.off('click', handleMapClick)
    }
  }, [onMapClick])

  // マーカーを管理する
  useEffect(() => {
    const map = mapRef.current

    if (!map) {
      return
    }

    const markers = points.map((point) => {
      const marker = new maplibregl.Marker()
        .setLngLat([
          point.longitude,
          point.latitude,
        ])
        .addTo(map)

      marker
        .getElement()
        .addEventListener('click', (clickEvent) => {
          clickEvent.stopPropagation()
          onSelect(point)
        })

      return marker
    })

    return () => {
      markers.forEach((marker) => {
        marker.remove()
      })
    }
  }, [points, onSelect])

  return (
    <div
      ref={mapContainerRef}
      className="h-full w-full"
    />
  )
}