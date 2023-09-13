import { ICreateUserDTO } from "../dto/user";
import { USER_CREATE_DTO_INVALID_MESSAGE } from "../constants";


export function validateUserCreateDTO(user: ICreateUserDTO) {
    if(user.email.length === 0 || user.name.length === 0 || user.password.length === 0) {
        throw new Error(USER_CREATE_DTO_INVALID_MESSAGE);
    }
}