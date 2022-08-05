import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/favorites.service';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

@Injectable()
export class InMemoryTracksStorage {
  private tracks: TrackEntity[] = [];

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}

  save: (track: TrackEntity) => Promise<void>;

  getAll = async (): Promise<TrackEntity[]> => {
    return this.tracks;
  };

  getById = async (id: string): Promise<TrackEntity> => {
    const track = this.tracks.find((t) => t.id === id);
    return track;
  };

  update = async (id: string, dto: UpdateTrackDto): Promise<TrackEntity> => {
    const trackIndex = this.tracks.findIndex((a) => a.id === id);
    if (trackIndex < 0) {
      return null;
    }
    const track = this.tracks[trackIndex];
    track.name = dto.name ? dto.name : track.name;
    track.duration = dto.duration ? dto.duration : track.duration;
    track.artistId = dto.artistId ? dto.artistId : track.artistId;
    track.albumId = dto.albumId ? dto.albumId : track.albumId;
    this.tracks[trackIndex] = track;
    return track;
  };

  create = async (): Promise<TrackEntity> => {
    const newTrack = new TrackEntity();
    this.tracks.push(newTrack);
    return newTrack;
  };

  remove = async (id: string): Promise<boolean> => {
    const lengthBefore = this.tracks.length;
    this.tracks = this.tracks.filter((u) => u.id !== id);
    this.favoritesService.deleteTrack(id);
    const lengthAfter = this.tracks.length;
    const isDeleted = lengthBefore !== lengthAfter;
    return isDeleted;
  };

  nullArtist = async (id: string): Promise<void> => {
    this.tracks.forEach((t) => {
      if (t.artistId === id) t.artistId = null;
    });
  };

  nullAlbum = async (id: string): Promise<void> => {
    this.tracks.forEach((t) => {
      if (t.albumId === id) t.albumId = null;
    });
  };
}
