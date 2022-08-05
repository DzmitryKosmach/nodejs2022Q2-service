import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Public } from 'src/public';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginPasswordDto } from './dto/login-password.dto';
import { IAuthAnswer } from './interfaces/auth-answer.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
  @Public()
  async signup(@Body() loginPasswordDto: LoginPasswordDto) {
    const user = await this.usersService.create(loginPasswordDto);
    return UserEntity.toResponse(user);
  }

  @Post('/login')
  @Public()
  async getTokens(@Body() loginPasswordDto: LoginPasswordDto) {
    const { login, password } = loginPasswordDto;
    const accessToken = await this.authService.getAccessToken(login, password);
    const refreshToken = await this.authService.getRefreshToken();
    const authAnswer: IAuthAnswer = {
      accessToken: accessToken.accessToken,
      refreshToken: refreshToken.token,
    };
    await this.authService.saveRefreshToken(refreshToken.id, accessToken.id);
    return authAnswer;
  }

  @Post('/refresh')
  @Public()
  async getRefreshTokens(@Body() bodyRefreshToken: { refreshToken: string }) {
    const { refreshToken } = bodyRefreshToken;

    if (!refreshToken) {
      throw new HttpException('Invalid token!', HttpStatus.FORBIDDEN);
    }

    const userId = await this.authService.checkRefreshToken(refreshToken);
    const accessToken = await this.authService.getAccessTokenByUserId(userId);
    const newRefreshToken = await this.authService.getRefreshToken();
    const authAnswer: IAuthAnswer = {
      accessToken: accessToken.accessToken,
      refreshToken: newRefreshToken.token,
    };
    this.authService.saveRefreshToken(newRefreshToken.id, accessToken.id);
    return authAnswer;
  }
}
