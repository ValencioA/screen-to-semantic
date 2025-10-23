import axios from 'axios';
import { VideoApiResponse } from '@/types/video';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-api-endpoint.com';

export const videoApi = {
  async getVideos(): Promise<VideoApiResponse> {
    try {
      const response = await axios.get<VideoApiResponse>(`${API_BASE_URL}/videos`);
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw error;
    }
  },

  async getVideoById(id: string): Promise<VideoApiResponse> {
    try {
      const response = await axios.get<VideoApiResponse>(`${API_BASE_URL}/videos/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching video:', error);
      throw error;
    }
  }
};
