import { reactive } from 'vue'

export type FormErrors<TForm extends object> = {
  [K in keyof TForm]: string
}

export function useFormValidator<TForm extends object>(form: TForm) {
  const errors = reactive({} as FormErrors<TForm>) as FormErrors<TForm>

  for (const key of Object.keys(form) as Array<keyof TForm>) {
    errors[key] = ''
  }

  return {
    errors,
  }
}
