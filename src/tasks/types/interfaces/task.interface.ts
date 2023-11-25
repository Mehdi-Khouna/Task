import { IIdentifiable } from "src/shared";

export interface ITask extends IIdentifiable {
    name : string;
    description : string;
}