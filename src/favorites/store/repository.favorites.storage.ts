import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
//import { resolve } from 'path';
import { AlbumsService } from 'src/albums/albums.service';
//import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
//import { TrackEntity } from 'src/tracks/entities/track.entity';
import { TracksService } from 'src/tracks/tracks.service';
//import { ArtistEntity } from 'src/artists/entities/artist.entity';
//import { TrackEntity } from 'src/tracks/entities/track.entity';
//import { TracksService } from 'src/tracks/tracks.service';
//import { FavoritesEntity } from 'src/favorites/entities/favorites.entity';
//import { TrackEntity } from 'src/tracks/entities/track.entity';
import { Repository } from 'typeorm';
import { FavoritesEntityORM } from '../entities/favorites-orm.entity';
//import { FavoritesEntity } from '../entities/favorites.entity';
//import { FavoritesResponse } from '../entities/favorites.response';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';
//import { IFavoritesResponse } from '../interfaces/favorites.response.interface';

@Injectable()
export class RepositoryFavoritesStorage
  implements FavoritesStore, OnModuleInit
{
  constructor(
    @InjectRepository(FavoritesEntityORM)
    private favoritesRepository: Repository<FavoritesEntityORM>,
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
      const favorites = new FavoritesEntityORM();
      favorites.userId = 'id';
      //const userId = { id: 'id1' };
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

  private getFavorites = async (): Promise<FavoritesEntityORM> => {
    const favorites = await this.favoritesRepository.find({
      relations: { tracks: true, albums: true, artists: true },
    });

    return favorites[0];
  };

  getAll = async (): Promise<FavoritesEntityORM> => {
    //const favoritesORM = new FavoritesEntityORM();
    const favorites = await this.favoritesRepository.find({
      relations: { tracks: true, albums: true, artists: true },
    });
    console.log('Favs getAll =' + JSON.stringify(favorites));
    return favorites[0];
  };

  addTrack = async (trackId: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    const track = await this.tracksService.findOne(trackId);
    if (!track) return false;
    const tracks = favorites.tracks;
    tracks.push(track);
    favorites.tracks = tracks;
    this.favoritesRepository.save(favorites);
    return true;
  };

  addAlbum = async (albumId: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    const album = await this.albumsService.findOne(albumId);
    if (!album) return false;
    const albums = favorites.albums;
    albums.push(album);
    favorites.albums = albums;
    this.favoritesRepository.save(favorites);
    return true;
  };

  addArtist = async (artistId: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    const artist = await this.artistsService.findOne(artistId);
    if (!artist) return false;
    favorites.artists.push(artist);
    /* const artists = favorites.artists;
    artists.push(artist);
    favorites.artists = artists; */
    this.favoritesRepository.save(favorites);
    return true;
  };

  deleteTrack = async (id: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    let tracks = favorites.tracks;
    const lengthBefore = tracks.length;
    tracks = tracks.filter((t) => t.id !== id);
    const lengthAfter = tracks.length;
    favorites.tracks = tracks;
    this.favoritesRepository.save(favorites);
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
    this.favoritesRepository.save(favorites);
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;

    /* //const track = await this.artistsService.findOne(id);
    const favorites = await this.favoritesRepository.find()[0];
    const lengthBefore = favorites.albums.length;
    favorites.albums = favorites.albums.filter((a: string) => a !== id);
    const lengthAfter = favorites.albums.length;
    const isDeleted = lengthBefore !== lengthAfter;
    if (isDeleted) this.favoritesRepository.update(favorites.id, favorites);
    return isDeleted; */
  };

  deleteArtist = async (id: string): Promise<boolean> => {
    const favorites = await this.getFavorites();
    let artists = favorites.artists;
    const lengthBefore = artists.length;
    artists = artists.filter((t) => t.id !== id);
    const lengthAfter = artists.length;
    favorites.artists = artists;
    this.favoritesRepository.save(favorites);
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };
}
