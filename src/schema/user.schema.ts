import { ValidationInterceptor } from '../utils/validateSql'
export const LoginValidationSchema = {
    username: { required: true, minLength: 3 },
    password: { required: true, minLength: 3 }
};

export const userIdSchema = {
    userId: { required: true, minLength: 1 },
};
export const loginValidator = new ValidationInterceptor(LoginValidationSchema)
export const userIdValidator = new ValidationInterceptor(userIdSchema)

