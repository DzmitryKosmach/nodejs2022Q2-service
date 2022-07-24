import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesEntityORM } from '../entities/favorites-orm.entity';
import { FavoritesEntity } from '../entities/favorites.entity';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';

@Injectable()
export class InMemoryFavoritesStorage implements FavoritesStore {
  //constructor(@Inject('TracksService') private tracksStorage: TracksService) {}
  favorites = new FavoritesEntity();
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {}

  getAll = async (): Promise<FavoritesEntityORM> => {
    const favoritesResponse = new FavoritesEntityORM();

    const artists: ArtistEntity[] = [];
    this.favorites.artists.forEach(async (id) => {
      const artist = await this.artistsService.findOne(id);
      artists.push(artist);
    });
    favoritesResponse.artists = artists;

    const albums: AlbumEntity[] = [];
    this.favorites.albums.forEach(async (id) => {
      const album = await this.albumsService.findOne(id);
      albums.push(album);
    });
    favoritesResponse.albums = albums;

    const tracks: TrackEntity[] = [];
    this.favorites.tracks.forEach(async (id) => {
      const track = await this.tracksService.findOne(id);
      tracks.push(track);
    });
    favoritesResponse.tracks = tracks;

    return favoritesResponse;
  };

  addTrack = async (id: string): Promise<boolean> => {
    const track = await this.tracksService.findOne(id);
    if (track) {
      this.favorites.tracks.push(id);
      return true;
    } else {
      return false;
    }
  };

  addAlbum = async (id: string): Promise<boolean> => {
    const track = await this.albumsService.findOne(id);
    if (track) {
      this.favorites.albums.push(id);
      return true;
    } else {
      return false;
    }
  };

  addArtist = async (id: string): Promise<boolean> => {
    const track = await this.artistsService.findOne(id);
    if (track) {
      this.favorites.artists.push(id);
      return true;
    } else {
      return false;
    }
  };

  deleteTrack = async (id: string): Promise<boolean> => {
    //const track = await this.artistsService.findOne(id);
    const lengthBefore = this.favorites.tracks.length;
    const tracks = this.favorites.tracks.filter((t) => t !== id);
    this.favorites.tracks = tracks;
    const lengthAfter = this.favorites.tracks.length;
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };

  deleteAlbum = async (id: string): Promise<boolean> => {
    //const track = await this.artistsService.findOne(id);
    const lengthBefore = this.favorites.albums.length;
    this.favorites.albums = this.favorites.albums.filter((a) => a !== id);
    const lengthAfter = this.favorites.albums.length;
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };

  deleteArtist = async (id: string): Promise<boolean> => {
    //const track = await this.artistsService.findOne(id);
    const lengthBefore = this.favorites.artists.length;
    this.favorites.artists = this.favorites.artists.filter((a) => a !== id);
    const lengthAfter = this.favorites.artists.length;
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };
}
