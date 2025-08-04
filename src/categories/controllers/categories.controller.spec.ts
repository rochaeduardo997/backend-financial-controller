/* eslint-disable @typescript-eslint/no-unsafe-argument */
import request from 'supertest';

import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { AuthGuard } from '@shared/guards/auth.guard';
import { categoryMock } from '@shared/mocks/types/categories.type.mock';
import { CategoriesController } from '@categories/controllers/categories.controller';
import { categoriesRepositoryMock } from '@shared/mocks/repositories/categories.repository.mock';
import { CategoriesService } from '@categories/services/categories.service';
config();

describe('UserController', () => {
  let app: INestApplication;

  const categoryMock1 = categoryMock(1);
  const categoryMock2 = categoryMock(2);

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        CategoriesService,
        {
          provide: 'ICategoriesRepository',
          useValue: categoriesRepositoryMock(categoryMock1, categoryMock2),
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

  describe('Save', () => {
    describe('Success', () => {
      it('should save a new category', async () => {
        const toSend = {
          ...categoryMock1,
          id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          userId: undefined,
        };
        const { body, status } = await request(app.getHttpServer())
          .post('/categories')
          .send(toSend);
        const expected = {
          ...categoryMock1,
          password: undefined,
        };
        expect(body).toEqual(expected);
        expect(status).toBe(201);
      });
    });

    describe('Fail', () => {
      it.each([
        ['by invalid name type', { name: 1 }, 'name must be a string'],
        [
          'by small name',
          { name: 'a' },
          'name must be longer than or equal to 3 characters',
        ],
        [
          'by longer name',
          {
            name: `${Array.from({ length: 51 }, (v, i) => i + 1).toString()}aA!`,
          },
          'name must be shorter than or equal to 50 characters',
        ],
        [
          'by longer description',
          {
            description: `${Array.from({ length: 51 }, (v, i) => i + 1).toString()}aA!`,
          },
          'description must be shorter than or equal to 70 characters',
        ],
      ])('should fail on save a new user %s', async (_, field, expected) => {
        const toSend = {
          ...categoryMock1,
          ...field,
          id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          userId: undefined,
        };
        const { body, status } = await request(app.getHttpServer())
          .post('/categories')
          .send(toSend);
        expect(body.message[0]).toEqual(expected);
        expect(status).toBe(400);
      });
    });
  });

  describe('Find by id', () => {
    describe('Success', () => {
      it('should find category by id', async () => {
        const { body, status } = await request(app.getHttpServer())
          .get('/categories/1')
          .set('Authorization', 'Bearer token');
        const expected = { ...categoryMock1 };
        expect(body).toEqual(expected);
        expect(status).toBe(200);
      });
    });
  });

  describe('Find all', () => {
    describe('Success', () => {
      it('should find all categories', async () => {
        const { body, status } = await request(app.getHttpServer())
          .get('/categories')
          .set('Authorization', 'Bearer token');
        const expected = [categoryMock1, categoryMock2];
        expect(body).toEqual(expected);
        expect(status).toBe(200);
      });
    });
  });

  describe('Update', () => {
    describe('Success', () => {
      it('should update category', async () => {
        const toSend = {
          ...categoryMock2,
          id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          userId: undefined,
        };
        const { body, status } = await request(app.getHttpServer())
          .patch('/categories/1')
          .set('Authorization', 'Bearer token')
          .send(toSend);
        const expected = {
          ...categoryMock2,
          id: categoryMock1.id,
        };
        expect(body).toEqual(expected);
        expect(status).toBe(200);
      });
    });
  });
});
