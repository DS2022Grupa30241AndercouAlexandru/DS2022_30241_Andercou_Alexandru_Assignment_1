import { Role } from "./role";

export interface User {
    name:string;
    id:number;
    role:Role;
    devices:[]
}
