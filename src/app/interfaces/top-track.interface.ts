export interface ITrack {
  album: Album;
  artists: Artist[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIDS;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: TrackType;
  uri: string;
}

export interface Album {
  album_type: AlbumTypeEnum;
  artists: Artist[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: Date;
  release_date_precision: ReleaseDatePrecision;
  total_tracks: number;
  type: AlbumTypeEnum;
  uri: string;
}

export enum AlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export interface Artist {
  external_urls: ExternalUrls;
  href: string;
  id: ID;
  name: Name;
  type: ArtistType;
  uri: URI;
}

export interface ExternalUrls {
  spotify: string;
}

export enum ID {
  The23Zg3TcAtWQy7J6UpgbUnj = "23zg3TcAtWQy7J6upgbUnj",
  The3DiDSECUqqY1AuBP8QtaIa = "3DiDSECUqqY1AuBP8qtaIa",
}

export enum Name {
  AliciaKeys = "Alicia Keys",
  Usher = "Usher",
}

export enum ArtistType {
  Artist = "artist",
}

export enum URI {
  SpotifyArtist23Zg3TcAtWQy7J6UpgbUnj = "spotify:artist:23zg3TcAtWQy7J6upgbUnj",
  SpotifyArtist3DiDSECUqqY1AuBP8QtaIa = "spotify:artist:3DiDSECUqqY1AuBP8qtaIa",
}

export interface Image {
  height: number;
  url: string;
  width: number;
}

export enum ReleaseDatePrecision {
  Day = "day",
}

export interface ExternalIDS {
  isrc: string;
}

export enum TrackType {
  Track = "track",
}
