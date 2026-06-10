import z from "zod";


export function ZodBundleErrors(error: z.core.$ZodError<unknown>) {
  return z.treeifyError(error).errors
}
