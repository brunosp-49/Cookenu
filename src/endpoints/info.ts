import { Request, Response } from "express";
import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/authenticator";

export async function info(req: Request, res: Response) {
    try {
        const token = req.headers.authorization;
        if(!token){
            throw new Error("The token has be passed.")
        }
        const auth = new Authenticator();
        const id:any = auth.getidToken(token)
        const dataBase = new UserDataBase();
        const userDetail = await dataBase.findUserDetails(id.id)

        res.status(200).send(userDetail)
    } catch (error) {
        res.status(400).send({menssage: error})
    }
}