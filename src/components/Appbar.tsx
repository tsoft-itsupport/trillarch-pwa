import { Badge, Dropdown, Image, Navbar } from 'react-bootstrap'
import trillArchLogo from '/trillarch-sq.jpg'
import { useAccountStore, useMessageStore } from '../store'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleError } from '../tools'
import AvatarName from './AvatarName'
import { FiArrowLeft } from 'react-icons/fi'
import { FaBell } from 'react-icons/fa'
import { useEffect, useState } from 'react'

interface AppbarProps {
  title?: string
}

interface NavigatorStandalone extends Navigator {
  standalone?: boolean
}

const Appbar = (props: AppbarProps) => {
  const user = useAccountStore((state) => state.account)
  const logoutAccount = useAccountStore((state) => state.logoutAccount)
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn)
  const navigate = useNavigate()
  const showMessage = useMessageStore((state) => state.showMessage)
  const [isPWA, setIsPWA] = useState(false)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  const handleLogout = async () => {
    try {
      logoutAccount()
    } catch (err) {
      handleError(err, showMessage)
    }
  }

  const handleBack = () => {
    navigate('/tasks')
  }

  const checkPWA = () => {
    try {
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
      ).matches

      const isIos =
        (window.navigator as NavigatorStandalone).standalone === true

      setIsPWA(isStandalone || isIos)
    } catch (err) {
      handleError(err, showMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkPWA()
  }, [])

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login')
    }
  }, [isLoggedIn])

  if (loading) {
    return <div />
  }

  if (!isPWA || (isPWA && location.pathname === '/tasks')) {
    return (
      <>
        <Navbar className="px-3 justify-content-between navbar bg-primary text-white">
          <Navbar.Brand className="text-white">
            <Image src={trillArchLogo} height={30} />
            <span className="ms-3 ">TrillArch</span>
          </Navbar.Brand>

          <div className="d-flex justify-content-center align-items-center">
            <div className="me-4 position-relative">
              <FaBell size={19} />
              <Badge
                bg="danger"
                className="position-absolute top-0 start-100 translate-middle"
                style={{ fontSize: '0.55em' }}
              >
                12
              </Badge>
            </div>

            <Dropdown align="end">
              <Dropdown.Toggle as="div" className="avatar-toggle">
                <span className="">
                  <AvatarName name={user?.name} size={30} />
                </span>
                <span className="online-indicator"></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Settings 1</Dropdown.Item>
                <Dropdown.Item>Settings 2</Dropdown.Item>
                <Dropdown.Item>Settings 3</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar>
      </>
    )
  } else {
    return (
      <>
        <Navbar className="px-3 justify-content-between navbar bg-primary text-white">
          <Navbar.Brand
            onClick={handleBack}
            className="pointer"
            style={{ paddingRight: '20px' }}
          >
            <FiArrowLeft />
          </Navbar.Brand>
          <h5>{props.title}</h5>
          <div style={{ width: '40px' }} />
        </Navbar>
      </>
    )
  }
}

export default Appbar
