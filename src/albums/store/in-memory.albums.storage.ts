import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumsStore } from '../interfaces/album-storage.interface';

@Injectable()
export class InMemoryAlbumsStorage implements AlbumsStore {
  private albums: AlbumEntity[] = [];

  getAll = async (): Promise<AlbumEntity[]> => {
    return this.albums;
  };

  getById = async (id: string): Promise<AlbumEntity> => {
    const user = this.albums.find((u) => u.id === id);
    return user;
  };

  update = async (id: string, dto: UpdateAlbumDto): Promise<AlbumEntity> => {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    if (albumIndex < 0) {
      return null;
    }
    const album = this.albums[albumIndex];
    album.name = dto.name ? dto.name : album.name;
    album.year = dto.year ? dto.year : album.year;
    album.artistId = dto.artistId ? dto.artistId : album.artistId;
    return album;
  };

  create = async (dto: CreateAlbumDto): Promise<AlbumEntity> => {
    const { name, year, artistId } = dto;
    const newAlbum = new AlbumEntity(name, year, artistId || null);
    this.albums.push(newAlbum);
    return newAlbum;
  };

  remove = async (id: string): Promise<boolean> => {
    const lengthBefore = this.albums.length;
    this.albums = this.albums.filter((u) => u.id !== id);
    const lengthAfter = this.albums.length;
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
    //removeUserFromTasks(id);
  };
}
