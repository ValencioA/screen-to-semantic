export interface Video {
  id?: string;
  title: string;
  vLink: string;
  thumbnail: string;
}

export interface VideoApiResponse {
  items: Video[];
  status: number;
  message: string;
}

export interface VideoSection {
  id?: string;
  title: string;
  items: Video[];
}

export interface VideoSectionsResponse {
  status: number;
  message: string;
  sections: VideoSection[];
}
