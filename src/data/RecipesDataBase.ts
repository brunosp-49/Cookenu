import { Recipes } from "../entities/Recipes";
import { BaseDataBase } from "./BaseDataBase"


export class RecipesDataBase extends BaseDataBase{
    public async createRecipe(recipe: Recipes){
        try {
            const id = recipe.getId();
            const tittle = recipe.getTittle();
            const description = recipe.getDescription();
            const userId:any = recipe.getUserId();

            await BaseDataBase.connection.raw(`
            INSERT INTO recipes 
            (id, tittle, description, user_id) 
            VALUES (
                "${id}", 
                "${tittle}", 
                "${description}", 
                "${userId.id}"
                );
                `)
        } catch (error:any) {
            throw new Error(error)
        }
    }

    public async getRecipeById(id: string){
        try {
            const result = await BaseDataBase.connection("recipes").select("id", "tittle", "description", "creation_date").where({id})
            return result[0];
        } catch (error:any) {
            throw new Error(error)
        }
    }
}

// await BaseDataBase.connection("recipes").insert({
//     id: recipe.getId(),
//     tittle: recipe.getTittle(),
//     description: recipe.getDescription(),
//     user_id: recipe.getUserId()
// })