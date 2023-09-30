import { loginData } from '@/interfaces/login';
import * as yup from 'yup';

export const loginSchema: yup.ObjectSchema<loginData> = yup.object({
    email: yup.string().required("Email es obligatorio").defined().default(""),
    password: yup.string().required("La contraseña es obligatoria").defined().default(""),
    id: yup.number().defined().default(0)
}).defined()