import type { FormEvent, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { categories, type Point, type Project } from './data'

export function Header({ authenticated = false }: { authenticated?: boolean }) {
  return <header className="border-b border-line bg-surface"><div className="shell flex h-16 items-center justify-between gap-4"><Link to={authenticated ? '/projects' : '/'} className="font-heading text-lg font-bold tracking-tight text-brand">Fieldwork GIS</Link><nav className="flex items-center gap-3 text-sm" aria-label="メインナビゲーション">{authenticated ? <><span className="hidden text-muted sm:inline">山田 太郎さん</span><Link className="button-secondary" to="/">ログアウト</Link></> : <><Link className="text-link" to="/login">ログイン</Link><Link className="button-primary" to="/signup">新規登録</Link></>}</nav></div></header>
}

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><div><p className="mb-2 text-xs font-medium text-muted">{project.createdAt.replaceAll('-', '/')} 作成</p><h2 className="font-heading text-lg font-bold text-ink">{project.name}</h2><p className="mt-2 text-sm leading-6 text-muted">{project.description}</p></div><div className="mt-5 flex flex-wrap items-center gap-4 border-t border-line pt-4 text-sm"><Link className="button-primary" to={`/projects/${project.id}`}>地図を開く</Link><Link className="text-link" to={`/projects/${project.id}/edit`}>編集</Link><button className="text-danger" type="button">削除</button></div></article>
}

export function EmptyState({ title, description, action, to }: { title: string; description: string; action?: string; to?: string }) {
  return <div className="rounded-md border border-dashed border-line bg-soft px-6 py-12 text-center"><p className="font-heading font-bold text-ink">{title}</p><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>{action && to && <Link className="button-primary mt-5 inline-flex" to={to}>{action}</Link>}</div>
}

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate()
  function submit(event: FormEvent) { event.preventDefault(); navigate('/projects') }
  return <form className="auth-panel" onSubmit={submit}><h1 className="font-heading text-2xl font-bold text-ink">{signup ? 'アカウント作成' : 'ログイン'}</h1><p className="mt-2 text-sm text-muted">{signup ? '調査記録を始めるための情報を入力してください。' : '調査プロジェクトにアクセスします。'}</p><div className="mt-7 flex flex-col gap-5">{signup && <Field label="表示名" name="name" placeholder="山田 太郎" error="" />}<Field label="メールアドレス" name="email" type="email" placeholder="student@example.ac.jp" /><Field label="パスワード" name="password" type="password" placeholder="8文字以上" />{signup && <Field label="パスワード確認" name="password-confirm" type="password" placeholder="もう一度入力" />}</div><button className="button-primary mt-7 w-full" type="submit">{signup ? 'アカウントを作成' : 'ログインする'}</button><p className="mt-6 text-center text-sm text-muted">{signup ? 'すでにアカウントをお持ちの方' : 'アカウントをお持ちでない方'} → <Link className="text-link" to={signup ? '/login' : '/signup'}>{signup ? 'ログイン' : '新規登録'}</Link></p></form>
}

export function Field({ label, name, type = 'text', placeholder, error, defaultValue, required = true }: { label: string; name: string; type?: string; placeholder?: string; error?: string; defaultValue?: string; required?: boolean }) {
  return <label className="field-label">{label}{required && <span className="ml-1 text-danger" aria-hidden="true">*</span>}<input className="field-input" name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} />{error && <span className="field-error">{error}</span>}</label>
}

export function ProjectForm({ editing = false }: { editing?: boolean }) {
  const navigate = useNavigate()
  return <form className="form-panel" onSubmit={(event) => { event.preventDefault(); navigate('/projects/1') }}><Field label="プロジェクト名" name="project-name" defaultValue={editing ? '○○商店街 空き店舗調査' : ''} placeholder="例：駅前商店街 空き店舗調査" /><label className="field-label">説明 <span className="font-normal text-muted">（任意）</span><textarea className="field-input min-h-32 resize-y" name="description" defaultValue={editing ? '商店街の空き店舗の分布を調査する' : ''} placeholder="調査の目的や対象地域を入力" /></label><div className="flex justify-end gap-3 border-t border-line pt-6"><button className="button-secondary" type="button" onClick={() => navigate('/projects')}>キャンセル</button><button className="button-primary" type="submit">{editing ? '変更を保存' : '作成する'}</button></div></form>
}

export function CategoryFilter({ selected, onChange }: { selected: string[]; onChange: (value: string[]) => void }) {
  return <fieldset><legend className="panel-title">表示するカテゴリ</legend><div className="mt-3 flex flex-col gap-2.5">{categories.map(category => <label className="flex cursor-pointer items-center gap-3 text-sm text-ink" key={category}><input className="checkbox" type="checkbox" checked={selected.includes(category)} onChange={() => onChange(selected.includes(category) ? selected.filter(item => item !== category) : [...selected, category])} />{category}</label>)}</div></fieldset>
}

export function PointList({ items, selectedId, onSelect }: { items: Point[]; selectedId?: string; onSelect: (point: Point) => void }) {
  return <section className="min-h-0"><h2 className="panel-title">登録地点 <span className="font-normal text-muted">({items.length})</span></h2>{items.length ? <div className="mt-3 flex max-h-72 flex-col overflow-y-auto border-y border-line">{items.map(point => <button key={point.id} type="button" onClick={() => onSelect(point)} className={`point-row ${selectedId === point.id ? 'bg-selected' : ''}`}><span className="font-medium text-ink">{point.name}</span><span className="mt-1 text-xs text-muted">{point.category} / {point.surveyedAt}</span></button>)}</div> : <p className="mt-3 text-sm leading-6 text-muted">まだ地点が登録されていません。<br />「地点を追加」から登録しましょう。</p>}</section>
}

export function PointForm({ point, title, onCancel, onSave, onRelocate }: { point?: Point; title: string; onCancel: () => void; onSave: () => void; onRelocate?: () => void }) {
  return <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onSave() }}><h2 className="font-heading text-xl font-bold text-ink">{title}</h2><Field label="地点名" name="point-name" defaultValue={point?.name} placeholder="例：○○商店" /><label className="field-label">カテゴリ <span className="text-danger">*</span><select className="field-input" defaultValue={point?.category ?? ''} required><option value="" disabled>選択してください</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label><Field label="調査日" name="surveyed-at" type="date" defaultValue={point?.surveyedAt ?? '2026-08-30'} /><label className="field-label">メモ <span className="font-normal text-muted">（任意）</span><textarea className="field-input min-h-24 resize-y" defaultValue={point?.memo} placeholder="現地で気づいたこと" /></label><div><p className="field-label">位置</p><div className="mt-2 grid grid-cols-2 gap-2 rounded-md bg-soft p-3 text-xs"><span><b className="block text-muted">緯度</b>{point?.latitude ?? 35.6812}</span><span><b className="block text-muted">経度</b>{point?.longitude ?? 139.7671}</span></div>{onRelocate && <button className="text-link mt-3 text-sm" type="button" onClick={onRelocate}>位置を変更</button>}</div><div className="flex gap-3 border-t border-line pt-5"><button className="button-secondary flex-1" type="button" onClick={onCancel}>キャンセル</button><button className="button-primary flex-1" type="submit">{point ? '変更を保存' : '登録する'}</button></div></form>
}

export function MapPlaceholder({ selected, picking, onMapClick, onSelect, children }: { selected?: Point; picking: boolean; onMapClick: () => void; onSelect: (point: Point) => void; children?: ReactNode }) {
  const mockPoints = [{ ...selected, id: selected?.id ?? '1', name: selected?.name ?? '○○商店', category: selected?.category ?? '空き店舗', memo: selected?.memo ?? '', surveyedAt: selected?.surveyedAt ?? '', latitude: 0, longitude: 0 } as Point]
  return <div className={`map-area ${picking ? 'cursor-crosshair' : ''}`} onClick={picking ? onMapClick : undefined} role="region" aria-label="地図プレースホルダー"><div className="map-label">MapLibre Map Area <span>（実装予定）</span></div><div className="road road-a" /><div className="road road-b" /><div className="road road-c" /><button type="button" aria-label="○○商店の地点" className="map-pin pin-a" onClick={(e) => { e.stopPropagation(); onSelect(mockPoints[0]) }} /><button type="button" aria-label="△△公園の地点" className="map-pin pin-b" onClick={(e) => { e.stopPropagation(); onSelect({ ...mockPoints[0], id: '2', name: '△△公園', category: '公共施設', memo: 'ベンチとトイレあり' }) }} />{picking && <div className="temporary-pin" aria-label="仮マーカー" />}{children}</div>
}
