import { ObjectId } from "mongoose";


export interface DTO {
    id?: ObjectId;
    symbol: string;
    value: number;
    when: Date
}