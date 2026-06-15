export const formatDateTime = (str) => {
  if (!str) return ''
  const date = new Date(str)
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return date.toLocaleDateString('en-US', dateOptions)
}
