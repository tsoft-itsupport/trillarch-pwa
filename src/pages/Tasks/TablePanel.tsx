import React from 'react'
import { GridApi } from 'ag-grid-community'

interface CustomPaginationPanelProps {
  api: GridApi
  refreshGrid: () => void
}

const TablePanel: React.FC<CustomPaginationPanelProps> = ({
  api,
  refreshGrid
}) => {
  const currentPage = api.paginationGetCurrentPage!() + 1
  const totalPages = api.paginationGetTotalPages!()

  return (
    <div
      className="ag-paging-panel custom-pagination-panel"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px'
      }}
    >
      <div>
        Page {currentPage} of {totalPages}
        <button
          onClick={() => api.paginationGoToFirstPage!()}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button
          onClick={() => api.paginationGoToPreviousPage!()}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <button
          onClick={() => api.paginationGoToNextPage!()}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button
          onClick={() => api.paginationGoToLastPage!()}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
      <button onClick={refreshGrid}>🔄 Reload</button>
    </div>
  )
}

export default TablePanel
