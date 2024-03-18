import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User } from '@app/common';
import { hashSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly db: PrismaService) {}

  async signup(input: User.Create): Promise<User.Entity> {
    return this.db.user.create({
      data: {
        ...input,
        password: hashSync(input.password, 10),
      },
    });
  }
}
