import { ZodType, ZodTypeDef } from "zod";
import { StatusException } from "./error";

export function validateId(int: string | number): number {
    int = Number(int);
    if (!Number.isSafeInteger(int) || int < 0) {
        throw new StatusException(400, {
            error: "bad_int",
            description: "esperado um id válido",
        })
    }
    return int;
}

export function validate<A, B extends ZodTypeDef, C>(data: unknown, validator: ZodType<A, B, C>): A {
    const result = validator.safeParse(data);
    if (!result.success) {
        console.error(result.error);
        throw new StatusException(400, {
            error: "zod_error",
            description: "ocorreu um erro ao validar o request com zod",
            zod: result.error.errors,
        });
    }
    return result.data;
}