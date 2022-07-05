import { BaseDataBase } from "../data/BaseDataBase";
import * as jwt from "jsonwebtoken"

export interface AuthenticationData{
    id: string
}

export class Authenticator{
    public generate(input: AuthenticationData): string   {
        const token = jwt.sign(input, process.env.JWT_KEY as string , {
            expiresIn: process.env.TOKEN_EXPIRE_IN
        });
        return token
}

    public getTokenData(token: string): AuthenticationData{
        const data = jwt.verify(token, process.env.JWT_KEY as string)
        return data as AuthenticationData
    }

    public getidToken(token:string): string{
        const id = jwt.decode(token)
        return id as string
    }
}