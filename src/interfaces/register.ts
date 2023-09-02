import { loginData } from "./login";

export interface registerData extends loginData {
    name: string;
    lastName: string;
}