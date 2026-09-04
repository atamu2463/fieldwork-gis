import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DeleteDialog } from '@/components/common/DeleteDialog'
import type { Point } from '@/types/point'

export const PointPopup = ({ point, onEdit, onDelete, onClose }: { point: Point; onEdit: () => void; onDelete: () => void; onClose: () => void }) => {
  return (
    <Card className="popup">
      <CardHeader className="grid-cols-[1fr_auto]">
        <div>
          <CardTitle>{point.name}</CardTitle>
          <CardDescription>
            {point.category} / {point.surveyedAt.replaceAll('-', '/')}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon-sm" aria-label="閉じる" type="button" onClick={onClose}>
          ×
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6">{point.memo}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            編集
          </Button>
          <DeleteDialog
            trigger="削除"
            title="この地点を削除しますか？"
            description="この操作は取り消せません。地点の記録が削除されます。"
            onDelete={onDelete}
          />
        </div>
      </CardContent>
    </Card>
  );
};