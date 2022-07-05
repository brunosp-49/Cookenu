import { Request, Response } from "express";
import { UserDataBase } from "../data/UserDataBase";
import { Authenticator } from "../services/authenticator";


export async function getUserById(req: Request, res: Response) {
    try {
        const {id} = req.params;
        const token = req.headers.authorization;

        if(!id || !token){
            throw new Error("The params and the token shall be send")
        }
        const auth = new Authenticator();
        const checkToken = auth.getTokenData(token)

        const base = new UserDataBase();
        const detail: any = await base.findUserDetails(id);

        if(!detail){
            throw new Error("User is not found")
        }
        res.status(200).send(detail);
    } catch (error) {
        res.status(400).send({menssage: error})
    }
}