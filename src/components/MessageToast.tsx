import { Toast, ToastContainer } from 'react-bootstrap'
import { useMessageStore } from '../store'
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa'

const MessageToast: React.FunctionComponent = () => {
  const { message, show, title, hideMessage, type } = useMessageStore(
    (state) => state
  )

  const Icon = !!type ? (
    type === 'success' ? (
      <FaCheckCircle size={20} color="green" className="me-2" />
    ) : (
      <FaExclamationTriangle size={20} color="red" className="me-2" />
    )
  ) : (
    <></>
  )

  return (
    <ToastContainer
      className="p-3"
      position="bottom-center"
      style={{ zIndex: 1 }}
    >
      <Toast show={show} onClose={hideMessage}>
        <Toast.Header>
          {Icon}
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default MessageToast
