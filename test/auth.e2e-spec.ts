import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authication (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'as1122df211123aeq23s123241@asdf.com';
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'ass23df' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        // console.log(res.body);
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });
  it('signup as a new user then get the currently logged in user', async () => {
    const email = 'asdf1213@asdf.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: 'asdf' })
      .expect(201);

    const cookie = res.get('Set-Cookie') as string[];
    console.log(cookie);

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(email);
  });
});
