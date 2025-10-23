import axios from 'axios';
import { VideoApiResponse } from '@/types/video';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sandbox-demo.dbtez.net/api';

export const videoApi = {
  async getVideos(): Promise<VideoApiResponse> {
    try {
      const response = await axios.get<VideoApiResponse>(`${API_BASE_URL}/hrf_get_video_playlist`);
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  async getVideoById(id: string): Promise<VideoApiResponse> {
    try {
      const response = await axios.get<VideoApiResponse>(`${API_BASE_URL}/hrf_get_video_playlist`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  }
};
