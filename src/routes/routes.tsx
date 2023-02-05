import React, { FC, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Nextregistor from "../pages/Nextregistor";
import Testgrid from "../pages/test/Testgrid";
import LoginAdmin from "../pages/Admin/LoginAdmin";
import User from "../pages/Admin/Users/User";
import Dashboard from "../pages/Admin/Dashboard/Dashboard";
import DetailUser from "../pages/Admin/Users/DetailUser";
import EditUser from "../pages/Admin/Users/EditUser";
import Course from "../pages/Admin/Courses/Couse";
import AddCourse from "../pages/Admin/Courses/AddCourse";
import Page from "../pages/page";
import Category from "../pages/Admin/Categorys/Category";
import AddCategory from "../pages/Admin/Categorys/AddCategory";
import Registor from "../pages/Register";
import { useAppDispatch, useAppSelector } from "../store/useHooksStore";
import PageHome from "../pages/PageHome";
import { setAuthStore } from "../store/slices/authSlice";

import Approval from "../pages/Admin/Approval/Approval";
import DetailCourse from "../pages/Admin/Courses/DetailCourse";
import EditCourse from "../pages/Admin/Courses/EditCourse";
import CategoryCourse from "../pages/CategoryCourse";
import RegisterTeacher from "../pages/Admin/RegisterTeacher";
import Teacher from "../pages/Admin/Teacher/Teacher";
import Favorite from "../pages/Favorite";
import DetailCourseHomePage from "../pages/DetailCourseHomePage";
import axios from "axios";
import EditCategory from "../pages/Admin/Categorys/EditCategory";
import DetailCategory from "../pages/Admin/Categorys/DetailCtegory";
import { setCourseStore } from "../store/slices/courseSlice";
import CheckName from "../pages/Admin/Checkname/CheckName";
import ViewUserJoinCourse from "../pages/Admin/Courses/ViewUserJoinCourse";
import Quiz from "../pages/Admin/Quiz/Quiz";
import AddTeacher from "../pages/Teacher/RegisterTeacher";
import Profile from "../pages/Admin/Users/Profile";
import ShowQuiz from "../pages/Admin/Quiz/ShowQuiz";
import DetailQuiz from "../pages/Admin/Quiz/DetailQuiz";
import QuestionCard from "../pages/Admin/Quiz/QuestionCard";
import SimpleAccordion from "../pages/Admin/Quiz/Accordion";




const RouteAllPage: FC = () => {

    const { email, status, photoURL, favorite, about } = useAppSelector(({ auth }) => auth)
    const auth_uid = email !== undefined && email !== null


    const dispatch = useAppDispatch()

    useEffect(() => {
        autoSignIn()
    }, [])
    const autoSignIn = async () => {
        console.log('============ send token ====================')
        const url = `${import.meta.env.VITE_REACT_APP_API}auth/me`
        axios.defaults.withCredentials = true
        try {

            const autoSignIn = await axios.get(url)
            console.log("🚀 ~ file: routes.tsx:59 ~ autoSignIn ~ autoSignIn", autoSignIn)
            const data = autoSignIn.data.user.payload.image_rul
            const user_data = autoSignIn.data.data_new
            const new_favorite = user_data.favorite
            const new_email = user_data.email
            const new_join = user_data.course_join
            const new_status = user_data.status
            const firstName = user_data.firstName
            const lastName = user_data.lastName
            const new_id_document = user_data.id_document

            const displayName = `${firstName} ${lastName}`
            dispatch(setAuthStore({
                uid: new_id_document,
                email: new_email,
                displayName,
                status: new_status,
                favorite: new_favorite,
                photoURL: data,
            }))
            dispatch(setCourseStore({
                uid_course: new_join,

            }),
            )

        } catch (err) {
            console.log("🚀 ~ filse: middleware.ts:18 ~ autoSignIn ~ err", err)

        }
        console.log("🚀========== success set redux =========")
    }



    return (
        <Routes>
            <Route path="/" element={<PageHome />} />
            {/* <Route path="/pagehome" element={<PageHome />} /> */}
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/adminlogin" element={<LoginAdmin />} />
            <Route path="/registerteacher" element={<RegisterTeacher />} />
            <Route path="/registor" element={<Registor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/editcategory/:id" element={<EditCategory />} />
            <Route path="/detailcategory/:id" element={<DetailCategory />} />
            <Route path="/detailcoursehomepage/:id" element={<DetailCourseHomePage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/nextregistor" element={<Nextregistor />} />
            <Route path="/testgrid" element={<Testgrid />} />
            <Route path="/users" element={<User />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/detailuser/:id" element={<DetailUser />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/detailcourse/:id" element={<DetailCourse />} />
            <Route path="/editcourse/:id" element={<EditCourse />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/addcourses" element={<AddCourse />} />
            <Route path="/teacher" element={<Teacher />} />
            <Route path="/category" element={<Category />} />
            <Route path="/addcategory" element={<AddCategory />} />
            <Route path="/approval" element={<Approval />} />
            <Route path="/category_course" element={<CategoryCourse />} />
            <Route path="/viewuserjoincourse/:id" element={<ViewUserJoinCourse />} />
            <Route path="/checkname" element={<CheckName />} />
            <Route path="/quiz/:id" element={<Quiz />} />
            <Route path="/createteacher" element={<AddTeacher />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/showquiz/:id/:id_quiz" element={<ShowQuiz />} />
            <Route path="/detailquiz/:id/:id_quiz" element={<DetailQuiz />} />
            <Route path="/quizuser/:id_course/:id_quiz" element={<QuestionCard />} />
            <Route path="/accordion" element={<SimpleAccordion />} />
            <Route
                path="*"
                element={<>{email === null ? <NotFoundPage /> : null}</>}
            />
        </Routes>
    )
}


const NotFoundPage: FC = () => {
    return (
        <h2>Error 404 : Not Found Page</h2>
    )
}

export default RouteAllPage