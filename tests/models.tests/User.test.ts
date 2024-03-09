
import { User, UserInsert } from "../../src/models/User";
import { UserIn, UserOut } from "../../src/models/UserTypes";


describe('User class, sendo o objeto de saída dos dados.', () => {
    test('Cria uma nova instância da classe User', () => {
        const user = new User(1, 'Teste', 'teste@email.com');
        expect(user).toBeInstanceOf(User);
        expect(user.id).toBe(1);
        expect(user.name).toBe('Teste');
        expect(user.email).toBe('teste@email.com');
    });

    test('Retorna a representação correta do objeto User seguindo o padrão type específico.', () => {
        const user = new User(1, 'Teste', 'teste@email.com');
        const userObject: UserOut = user.toObject();

        expect(userObject).toEqual({
            id: 1,
            name: 'Teste',
            email: 'teste@email.com',
        });
    });
});

describe('UserInsert class', () => {
    test('Cria uma nova instância da classe UserInsert, sendo o objeto de recebimento de dados.', () => {
        const userInsert = new UserInsert('Teste', 'teste@email.com');
        expect(userInsert).toBeInstanceOf(UserInsert);
        expect(userInsert.name).toBe('Teste');
        expect(userInsert.email).toBe('teste@email.com');
        
    });

    test('Retorna a representação correta do objeto UserInsert seguindo o padrão do type específico.', () => {
        const userInsert = new UserInsert('Teste', 'teste@email.com');
        const userInsertObject: UserIn = userInsert.toObject();
        expect(userInsertObject).toEqual({
            name: 'Teste',
            email: 'teste@email.com',
        });
    });
});