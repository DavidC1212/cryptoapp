import Joi from "joi";
import { DTO } from "../../models/user-symbol/dto";

export const addSymbolValidator = Joi.object<DTO>(
    {
        symbol: Joi.string().length(3).uppercase().required()
    }
)