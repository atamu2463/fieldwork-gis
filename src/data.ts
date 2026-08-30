export type Project = { id: string; name: string; description: string; createdAt: string }
export type Point = { id: string; name: string; category: string; memo: string; surveyedAt: string; latitude: number; longitude: number }

export const projects: Project[] = [
  { id: '1', name: '○○商店街 空き店舗調査', description: '商店街の空き店舗の分布を調査する', createdAt: '2026-08-20' },
  { id: '2', name: '△△駅周辺 公共施設調査', description: '駅周辺の公共施設を記録する', createdAt: '2026-08-10' },
]

export const points: Point[] = [
  { id: '1', name: '○○商店', category: '空き店舗', memo: 'シャッターが閉まっていた', surveyedAt: '2026-08-30', latitude: 35.6812, longitude: 139.7671 },
  { id: '2', name: '△△公園', category: '公共施設', memo: 'ベンチとトイレあり', surveyedAt: '2026-08-30', latitude: 35.682, longitude: 139.768 },
]

export const categories = ['空き店舗', '営業中店舗', '公共施設', 'バス停', 'その他']
