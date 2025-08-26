import { Spinner, ThemeProvider } from 'react-bootstrap'
import MessageToast from './components/MessageToast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import TasksPage from './pages/Tasks'
import ProtectedRoutes from './tools/ProtectedRoutes'
import AuthRoutes from './tools/AuthRoutes'
import ChangePasswordPage from './pages/ChangePassword'
import LoginSessionPage from './pages/LoginSession'
import Homepage from './pages/Home'
import TaskDetailsPage from './pages/TaskDetails'
import { useEffect, useState } from 'react'
import { replayQueuedRequests } from './offlineQueueProcessor'

function App() {
  const [loading, setLoading] = useState(false)

  const handleOnline = async () => {
    try {
      setLoading(true)

      await replayQueuedRequests()
    } catch (err) {
      console.log('Something went wrong with offline queud request')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.addEventListener('online', handleOnline)

    if (navigator.onLine) {
      handleOnline()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex-center vh90">
        <div>
          <div className="flex-center">
            <Spinner animation="grow" variant="primary" />
          </div>
          Syncing...
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider
      breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
      minBreakpoint="xs"
    >
      <BrowserRouter>
        <Routes>
          {/* AUTH ROUTES */}
          <Route element={<AuthRoutes />}>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<LoginSessionPage />} path="/loginsession" />
            <Route element={<ChangePasswordPage />} path="/changepassword" />
          </Route>

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoutes />}>
            <Route element={<Homepage />} path="/" />
            <Route element={<TasksPage />} path="/tasks" />
            <Route element={<TaskDetailsPage />} path="/tasks/:taskId" />
          </Route>
        </Routes>
      </BrowserRouter>
      <MessageToast /> {/* message dialog */}
    </ThemeProvider>
  )
}

export default App
