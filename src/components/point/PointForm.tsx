import { Button } from '@/components/ui/button'
import {
  Field as FormField,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

import { Field } from '@/components/common/Field'
import { categories } from '@/mocks/data'
import type { Point } from '@/types/point'

export function PointForm({
  point,
  title,
  onCancel,
  onSave,
  onRelocate,
}: {
  point?: Point
  title: string
  onCancel: () => void
  onSave: () => void
  onRelocate?: () => void
}) {
  const items = categories.map((value) => ({
    label: value,
    value,
  }))

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={(e) => {
        e.preventDefault()
        onSave()
      }}
    >
      <h2 className="font-heading text-xl font-semibold">
        {title}
      </h2>

      <FieldGroup>
        <Field
          label="地点名"
          name="point-name"
          defaultValue={point?.name}
          placeholder="例：○○商店"
        />

        <FormField>
          <FieldLabel>
            カテゴリ
            <span className="text-destructive">*</span>
          </FieldLabel>

          <Select items={items} defaultValue={point?.category}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                {items.map((item) => (
                  <SelectItem
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormField>

        <Field
          label="調査日"
          name="surveyed-at"
          type="date"
          defaultValue={point?.surveyedAt ?? '2026-08-30'}
        />

        <FormField>
          <FieldLabel htmlFor="point-memo">
            メモ
            <span className="font-normal text-muted-foreground">
              （任意）
            </span>
          </FieldLabel>

          <Textarea
            id="point-memo"
            className="min-h-24 resize-y"
            defaultValue={point?.memo}
            placeholder="現地で気づいたこと"
          />
        </FormField>
      </FieldGroup>

      <div>
        <p className="text-sm font-medium">位置</p>

        <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-muted p-3 text-xs">
          <span>
            <b className="block text-muted-foreground">
              緯度
            </b>
            {point?.latitude ?? 35.6812}
          </span>

          <span>
            <b className="block text-muted-foreground">
              経度
            </b>
            {point?.longitude ?? 139.7671}
          </span>
        </div>

        {onRelocate && (
          <Button
            className="mt-2"
            variant="link"
            type="button"
            onClick={onRelocate}
          >
            位置を変更
          </Button>
        )}
      </div>

      <div className="flex gap-2 border-t pt-5">
        <Button
          className="flex-1"
          variant="outline"
          type="button"
          onClick={onCancel}
        >
          キャンセル
        </Button>

        <Button
          className="flex-1"
          type="submit"
        >
          {point ? '変更を保存' : '登録する'}
        </Button>
      </div>
    </form>
  )
}