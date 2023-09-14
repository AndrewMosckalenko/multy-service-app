import { ICreateUserDTO } from "../dto/user";
import { USER_CREATE_DTO_INVALID_MESSAGE, USER_NOT_LOGIN_MESSAGE } from "../constants";
import { IUser } from "src/entities/user.entity";


export function validateUserCreateDTO(user: ICreateUserDTO) {
    if(user.email.length === 0 || user.name.length === 0 || user.password.length === 0) {
        throw new Error(USER_CREATE_DTO_INVALID_MESSAGE);
    }
}

export function validPassword(user: IUser, password: string) {
    // @todo
    return user.password === password
}

export function validUser(user: IUser, password: string) {
    if(!user || !validPassword(user, password)) {
        throw new Error(USER_NOT_LOGIN_MESSAGE);
    }
}