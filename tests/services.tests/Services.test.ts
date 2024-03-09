import UserService from "../../src/services/UserService";
import { DbManagerSequelize } from "../../src/repositories/DbManagerSequelize";
import { User as UserOut, UserInsert, User} from "../../src/models/User";
import { UserIn } from "../../src/models/UserTypes";
import { User as dbinstance } from "../../src/database/database";

jest.mock('../../src/repositories/DbManagerSequelize', () => ({
    DbManagerSequelize: jest.fn().mockImplementation(() => ({
      findAll: jest.fn(),
      findByPk: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
    })),
  }));

const userlist = [{dataValues: {id:1, name: 'exemplo', email: 'exemplo@email.com', createdAt: '23/02/2024', updatedAt: '23/02/2024'}}, 
{dataValues:{id: 2, name: 'exemplo2', email: 'exemplo2@email.com', createdAt: '23/02/2024', updatedAt: '23/02/2024'}}]
const returnedList: UserOut[] = [new UserOut(1, 'exemplo', 'exemplo@email.com'), new UserOut(2, 'exemplo2', 'exemplo2@email.com')];
const userById = {dataValues: {id:1, name: 'exemplo', email: 'exemplo@email.com', createdAt: '23/02/2024', updatedAt: '23/02/2024'}}

const mockDbManager = new DbManagerSequelize(dbinstance);
const userservice = new UserService(mockDbManager);

describe('Service Layer', () => {
   
    afterEach(() => {
    jest.clearAllMocks();
});

    test('Instance should be of a specific type to guarantee your correct instantiation.', () => {

        expect(userservice).toBeInstanceOf(UserService);
        expect(DbManagerSequelize).toHaveBeenCalledTimes(1);
    })

    test('Method selectAll should be return a Users array;', async () => {

        
        mockDbManager.findAll = jest.fn().mockResolvedValue(userlist);
        (DbManagerSequelize as any).mockImplementation(() => mockDbManager);
        const userservice = new UserService(mockDbManager);

        const result = await userservice.selectAll();

        expect(result).toEqual(returnedList);

        })

    test('Metohd selectById should be return a User object', async () => {

        mockDbManager.findByPk = jest.fn().mockResolvedValue(userById);
        (DbManagerSequelize as any).mockImplementation(() => returnedList[0]);
        const userservice = new UserService(mockDbManager);
        const result = await userservice.selectById(1);

        expect(result).toEqual(returnedList[0]);

    })

    test('Method selectWithFilters should be return a filted User array.', async () => {
        
        const userlist = [{dataValues:{id: 2, name: 'exemplo2', email: 'exemplo2@email.com', createdAt: '23/02/2024', updatedAt: '23/02/2024'}}];
        mockDbManager.findAll= jest.fn().mockResolvedValue(userlist);
        (DbManagerSequelize as any).mockImplementation(() => mockDbManager);
        const userservice = new UserService(mockDbManager);
        const queryObj = {name: 'exemplo2'};
        const result = await userservice.selectWithFilters(queryObj);
        const filtedList = returnedList.filter((user) => user.name == 'exemplo2')

        expect(result).toEqual(filtedList);
    })

    test('Method insertItem should be create a new User.', async () => {
        const userArray: UserIn[] = [];
        mockDbManager.create = jest.fn(async (user: UserIn) => {
            userArray.push(user)
            return 'Salvo'})
        const userservice = new UserService(mockDbManager);
        const newUser: UserIn = new UserInsert('exemplo', 'exemplo@email.com')
        const result = await userservice.insertItem(newUser);
        
        
        expect(userArray.length).toBeGreaterThan(0);

    })

    test('Method updateItem should be update a User filted by id.', async () => {

        const newUser: UserOut = new User(1, 'exemplo', 'exemplo@email.com');
        const userArray: UserOut[] = [];
        userArray.push(newUser);
        mockDbManager.update = jest.fn( async (id: number, user:UserIn) => {
            userArray.splice((userArray.findIndex(user => user.id === id)), 1, new UserOut(id, user.name, user.email))
        });
        const userservice = new UserService(mockDbManager);
        const updatedUser: UserIn = new UserInsert('exemploatualizado', 'exemploatualizado@email.com');
        const result = await userservice.updateItem(1, updatedUser);
        const validateUser: UserOut = new User(1, updatedUser.name, updatedUser.email);
        expect(userArray[0]).toEqual(validateUser);

    })

    test('Method deleteItem should be delete a User filted by id.', async () => {

        mockDbManager.destroy = jest.fn( async (id: number) => {
            returnedList.splice((returnedList.findIndex(user => user.id == id)), 1)
        });
        const userservice = new UserService(mockDbManager);
        const result = await userservice.deleteItem(1);
        expect(returnedList.length).toBeLessThanOrEqual(1);

    })

})
