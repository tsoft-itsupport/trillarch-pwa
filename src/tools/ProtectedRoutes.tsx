import { Outlet, Navigate, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  AccountProps,
  TaskProps,
  useAccountStore,
  useMessageStore,
  useTaskStore
} from '../store'
import SiteLoading from '../components/SiteLoading'
import { handleError } from '.'
import withAppbar from './withAppbar'
import { axiosApi } from './axiosApi'
import { getTasksFromIdb, saveTasksToIdb } from '../offlineTasksIdb'
import {
  getUserDetailsFromIdb,
  saveUserDetailsToIdb
} from '../offlineUserDetailsIdb'

const OutletWithAppbar = withAppbar(Outlet)

function ProtectedRoutes() {
  const [loading, setLoading] = useState(true)

  const { setAccount, isLoggedIn, logoutAccount } = useAccountStore(
    (state) => state
  )

  const { hideMessage, showMessage } = useMessageStore((state) => state)
  const isMessageShow = useMessageStore((state) => state.show)
  const location = useLocation()
  const { setTasks, setLoadingTasks } = useTaskStore((state) => state)

  async function getCurrentUser() {
    try {
      if (isLoggedIn) return

      if (location.pathname == '/changepassword') {
        const res = (await axiosApi.get('/auth')) as any
        const accountRes: AccountProps = res.data.user

        setAccount(accountRes)

        return
      }

      if (isLoggedIn === undefined) {
        if (!navigator.onLine) {
          const token = localStorage.getItem('auth_token')

          if (token) {
            const userDetails = await getUserDetailsFromIdb()
            setAccount(userDetails)
          }
          return
        }

        const res = (await axiosApi.get('/auth')) as any
        const accountRes: AccountProps = res.data.user

        setAccount(accountRes)

        await saveUserDetailsToIdb(accountRes)

        return
      }
    } catch (error) {
      if (isLoggedIn) {
        logoutAccount()
      }

      return
    } finally {
      setLoading(false)
    }
  }

  async function fetchTasks(offline?: boolean) {
    try {
      let data: TaskProps[] = []

      if (offline) {
        data = await getTasksFromIdb()
      } else {
        const res = (await axiosApi.get('/tasks')) as any
        data = res.data.tasks as TaskProps[]
      }

      setTasks(data)

      saveTasksToIdb(data)
    } catch (err) {
      handleError(err, showMessage)
    } finally {
      setLoadingTasks(false)
    }
  }

  useEffect(() => {
    if (isMessageShow) {
      hideMessage()
    }

    getCurrentUser()
  }, [])

  useEffect(() => {
    if (navigator.onLine) {
      fetchTasks()
    } else {
      const offline = true
      fetchTasks(offline)
    }
  }, [])

  if (loading) {
    return <SiteLoading />
  }

  return isLoggedIn ? <OutletWithAppbar /> : <Navigate to="/login" />
}

export default ProtectedRoutes
