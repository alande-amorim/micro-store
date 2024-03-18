import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@app/common';
import { compare, hashSync } from 'bcryptjs';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: PrismaService,
    private readonly jwt: JwtService,
    private readonly conf: ConfigService,
  ) {}

  async verifyPassword(email: string, password: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    const isValid = await compare(password, user.password);

    return isValid ? user : null;
  }

  async signup(input: User.Create): Promise<User.Entity> {
    return this.db.user.create({
      data: {
        ...input,
        password: hashSync(input.password, 10),
      },
    });
  }

  async signin(user: User.Entity, res: Response): Promise<string> {
    const payload: TokenPayload = {
      userId: user.id,
    };

    const jwt = this.jwt.sign(payload);
    res.cookie('Authentication', jwt, {
      httpOnly: true,
      expires: new Date(Date.now() + this.conf.get('JWT_EXPIRATION') * 1000),
    });

    return jwt;
  }
}
