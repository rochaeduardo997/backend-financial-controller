/* eslint-disable @typescript-eslint/no-unsafe-argument */
import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { usersRepositoryMock } from '@shared/mocks/repositories/users.repository.mock';
import { userMock } from '@shared/mocks/types/users.type.mock';
import { config } from 'dotenv';
import { AuthGuard } from '@shared/guards/auth.guard';
import { AdminUsersController } from '@users/admins/controllers/admin-users.controller';
import { AdminUsersService } from '@users/admins/services/admins.service';
import { UsersService } from '@users/services/users.service';
config();

describe('UserAdminController', () => {
  let app: INestApplication;

  const userMock1 = userMock(1);
  const userMock2 = userMock(2);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUsersController],
      providers: [
        AdminUsersService,
        UsersService,
        {
          provide: 'IUsersRepository',
          useValue: usersRepositoryMock(userMock1, userMock2),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(() => true)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  describe('Find all', () => {
    describe('Success', () => {
      it('should find all users', async () => {
        const { body, status } = await request(app.getHttpServer())
          .get('/admin/users')
          .set('Authorization', 'Bearer token');
        const expected = [
          {
            ...userMock1,
            password: undefined,
          },
          {
            ...userMock2,
            password: undefined,
          },
        ];
        expect(body).toEqual(expected);
        expect(status).toBe(200);
      });
    });
  });

  describe('Save', () => {
    describe('Success', () => {
      it('should save a new user', async () => {
        const toSend = { ...userMock1, id: undefined };
        const { body, status } = await request(app.getHttpServer())
          .post('/admin/users')
          .send(toSend);
        const expected = {
          ...userMock1,
          password: undefined,
        };
        expect(body).toEqual(expected);
        expect(status).toBe(201);
      });
    });

    describe('Fail', () => {
      it.each([
        ['by invalid email', { email: 'invalid' }, 'email must be an email'],
        [
          'by invalid password type',
          { password: 1 },
          'password must be a string',
        ],
        [
          'by invalid password',
          { password: 'pass' },
          'password must be longer than or equal to 8 characters',
        ],
        [
          'by small password length',
          { password: '1aA!' },
          'password must be longer than or equal to 8 characters',
        ],
        [
          'by big password length',
          {
            password: `${Array.from({ length: 51 }, (v, i) => i + 1).toString()}aA!`,
          },
          'password must be shorter than or equal to 50 characters',
        ],
        ['by invalid name type', { name: 1 }, 'name must be a string'],
        [
          'by small name',
          { name: 'a' },
          'name must be longer than or equal to 3 characters',
        ],
        [
          'by small name',
          {
            name: `${Array.from({ length: 51 }, (v, i) => i + 1).toString()}aA!`,
          },
          'name must be shorter than or equal to 50 characters',
        ],
      ])('should fail on save a new user %s', async (_, field, expected) => {
        const toSend = {
          ...userMock1,
          ...field,
          id: undefined,
        };
        const { body, status } = await request(app.getHttpServer())
          .post('/admin/users')
          .send(toSend);
        expect(body.message[0]).toEqual(expected);
        expect(status).toBe(400);
      });
    });
  });

  describe('Find by id', () => {
    describe('Success', () => {
      it('should find user by id', async () => {
        const { body, status } = await request(app.getHttpServer())
          .get('/admin/users/1')
          .set('Authorization', 'Bearer token');
        const expected = {
          ...userMock1,
          password: undefined,
        };
        expect(body).toEqual(expected);
        expect(status).toBe(200);
      });
    });
  });

  describe('Update', () => {
    describe('Success', () => {
      it('should find user by id', async () => {
        const toSend = { ...userMock2, id: undefined, password: undefined };
        const { body, status } = await request(app.getHttpServer())
          .patch('/admin/users/1')
          .set('Authorization', 'Bearer token')
          .send(toSend);
        const expected = {
          ...userMock2,
          id: userMock1.id,
          password: undefined,
        };
        expect(body).toEqual(expected);
        expect(status).toBe(200);
      });
    });
  });
});
