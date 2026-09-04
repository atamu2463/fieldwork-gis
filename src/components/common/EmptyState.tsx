import { Link } from 'react-router-dom'

import { buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function EmptyState({
  title,
  description,
  action,
  to,
}: {
  title: string
  description: string
  action?: string
  to?: string
}) {
  return (
    <Card className="border-dashed py-12 text-center">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="mx-auto max-w-md leading-6">
          {description}
        </CardDescription>
      </CardHeader>

      {action && to && (
        <CardFooter className="justify-center border-0 bg-transparent">
          <Link className={buttonVariants()} to={to}>
            {action}
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}