export interface IAlbum {
  album_type: IIAlbumTypeEnum;
  artists: IArtist[];
  available_markets: string[];
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: IImage[];
  name: string;
  release_date: Date;
  release_date_precision: IReleaseDatePrecision;
  total_tracks: number;
  type: IIAlbumTypeEnum;
  uri: string;
}

export enum IIAlbumTypeEnum {
  Album = "album",
  Single = "single",
}

export interface IArtist {
  external_urls: IExternalUrls;
  href: string;
  id: string;
  name: string;
  type: ArtistType;
  uri: string;
}

export interface IExternalUrls {
  spotify: string;
}

export enum ArtistType {
  Artist = "artist",
}

export interface IImage {
  height: number;
  url: string;
  width: number;
}

export enum IReleaseDatePrecision {
  Day = "day",
}