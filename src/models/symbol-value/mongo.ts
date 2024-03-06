import mongoose from "../../db/mongo";
import { DTO } from "./dto";
import Model from "./model";

const schema = new mongoose.Schema<DTO>({
    symbol: String,
    value: Number,
    when: Date,
})

const symbolValueModel = mongoose.model<DTO>('SymbolValue', schema)

class Mongo implements Model{
    async add(symbolValue: DTO): Promise<DTO> {
        const newSymbolValue = new symbolValueModel(symbolValue);
        await newSymbolValue.save();
        return newSymbolValue;

    }
}

const mongo = new Mongo();
export default mongo;
