import { Spinner } from 'react-bootstrap'

function SiteLoading() {
  return (
    <div className="flex-center vh90">
      <div>
        <div className="flex-center">
          <Spinner animation="grow" variant="primary" />
        </div>
        TRILLARCH
      </div>
    </div>
  )
}

export default SiteLoading
