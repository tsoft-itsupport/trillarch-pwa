import { Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'
import TasksTable from './TasksTable'
import { AiOutlineInfoCircle } from 'react-icons/ai'

function TasksPage() {
  return (
    <>
      <Row className="justify-content-center mt-3 mb-2">
        <Col className="col-xxxl-7 col-xxl-10 ps-4">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <h5 className="mb-0 me-3">My Tasks</h5>

              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>See all tasks assigned to you</Tooltip>}
              >
                <AiOutlineInfoCircle />
              </OverlayTrigger>
            </div>

            <div className="d-flex align-items-center">
              <span className="me-3">Filter Status: </span>
              <Form.Select
                size="sm"
                style={{ width: '120px' }}
                className="border-light bg-white"
                value={'Active'}
                onChange={() => {}}
              >
                <option value="Working-on-it">Active</option>
                <option value="Working-on-it">Archived</option>
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col className="col-xxxl-7 col-xxl-10">
          <TasksTable />
        </Col>
      </Row>
    </>
  )
}

export default TasksPage
