"use client"
import { handleAdd, handleEdit } from '@/api/'
import { Autocomplete, Button, Checkbox, Grid, TextField } from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { useFormik } from 'formik'
import { useRouter } from "next/navigation"
import { useMemo } from 'react'
import { toast } from 'react-toastify'
import { getFormErrorMessage, isFormFieldValid } from '../../../utils/formikUtils'
import { format, isValid } from 'date-fns'
export const EmployeesCRU = ({ mode, employee, skills }: {
    employee?: Employee,
    mode: "add" | "edit" | "view",
    skills: Skill[]
}) => {

    const router = useRouter();
    const handleClose = () => {
        router.push('/employees')
    }
    const initialValues = useMemo((): Employee => ({
        _id: employee?._id || null! as string,
        firstName: employee?.firstName || null! as string,
        lastName: employee?.lastName || null! as string,
        email: employee?.email || null! as string,
        phone: employee?.phone || null! as string,
        birthDate: employee?.birthDate || null! as Date,
        address: employee?.address || null! as string,
        department: employee?.department || null! as string,
        position: employee?.position || null! as string,
        salary: employee?.salary || null! as number,
        hiringDate: employee?.hiringDate || null! as Date,
        status: employee?.status || true,
        profilePicture: employee?.profilePicture || null! as string,
        skillIds: []
    }), [employee])
    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validateOnBlur: true,
        validate: (data) => {
            let errors: Partial<Record<keyof Employee, string>> = {}
            errors = { ...errors, ...!data.firstName ? { firstName: 'Required field' } : {} }
            errors = { ...errors, ...!data.lastName ? { lastName: 'Required field' } : {} }
            errors = { ...errors, ...!data.department ? { department: 'Required field' } : {} }
            errors = { ...errors, ...!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email) ? { email: "Email not valid" } : {} }
            errors = { ...errors, ...!data.email ? { email: "Field required." } : {} }
            errors = { ...errors, ...!data.birthDate ? { birthDate: "Field required." } : {} }
            errors = { ...errors, ...!isValid(new Date(data.birthDate)) ? { birthDate: "Invalid date format." } : {} }
            errors = { ...errors, ...!data.hiringDate ? { hiringDate: "Field required." } : {} }
            errors = { ...errors, ...!isValid(new Date(data.hiringDate)) ? { hiringDate: "Invalid date format." } : {} }
            return errors
        },
        onSubmit: (data) => {
            mode === 'edit' &&
                handleEdit<Employee>({
                    collection: 'employees',
                    _id: employee!._id!,
                    data,
                    handleSuccess: (res) => {
                        toast.success("Employee added with success")
                    }
                })

            mode === 'add' &&
                handleAdd<Employee>({
                    collection: 'employees',
                    data,
                    handleSuccess: (res) => {
                        toast.success("Employee added with success")
                    }
                })

            handleClose()
        }
    })
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div>
                <h1 className='text-purple-950 font-bold text-center pt-10'>Employees {mode}</h1>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Grid container spacing={1} p={6} >
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>FirstName :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.firstName :
                                        <>
                                            <TextField fullWidth name='firstName' value={formik.values.firstName || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'firstName')} />
                                            {getFormErrorMessage(formik, 'firstName')}
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>LastName :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.lastName :
                                        <>
                                            <TextField fullWidth name='lastName' value={formik.values.lastName || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'lastName')} />
                                            {getFormErrorMessage(formik, 'lastName')}
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Email :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.email :
                                        <>
                                            <TextField fullWidth name='email' value={formik.values.email || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'email')} />
                                            {getFormErrorMessage(formik, 'email')}
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Phone :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.phone :
                                        <>
                                            <TextField fullWidth name='phone' value={formik.values.phone || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'phone')} />
                                            {getFormErrorMessage(formik, 'phone')}
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>BirthDate :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ?  format(new Date(formik.values.birthDate),'dd/MM/yyyy') :
                                        <>
                                            <DatePicker  value={new Date(formik.values.birthDate)} onChange={(val) => formik.setFieldValue("birthDate", val)} sx={{ width: "100%" }} />
                                            {getFormErrorMessage(formik, 'birthDate')}  </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Address :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.address :
                                        <>
                                            <TextField fullWidth name='address' value={formik.values.address || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'address')} />
                                            {getFormErrorMessage(formik, 'address')}  </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Department :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.department :
                                        <>
                                            <TextField fullWidth name='department' value={formik.values.department || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'department')} />
                                            {getFormErrorMessage(formik, 'department')}  </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Position :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.position :
                                        <>
                                            <TextField fullWidth name='position' value={formik.values.position || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'position')} />
                                            {getFormErrorMessage(formik, 'position')}  </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Salary :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.salary :
                                        <>
                                            <TextField fullWidth name='salary' type='number' value={formik.values.salary || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'salary')} />
                                            {getFormErrorMessage(formik, 'salary')}  </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Hiring date :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? format(new Date(formik.values.hiringDate),'dd/MM/yyyy') :
                                        <>
                                            <DatePicker  value={new Date(formik.values.hiringDate)} onChange={(val) => formik.setFieldValue("hiringDate", val)} sx={{ width: "100%" }} />
                                            {getFormErrorMessage(formik, 'hiringDate')}
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
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Skills :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? skills.filter((skill) => formik.values.skillIds.some((_id) => skill._id === _id)).map(s => s.name).join(',') :
                                        <>
                                            <Autocomplete
                                                id="skillIds"
                                                multiple
                                                options={skills}
                                                value={skills.filter((skill) => formik.values.skillIds.some((_id) => skill._id === _id))}
                                                getOptionLabel={(option) => `${option?.name}`}
                                                onChange={(event, value) => formik.setFieldValue("skillIds", value.map((skill) => skill?._id))}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                    />
                                                )}
                                            />
                                            {getFormErrorMessage(formik, 'skillIds')}
                                        </>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} md={6} alignItems={"center"}>
                                <Grid item xs={12} md={6}>Profile picture :</Grid>
                                <Grid item xs={12} md={6}>
                                    {mode === "view" ? formik.values.profilePicture :
                                        <>
                                            <TextField fullWidth type='file' name='profilePicture' value={formik.values.profilePicture || ''} onChange={formik.handleChange} error={isFormFieldValid(formik, 'profilePicture')} />
                                            {getFormErrorMessage(formik, 'profilePicture')}
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
