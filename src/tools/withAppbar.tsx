import { ComponentType } from 'react'
import { Container } from 'react-bootstrap'
import Appbar from '../components/Appbar'
import { isMobile } from 'react-device-detect'

const withAppbar = (WrappedComponent: ComponentType) => {
  const paddingClass = isMobile ? '' : 'px-2'

  return function WithNavbar(props: any) {
    return (
      <Container fluid id="main" className="px-0 overflow-x-hidden">
        <Appbar />

        <div className={paddingClass}>
          <WrappedComponent {...props} />
        </div>
      </Container>
    )
  }
}

export default withAppbar
