import { IsNotEmpty } from 'class-validator';

export class CreateFavoritesDto {
  @IsNotEmpty()
  artists: string[];

  @IsNotEmpty()
  albums: string[];

  @IsNotEmpty()
  tracks: string[];
}
