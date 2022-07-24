import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { TrackEntity } from '../entities/track.entity';

export interface TracksStore {
  getAll: () => Promise<TrackEntity[]>;

  getById: (id: string) => Promise<TrackEntity>;

  update: (id: string, dto: UpdateTrackDto) => Promise<TrackEntity>;

  create: (dto: CreateTrackDto) => Promise<TrackEntity>;

  remove: (id: string) => Promise<boolean>;

  save: (track: TrackEntity) => Promise<void>;

  nullArtist: (id: string) => Promise<void>;

  nullAlbum: (id: string) => Promise<void>;
}
