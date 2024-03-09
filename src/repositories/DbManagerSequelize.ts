import { FindOptions, Model, ModelStatic } from "sequelize";
import { UserIn, UserOut } from "../models/UserTypes";
import { IDbManager } from "./models/IDbManager";


export class DbManagerSequelize implements IDbManager{
    
    constructor( public dbInstance: ModelStatic<Model<any, any>>){
        this.dbInstance = dbInstance;
    }

    findAll(filter?: FindOptions): Promise<any[]> {
          return this.dbInstance.findAll(filter)  
    };
    
    findByPk(id: number): Promise<any> {
        return this.dbInstance.findByPk(id)
    };
    
    create(user: UserIn): Promise<any>{
        return this.dbInstance.create(user)
    };
    
    update(id: number, user: UserIn): Promise<any>{
        return this.dbInstance.update({name: user.name, email: user.email}, {
            where:{
                id:id
            }
        })
    };
    
    destroy(id: number): Promise<any>{
        return this.dbInstance.destroy({
            where:{
                id:id
            }
        })
    };
}