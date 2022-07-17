import { Injectable } from '@nestjs/common';
import { AlbumsService } from 'src/albums/albums.service';
import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { ArtistEntity } from 'src/artists/entities/artist.entity';
import { TrackEntity } from 'src/tracks/entities/track.entity';
//import { TracksStore } from 'src/tracks/interfaces/track-storage.interface';
import { TracksService } from 'src/tracks/tracks.service';
//import { CreateFavoritesDto } from '../dto/create-favorites.dto';
//import { UpdateFavoritesDto } from '../dto/update-favorites.dto';
import { FavoritesEntity } from '../entities/favorites.entity';
import { FavoritesRepsonse } from '../entities/favorites.response';
import { FavoritesStore } from '../interfaces/favorites-storage.interface';
import { IFavoritesRepsonse } from '../interfaces/favorites.response.interface';

@Injectable()
export class InMemoryFavoritesStorage implements FavoritesStore {
  //https://docs.nestjs.com/fundamentals/injection-scopes#usage

  //constructor(@Inject('TracksService') private tracksStorage: TracksService) {}
  favorites: FavoritesEntity = new FavoritesEntity();
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  //constructor(@Inject('TracksStore') tracksStore: TracksStore) {
  //  const tracksStore1 = tracksStore;
  //}

  /* @Inject('TracksStore')
  private tracksStore: TracksStore; */

  getAll = async (): Promise<IFavoritesRepsonse> => {
    const favoritesRepsonse = new FavoritesRepsonse();

    const artists: ArtistEntity[] = [];
    this.favorites.artists.forEach(async (id) => {
      const artist = await this.artistsService.findOne(id);
      artists.push(artist);
    });
    favoritesRepsonse.artists = artists;

    const albums: AlbumEntity[] = [];
    this.favorites.albums.forEach(async (id) => {
      const album = await this.albumsService.findOne(id);
      albums.push(album);
    });
    favoritesRepsonse.albums = albums;

    const tracks: TrackEntity[] = [];
    this.favorites.tracks.forEach(async (id) => {
      const track = await this.tracksService.findOne(id);
      tracks.push(track);
    });
    favoritesRepsonse.tracks = tracks;

    return favoritesRepsonse;
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
    this.favorites.tracks = this.favorites.tracks.filter((t) => t !== id);
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
