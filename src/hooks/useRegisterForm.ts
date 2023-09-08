import { loginSchema } from "@/helpers/validations/login/loginSchema"
import { registerSchema } from "@/helpers/validations/register/registerSchema"
import { registerData } from "@/interfaces/register"
import { signup } from "@/services/loginService"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from 'react-hot-toast';

export const useRegisterForm = () => {

    const router = useRouter()

    const methods = useForm<registerData>({
        reValidateMode: 'onChange',
        resolver: yupResolver(registerSchema),
        defaultValues: registerSchema.cast({})
    })

    const handleSubmit: SubmitHandler<registerData> = async (data) => {
        try {
            const res = await signup(data)
            console.log(res)
            if (res?.data.message == "Signup succes") {
                toast.success('Todo correcto!.')
                setTimeout(() => {
                    router.push('/login')
                }, 1000)
            }
        } catch (error: any) {
            const message = 'Password has to be at between 3 and 20 chars'
            if(message == 'Password has to be at between 3 and 20 chars'){
                toast.error(message)
            }else{
                toast.error('No se pudo procesar la solicitud!.')
            }
        }
    }

    return {
        methods,
        handleSubmit
    }
}