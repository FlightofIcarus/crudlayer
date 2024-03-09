import { FindOptions, Op } from "sequelize";
import { UserIn, UserOut } from "../models/UserTypes";
import { User as UserOutput, UserInsert } from "../models/User";
import { User } from "../database/database";
import { IDbManager } from "../repositories/models/IDbManager";

type DbReturn = {
    dataValues: {
    id: number,
    name: string,
    email: string,
    cretedAt: string,
    updatedAt: string
    }
}

class UserService{

    constructor(public userIntance: IDbManager){
        this.userIntance = userIntance;
    }
    
    async selectAll(): Promise<UserOut[]>{
        
        const users: DbReturn[] = await this.userIntance.findAll()

        const UserList:UserOut[] = []

        users.every(user => UserList.push(new UserOutput(user.dataValues.id, user.dataValues.name, user.dataValues.email).toObject()));
        
        return UserList;

    };

    async selectById(id: number): Promise<UserOut>{
        
        const user = await this.userIntance.findByPk(id);

        const userReturn = new UserOutput(user?.dataValues.id, user?.dataValues.name, user?.dataValues.email);
        
        return userReturn;
        
    };


    async selectWithFilters(obj:{}): Promise<UserOut[]>{
        const filterQuery: string[] = await Object.keys(obj);
        const filterValues: string | number[] = await Object.values(obj);
        const dynamicFilters: Record<string, any> = {};
        
        filterQuery.map((key: string, index: number) => {
            dynamicFilters[key] = {[Op.like]: `%${filterValues[index]}%`}
        })

        const filter: FindOptions = {
            where: dynamicFilters,
        }

        const filtedList: DbReturn[] = await this.userIntance.findAll(filter);

        const UserList:UserOut[] = [];

        filtedList.every(user => UserList.push(new UserOutput(user.dataValues.id, user.dataValues.name, user.dataValues.email).toObject())); // true
        
        return UserList;
    };

    async insertItem(user: UserIn){
       
        const {name, email} = await user;
        this.userIntance.create({name: name, email: email})
    };

    async updateItem(id: number, user:UserIn){
        this.userIntance.update(id, user)
    };

    async deleteItem(id: number){
        this.userIntance.destroy(id)
    };

};

export default UserService