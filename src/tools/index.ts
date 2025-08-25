import { MessageStoreProps } from '../store'

export const handleError = (
  err: any,
  showMessage: (props: MessageStoreProps) => void
) => {
  if (err.response?.status === 400) {
    return showMessage({
      message: err.response?.data?.error ?? 'Server Error',
      title: 'Error',
      type: 'error'
    })
  }

  return showMessage({
    message: 'Something went wrong',
    title: 'Error',
    type: 'error'
  })
}
