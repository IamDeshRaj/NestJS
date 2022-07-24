import { Test } from '@nestjs/testing';
import { User } from '../../models/entities/user';
import { CreateUser } from '../../models/request/create-user';
import { UsersService } from '../users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userServiceMock: Partial<UsersService>;

  beforeEach(async () => {
    userServiceMock = {
      find: () => Promise.resolve([]),
      createUser: (user: CreateUser) => Promise.resolve({id: 1, email: user.email, password: user.password} as User)
    }
  
    const module = await Test.createTestingModule({
      providers: [AuthService, {
        provide: UsersService,
        useValue: userServiceMock
      }]
    }).compile();
  
    service = module.get(AuthService);
  });

  it('Can create instance of auth service',async () => {
    expect(service).toBeDefined();
  });

  it('Test user creation', async () => {
    const user: User = await service.signup({email: 'abcd@gmail.com', password: 'asdaec'});
    const [salt, password] = user.password.split('.');
    expect(password).not.toEqual('asdaec');
    expect(salt).toBeDefined();
    expect(password).toBeDefined();
  });

  it('demo using async : test error thrown for existing user', async () => {
    userServiceMock.find = () => Promise.resolve([{id: 1, email: 'abc@gmail.com', password: 'asdaec'} as User]);
    let user : User;
    try {
      user = await service.signup({email: 'abc@gmail.com', password: 'asdaec'});
    } catch (error) {
      expect(user).toBeUndefined();
    }
  });

  it('demo using done : test error thrown for existing user', (done) => {
    userServiceMock.find = () => Promise.resolve([{id: 1, email: 'abc@gmail.com', password: 'asdaec'} as User]);
    service.signup({email: 'abc@gmail.com', password: 'asdaec'}).then().catch((error: any)=>{
      console.log(error);
    })
    done();
  });

});

