import { Request, Response } from "express";
import UserService from "../services/UserService";
import { UserIn, UserOut } from "../models/UserTypes";
import { User as UserOutput, UserInsert } from "../models/User";



class UserController {
    userService: UserService
    constructor(userService: UserService){
        this.userService = userService;
    }
    
    listAllUsers = async (req: Request, res: Response): Promise<void> => {
        const queryRequest: {} = await req.query;
     
        if(Object.keys(queryRequest).length === 0){

            const UsersList = await this.userService.selectAll();
            
            console.log(UsersList);
            
            res.json(UsersList).status(200);
        }else{
            const UserList = await this.userService.selectWithFilters(queryRequest);
            console.log(UserList);

            res.json(UserList).status(200);
            
        }
      
    };

    listUserById = async (req: Request, res: Response): Promise<void> => {

        const id = await req.params.id;

        const listId = await this.userService.selectById(Number(id));

        res.json(listId).status(200);
    };

    createNewUser = async (req: Request, res: Response): Promise<void> => {   

        const newUser = new UserInsert(req.body.name, req.body.email)   
    
        
       const create = await this.userService.insertItem(newUser.toObject());

        res.send('Usuário criado com sucesso.').status(201);
    };

    updateUser = async (req: Request, res: Response): Promise<void> => {
        const id = await req.params.id;

        const newUser = new UserInsert(req.body.name, req.body.email) 

        this.userService.updateItem(Number(id), newUser.toObject())
        res.send('Usuário atualizado com sucesso.').status(204);
    };

    deleteUser = async (req: Request, res: Response): Promise<void> => {
        const id = await req.params.id;

        this.userService.deleteItem(Number(id))
        res.send('Usuário deletado com sucesso.').status(204);
    };
}


export default UserController