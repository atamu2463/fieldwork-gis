import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FieldGroup } from '@/components/ui/field'

import { Field } from '@/components/common/Field'

export function AuthForm({ signup = false }: { signup?: boolean }) {
  const navigate = useNavigate()
  function submit(event: FormEvent) { event.preventDefault(); navigate('/projects') }
  return <Card><form onSubmit={submit}><CardHeader><CardTitle className="text-2xl">{signup ? 'アカウント作成' : 'ログイン'}</CardTitle><CardDescription>{signup ? '調査記録を始めるための情報を入力してください。' : '調査プロジェクトにアクセスします。'}</CardDescription></CardHeader><CardContent><FieldGroup>{signup && <Field label="表示名" name="name" placeholder="山田 太郎" />}<Field label="メールアドレス" name="email" type="email" placeholder="student@example.ac.jp" /><Field label="パスワード" name="password" type="password" placeholder="8文字以上" />{signup && <Field label="パスワード確認" name="password-confirm" type="password" placeholder="もう一度入力" />}</FieldGroup></CardContent><CardFooter className="flex flex-col gap-4"><Button className="w-full" size="lg" type="submit">{signup ? 'アカウントを作成' : 'ログインする'}</Button><p className="text-center text-sm text-muted-foreground">{signup ? 'すでにアカウントをお持ちの方' : 'アカウントをお持ちでない方'} → <Link className="font-medium text-primary hover:underline" to={signup ? '/login' : '/signup'}>{signup ? 'ログイン' : '新規登録'}</Link></p></CardFooter></form></Card>
}