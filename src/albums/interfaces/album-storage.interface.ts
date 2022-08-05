import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';

export interface AlbumsStore {
  getAll: () => Promise<AlbumEntity[]>;

  getById: (id: string) => Promise<AlbumEntity>;

  update: (id: string, dto: UpdateAlbumDto) => Promise<AlbumEntity>;

  create: (dto: CreateAlbumDto) => Promise<AlbumEntity>;

  remove: (id: string) => Promise<boolean>;
}
