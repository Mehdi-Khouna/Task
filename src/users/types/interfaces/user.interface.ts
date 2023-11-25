import { IIdentifiable } from "src/shared";

export interface IUser extends IIdentifiable {
    name : string;
    email: string;
    password : string;
}