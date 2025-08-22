import { useEffect } from 'react'
import { useMessageStore } from '../../store'
import { handleError } from '../../tools'
import { useNavigate } from 'react-router-dom'
import SiteLoading from '../../components/SiteLoading'

const LoginSessionPage = () => {
  const { showMessage } = useMessageStore((state) => state)
  const navigate = useNavigate()

  const handleSession = async function () {
    try {
      const urlParams = new URLSearchParams(window.location.search)
      const userId = urlParams.get('userId')
      const tokenSecret = urlParams.get('tokenSecret')

      if (userId && tokenSecret) {
        /*await account.createSession(
          userId, // userId
          tokenSecret // secret
        )*/

        navigate('/changepassword')
      } else {
        navigate('/login')
      }

      return
    } catch (err) {
      handleError(err, showMessage)

      navigate('/login')
    }
  }

  useEffect(() => {
    handleSession()
  }, [])

  return <SiteLoading />
}

export default LoginSessionPage
