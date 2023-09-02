import { loginSchema } from "@/helpers/validations/login/loginSchema"
import { userData } from "@/interfaces/login"
import { signup } from "@/services/loginService"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

export const useRegisterForm = () => {

    const router = useRouter()

    const methods = useForm<userData>({
        reValidateMode: 'onChange',
        resolver: yupResolver(loginSchema),
        defaultValues: loginSchema.cast({})
    })

    const handleSubmit = async (userData: userData) => {
        try {
            const res = await signup(userData)
            console.log(res)
            if (res?.data.message == "Signup succes") {
                toast.success('Todo correcto pleb!.')
                setTimeout(() => {
                    router.push('/')
                }, 1000)
            }
        } catch (error: any) {
            toast.error('No se pudo procesar la solicitud!.')
        }
    }

    return {
        methods,
        handleSubmit
    }
}