export const handleCommonErrors = (response: Response): string | null => {
  if (response.status === 401) {
    return 'Unauthorized'
  }

  if (response.status === 429) {
    return 'Too many attempts. Please try again later'
  }

  return null
}

export default handleCommonErrors
