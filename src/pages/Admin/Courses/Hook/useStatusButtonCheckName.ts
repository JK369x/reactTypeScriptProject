import { useDispatch } from 'react-redux';
import axios from "axios"

import { useEffect, useState } from "react"
import { useAppSelector } from "../../../../store/useHooksStore";
import { setbtnStore } from '../../../../store/slices/buttonSlice';


export const useStatusButtonCheckName = () => {

    const dispatch = useDispatch()
    const BtnstatusCheckName = async (id: string, status: boolean) => {
        console.log("click check name update =", status)

        try {

            const url = `${import.meta.env.VITE_REACT_APP_API}course/updatebtncheckname/${id}/${status}`
            axios.defaults.withCredentials = true
            const statusBtn = await axios.put(url, { status })
            const result = statusBtn.data.status





        } catch (error) {
            console.log(error)
            return false
        }
    }

    return { BtnstatusCheckName }
}