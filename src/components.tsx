import type { FormEvent, ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field as FormField, FieldGroup, FieldLabel, FieldLegend, FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { categories, type Point, type Project } from './data'

const linkButton = (variant: 'default' | 'outline' | 'ghost' | 'link' = 'default', size: 'default' | 'sm' | 'lg' = 'default') => buttonVariants({ variant, size })

export function Header({ authenticated = false }: { authenticated?: boolean }) {
  return <header className="border-b bg-card"><div className="shell flex h-16 items-center justify-between gap-4"><Link to={authenticated ? '/projects' : '/'} className="font-heading text-lg font-semibold tracking-tight text-primary">Fieldwork GIS</Link><nav className="flex items-center gap-2" aria-label="メインナビゲーション">{authenticated ? <><span className="hidden text-sm text-muted-foreground sm:inline">山田 太郎さん</span><Link className={linkButton('outline')} to="/">ログアウト</Link></> : <><Link className={linkButton('ghost')} to="/login">ログイン</Link><Link className={linkButton()} to="/signup">新規登録</Link></>}</nav></div></header>
}

export function DeleteDialog({ trigger, title, description, onDelete }: { trigger: ReactNode; title: string; description: string; onDelete?: () => void }) {
  return <AlertDialog><AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>{trigger}</AlertDialogTrigger><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>{title}</AlertDialogTitle><AlertDialogDescription>{description}</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>キャンセル</AlertDialogCancel><AlertDialogAction variant="destructive" onClick={onDelete}>削除する</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog>
}

export function ProjectCard({ project }: { project: Project }) {
  return <Card className="min-h-52"><CardHeader><CardDescription>{project.createdAt.replaceAll('-', '/')} 作成</CardDescription><CardTitle className="text-lg">{project.name}</CardTitle></CardHeader><CardContent className="flex-1"><p className="leading-6 text-muted-foreground">{project.description}</p></CardContent><CardFooter className="flex flex-wrap gap-2"><Link className={linkButton()} to={`/projects/${project.id}`}>地図を開く</Link><Link className={linkButton('outline')} to={`/projects/${project.id}/edit`}>編集</Link><DeleteDialog trigger="削除" title="プロジェクトを削除しますか？" description="この操作は取り消せません。登録済みの地点も削除されます。" /></CardFooter></Card>
}

export function EmptyState({ title, description, action, to }: { title: string; description: string; action?: string; to?: string }) {
  return <Card className="border-dashed py-12 text-center"><CardHeader><CardTitle>{title}</CardTitle><CardDescription className="mx-auto max-w-md leading-6">{description}</CardDescription></CardHeader>{action && to && <CardFooter className="justify-center border-0 bg-transparent"><Link className={linkButton()} to={to}>{action}</Link></CardFooter>}</Card>
}

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate()
  function submit(event: FormEvent) { event.preventDefault(); navigate('/projects') }
  return <Card><form onSubmit={submit}><CardHeader><CardTitle className="text-2xl">{signup ? 'アカウント作成' : 'ログイン'}</CardTitle><CardDescription>{signup ? '調査記録を始めるための情報を入力してください。' : '調査プロジェクトにアクセスします。'}</CardDescription></CardHeader><CardContent><FieldGroup>{signup && <Field label="表示名" name="name" placeholder="山田 太郎" />}<Field label="メールアドレス" name="email" type="email" placeholder="student@example.ac.jp" /><Field label="パスワード" name="password" type="password" placeholder="8文字以上" />{signup && <Field label="パスワード確認" name="password-confirm" type="password" placeholder="もう一度入力" />}</FieldGroup></CardContent><CardFooter className="flex flex-col gap-4"><Button className="w-full" size="lg" type="submit">{signup ? 'アカウントを作成' : 'ログインする'}</Button><p className="text-center text-sm text-muted-foreground">{signup ? 'すでにアカウントをお持ちの方' : 'アカウントをお持ちでない方'} → <Link className="font-medium text-primary hover:underline" to={signup ? '/login' : '/signup'}>{signup ? 'ログイン' : '新規登録'}</Link></p></CardFooter></form></Card>
}

export function Field({ label, name, type = 'text', placeholder, error, defaultValue, required = true }: { label: string; name: string; type?: string; placeholder?: string; error?: string; defaultValue?: string; required?: boolean }) {
  return <FormField data-invalid={error ? true : undefined}><FieldLabel htmlFor={name}>{label}{required && <span className="text-destructive" aria-hidden="true">*</span>}</FieldLabel><Input id={name} name={name} type={type} placeholder={placeholder} defaultValue={defaultValue} required={required} aria-invalid={error ? true : undefined} />{error && <p className="text-sm text-destructive" role="alert">{error}</p>}</FormField>
}

export function ProjectForm({ editing = false }: { editing?: boolean }) {
  const navigate = useNavigate()
  return <Card><form onSubmit={(event) => { event.preventDefault(); navigate('/projects/1') }}><CardContent><FieldGroup><Field label="プロジェクト名" name="project-name" defaultValue={editing ? '○○商店街 空き店舗調査' : ''} placeholder="例：駅前商店街 空き店舗調査" /><FormField><FieldLabel htmlFor="description">説明 <span className="font-normal text-muted-foreground">（任意）</span></FieldLabel><Textarea id="description" name="description" className="min-h-32 resize-y" defaultValue={editing ? '商店街の空き店舗の分布を調査する' : ''} placeholder="調査の目的や対象地域を入力" /></FormField></FieldGroup></CardContent><CardFooter className="justify-end gap-2"><Button variant="outline" type="button" onClick={() => navigate('/projects')}>キャンセル</Button><Button type="submit">{editing ? '変更を保存' : '作成する'}</Button></CardFooter></form></Card>
}

export function CategoryFilter({ selected, onChange }: { selected: string[]; onChange: (value: string[]) => void }) {
  return <FieldSet><FieldLegend variant="label">表示するカテゴリ</FieldLegend><FieldGroup data-slot="checkbox-group">{categories.map((category, index) => { const id = `category-${index}`; return <FormField key={category} orientation="horizontal"><Checkbox id={id} checked={selected.includes(category)} onCheckedChange={() => onChange(selected.includes(category) ? selected.filter(item => item !== category) : [...selected, category])} /><FieldLabel htmlFor={id}>{category}</FieldLabel></FormField> })}</FieldGroup></FieldSet>
}

export function PointList({ items, selectedId, onSelect }: { items: Point[]; selectedId?: string; onSelect: (point: Point) => void }) {
  return <section className="min-h-0"><h2 className="text-sm font-medium">登録地点 <span className="font-normal text-muted-foreground">({items.length})</span></h2>{items.length ? <div className="mt-3 flex max-h-72 flex-col overflow-y-auto rounded-lg border">{items.map(point => <Button key={point.id} type="button" variant={selectedId === point.id ? 'secondary' : 'ghost'} onClick={() => onSelect(point)} className="h-auto justify-start rounded-none border-b px-3 py-3 text-left last:border-b-0"><span className="flex flex-col items-start gap-1"><span>{point.name}</span><span className="text-xs font-normal text-muted-foreground">{point.category} / {point.surveyedAt}</span></span></Button>)}</div> : <p className="mt-3 text-sm leading-6 text-muted-foreground">まだ地点が登録されていません。<br />「地点を追加」から登録しましょう。</p>}</section>
}

export function PointForm({ point, title, onCancel, onSave, onRelocate }: { point?: Point; title: string; onCancel: () => void; onSave: () => void; onRelocate?: () => void }) {
  const items = categories.map(value => ({ label: value, value }))
  return <form className="flex flex-col gap-5" onSubmit={(e) => { e.preventDefault(); onSave() }}><h2 className="font-heading text-xl font-semibold">{title}</h2><FieldGroup><Field label="地点名" name="point-name" defaultValue={point?.name} placeholder="例：○○商店" /><FormField><FieldLabel>カテゴリ <span className="text-destructive">*</span></FieldLabel><Select items={items} defaultValue={point?.category}><SelectTrigger className="w-full"><SelectValue placeholder="選択してください" /></SelectTrigger><SelectContent><SelectGroup>{items.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectGroup></SelectContent></Select></FormField><Field label="調査日" name="surveyed-at" type="date" defaultValue={point?.surveyedAt ?? '2026-08-30'} /><FormField><FieldLabel htmlFor="point-memo">メモ <span className="font-normal text-muted-foreground">（任意）</span></FieldLabel><Textarea id="point-memo" className="min-h-24 resize-y" defaultValue={point?.memo} placeholder="現地で気づいたこと" /></FormField></FieldGroup><div><p className="text-sm font-medium">位置</p><div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-muted p-3 text-xs"><span><b className="block text-muted-foreground">緯度</b>{point?.latitude ?? 35.6812}</span><span><b className="block text-muted-foreground">経度</b>{point?.longitude ?? 139.7671}</span></div>{onRelocate && <Button className="mt-2" variant="link" type="button" onClick={onRelocate}>位置を変更</Button>}</div><div className="flex gap-2 border-t pt-5"><Button className="flex-1" variant="outline" type="button" onClick={onCancel}>キャンセル</Button><Button className="flex-1" type="submit">{point ? '変更を保存' : '登録する'}</Button></div></form>
}

export function MapPlaceholder({ selected, picking, onMapClick, onSelect, children }: { selected?: Point; picking: boolean; onMapClick: () => void; onSelect: (point: Point) => void; children?: ReactNode }) {
  const mockPoint = { ...selected, id: selected?.id ?? '1', name: selected?.name ?? '○○商店', category: selected?.category ?? '空き店舗', memo: selected?.memo ?? '', surveyedAt: selected?.surveyedAt ?? '', latitude: 0, longitude: 0 } as Point
  return <div className={cn('map-area', picking && 'cursor-crosshair')} onClick={picking ? onMapClick : undefined} role="region" aria-label="地図プレースホルダー"><div className="map-label">MapLibre Map Area <span>（実装予定）</span></div><div className="road road-a" /><div className="road road-b" /><div className="road road-c" /><button type="button" aria-label="○○商店の地点" className="map-pin pin-a" onClick={(e) => { e.stopPropagation(); onSelect(mockPoint) }} /><button type="button" aria-label="△△公園の地点" className="map-pin pin-b" onClick={(e) => { e.stopPropagation(); onSelect({ ...mockPoint, id: '2', name: '△△公園', category: '公共施設', memo: 'ベンチとトイレあり' }) }} />{picking && <div className="temporary-pin" aria-label="仮マーカー" />}{children}</div>
}
