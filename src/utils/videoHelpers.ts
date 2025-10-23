/**
 * Extracts YouTube video ID from various YouTube URL formats
 */
export const getYouTubeVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};

/**
 * Generates thumbnail URL from YouTube video link
 */
export const getYouTubeThumbnail = (videoUrl: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string => {
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId) return '';
  return `https://i.ytimg.com/vi/${videoId}/${quality}default.jpg`;
};
