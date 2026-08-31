import { useState } from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { AuthForm, CategoryFilter, DeleteDialog, EmptyState, Header, MapPlaceholder, PointForm, PointList, ProjectCard, ProjectForm } from './components'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { categories, points, projects, } from './mocks/data'
import type { Point } from './types/point'

function HomePage() {
  const features = [
    ['調査地点を記録', '地図をクリックして、店舗・空き店舗・公共施設などを登録できます。'],
    ['地図で分布を確認', '登録地点を地図上で確認し、カテゴリごとに表示を切り替えられます。'],
    ['地域の特徴を考える', '地点の分布を見ながら、なぜその場所に集中しているのかを考察できます。'],
  ]
  return <><Header /><main><section className="border-b bg-card"><div className="shell grid items-center gap-12 py-16 md:grid-cols-[1.05fr_.95fr] md:py-24"><div><p className="mb-4 text-sm font-semibold tracking-widest text-primary">FIELDWORK × WEB GIS</p><h1 className="max-w-2xl font-heading text-4xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">フィールドワークの記録を、地図で振り返ろう</h1><p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">調査した店舗や施設などを地図に登録し、分布や地域の特徴を確認できる学習用WebGISです。</p><div className="mt-8 flex flex-wrap items-center gap-3"><Link className={buttonVariants({ size: 'lg' })} to="/signup">無料で始める</Link><Link className={buttonVariants({ variant: 'link', size: 'lg' })} to="/login">ログイン</Link></div></div><div className="map-area min-h-80" aria-label="地図のイメージ"><div className="map-label">調査地点の分布イメージ</div><div className="road road-a"/><div className="road road-b"/><span className="map-pin pin-a"/><span className="map-pin pin-b"/></div></div></section><section className="shell py-16"><p className="text-sm font-semibold text-primary">できること</p><h2 className="mt-2 font-heading text-2xl font-semibold text-balance">観察した事実を、地域の理解につなげる</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{features.map(([title, description]) => <Card key={title}><CardHeader><CardTitle>{title}</CardTitle><CardDescription className="leading-6">{description}</CardDescription></CardHeader></Card>)}</div></section></main></>
}

function AuthPage({ signup = false }: { signup?: boolean }) { return <><Header /><main className="shell flex min-h-[calc(100vh-64px)] items-start justify-center py-12 md:items-center md:py-16"><div className="w-full max-w-md"><AuthForm signup={signup} /></div></main></> }

function ProjectsPage() {
  const [state, setState] = useState<'list' | 'empty' | 'loading'>('list')
  return <><Header authenticated /><main className="shell py-10 md:py-14"><div className="flex flex-wrap items-end justify-between gap-5"><div><h1 className="font-heading text-3xl font-semibold">調査プロジェクト</h1><p className="mt-2 text-sm text-muted-foreground">フィールドワークごとに調査地点を管理できます。</p></div><Link className={buttonVariants()} to="/projects/new">新しいプロジェクト</Link></div><div className="mt-6 flex justify-end gap-1"><Button variant="ghost" size="xs" onClick={() => setState('list')}>一覧</Button><Button variant="ghost" size="xs" onClick={() => setState('empty')}>空状態</Button><Button variant="ghost" size="xs" onClick={() => setState('loading')}>読込中</Button></div>{state === 'empty' ? <div className="mt-6"><EmptyState title="まだ調査プロジェクトがありません。" description="まずはフィールドワーク用のプロジェクトを作成してみましょう。" action="最初のプロジェクトを作成" to="/projects/new" /></div> : state === 'loading' ? <div className="mt-6 grid gap-5 md:grid-cols-2">{[1, 2].map(item => <Card key={item}><CardHeader><Skeleton className="h-4 w-24"/><Skeleton className="h-6 w-2/3"/></CardHeader><CardContent><Skeleton className="h-4 w-full"/><Skeleton className="mt-2 h-4 w-3/4"/></CardContent></Card>)}</div> : <div className="mt-6 grid gap-5 md:grid-cols-2">{projects.map(project => <ProjectCard key={project.id} project={project} />)}</div>}</main></>
}

function ProjectFormPage({ editing = false }: { editing?: boolean }) { return <><Header authenticated /><main className="shell max-w-3xl py-10 md:py-14"><Link className={buttonVariants({ variant: 'link' })} to="/projects">プロジェクト一覧へ</Link><h1 className="mt-5 font-heading text-3xl font-semibold">{editing ? '調査プロジェクトを編集' : '新しい調査プロジェクト'}</h1><p className="mt-2 text-sm text-muted-foreground">調査の目的が分かる名前と説明を入力してください。</p><div className="mt-8"><ProjectForm editing={editing} /></div></main></> }

function PointPopup({ point, onEdit, onDelete, onClose }: { point: Point; onEdit: () => void; onDelete: () => void; onClose: () => void }) {
  return <Card className="popup"><CardHeader className="grid-cols-[1fr_auto]"><div><CardTitle>{point.name}</CardTitle><CardDescription>{point.category} / {point.surveyedAt.replaceAll('-', '/')}</CardDescription></div><Button variant="ghost" size="icon-sm" aria-label="閉じる" type="button" onClick={onClose}>×</Button></CardHeader><CardContent><p className="text-sm leading-6">{point.memo}</p><div className="mt-4 flex gap-2"><Button variant="outline" size="sm" onClick={onEdit}>編集</Button><DeleteDialog trigger="削除" title="この地点を削除しますか？" description="この操作は取り消せません。地点の記録が削除されます。" onDelete={onDelete}/></div></CardContent></Card>
}

function MapPage() {
  const { id } = useParams()
  const project = projects.find(item => item.id === id) ?? projects[0]
  const [mode, setMode] = useState<'list'|'pick'|'create'|'edit'>('list')
  const [selected, setSelected] = useState<Point | undefined>()
  const [filters, setFilters] = useState(categories)
  const [notice, setNotice] = useState('')
  const [pointItems, setPointItems] = useState(points)
  const filtered = pointItems.filter(point => filters.includes(point.category))
  function save(message: string) { setMode('list'); setSelected(undefined); setNotice(message); window.setTimeout(() => setNotice(''), 2600) }
  function selectPoint(point: Point) { if (mode !== 'pick') { setSelected(pointItems.find(item => item.id === point.id) ?? point); setMode('list') } }
  return <><Header authenticated /><main className="flex min-h-[calc(100vh-64px)] flex-col"><div className="border-b bg-card"><div className="shell flex flex-wrap items-center justify-between gap-4 py-4"><div><Link className="text-sm font-medium text-primary hover:underline" to="/projects">プロジェクト一覧へ戻る</Link><h1 className="mt-1 font-heading text-xl font-semibold">{project.name}</h1></div><Button className="md:hidden" onClick={() => { setMode('pick'); setSelected(undefined) }}>地点を追加</Button></div></div>{mode === 'pick' && <div className="bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground">地図上で登録したい場所をクリックしてください</div>}{notice && <div className="fixed right-4 top-20 z-20 rounded-lg border bg-card px-4 py-3 text-sm font-medium text-primary shadow-lg" role="status">{notice}</div>}<div className="flex flex-1 flex-col md:grid md:grid-cols-[340px_minmax(0,1fr)]"><aside className="order-2 border-r bg-card p-5 md:order-1 md:max-h-[calc(100vh-129px)] md:overflow-y-auto">{mode === 'create' ? <PointForm title="地点を登録" onCancel={() => setMode('list')} onSave={() => save('地点を登録しました')} /> : mode === 'edit' && selected ? <PointForm title="地点を編集" point={selected} onCancel={() => setMode('list')} onSave={() => save('地点情報を更新しました')} onRelocate={() => { setMode('pick'); setNotice('地図上で新しい位置をクリックしてください') }} /> : <div className="flex flex-col gap-6"><CategoryFilter selected={filters} onChange={setFilters} /><Button className="hidden w-full md:inline-flex" onClick={() => { setMode('pick'); setSelected(undefined) }}>地点を追加</Button><PointList items={filtered} selectedId={selected?.id} onSelect={selectPoint} /><p className="border-t pt-4 text-xs leading-5 text-muted-foreground">地点を選ぶと地図上に詳細が表示されます。</p></div>}</aside><section className="order-1 min-w-0 bg-muted p-3 md:order-2 md:p-5"><MapPlaceholder selected={selected} picking={mode === 'pick'} onMapClick={() => setMode('create')} onSelect={selectPoint}>{selected && mode === 'list' && <PointPopup point={selected} onClose={() => setSelected(undefined)} onEdit={() => setMode('edit')} onDelete={() => { setPointItems(items => items.filter(item => item.id !== selected.id)); save('地点を削除しました') }} />}</MapPlaceholder></section></div></main></>
}

export default function App() { return <Routes><Route path="/" element={<HomePage />} /><Route path="/login" element={<AuthPage />} /><Route path="/signup" element={<AuthPage signup />} /><Route path="/projects" element={<ProjectsPage />} /><Route path="/projects/new" element={<ProjectFormPage />} /><Route path="/projects/:id/edit" element={<ProjectFormPage editing />} /><Route path="/projects/:id" element={<MapPage />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes> }
