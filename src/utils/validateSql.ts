// validation.interceptor.ts
import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

interface ValidationRule {
    required?: boolean;
    maxLength?: number;
    minLength?: number;
    isAlphanumeric?: boolean;
    isEmail?: boolean;
    isAscii?: boolean;
}

interface ValidationSchema {
    [field: string]: ValidationRule;
}

export class ValidationInterceptor {
    constructor(private schema: ValidationSchema) { }

    validate(req: Request, res: Response, next: NextFunction) {
        try {
            const errors: string[] = [];

            // Duyệt qua từng trường trong schema
            for (const [fieldName, rules] of Object.entries(this.schema)) {
                const value = req.body[fieldName] as string;

                // Kiểm tra trường bắt buộc
                if (rules.required && (!value || value.trim() === '')) {
                    errors.push(`${fieldName} is required.`);
                    continue;
                }

                // Bỏ qua các validation khác nếu không có giá trị
                if (!value) continue;

                // Kiểm tra độ dài tối đa
                if (rules.maxLength && value.length > rules.maxLength) {
                    errors.push(`${fieldName} must not exceed ${rules.maxLength} characters.`);
                }

                // Kiểm tra độ dài tối thiểu
                if (rules.minLength && value.length < rules.minLength) {
                    errors.push(`${fieldName} must be at least ${rules.minLength} characters.`);
                }

                // Kiểm tra nếu là alphanumeric
                if (rules.isAlphanumeric && !validator.isAlphanumeric(value, 'en-US')) {
                    errors.push(`${fieldName} must contain only letters and numbers.`);
                }

                // Kiểm tra nếu là email
                if (rules.isEmail && !validator.isEmail(value)) {
                    errors.push(`${fieldName} must be a valid email address.`);
                }

                // Kiểm tra nếu là ký tự ASCII
                if (rules.isAscii && !validator.isAscii(value)) {
                    errors.push(`${fieldName} contains invalid characters.`);
                }
            }

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return
            }

            next();
        } catch (error) {
            next(error);
        }
    }
}