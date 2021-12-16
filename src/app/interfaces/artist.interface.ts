export interface IArtist {
  external_urls: IExternalUrls;
  followers: IFollowers;
  genres: string[];
  href: string;
  id: string;
  images: IImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface IExternalUrls {
  spotify: string;
}

export interface IFollowers {
  href: null;
  total: number;
}

export interface IImage {
  height: number;
  url: string;
  width: number;
}
