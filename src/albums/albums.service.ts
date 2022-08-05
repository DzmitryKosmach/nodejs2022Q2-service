import { Inject, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsStore } from './interfaces/album-storage.interface';

@Injectable()
export class AlbumsService {
  constructor(@Inject('AlbumsStore') private storage: AlbumsStore) {}

  create(createUserDto: CreateAlbumDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateUserDto: UpdateAlbumDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
