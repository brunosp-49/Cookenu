import { Request, Response } from "express";
import { UserDataBase } from "../data/UserDataBase";
import { User } from "../entities/User";
import { Authenticator } from "../services/authenticator";
import { HashManager } from "../services/hashManager";
import { idGenerator } from "../services/idGenerator";

export async function singUp(req: Request, res: Response) {
    try {
        const {name, email, password} = req.body;
        if(!name || !email || !password){
            res.status(422).send("The whole body shall be send")
        }
        if(password.length < 6){
            res.status(422).send("The password must be longer than 5 characters")
        }
        const userDataBase = new UserDataBase();
        const user = await userDataBase.findUserByEmail(email);
        if(user){
            res.status(409).send("This email is already registered")
        }
        const IdGenerator = new idGenerator()
        const id = IdGenerator.generate()
        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)
        const newUser = new User(id, name, email, hashPassword)
        await userDataBase.createUser(newUser)
        const authenticator = new Authenticator()
        const token = authenticator.generate({id})
        res.status(200).send({menssage: "User created succeed", token})
    } catch (error) {
        res.status(400).send({menssage: error})
    }
}