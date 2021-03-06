import {getRepository} from "typeorm"
import {Users, IUser} from "../model/user"


export const getAllUsers = async (): Promise<Response> =>{

    const allUsers = await getRepository(Users).query(`SELECT * FROM Users`)
    console.log(allUsers)
    return allUsers
}

export const getUserFiltered = async(email: string, level: number, rol: string):Promise<IUser[]> =>{
    const usersFiltered = await getRepository(Users).query(`EXEC GetFilteredUser @emailUser = @0,@levelUser = @1,@rol = @2`,
    [email,
    level,
    rol])
    console.log(usersFiltered)
    return usersFiltered
}

export const getUserById = async(idUser: string):Promise<Response> =>{
    const user = await getRepository(Users).query(`SELECT * FROM Users WHERE idUser = @0`, [idUser])
    return user[0]
}

export const getUserByEmail = async(emailUser: string):Promise<IUser> =>{
    const user = await getRepository(Users).query(`SELECT * FROM Users WHERE emailUser = @0`, [emailUser])
    return user[0]
}

export const getUsersByLevel = async(idLevel: number):Promise<IUser[]> =>{
    const user = await getRepository(Users).query(`SELECT * FROM Users WHERE level = @0`, [idLevel])
    return user
}

export const getEmailUserByEmail = async(emailUser: string) =>{
    try{
        const user = await getRepository(Users).query(`SELECT emailUser FROM Users WHERE emailUser = @0`, [emailUser])
        return user[0].emailUser
    }catch(error){
       return "" 
    }
}
export const getPasswordUserByEmail = async(emailUser: string)=>{
    try{
        const user = await getRepository(Users).query(`SELECT passwordUser FROM Users WHERE emailUser = @0`, [emailUser])
    return user[0].passwordUser
    }catch(error){
        return ""
    }
}

export const saveUser = async(user: IUser, passwordEncripted:any) =>{
    try{
        const newUser = await getRepository(Users).query(`INSERT INTO Users(emailUser, passwordUser, rol, level) VALUES ( @0, @1,@2,@3);`, [user.emailUser, passwordEncripted, user.rolUser, user.levelUser])
        return "saved"
    }catch(error){
        return "no saved"
    }
    
    
}