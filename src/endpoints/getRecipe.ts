import { Request, Response } from "express";
import { RecipesDataBase } from "../data/RecipesDataBase";
import { Authenticator } from "../services/authenticator";

export async function getRecipe(req: Request, res: Response) {
    try {
        const {id} = req.params
        const token:any = req.headers.authorization;

        const auth = new Authenticator();
        auth.getTokenData(token)

        const base = new RecipesDataBase();
        const result = await base.getRecipeById(id);

        res.status(200).send(result);

    } catch (error) {
        res.status(400).send({menssage: error})
    }
}