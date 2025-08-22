import { useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
  AllCommunityModule,
  ISelectCellEditorParams,
  Theme,
  themeQuartz,
  iconSetQuartzLight,
  CellClickedEvent,
  GridApi
} from 'ag-grid-community'
import { useNavigate } from 'react-router-dom'
import { TaskProps, useTaskStore } from '../../store'

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  AllCommunityModule
])

const status = ['Done', 'Working-on-it', 'Stuck', 'Not-started']

const myTheme = themeQuartz.withPart(iconSetQuartzLight).withParams({
  columnBorder: true,
  headerFontSize: 16,
  headerFontWeight: 600,
  headerHeight: 35,
  spacing: 8,
  rowHeight: 30,
  headerBackgroundColor: '#DFEFFC'
})

const TasksTable = () => {
  const containerStyle = useMemo(
    () => ({ width: '100%', height: 'calc(100vh - 150px)' }),
    []
  )
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const navigate = useNavigate()
  const [gridApi, setGridApi] = useState<GridApi | null>(null)
  const { tasks, loadingTasks, setTask } = useTaskStore((state) => state)

  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      valueGetter: 'node.rowIndex + 1',
      width: 65,
      pinned: 'left',
      filter: false,
      cellClass: 'fw-light-bold cell-disabled'
    },
    {
      field: 'opening_num_id',
      headerName: 'Task Name',
      onCellClicked: function (e: CellClickedEvent) {
        e.event?.preventDefault()
        const data: TaskProps = e.data
        setTask(data)
        navigate(`/tasks/${data.id}`)
      },
      cellClass: 'pointer text-primary',
      minWidth: 200
    },
    {
      field: 'status',
      headerName: 'Status',
      cellEditor: 'agSelectCellEditor',
      singleClickEdit: true,
      editable: true,
      cellEditorParams: {
        values: status
      } as ISelectCellEditorParams,
      minWidth: 200
    },
    {
      field: 'priority',
      headerName: 'Priority',
      minWidth: 200
    },
    {
      field: 'due_date',
      headerName: 'Due Date',
      minWidth: 200
    },
    {
      field: 'assigned_to',
      headerName: 'Assigned To'
    },
    {
      field: 'created_by',
      headerName: 'Created By'
    }
  ])
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      floatingFilter: true,
      filter: true,
      flex: 1
    }
  }, [])
  const theme = useMemo<Theme | 'legacy'>(() => {
    return myTheme
  }, [])

  const onGridReady = (params: any) => {
    setGridApi(params.api)
  }

  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={tasks}
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          loading={loadingTasks}
          defaultColDef={defaultColDef}
          stopEditingWhenCellsLoseFocus={true}
          theme={theme}
        />
        {gridApi && (
          <div style={{ position: 'absolute', bottom: 0, width: '100%' }}>
            {/* <TablePanel api={gridApi} refreshGrid={fetchTasks} /> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default TasksTable
