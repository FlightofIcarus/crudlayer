import Express from "express";
import "dotenv/config";
import morgan from "morgan";
import usersRouter from "./routes/userRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerConfig";



const server = Express();
server.use(morgan('dev'));
server.use(Express.json());
server.use(Express.urlencoded());
server.use('/api/users', usersRouter)
server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.get('/', (req, res) => {
    res.send('Tá funfando.')
})
server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor online na porta ${process.env.PORT}`);
    
});


export default server;