import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { User } from '@app/common';
import { mockDeep } from 'jest-mock-extended';
import { PrismaService } from './prisma.service';

import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { PrismaClient } from '@prisma/client';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    signup: jest.fn(),
    signin: jest.fn(),
    verifyPassword: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
        PrismaService,
        JwtService,
        ConfigService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    // prismaService = module.get(PrismaService);
  });

  describe('signup', () => {
    it('should call authService.signup and return the result', async () => {
      const signupDto: SignupDto = {
        name: 'user',
        email: 'user2@example.com',
        password: 'Secret11!',
      };
      const expectedResult = {
        id: 'abe3aa4c-8941-4024-86bd-4f9d2e727987',
        email: 'user2@example.com',
        password:
          '$2a$10$683gEH8hAYUotzj1LtkM7.lH5Ca1ilFSkcworB0Vz7e7pu67OJGSa',
        name: 'user',
        createdAt: new Date('2024-03-20T21:49:32.000Z'),
        updatedAt: new Date('2024-03-20T21:49:32.000Z'),
      };

      jest.spyOn(authService, 'signup').mockResolvedValue(expectedResult);

      const result = await controller.signup(signupDto);

      expect(authService.signup).toHaveBeenCalledWith(signupDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('signin', () => {
    it('should call authService.signin and send the JWT in the response', async () => {
      const user: User.Entity = {
        id: '4930ace5-9e59-4da8-9fdd-defe002faaa8',
        name: 'Test User',
        email: 'user@test.com',
        password: 'password',
        createdAt: new Date(),
      };

      const signinDto: SigninDto = {
        email: user.email,
        password: user.password,
      };
      const jwt = 'mock-jwt';
      const response = mockDeep<Response>();

      jest.spyOn(authService, 'signin').mockImplementation(() => jwt);

      await controller.signin(user, signinDto, response);
      expect(response.send).toHaveBeenCalledWith(jwt);
      expect(authService.signin).toHaveBeenCalledWith(user, response);
    });
  });

  it('should send 400 on invalid credentials', async () => {
    const user: User.Entity = {} as User.Entity;
    const signinDto: SigninDto = {
      email: 'invalid@email.com',
      password: 'password',
    };
    const response = mockDeep<Response>();

    jest.spyOn(authService, 'verifyPassword').mockResolvedValue(null);

    await controller.signin(user, signinDto, response);
    expect(authService.signin).not.toHaveBeenCalled();
    expect(response.status).toBe(400);
  });

  describe('getMe', () => {
    it('should return the authenticated user', () => {
      const user: User.Entity = {
        id: '4930ace5-9e59-4da8-9fdd-defe002faaa8',
        name: 'Test User',
        email: 'user@test.com',
        password: 'password',
        createdAt: new Date(),
      };

      const result = controller.getMe(user);

      expect(result).toEqual(user);
    });
  });
});
