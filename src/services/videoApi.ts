import axios from 'axios';
import { VideoApiResponse } from '@/types/video';

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
        `${API_BASE_URL}/hrf_get_video_playlist`,
        { search: query }
      );
      console.log("Search Response", response);
      return response.data;
    } catch (error) {
      console.error('Error searching videos:', error);
      throw error;
    }
  }
};
