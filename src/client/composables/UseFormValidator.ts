import { reactive } from 'vue'

export type FormErrors<TForm extends object> = {
  [K in keyof TForm]: string
}

export interface ZodErrorCustomDetails<TForm> {
  errors: string[];
  properties?: {
    [K in keyof TForm]?: {
      errors: string[];
    } | undefined;
  } | undefined;
}

export function useFormValidator<TForm extends object>(form: TForm) {
  const errors = reactive({} as FormErrors<TForm>) as FormErrors<TForm>

  for (const key of Object.keys(form) as Array<keyof TForm>) {
    errors[key] = ''
  }

  function setErrors(details: ZodErrorCustomDetails<TForm>) {
    Object.keys(errors).forEach((k) => {
      const key = k as keyof typeof errors
      errors[key] = details.properties?.[key]?.errors[0] ?? ''
    })
  }


  return {
    errors,
    setErrors,
  }
}
