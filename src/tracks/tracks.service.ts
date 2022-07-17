import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksStore } from './interfaces/track-storage.interface';

@Injectable()
export class TracksService {
  constructor(@Inject('TracksStore') private storage: TracksStore) {}

  create(createUserDto: CreateTrackDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.getAll();
  }

  findOne(id: string) {
    return this.storage.getById(id);
  }

  update(id: string, updateUserDto: UpdateTrackDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }

  nullArtist(id: string) {
    return this.storage.nullArtist(id);
  }

  nullAlbum(id: string) {
    return this.storage.nullAlbum(id);
  }
}
