import { ChangeEvent, FormEvent, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Row
} from 'react-bootstrap'
import { AccountProps, useAccountStore, useMessageStore } from '../../store'
import { handleError } from '../../tools'
import trillArchLogo from '/trillarch-sq.jpg'

import { FaCheckCircle, FaTimesCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { axiosApi } from '../../tools/axiosApi'
import { useSearchParams } from 'react-router-dom';

const requirements = [
  {
    id: 'length',
    label: 'At least 8 characters',
    test: (pwd: string) => pwd.length >= 8
  },
  {
    id: 'case',
    label: 'Contains uppercase and lowercase letters',
    test: (pwd: string) => /[a-z]/.test(pwd) && /[A-Z]/.test(pwd)
  },
  {
    id: 'number',
    label: 'Contains at least one number',
    test: (pwd: string) => /[0-9]/.test(pwd)
  },
  {
    id: 'special',
    label: 'Contains at least one special character',
    test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
  }
]

const ChangePasswordPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const { showMessage } = useMessageStore((state) => state)
  const user = useAccountStore((state) => state?.account)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const {setAccount} = useAccountStore((state) => state)

  const handleChangePasswordSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault()
      const code = searchParams.get('code')
      const email = searchParams.get('email')

      const res = (await axiosApi.post('/auth/changepassword', {
        email,
        code,
        password
      })) as any

      const accountRes: AccountProps = res.data.user
      
      const token: string = res.data.token

      setAccount(accountRes, token)

      showMessage({ message: 'Success', title: 'Info', type: 'success' })

      navigate('/tasks')
    } catch (err) {
      handleError(err, showMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const { value } = e.target

    setPassword(value)
  }

  return (
    <Container
      fluid
      className="d-flex align-items-start justify-content-center min-vh-100 bg-light"
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
              <div className="mb-3">
                <h5 className="text-center mb-4">Welcome: {user?.name}</h5>
              </div>

              <Form onSubmit={handleChangePasswordSubmit}>
                <InputGroup className="mb-3">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="New Password"
                    onChange={handleChangePasswordInput}
                    required
                  />

                  <InputGroup.Text
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </InputGroup.Text>
                </InputGroup>

                <ListGroup className="mt-2 mb-3">
                  {requirements.map((req) => {
                    const valid = req.test(password)
                    return (
                      <ListGroup.Item
                        key={req.id}
                        className="border-0 p-1 d-flex align-items-center"
                      >
                        {valid ? (
                          <FaCheckCircle className="text-success me-2" />
                        ) : (
                          <FaTimesCircle className="text-danger me-2" />
                        )}
                        <small>{req.label}</small>
                      </ListGroup.Item>
                    )
                  })}
                </ListGroup>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={
                    loading || requirements.some((req) => !req.test(password))
                  }
                >
                  Update Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ChangePasswordPage
