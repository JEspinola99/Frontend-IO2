import { loginSchema } from "@/helpers/validations/login/loginSchema"
import { loginData } from "@/interfaces/login"
import { login } from "@/services/loginService"
import { useUserStore } from "@/store/user"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import toast from 'react-hot-toast';

export const useLoginForm = () => {

    const router = useRouter()

    const setUser = useUserStore((state) => state.setUser)

    const methods = useForm<loginData>({
        reValidateMode: 'onChange',
        resolver: yupResolver(loginSchema),
        defaultValues: loginSchema.cast({})
    })
    
    const handleSubmit: SubmitHandler<loginData> = async(data) => {
        try{
            const res = await login(data)
            console.log(res?.data)
            if(res?.data == "Logged in succesfully"){
                setUser(data.email)
                toast.success('Todo correcto!.')
                setTimeout(()=> {
                    router.push('espacio')
                }, 1000)
            }
        }catch(error:any){
            if(error.response?.data?.message == "Wrong credentials"){
                toast.error('Email o contraseña invalidos!.')
            }
        }
    }

    return {
        methods,
        handleSubmit
    }
}