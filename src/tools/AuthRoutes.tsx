import { Outlet, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AccountProps, useAccountStore, useMessageStore } from '../store'
import SiteLoading from '../components/SiteLoading'
import { axiosApi } from './axiosApi'

function AuthRoutes() {
  const [loading, setLoading] = useState(true)

  const { setAccount, isLoggedIn, setIsLoggedInToFalse } = useAccountStore(
    (state) => state
  )

  const { hideMessage } = useMessageStore((state) => state)
  const isMessageShow = useMessageStore((state) => state.show)

  async function getCurrentUser() {
    console.log('here')
    try {
      if (isLoggedIn === false) return

      if (isLoggedIn === undefined) {
        const res = (await axiosApi.get('/auth')) as any

        const accountRes: AccountProps = res.data.user

        setAccount(accountRes)
      }
    } catch (error) {
      setIsLoggedInToFalse()

      return
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isMessageShow) {
      hideMessage()
    }

    getCurrentUser()
  }, [])

  if (loading) {
    return <SiteLoading />
  }

  return isLoggedIn === false ? <Outlet /> : <Navigate to="/tasks" />
}

export default AuthRoutes
