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

export interface VideoSection {
  title: string;
  items: Video[];
}

export interface VideoSectionsResponse {
  status: number;
  message: string;
  sections: VideoSection[];
}
