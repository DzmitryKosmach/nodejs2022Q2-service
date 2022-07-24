import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
//import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
//import { CreateAlbumDto } from '../dto/create-album.dto';
//import { UpdateAlbumDto } from '../dto/update-album.dto';
//import { AlbumEntity } from '../entities/album.entity';
import { ArtistEntity } from '../entities/artist.entity';
//import { AlbumsStore } from '../interfaces/album-storage.interface';
import { ArtistsStore } from '../interfaces/artist-storage.interface';

@Injectable()
export class RepositoryArtistsStorage implements ArtistsStore {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
  ) /* @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>, */ {}

  getAll = async (): Promise<ArtistEntity[]> => {
    return this.artistRepository.find();
  };

  getById = async (artistId: string): Promise<ArtistEntity> => {
    const artist = this.artistRepository.findOne({ where: { id: artistId } });
    return artist;
  };

  update = async (id: string, dto: UpdateArtistDto): Promise<ArtistEntity> => {
    await this.artistRepository.update(id, dto);
    const updatedArtist = await this.getById(id);
    return updatedArtist;
  };

  create = async (dto: CreateArtistDto): Promise<ArtistEntity> => {
    const createdArtist = this.artistRepository.create(dto);
    const savedArtist = this.artistRepository.save(createdArtist);
    return savedArtist;
  };

  remove = async (id: string): Promise<boolean> => {
    const deletionRes = await this.artistRepository.delete(id);
    if (deletionRes.affected === 0) {
      return false;
    } else {
      //this.tracksService.nullArtist(id);
      //this.albumsService.nullArtist(id);
      //this.favoritesService.deleteArtist(id);
      return true;
    }
  };
}
