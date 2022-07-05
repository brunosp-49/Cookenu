import { Request, Response } from "express";
import { UserDataBase } from "../data/UserDataBase";
import { User } from "../entities/User";
import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hashManager";
import { idGenerator } from "../services/idGenerator";

export async function login(req: Request, res: Response) {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(422).send("The whole body shall be send")
        }
        const userDataBase = new UserDataBase();
        const user = await userDataBase.findUserByEmail(email);
        if(!user){
            res.status(409).send("Email or password wasn't sent")
        }
        const hashManager = new HashManager()
        const passwordIsCorrect = await hashManager.compare(password, user.getPassword())
        if(!passwordIsCorrect){
            res.status(401).send("Email or password is wrong")
        }
        const authenticator = new Authenticator()
        const token = authenticator.generate({id: user.getId()})
        res.status(200).send({menssage: "Login succeed", token})
    } catch (error) {
        res.status(400).send({menssage: error})
    }
}