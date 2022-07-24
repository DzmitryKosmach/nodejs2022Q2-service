import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsService } from 'src/albums/albums.service';
//import { AlbumEntity } from 'src/albums/entities/album.entity';
import { ArtistsService } from 'src/artists/artists.service';
import { TrackEntity } from 'src/tracks/entities/track.entity';
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
export class RepositoryFavoritesStorage implements FavoritesStore {
  constructor(
    @InjectRepository(FavoritesEntityORM)
    private favoritesRepository: Repository<FavoritesEntityORM>,
    /* @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService, */
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
  ) {
    const favorites = new FavoritesEntityORM();
    favorites.userId = 'id';
    //const userId = { id: 'id1' };
    const createdFavorites = this.favoritesRepository.create(favorites);
    this.favoritesRepository.save(createdFavorites);
    
    /*const favorites = new FavoritesEntity();
    const createdFavorites = this.favoritesRepository.create(favorites);
    const fvs = this.favoritesRepository.save(createdFavorites);
     favorites.albums = [];
    favorites.artists = [];
    favorites.tracks = []; 
    console.log('favorites' + JSON.stringify(fvs));*/
  }

  getAll = async (): Promise<FavoritesEntityORM> => {
    const favoritesORM = new FavoritesEntityORM();

    const favorites = await this.favoritesRepository.find({
      relations: { tracks: true, albums: true, artists: true },
    });

    console.log('Favs getAll =' + JSON.stringify(favorites.length));

    /* const favorites = await this.favoritesRepository.find({
      relations: ['artistId'],
    })[0];
    const artists: ArtistEntity[] = [];
    this.favoritesRepository.
    //favorites.artists.forEach(async (id: string) => {
    //  const artist = await this.artistsService.findOne(id);
    //  artists.push(artist);
    //}); 
    favoritesResponse.artists = artists;

    const albums: AlbumEntity[] = [];
    favorites.albums.forEach(async (id: string) => {
      const album = await this.albumsService.findOne(id);
      albums.push(album);
    });
    favoritesResponse.albums = albums;

    const tracks: TrackEntity[] = [];
    favorites.tracks.forEach(async (id: string) => {
      const track = await this.tracksService.findOne(id);
      tracks.push(track);
    });
    favoritesResponse.tracks = tracks; */

    return favorites[0];
  };

  addTrack = async (trackId: string): Promise<boolean> => {
    const favorites1 = new FavoritesEntityORM();
    favorites1.userId = 'id';
    //const userId = { id: 'id1' };
    const createdFavorites = this.favoritesRepository.create(favorites1);
    this.favoritesRepository.save(createdFavorites);
    //const fvs = this.favoritesRepository.manager.save(createdFavorites);
    /* favorites1.albums = [];
    favorites1.artists = [];
    favorites1.tracks = [];  */
    console.log('favorites' + JSON.stringify(createdFavorites));

    /* const track = await this.trackRepository.findOne({
      where: { id: trackId },
      relations: {
        favorites: true,
      },
    });
    console.log('addTrack = ' + JSON.stringify(track));
    if (track) {
      track.favorites.tracks = [track];
      //this.trackRepository.save(track);
    }
    const favorites = await this.favoritesRepository.find()[0];
    console.log('addTrack = ' + JSON.stringify(favorites)); */

    /* const favorites1 = new FavoritesEntityORM();
    favorites1.albums = [];
    favorites1.artists = [];
    favorites1.tracks = [];
    const createdFavorites = this.favoritesRepository.create(favorites1);
    const fvs = this.favoritesRepository.save(createdFavorites);
    console.log('favorites' + JSON.stringify(fvs));

    const favorites = await this.favoritesRepository.find()[0];
    console.log('addTrack = ' + JSON.stringify(favorites)); */

    /* const track = await this.tracksService.findOne(id);
    if (track) {
      favorites.tracks.push(id);
      this.favoritesRepository.update(favorites.id, favorites);
      return true;
    } else {
      return false;
    } */
    return true;
  };

  addAlbum = async (id: string): Promise<boolean> => {
    const favorites = await this.favoritesRepository.find()[0];
    const album = await this.albumsService.findOne(id);
    if (album) {
      favorites.albums.push(id);
      this.favoritesRepository.update(favorites.id, favorites);
      return true;
    } else {
      return false;
    }
  };

  addArtist = async (id: string): Promise<boolean> => {
    const favorites = await this.favoritesRepository.find()[0];
    const track = await this.artistsService.findOne(id);
    if (track) {
      favorites.artists.push(id);
      this.favoritesRepository.update(favorites.id, favorites);
      return true;
    } else {
      return false;
    }
  };

  deleteTrack = async (id: string): Promise<boolean> => {
    //const track = await this.artistsService.findOne(id);
    const favorites = await this.favoritesRepository.find()[0];
    const lengthBefore = favorites.tracks.length;
    const tracks = favorites.tracks.filter((t: string) => t !== id);
    favorites.tracks = tracks;
    const lengthAfter = favorites.tracks.length;
    const isDeleted = lengthBefore !== lengthAfter;
    if (isDeleted) this.favoritesRepository.update(favorites.id, favorites);
    return isDeleted;
  };

  deleteAlbum = async (id: string): Promise<boolean> => {
    //const track = await this.artistsService.findOne(id);
    const favorites = await this.favoritesRepository.find()[0];
    const lengthBefore = favorites.albums.length;
    favorites.albums = favorites.albums.filter((a: string) => a !== id);
    const lengthAfter = favorites.albums.length;
    const isDeleted = lengthBefore !== lengthAfter;
    if (isDeleted) this.favoritesRepository.update(favorites.id, favorites);
    return isDeleted;
  };

  deleteArtist = async (id: string): Promise<boolean> => {
    //const track = await this.artistsService.findOne(id);
    const favorites = await this.favoritesRepository.find()[0];
    const lengthBefore = favorites.artists.length;
    favorites.artists = favorites.artists.filter((a: string) => a !== id);
    const lengthAfter = favorites.artists.length;
    const isDeleted = lengthBefore !== lengthAfter;
    if (isDeleted) this.favoritesRepository.update(favorites.id, favorites);
    return isDeleted;
  };
}
