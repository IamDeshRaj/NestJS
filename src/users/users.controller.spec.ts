import { CreateUser } from '@mypleaks/ms-models';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../models/entities/user.entity';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let authServiceMock: Partial<AuthService>;
  let usersServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    authServiceMock = {
      signup: (createUser: CreateUser) => Promise.resolve({ id: Math.floor(Math.random() * 99),
         email: createUser.email, password: createUser.password } as User),
    };
    usersServiceMock = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        },
        {
          provide: UsersService,
          useValue: usersServiceMock
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Test signup', async () => {
    const session = { userId: -10 };
    const user = await controller.createUser({ email: 'test@abc.com', password: 'kasjdn' } as User, session);
    expect(user).toBeDefined();
    expect(user.id).toEqual(session.userId);
  })
});
