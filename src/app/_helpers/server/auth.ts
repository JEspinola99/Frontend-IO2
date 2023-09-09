import { JWT_SECRET } from '@/app/constants/constants';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const auth = {
    isAuthenticated,
    verifyToken
}

function isAuthenticated() {
    try {
        verifyToken();
        return true;
    } catch {
        return false;
    }
}

function verifyToken() {
    const token = cookies().get('authorization')?.value ?? '';
    const decoded = jwt.verify(token, JWT_SECRET);
    const id = decoded.sub as string;
    return id;
}