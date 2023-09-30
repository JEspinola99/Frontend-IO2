import { loginSchema } from "@/helpers/validations/login/loginSchema"
import { loginData } from "@/interfaces/login"
import { login, signout } from "@/services/loginService"
import { useUserStore } from "@/store/user"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from 'react-hot-toast';

export const useLoginForm = () => {

    const router = useRouter()

    const [fetching, setIsFetching] = useState(false)

    const setUser = useUserStore((state) => state.setUser)

    const methods = useForm<loginData>({
        reValidateMode: 'onChange',
        resolver: yupResolver(loginSchema),
        defaultValues: loginSchema.cast({})
    })

    const handleSubmit: SubmitHandler<loginData> = async (data) => {
        try {
            setIsFetching(() => true)
            const res = await login(data)
            const resData = res?.data
            console.log(res)
            setUser(resData.email, resData.id)
            // setTimeout(()=> {
            router.push('/')
            // })
        } catch (error: any) {
            toast.error(error.response?.data?.message)
        } finally {
            setIsFetching(() => false)
        }
    }

    const handleLogout = async () => {
        try {
            await signout()
            router.push("/login")
        } catch {
            toast.error('No se pudo procesar la solicitud')
        }
    }

    return {
        methods,
        handleSubmit,
        fetching,
        handleLogout
    }
}