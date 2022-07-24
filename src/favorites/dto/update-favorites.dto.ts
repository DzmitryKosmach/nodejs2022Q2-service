import { IsNotEmpty } from 'class-validator';

export class UpdateFavoritesDto {
  @IsNotEmpty()
  artists: string[];

  @IsNotEmpty()
  albums: string[];

  @IsNotEmpty()
  tracks: string[];
}
