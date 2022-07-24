import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';
import { TracksStore } from '../interfaces/track-storage.interface';

@Injectable()
export class RepositoryTracksStorage implements TracksStore {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
  ) {}

  getAll = async (): Promise<TrackEntity[]> => {
    return this.trackRepository.find();
  };

  getById = async (albumId: string): Promise<TrackEntity> => {
    const album = this.trackRepository.findOne({ where: { id: albumId } });
    return album;
  };

  update = async (id: string, dto: UpdateTrackDto): Promise<TrackEntity> => {
    await this.trackRepository.update(id, dto);
    return this.getById(id);
  };

  create = async (dto: CreateTrackDto): Promise<TrackEntity> => {
    const createdTrack = this.trackRepository.create(dto);
    const savedTrack = this.trackRepository.save(createdTrack);
    return savedTrack;
  };

  remove = async (id: string): Promise<boolean> => {
    const deletionRes = await this.trackRepository.delete(id);
    if (deletionRes.affected === 0) {
      return false;
    } else {
      return true;
    }
  };

  save = async (track: TrackEntity) => {
    await this.trackRepository.save(track);
  };

  nullArtist = async (id: string): Promise<void> => {
    console.log(id);
  };

  nullAlbum = async (id: string): Promise<void> => {
    console.log(id);
  };
}
