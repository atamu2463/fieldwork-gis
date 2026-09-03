import { useState } from 'react'
import { Link } from 'react-router-dom'

import { EmptyState } from '@/components/common/EmptyState'
import { Header } from '@/components/layout/Header'
import { ProjectCard } from '@/components/project/ProjectCard'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { projects } from '@/mocks/data'

export function ProjectsPage() {
  const [state, setState] = useState<'list' | 'empty' | 'loading'>('list')

  return (
    <>
      <Header authenticated />

      <main className="shell py-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <h1 className="font-heading text-3xl font-semibold">
              調査プロジェクト
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              フィールドワークごとに調査地点を管理できます。
            </p>
          </div>

          <Link
            className={buttonVariants()}
            to="/projects/new"
          >
            新しいプロジェクト
          </Link>
        </div>

        <div className="mt-6 flex justify-end gap-1">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => setState('list')}
          >
            一覧
          </Button>

          <Button
            variant="ghost"
            size="xs"
            onClick={() => setState('empty')}
          >
            空状態
          </Button>

          <Button
            variant="ghost"
            size="xs"
            onClick={() => setState('loading')}
          >
            読込中
          </Button>
        </div>

        {state === 'empty' ? (
          <div className="mt-6">
            <EmptyState
              title="まだ調査プロジェクトがありません。"
              description="まずはフィールドワーク用のプロジェクトを作成してみましょう。"
              action="最初のプロジェクトを作成"
              to="/projects/new"
            />
          </div>
        ) : state === 'loading' ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[1, 2].map((item) => (
              <Card key={item}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>

                <CardContent>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="mt-2 h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
              />
            ))}
          </div>
        )}
      </main>
    </>
  )
}