import axios from 'axios';
import { VideoApiResponse, VideoSectionsResponse } from '@/types/video';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sandbox-demo.dbtez.net/api';

export const videoApi = {
  async getVideos(): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_get_video_playlist`,
        {} // 👈 send empty JSON body
      );
      console.log("Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  async getVideoById(id: string): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_get_video_playlist/${id}`,
        {} // 👈 send empty JSON body here too
      );
      console.log("Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  },

  async searchVideos(query: string): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_get_video_playlist_searchVideo`,
        { p_title: query }
      );
      console.log("Search Response", response);
      return response.data;
    } catch (error) {
      console.error('Error searching videos:', error);
      throw error;
    }
  },

  async getCarouselVideos(): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_get_video_carousal`,
        {}
      );
      console.log("Carousel Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching carousel videos:', error);
      throw error;
    }
  },

  async getHighlights(): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_highlights`,
        {}
      );
      console.log("Highlights Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching highlights:', error);
      throw error;
    }
  },

  async getRecentWatched(): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_recent_watched`,
        {}
      );
      console.log("Recent Watched Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent watched:', error);
      throw error;
    }
  },

  async getOriginalVideos(): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_original_videos`,
        {}
      );
      console.log("Original Videos Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching original videos:', error);
      throw error;
    }
  },

  async getAllSections(): Promise<VideoSectionsResponse> {
    try {
      const response = await axios.post<VideoSectionsResponse>(
        `${API_BASE_URL}/hrf_get_ott_sections`,
        {}
      );
      console.log("All Sections Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching all sections:', error);
      throw error;
    }
  },

  async getVideoDetails(videoId: string): Promise<VideoApiResponse> {
    try {
      const response = await axios.post<VideoApiResponse>(
        `${API_BASE_URL}/hrf_get_video_details`,
        { p_title: videoId }
      );
      console.log("Video Details Response", response);
      return response.data;
    } catch (error) {
      console.error('Error fetching video details:', error);
      throw error;
    }
  }
};
