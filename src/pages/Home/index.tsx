import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/tasks')
  }, [])

  return <></>
}

export default Homepage
