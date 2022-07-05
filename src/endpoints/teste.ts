import { Request, Response } from "express";
import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/authenticator";
import { idGenerator } from "../services/idGenerator";

export async function teste(req: Request, res: Response) {
    try {
        const {token} = req.params
        const testepai = new idGenerator()
        const id = testepai.generate();
        const userDataBase = new UserDataBase();
        const user = await userDataBase.findUserByEmail("teste@gmail.com");
        const tokenManeger = new Authenticator()
        const tokenToId:any = tokenManeger.getidToken(token)
        res.status(200).send(tokenToId.id)
    } catch (error) {
        res.status(500).send({menssage: error})
    }
}