export class Recipes{
    constructor(
        private id:string,
        private tittle:string,
        private description:string,
        private user_id: string,
        private creation_date?: Date,
    ){}

    public getId(){
        return this.id
    }
    public getTittle(){
        return this.tittle
    }
    public getDescription(){
        return this.description
    }
    public getUserId(){
        return this.user_id
    }
    public getCreationDate(){
        return this.creation_date
    }
    static toRecipesModel(data:any){
        return new Recipes(data.id, data.tittle, data.description, data.user_id)
    }
}