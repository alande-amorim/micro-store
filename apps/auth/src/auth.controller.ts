import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { Response } from 'express';
import { User } from '@app/common';
import { AuthUser } from './auth-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(
    @AuthUser() user: User.Entity,
    @Body() body: SigninDto,
    @Res() res: Response,
  ): Promise<void> {
    const jwt = await this.authService.signin(user, res);
    res.send(jwt);
  }
}
