"use client"

import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { TableGrid } from '@/components/TableGrid/TableGrid';
import { DeleteDialog } from '@/components/DeleteDialog/DeleteDialog';
import { useState } from 'react';
import { ActionBlock } from '@/components/TableGrid/ActionsBlock';
import { Delete, Edit, Visibility, ArrowBack } from '@mui/icons-material';
import { Button, Grid ,IconButton} from '@mui/material';
import { useRouter } from 'next/navigation';
import { handleDelete } from "@/api";

export const Table = ({ data }: {
    data: Employee[]
}) => {
    const [deleteId, setDeleteId] = useState<string>(null! as string)
    const router = useRouter()
    const handleView = (_id: string) => {
        router.push(`/employees/view/${_id}`)
    };
    const handleUpdate = (_id: string) => {
        router.push(`/employees/edit/${_id}`)
    };
    const handleRemove = (_id: string) => {
        console.log('ret')
        setDeleteId(_id)
    };
    const handleReturn=()=>{
        router.push(`/`)
    }
    const columns: GridColDef<Employee>[] = [
        { field: 'firstName', headerName: 'FirstName', },
        { field: 'lastName', headerName: 'LastName', },
        { field: 'department', headerName: 'Department', },
        {
            field: '_id', headerName: 'Actions', headerAlign: 'right', align: 'right', flex: 1,
            filterable: false, sortable: false, disableColumnMenu: true,
            renderCell: (params: GridRenderCellParams<Employee>) => <ActionBlock
                _id={params.row._id!}
                actions={[
                    { icon: <Visibility color={'warning'} />, action: handleView },
                    { icon: <Edit color={'info'} />, action: handleUpdate },
                    { icon: <Delete color={'error'} />, action: handleRemove }
                ]} />
        },
    ]
    return (<>
        <Grid container justifyContent={'space-between'}>
            <IconButton onClick={handleReturn}><ArrowBack /></IconButton>
            <Button onClick={() => router.push(`/employees/add`)}>Add</Button>
        </Grid>
        <TableGrid
            {...{ columns, data }}
        />
        {!!deleteId && <DeleteDialog
            title='Delete employee'
            handleConfirm={() => {
                handleDelete({ collection: 'employees', _id: deleteId })
                setDeleteId(null! as string)
            }}
            handleClose={() => setDeleteId(null! as string)} />}
    </>)
}