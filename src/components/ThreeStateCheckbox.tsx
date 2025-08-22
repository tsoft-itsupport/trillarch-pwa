import { useRef, useEffect, useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { offlineAwareRequest } from '../tools/axiosApi'
import { useParams } from 'react-router-dom'
import { useTaskStore } from '../store'

interface ThreeStateCheckboxProps {
  label: string
  id: number
  status: boolean | null
}

function ThreeStateCheckbox(props: ThreeStateCheckboxProps) {
  const [value, setValue] = useState<boolean | null>(props.status) // null = indeterminate
  const { setTasks } = useTaskStore((state) => state)
  const checkboxRef = useRef<HTMLInputElement>(null)
  const params = useParams()

  // Set indeterminate programmatically when value is null
  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = value === null
    }
  }, [value])

  const handleChange = async () => {
    let newValue: boolean | null = null

    if (value === null) {
      newValue = true
    } else if (value === true) {
      newValue = false
    } else {
      newValue = null
    }
    setValue(newValue)

    const newTasks = await offlineAwareRequest(
      'patch',
      `/taskitems/${props.id}`,
      {
        status: newValue,
        taskId: params.taskId
      }
    )

    setTasks(newTasks.data)
  }

  return (
    <InputGroup className="mb-1 border-0 ps-3">
      <Form.Check className="w-100 three-state-check">
        <Form.Check.Input
          type="checkbox"
          style={{ marginTop: '.75rem' }}
          checked={value || false}
          onChange={handleChange}
          ref={checkboxRef}
        />
        <Form.Check.Label className="bg-body-tertiary w-100 p-2">
          {props.label}
        </Form.Check.Label>
      </Form.Check>
    </InputGroup>
  )
}

export default ThreeStateCheckbox
