import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';

export interface ArtistsStore {
  getAll: () => Promise<ArtistEntity[]>;

  getById: (id: string) => Promise<ArtistEntity>;

  update: (id: string, dto: UpdateArtistDto) => Promise<ArtistEntity>;

  create: (dto: CreateArtistDto) => Promise<ArtistEntity>;

  remove: (id: string) => Promise<boolean>;
}
