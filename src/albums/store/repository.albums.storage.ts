import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumsStore } from '../interfaces/album-storage.interface';

@Injectable()
export class RepositoryAlbumsStorage implements AlbumsStore {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity> /* @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>, */,
  ) {}

  getAll = async (): Promise<AlbumEntity[]> => {
    return this.albumRepository.find();
  };

  getById = async (albumId: string): Promise<AlbumEntity> => {
    const album = this.albumRepository.findOne({ where: { id: albumId } });
    return album;
  };

  update = async (id: string, dto: UpdateAlbumDto): Promise<AlbumEntity> => {
    await this.albumRepository.update(id, dto);
    return this.getById(id);
  };

  create = async (dto: CreateAlbumDto): Promise<AlbumEntity> => {
    const createdAlbum = this.albumRepository.create(dto);
    const savedAlbum = this.albumRepository.save(createdAlbum);
    return savedAlbum;
  };

  remove = async (id: string): Promise<boolean> => {
    const deletionRes = await this.albumRepository.delete(id);
    if (deletionRes.affected === 0) {
      return false;
    } else {
      return true;
    }
  };
}
