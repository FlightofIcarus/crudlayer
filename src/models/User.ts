import { UserIn, UserOut } from "./UserTypes";

export class User{
    constructor(public id:number, public name:string, public email:string){
        
        Object.assign(this, {id, name, email})
    }
    toObject(): UserOut {
        return { id: this.id, name: this.name, email: this.email };
    }

}

export class UserInsert{
    constructor(public name: string, public email: string){

        Object.assign(this, {name, email})
    }
    toObject(): UserIn {
        return { name: this.name, email: this.email };
    }

}