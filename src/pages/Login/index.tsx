import { ChangeEvent, useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row
} from 'react-bootstrap'
import { AccountProps, useAccountStore, useMessageStore } from '../../store'
import { handleError } from '../../tools'
import trillArchLogo from '/trillarch-sq.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { axiosApi } from '../../tools/axiosApi'
import InstallPWAButton from './Install'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const { showMessage, hideMessage } = useMessageStore((state) => state)
  const setAccount = useAccountStore((state) => state.setAccount)
  const isLoggedIn = useAccountStore((state) => state.isLoggedIn)
  const navigate = useNavigate()

  const handleLogin = async (e: ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      hideMessage()
      setLoading(true)

      const res = (await axiosApi.post('/auth/signin', {
        email,
        password
      })) as any

      const accountRes: AccountProps = res.data.user
      const token: string = res.data.token

      setAccount(accountRes, token)
    } catch (err: unknown) {
      handleError(err, showMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/dashboard')
    }
  }, [isLoggedIn])

  return (
    <Container
      id="main"
      fluid
      className="d-flex align-items-start justify-content-center"
    >
      <Row className="w-100 mt-5 justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4} xl={4} xxl={3} className="mx-390">
          <Card className="p-4">
            <Card.Body>
              <Row className="justify-content-center mb-3">
                <Col xs={7}>
                  <Image src={trillArchLogo} fluid />
                </Col>
              </Row>
              <h3 className="text-center mb-4">Log in</h3>
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </Form.Group>

                <InputGroup className="mb-3">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <InputGroup.Text
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  Log in
                </Button>
              </Form>

              <div className="text-center mt-3">
                <Link to="" className="link-disabled">
                  Forgot password?
                </Link>
                <br />
                <InstallPWAButton />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage
