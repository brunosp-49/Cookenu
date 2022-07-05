import { Request, Response } from "express";
import { RecipesDataBase } from "../data/RecipesDataBase";
import { Recipes } from "../entities/Recipes";
import { Authenticator } from "../services/authenticator";
import { idGenerator } from "../services/idGenerator";


export async function createRecipe(req: Request, res: Response) {
    try {
        const {tittle, description} = req.body;
        const token:any = req.headers.authorization;
        if(!token){
            res.status(422).send("The token shall be sent")
        }

        if(!tittle || !description){
            res.status(422).send("The whole body shall be sent")
        }

        const auth = new Authenticator();
        const id_user = auth.getidToken(token)

        const idGen = new idGenerator()
        const id = idGen.generate()

        const recBase = new RecipesDataBase();
        const newRecipe = new Recipes(id, tittle, description, id_user)
        await recBase.createRecipe(newRecipe)
        res.status(201).send("Recipe creation success!")
    } catch (error) {
        res.status(400).send({menssage: error})
    }
}