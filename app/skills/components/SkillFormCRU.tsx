"use client"
import { handleAdd, handleEdit } from '@/api/'
import { Button, Checkbox, Grid, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useFormik } from 'formik'
import { useRouter } from "next/navigation"
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { getFormErrorMessage, isFormFieldValid } from '../../../utils/formikUtils'
export const SkillsCRU = ({ mode, skill }: {
    skill?: Skill,
    mode: "add" | "edit" | "view",
}) => {

    const router = useRouter();
    const handleClose = () => {
        router.push('/skills')
    }
    const initialValues = useMemo((): Skill => ({
        _id: skill?._id || null! as string,
        name: skill?.name || null! as string,
        status: skill?.status || true,
    }), [skill])
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        validate: (data) => {
            let errors: Partial<Record<keyof Skill, string>> = {}
            errors = { ...errors, ...!data.name ? { name: 'Required field' } : {} }
            return errors
        },
        onSubmit: (data) => {
            mode === 'edit' &&
                handleEdit<Skill>({
                    collection: 'skills',
                    _id: skill!._id!,
                    data,
                    handleSuccess: (res) => {
                        toast.success("Skill added with success")
                    }
                })

            mode === 'add' &&
                handleAdd<Skill>({
                    collection: 'skills',
                    data,
                    handleSuccess: (res) => {
                        toast.success("Skill added with success")
                    }
                })

            handleClose()
        }
    })
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <h1 className='text-purple-950 font-bold text-center pt-10'>Skills {mode}</h1>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={1} p={6} >
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Name :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.name :
                                        <>
                                            <TextField fullWidth name='name' value={formik.values.name || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'name')} />
                                            {getFormErrorMessage(formik, 'name')}
                                        </>
                                    }
                                </Grid>
                            </Grid>

                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Active :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.status :
                                        <>
                                            <Checkbox
                                                checked={formik.values.status}
                                                onChange={formik.handleChange}
                                                name="status"
                                                color="primary" // You can customize the color here
                                            />
                                            {getFormErrorMessage(formik, 'statut')}
                                        </>
                                    }
                                </Grid>
                            </Grid>

                        </Grid>

                        <Grid container justifyContent='center' gap='10px'>
                            {mode !== 'view' && <Button variant='contained' color='success' type='submit'>Save</Button>}
                            <Button variant='contained' onClick={handleClose} color='error'>Cancel</Button>
                        </Grid>
                    </form>
                </div>

            </div >
        </LocalizationProvider>

    )
}
