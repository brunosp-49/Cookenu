import { User } from "../entities/User";
import { BaseDataBase } from "./BaseDataBase";

export class UserDataBase extends BaseDataBase{
    public async createUser(user:User){
        try {
            await BaseDataBase.connection("users").insert({
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword()
            })
        } catch (error:any) {
            throw new Error(error)
        }
    }


    public async findUserByEmail(email:string): Promise<User>{
        try {
            const user = await BaseDataBase.connection("users").select("*").where({email});

        return user[0] && User.toUserModel(user[0])
        } catch (error:any) {
            throw new Error(error)
        }
    }

    public async findUserDetails(id:string): Promise<void>{
        try {
            const user = await BaseDataBase.connection("users").select("id", "email", "name").where({id});
            return user[0];
        } catch (error:any) {
            throw new Error(error)
        }
    }
}