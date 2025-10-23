export interface Video {
  title: string;
  vLink: string;
  thumbnail: string;
}

export interface VideoApiResponse {
  items: Video[];
  status: number;
  message: string;
}
