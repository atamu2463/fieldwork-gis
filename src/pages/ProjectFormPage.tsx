import {
  Link,
  Navigate,
  useParams,
} from 'react-router-dom'

import { Header } from '@/components/layout/Header'
import { ProjectForm } from '@/components/project/ProjectForm'
import { buttonVariants } from '@/components/ui/button'
import { projects } from '@/mocks/data'

export function ProjectFormPage({
  
  editing = false,
}: {
  editing?: boolean
}) {
  const { id } = useParams()

  const project = editing
    ? projects.find((item) => item.id === id)
    : undefined

  if (editing && !project) {
    return <Navigate to="/projects" replace />
  }

  return (
    <>
      <Header authenticated />

      <main className="shell max-w-3xl py-10 md:py-14">
        <Link
          className={buttonVariants({ variant: 'link' })}
          to="/projects"
        >
          プロジェクト一覧へ
        </Link>

        <h1 className="mt-5 font-heading text-3xl font-semibold">
          {editing
            ? '調査プロジェクトを編集'
            : '新しい調査プロジェクト'}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          調査の目的が分かる名前と説明を入力してください。
        </p>

        <div className="mt-8">
          <ProjectForm
           editing={editing}
           project={project}
          />
        </div>
      </main>
    </>
  )
}