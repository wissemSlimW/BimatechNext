"use client "
import { DataGrid, GridColDef, } from '@mui/x-data-grid';

export const TableGrid = <T extends Collection>({ columns, data }: {
    columns: GridColDef[],
    data: T[]
}) => {

    return (<DataGrid
        rows={[...data || []].map(d => ({ ...d, id: d._id }))}
        columns={columns}

        initialState={{
            pagination: {
                paginationModel: { page: 0, pageSize: 5 },
            },
        }}
        pageSizeOptions={[5, 10]}
    />)
}