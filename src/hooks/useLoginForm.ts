import { loginSchema } from "@/helpers/validations/login/loginSchema"
import { userData } from "@/interfaces/login"
import { login } from "@/services/loginService"
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast';

export const useLoginForm = () => {

    const router = useRouter()

    const methods = useForm<userData>({
        reValidateMode: 'onChange',
        resolver: yupResolver(loginSchema),
        defaultValues: loginSchema.cast({})
    })
    
    const handleSubmit = async(userData: userData) => {
        try{
            const res = await login(userData)
            if(res?.data.message == "Logged in succesfully"){
                toast.success('Todo correcto!.')
                setTimeout(()=> {
                    router.push('/')
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