export function clipboardCopy(value: string | null | undefined) {
  if (value) {
    navigator.clipboard.writeText(value);
  }
}