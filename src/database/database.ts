import { Sequelize, DataTypes } from "sequelize";
import path from "path";

const dbPath = path.join(__dirname,'users_db')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
});

export const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull:false
    }
})

export  function dbInit(): void {
    
    sequelize   

    User

new Promise<void>((resolve, rejects) => {
        sequelize.sync()
        .then(() =>{
             console.log('Database iniciado com sucesso.');
            resolve();
        })
        .catch((err)=>{
            console.log('Erro ao iniciar o Database');
            rejects(err);
            
        })
});
}

