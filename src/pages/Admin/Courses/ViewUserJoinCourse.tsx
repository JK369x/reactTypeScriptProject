import Sidebar from '../../../components/componentsAdmin/sidebar/Side-bar'
import Navbar from '../../../components/componentsAdmin/navbar/Navbar'

import { Table } from '../../../framework/control'
import { TableColumnOptions } from '../../../framework/control/Table/Table'
import Grid from '@mui/material/Grid/Grid'
import { FC, useEffect, useState } from 'react'


//controller
import { useDialog } from '../../../Hook/dialog/useDialog'
import { useDeleteCourse } from './Hook/useDeleteCourse'
import { Button, Chip } from '@mui/material'
//react dom 
import { useNavigate, useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import '../Dashboard/Dashboard.scss'
import Testgrid from '../../test/Testgrid'
import Image from '../../../components/Image/Image'
import { Box } from '@mui/system'
import { CourseJoinType, useGetAllJoinCourse } from './Hook/useGetAllJoinCourse'
import { useUpdateApprovalJoinCourse } from './Hook/useUpdateApprovalJoinCourse'
import { useGetCourseDetail } from './Hook/useGetCourseDtail'
import { useGetAllJoinCourseApproval } from './Hook/useGetAllJoinCoruseApproval'
import { useDeleteJoinCourse } from './Hook/useDeleteJoinCourse'

const ViewUserJoinCourse: FC = () => {
    const { JoinCourse, getUserJoinCourse } = useGetAllJoinCourse()
    const data = JoinCourse
    const { JoinCourseApproval, getUserJoinCourseApproval } = useGetAllJoinCourseApproval()
    const data_approval = JoinCourseApproval
    const { state } = useGetCourseDetail()
    console.log("🚀 ~ file: ViewUserJoinCourse.tsx:29 ~ state", state)
    console.log("🚀 ~ file: ViewUserJoinCourse.tsx:27 ~ data", data)
    const { openConfirmDialog } = useDialog()
    const { deleteJoinCourse } = useDeleteJoinCourse()
    const navigate = useNavigate()
    // console.log("🚀 ~ file: User.tsx:20 ~ data", data)
    // const newdata = data.filter((item) => item.approval === true)
    // console.log("🚀 ~ file: Couse.tsx:32 ~ newdata", newdata)

    const delItem = (data: CourseJoinType) => {
        openConfirmDialog({
            textContent: 'deleteCourse',
            onConfirm: async () => {
                await deleteJoinCourse(state.id, data.id_document)
                getUserJoinCourse()
                getUserJoinCourseApproval()
            },
        })
    }

    const viewDetailCourse = (data: CourseJoinType) => {
        console.log("🚀 ~ file: User.tsx:40 ~ viewDetailUser ~ data", data)
        navigate(`/detailcourse/${data.id_document}`)
    }

    const onClickAddCourse = () => {
        navigate('/addcourses')
    }
    const approval = async (data: CourseJoinType) => {
        await useUpdateApprovalJoinCourse(state.id, data.id_document)
        getUserJoinCourseApproval()
        getUserJoinCourse()
    }
    const columnOptions: TableColumnOptions[] = [

        {
            width: '100',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'ID',
            value: 'countID',
        },

        {
            width: '50',
            alignHeader: 'center',
            alignValue: 'center',
            label: 'Course',
            value: 'imageTitle',
        },
        {
            alignValue: 'left',
            value: 'courseName',
        },
        {
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Name User',
            value: 'name_join',
        },
        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Transaction',
            value: 'transaction',
        },
        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Pricing',
            value: 'pricing',
        },
        {
            width: '100',
            alignHeader: 'left',
            alignValue: 'left',
            label: 'Approval',
            value: 'approval',
        },

        {
            width: '400',
            alignHeader: 'left',
            alignValue: 'center',
            label: 'Action',
            value: 'delitem',
        },

    ]

    return (
        <div className='home'>
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="widgets">

                </div>
                <div className="charts">

                </div>
                <div className="listContainer">
                    <div className="listTitle">
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                                <Typography variant="h1" component="h1" ml={3}>
                                    Approval
                                </Typography>
                                <Button sx={{ width: '140px', height: '40px', mr: 3 }} color='success' onClick={() => onClickAddCourse()} >+Add course</Button>
                            </Grid>


                        </Grid>
                        <Grid sx={{ height: 1200, maxHeight: 2000 }}>

                            <Table columnOptions={columnOptions} dataSource={data_approval.map((e, index) => {
                                return {
                                    ...e,
                                    transaction: <Chip label={e.transaction == false ? 'รอการโอนเงิน' : 'ชำระเงินแล้ว'} color="success" />,
                                    approval: <Chip label={e.approval == true ? 'อนุมัติ' : true} color="primary" />,
                                    countID: index + 1,
                                    delitem: <>
                                        <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                            approval(e)
                                        }}>Approval</Button>
                                        <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                            viewDetailCourse(e)
                                        }}>View</Button>
                                        <Button sx={{ mr: 0 }} color='error' onClick={() => {
                                            delItem(e)
                                        }}>Delete</Button>
                                    </>,
                                    imageTitle: <Grid >
                                        <Image src={e.image_course} width={90} height={60} />
                                    </Grid>,
                                }
                            })} defaultRowsPerPage={10} />

                        </Grid>

                    </div>

                </div>

                <div className="listContainer">
                    <div className="listTitle">
                        <Grid container spacing={2} sx={{ mt: 2 }}>
                            <Grid container justifyContent={'space-between'} alignItems={'center'} >
                                <Typography variant="h1" component="h1" ml={3}>
                                    Wait Approval
                                </Typography>
                                <Button sx={{ width: '140px', height: '40px', mr: 3 }} color='success' onClick={() => onClickAddCourse()} >+Add course</Button>
                            </Grid>


                        </Grid>
                        <Grid sx={{ height: 1200, maxHeight: 2000 }}>

                            <Table columnOptions={columnOptions} dataSource={data.map((e, index) => {
                                return {
                                    ...e,
                                    transaction: <Chip label={e.transaction == false ? 'รอการโอนเงิน' : 'ชำระเงินแล้ว'} color="error" />,
                                    approval: <Chip label={e.approval == false ? 'รอการอนุมัติ' : true} color="warning" />,
                                    countID: index + 1,
                                    delitem: <>
                                        <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                            approval(e)
                                        }}>Approval</Button>
                                        <Button sx={{ mr: 1 }} color='success' onClick={() => {
                                            viewDetailCourse(e)
                                        }}>View</Button>
                                        <Button sx={{ mr: 0 }} color='error' onClick={() => {
                                            delItem(e)
                                        }}>Delete</Button>
                                    </>,
                                    imageTitle: <Grid >
                                        <Image src={e.image_course} width={90} height={60} />
                                    </Grid>,
                                }
                            })} defaultRowsPerPage={10} />
                        </Grid>
                    </div>


                </div>
            </div>
        </div >

    )
}

export default ViewUserJoinCourse