import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { AuthUser, User } from '@app/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return await this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @AuthUser() user: User.Entity,
    @Body() body: SigninDto,
    @Res() res: Response,
  ): Promise<void> {
    const jwt = await this.authService.signin(user, res);
    console.log(jwt);
    res.send(jwt);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@AuthUser() user: User.Entity): User.Entity {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() payload) {
    return payload.user;
  }
}
