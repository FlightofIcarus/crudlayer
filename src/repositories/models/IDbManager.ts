import { FindOptions } from "sequelize";
import { UserIn, UserOut } from "../../models/UserTypes";

export interface IDbManager{
    findAll(filter?: FindOptions): Promise<any>;
    
    findByPk(id: number): Promise<any>;
    
    create(user: UserIn): Promise<any>
    
    update(id: number, user: UserIn): Promise<any>
    
    destroy(id: number): Promise<any>
}