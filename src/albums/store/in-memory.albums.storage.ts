import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { TracksService } from 'src/tracks/tracks.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { AlbumEntity } from '../entities/album.entity';
import { AlbumsStore } from '../interfaces/album-storage.interface';

@Injectable()
export class InMemoryAlbumsStorage implements AlbumsStore {
  private albums: AlbumEntity[] = [];

  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

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
    //const { name, year, artistId } = dto;
    console.log(dto);
    const newAlbum = new AlbumEntity();
    this.albums.push(newAlbum);
    return newAlbum;
  };

  remove = async (id: string): Promise<boolean> => {
    const lengthBefore = this.albums.length;
    this.albums = this.albums.filter((u) => u.id !== id);
    const lengthAfter = this.albums.length;
    const isDeleted = lengthBefore !== lengthAfter;
    this.tracksService.nullAlbum(id);
    this.favoritesService.deleteAlbum(id);
    return isDeleted;
    //removeUserFromTasks(id);
  };

  nullArtist = async (id: string): Promise<void> => {
    this.albums.forEach((t) => {
      if (t.artistId === id) t.artistId = null;
    });
  };
}
