import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DeleteDialog } from '@/components/common/DeleteDialog'
import type { Project } from '@/types/project'

export function ProjectCard({ project }: { project: Project }) {
  return <Card className="min-h-52"><CardHeader><CardDescription>{project.createdAt.replaceAll('-', '/')} 作成</CardDescription><CardTitle className="text-lg">{project.name}</CardTitle></CardHeader><CardContent className="flex-1"><p className="leading-6 text-muted-foreground">{project.description}</p></CardContent><CardFooter className="flex flex-wrap gap-2"><Link className={buttonVariants()} to={`/projects/${project.id}`}>地図を開く</Link><Link className={buttonVariants({ variant: "outline" })} to={`/projects/${project.id}/edit`}>編集</Link><DeleteDialog trigger="削除" title="プロジェクトを削除しますか？" description="この操作は取り消せません。登録済みの地点も削除されます。" /></CardFooter></Card>
}