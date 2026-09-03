import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import {
  Field as FormField,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

import { Field } from '@/components/common/Field'

export function ProjectForm({ editing = false }: { editing?: boolean }) {
  const navigate = useNavigate()
  return <Card><form onSubmit={(event) => { event.preventDefault(); navigate('/projects/1') }}><CardContent><FieldGroup><Field label="プロジェクト名" name="project-name" defaultValue={editing ? '○○商店街 空き店舗調査' : ''} placeholder="例：駅前商店街 空き店舗調査" /><FormField><FieldLabel htmlFor="description">説明 <span className="font-normal text-muted-foreground">（任意）</span></FieldLabel><Textarea id="description" name="description" className="min-h-32 resize-y" defaultValue={editing ? '商店街の空き店舗の分布を調査する' : ''} placeholder="調査の目的や対象地域を入力" /></FormField></FieldGroup></CardContent><CardFooter className="justify-end gap-2"><Button variant="outline" type="button" onClick={() => navigate('/projects')}>キャンセル</Button><Button type="submit">{editing ? '変更を保存' : '作成する'}</Button></CardFooter></form></Card>
}