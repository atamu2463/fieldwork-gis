import { Checkbox } from '@/components/ui/checkbox'
import {
  Field as FormField,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field'

import { categories } from '@/mocks/data'

export function CategoryFilter({
  selected,
  onChange,
}: {
  selected: string[]
  onChange: (value: string[]) => void
}) {
  return (
    <FieldSet>
      <FieldLegend variant="label">
        表示するカテゴリ
      </FieldLegend>

      <FieldGroup data-slot="checkbox-group">
        {categories.map((category, index) => {
          const id = `category-${index}`

          return (
            <FormField
              key={category}
              orientation="horizontal"
            >
              <Checkbox
                id={id}
                checked={selected.includes(category)}
                onCheckedChange={() =>
                  onChange(
                    selected.includes(category)
                      ? selected.filter(
                          (item) => item !== category,
                        )
                      : [...selected, category],
                  )
                }
              />

              <FieldLabel htmlFor={id}>
                {category}
              </FieldLabel>
            </FormField>
          )
        })}
      </FieldGroup>
    </FieldSet>
  )
}