import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/public';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginPasswordDto } from './dto/login-password.dto';

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
  async getToken(@Body() loginPasswordDto: LoginPasswordDto) {
    const { login, password } = loginPasswordDto;
    const authAnswer = await this.authService.getToken(login, password);
    return authAnswer;
  }

  //https://www.bezkoder.com/jwt-refresh-token-node-js/
  @Post('/refresh')
  async getTokens(@Body() bodyRefreshToken: { refreshToken: string }) {
    const { refreshToken } = bodyRefreshToken;

    console.log('@Post(/refresh): ' + refreshToken);

    /* const token = await this.authService.getToken(login, password);
    if (!token) {
      throw new ForbiddenException();
    }
    return { token }; */
  }
}
