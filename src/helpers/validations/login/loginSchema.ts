import { userData } from '@/interfaces/login';
import * as yup from 'yup';

export const loginSchema: yup.ObjectSchema<userData> = yup.object({
    email: yup.string().required("Email es obligatorio").defined().default(""),
    password: yup.string().required("La contraseña es obligatoria").defined().default("")
}).defined()