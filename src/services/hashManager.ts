import { BaseDataBase } from "../data/BaseDataBase";
import * as bcrypt from "bcryptjs"

export class HashManager extends BaseDataBase{
    public async hash(text: string): Promise<string>{
        const rounds = Number(process.env.BCRYPT_ROUNDS)
        const salt = await bcrypt.genSalt(rounds)
        return bcrypt.hash(text, salt)
    }
    public async compare(text:string, hash:string): Promise<boolean>{
        return bcrypt.compare(text, hash)
    }
}