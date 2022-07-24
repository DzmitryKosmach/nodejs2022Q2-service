import { IsString } from 'class-validator';

export class UpdatePasswordDto {
  //https://github.com/typestack/class-validator/tree/master/sample/sample6-custom-decorator
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
