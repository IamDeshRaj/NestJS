import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUser } from '../src/models/request/create-user';

describe('Authentication Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Testing signup', async () => {
    const emailId = 'abcd3@gmail.com';
    const res = await request(app.getHttpServer())
      .post('/auth/signup').send({ email: emailId, password: 'abcdt' } as CreateUser)
      .expect(201);

    const { id, email } = res.body;
    expect(id).toBeDefined();
    expect(email).toEqual(emailId);
    const cookie = res.get('Set-Cookie');

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami').set('Cookie', cookie).expect(200);

    expect(body.email).toEqual(email);
  });
});
