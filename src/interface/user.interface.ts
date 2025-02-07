export type CurrentView = 'list' | 'form'; 
 
type Roles = "ADMIN" | "USER" | "MANAGER"
 
 export interface UserPost {
    User_dni: number,
    User_role: Roles
    User_name: string,
    User_surname: string,
    User_email: string,
    User_password: string,
    User_passwordConfirm: string,
    User_phoneNumber: string,
    User_address: string,
    User_depId: number
} 