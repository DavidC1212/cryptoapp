import { DTO } from "./dto";

export interface Model {
    add(userSymbol: DTO): Promise<DTO>;
    getForUser(userId: number): Promise<DTO[]>;
    getUniqueSymbols(): Promise<string[]>;
}