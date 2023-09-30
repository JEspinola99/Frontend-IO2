import { registerData } from '@/interfaces/register';
import * as yup from 'yup';

export const registerSchema: yup.ObjectSchema<registerData> = yup.object({
    nombre: yup.string().required('Nombre es obligatorio').default(''),
    // lastName: yup.string().required('Apellido es obligatorio').default(''),
    email: yup.string().required("Email es obligatorio").defined().default(""),
    password: yup.string().required("La contraseña es obligatoria").defined().default("")
}).defined()