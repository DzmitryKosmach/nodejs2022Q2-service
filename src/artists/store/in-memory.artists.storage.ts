import { Injectable } from '@nestjs/common';
import { TracksService } from 'src/tracks/tracks.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ArtistEntity } from '../entities/artist.entity';
import { ArtistsStore } from '../interfaces/artist-storage.interface';

@Injectable()
export class InMemoryArtistsStorage implements ArtistsStore {
  private artists: ArtistEntity[] = [];

  constructor(private readonly tracksService: TracksService) {}

  getAll = async (): Promise<ArtistEntity[]> => {
    return this.artists;
  };

  getById = async (id: string): Promise<ArtistEntity> => {
    const artist = this.artists.find((u) => u.id === id);
    return artist;
  };

  update = async (id: string, dto: UpdateArtistDto): Promise<ArtistEntity> => {
    const artistIndex = this.artists.findIndex((a) => a.id === id);
    if (artistIndex < 0) {
      return null;
    }
    const artist = this.artists[artistIndex];
    artist.name = dto.name ? dto.name : artist.name;
    artist.grammy = dto.grammy ? dto.grammy : artist.grammy;
    this.artists[artistIndex] = artist;
    return artist;
  };

  create = async (dto: CreateArtistDto): Promise<ArtistEntity> => {
    const { name, grammy } = dto;
    const newArtist = new ArtistEntity(name, grammy);
    this.artists.push(newArtist);
    return newArtist;
  };

  remove = async (id: string): Promise<boolean> => {
    const lengthBefore = this.artists.length;
    this.artists = this.artists.filter((u) => u.id !== id);
    const lengthAfter = this.artists.length;
    const isDeleted = lengthBefore !== lengthAfter;
    this.tracksService.nullArtist(id);
    return isDeleted;
    //removeUserFromTasks(id);
  };
}
