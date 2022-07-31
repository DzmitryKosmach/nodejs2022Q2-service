import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Repository } from 'typeorm';
import { FavoritesEntity } from '../entities/favorites.entity';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';

@Injectable()
export class RepositoryFavoritesStorage
  implements FavoritesStore, OnModuleInit
{
  constructor(
    @InjectRepository(FavoritesEntity)
    private favoritesRepository: Repository<FavoritesEntity>,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  async onModuleInit() {
    const countFavorites = await this.getCountFavorites();
    if (countFavorites < 1) {
      const favorites = new FavoritesEntity();
      const createdFavorites = this.favoritesRepository.create(favorites);
      this.favoritesRepository.save(createdFavorites);
    }
  }

  private getCountFavorites = async (): Promise<number> => {
    const favorites = await this.favoritesRepository.find({
      relations: { tracks: true, albums: true, artists: true },
    });

    return favorites.length;
  };

  private getFavorites = async (): Promise<FavoritesEntity> => {
    const favorites = await this.favoritesRepository.find({
      relations: { tracks: true, albums: true, artists: true },
    });

    return favorites[0];
  };

  getAll = async (): Promise<FavoritesEntity> => {
    const favorites = await this.favoritesRepository.find({
      relations: { tracks: true, albums: true, artists: true },
    });
    return favorites[0];
  };

  addTrack = async (trackId: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    const track = await this.tracksService.findOne(trackId);
    if (!track) return false;
    const tracks = favorites.tracks;
    tracks.push(track);
    favorites.tracks = tracks;
    await this.favoritesRepository.save(favorites);
    return true;
  };

  addAlbum = async (albumId: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    const album = await this.albumsService.findOne(albumId);
    if (!album) return false;
    const albums = favorites.albums;
    albums.push(album);
    favorites.albums = albums;
    await this.favoritesRepository.save(favorites);
    return true;
  };

  addArtist = async (artistId: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    const artist = await this.artistsService.findOne(artistId);
    if (!artist) return false;
    const artists = favorites.artists;
    artists.push(artist);
    favorites.artists = artists;
    await this.favoritesRepository.save(favorites);
    return true;
  };

  deleteTrack = async (id: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    let tracks = favorites.tracks;
    const lengthBefore = tracks.length;
    tracks = tracks.filter((t) => t.id !== id);
    const lengthAfter = tracks.length;
    favorites.tracks = tracks;
    await this.favoritesRepository.save(favorites);
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };

  deleteAlbum = async (id: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    let albums = favorites.albums;
    const lengthBefore = albums.length;
    albums = albums.filter((t) => t.id !== id);
    const lengthAfter = albums.length;
    favorites.albums = albums;
    await this.favoritesRepository.save(favorites);
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };

  deleteArtist = async (id: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    let artists = favorites.artists;
    const lengthBefore = artists.length;
    artists = artists.filter((t) => t.id !== id);
    const lengthAfter = artists.length;
    favorites.artists = artists;
    await this.favoritesRepository.save(favorites);
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };
}
