import * as dotenv from 'dotenv';
import { v4 as uuid } from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { IAuthAnswer } from './interfaces/auth-answer.interface';

dotenv.config();

const { TOKEN_REFRESH_EXPIRE_TIME, TOKEN_EXPIRE_TIME, JWT_SECRET_KEY } =
  process.env;

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  getToken = async (
    userLogin: string,
    userPassword: string,
  ): Promise<IAuthAnswer> => {
    const user = await this.userService.findByLogin(userLogin);
    const isPasswordCorrect = await bcrypt.compare(userPassword, user.password);
    if (!isPasswordCorrect)
      throw new HttpException(
        "Login or password isn't correct",
        HttpStatus.FORBIDDEN,
      );

    const { id, login } = user;
    const accessToken = jwt.sign({ id, login }, <jwt.Secret>JWT_SECRET_KEY, {
      expiresIn: TOKEN_EXPIRE_TIME,
    });
    const answer: IAuthAnswer = {
      id,
      login,
      accessToken,
    };
    return answer;
  };

  getRefreshToken = async () => {
    const payload = { id: uuid(), type: 'refresh' };
    const token = jwt.sign(payload, <jwt.Secret>JWT_SECRET_KEY, {
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
    return {
      id: payload.id,
      token,
    };
  };

  /* replaceDbRefreshToken = async (tokenId: string, userId: string) => {
    const payload = { id: uuid(), type: 'refresh' };
    const token = jwt.sign(payload, <jwt.Secret>JWT_SECRET_KEY, {
      expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
    });
    return {
      id: payload.id,
      token,
    };
  }; */
}
