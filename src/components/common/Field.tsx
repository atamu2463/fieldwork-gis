import {
  Field as FormField,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'

export function Field({
  label,
  name,
  type = 'text',
  placeholder,
  error,
  defaultValue,
  required = true,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  error?: string
  defaultValue?: string
  required?: boolean
}) {
  return (
    <FormField data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={name}>
        {label}

        {required && (
          <span
            className="text-destructive"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </FieldLabel>

      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={error ? true : undefined}
      />

      {error && (
        <p
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </FormField>
  )
}