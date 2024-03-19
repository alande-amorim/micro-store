import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    conf: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request | any) =>
          req?.cookies?.Authentication || req?.Authentication,
      ]),
      secretOrKey: conf.get('JWT_SECRET'),
    });
  }

  validate(payload: TokenPayload) {
    return this.authService.getById(payload.userId);
  }
}
