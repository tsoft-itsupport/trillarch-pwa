import { Card, Col, Form, InputGroup, Row, Tab, Tabs } from 'react-bootstrap'
import { useTaskStore } from '../../store'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import ThreeStateCheckbox from '../../components/ThreeStateCheckbox'
import Editor from '../../components/Editor'
import AvatarName from '../../components/AvatarName'
dayjs.extend(relativeTime)

const TaskDetailsPage = () => {
  const { tasks } = useTaskStore((state) => state)

  const params = useParams()

  const task = tasks.find((t) => t.id == (params?.taskId ?? 1))

  return (
    <Row className="justify-content-center">
      <Col className="col-xxxl-7 col-xxl-10">
        <Row>
          <Col
            xs={12}
            className="col-sm-5 col-lg-4"
            style={{ paddingRight: 0 }}
          >
            <div
              className="border p-3 border-top-0 bg-white"
              style={{ height: 'calc(100vh - 70px)' }}
            >
              <InputGroup className="mb-3 border-0">
                <InputGroup.Text className="bg-transparent border-0 w-120">
                  Priority
                </InputGroup.Text>
                <Form.Control
                  className="border-0 field-radius bg-body-secondary "
                  disabled
                  value={task?.priority ?? ''}
                />
              </InputGroup>
              <InputGroup className="mb-3 border-0">
                <InputGroup.Text className="bg-transparent border-0 w-120">
                  Due Date
                </InputGroup.Text>
                <Form.Control
                  className="border-0 field-radius bg-body-secondary"
                  disabled
                  value={dayjs(task?.due_date).format('DD-MMM-YYYY hh:mmA')}
                />
              </InputGroup>
              <InputGroup className="mb-3 border-0">
                <InputGroup.Text className="bg-transparent border-0 w-120">
                  Status
                </InputGroup.Text>
                <Form.Select
                  className="border-0 bg-body-tertiary field-radius"
                  value={task?.status ?? ''}
                  onChange={() => {}}
                >
                  <option value="Working-on-it">Working on it</option>
                  <option value="Not-started">Not Started</option>
                  <option value="Stuck">Stuck</option>
                  <option value="Done">Done</option>
                </Form.Select>
              </InputGroup>
              <InputGroup className="mb-3 border-0">
                <InputGroup.Text className="bg-transparent border-0 w-120">
                  Owner
                </InputGroup.Text>
                <Form.Control
                  className="border-0 bg-body-secondary field-radius"
                  disabled
                  value={task?.assigned_to ?? ''}
                />
              </InputGroup>
              <InputGroup className="mb-3 border-0">
                <InputGroup.Text className="bg-transparent border-0 w-120">
                  Created At
                </InputGroup.Text>
                <Form.Control
                  className="border-0 bg-body-secondary field-radius"
                  disabled
                  value={dayjs(task?.created_at).format('DD-MMM-YYYY hh:mmA')}
                />
              </InputGroup>
              <InputGroup className="mb-5 border-0">
                <InputGroup.Text className="bg-transparent border-0 w-120">
                  Last Updated
                </InputGroup.Text>
                <Form.Control
                  className="border-0 bg-body-secondary field-radius"
                  disabled
                  value={dayjs(task?.updated_at).fromNow()}
                />
              </InputGroup>

              <h5>Items</h5>

              <div className="task-item-container">
                {task?.taskItems.map((taskItem, i) => (
                  <ThreeStateCheckbox
                    key={i}
                    label={taskItem.name}
                    id={taskItem.id}
                    status={taskItem.status}
                  />
                ))}
              </div>
            </div>
          </Col>
          <Col xs={12} className="col-sm-7 col-lg-8" style={{ paddingLeft: 0 }}>
            <div
              className="border border-start-0 bg-white border-top-0 "
              style={{ height: 'calc(100vh - 70px)' }}
            >
              <Tabs defaultActiveKey="updates" className="mb-3 pt-2">
                <Tab eventKey="updates" title="Updates">
                  <div
                    className="d-flex flex-column justify-content-between p-3 pt-0"
                    style={{
                      height: 'calc(100vh - 150px)'
                    }}
                  >
                    <div style={{ overflow: 'auto' }}>
                      <Card className="w-100 mb-4">
                        <Card.Header>
                          <div className="d-flex align-items-center">
                            <AvatarName name="Val" size={30} />
                            <span className="fw-bold mx-2">Val</span>
                            <span className="text-black-50">16h ago</span>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card className="w-100 mb-4">
                        <Card.Header>
                          <div className="d-flex align-items-center">
                            <AvatarName colorSecondary name="MArk" size={30} />
                            <span className="fw-bold mx-2">Mark</span>
                            <span className="text-black-50">2h ago</span>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Sounds good! Some quick example text to build on the
                            card title and make up the bulk of the card's
                            content.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card className="w-100 mb-4">
                        <Card.Header>
                          <div className="d-flex align-items-center">
                            <AvatarName colorSecondary name="MArk" size={30} />
                            <span className="fw-bold mx-2">Mark</span>
                            <span className="text-black-50">2h ago</span>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Lorem ipsum dolor sit amet. Ab debitis eius qui
                            magni ipsa est ipsa doloribus aut delectus nisi ut
                            consequatur molestiae est voluptatibus optio sed
                            illum error. Et asperiores totam est possimus
                            quibusdam ea veniam nobis. Et ratione eius eum
                            libero rerum aut nisi aliquam sed consequatur
                            quisquam.
                            <br />
                            <br />
                            Et itaque ullam et nesciunt harum qui reiciendis
                            aliquam qui molestiae voluptas ut voluptatem
                            recusandae qui ducimus necessitatibus ad magnam
                            mollitia. Et iusto corporis et cupiditate cupiditate
                            id quia deserunt ab odio officia sit reiciendis
                            galisum qui deleniti sint hic rerum enim.
                            <br />
                            <br />A iure laborum sit architecto iure qui
                            deserunt repellendus aut autem soluta vel nihil
                            aliquam quo perspiciatis modi. Sit dolores facere et
                            doloribus fuga et quod quis in impedit laboriosam ut
                            voluptatum blanditiis ut sequi nisi a tenetur nemo.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                      <Card className="w-100 mb-4">
                        <Card.Header>
                          <div className="d-flex align-items-center">
                            <AvatarName name="Val" size={30} />
                            <span className="fw-bold mx-2">Val</span>
                            <span className="text-black-50">16h ago</span>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                    <Editor />
                  </div>
                </Tab>
                <Tab eventKey="files" title="Files">
                  Files goes here
                </Tab>
                <Tab eventKey="logs" title="Activity Log">
                  Logs goes here
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default TaskDetailsPage
