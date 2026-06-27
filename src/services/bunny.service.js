// Bunny.net Video Streaming Service
const BUNNY_API_KEY = process.env.BUNNY_API_KEY;
const BUNNY_LIBRARY_ID = process.env.BUNNY_STREAM_LIBRARY_ID;
const BUNNY_CDN_URL = process.env.BUNNY_CDN_URL;

const getUploadUrl = async (title) => {
  // TODO: POST to Bunny.net API to create a video entry, return upload URL + videoId
};

const getStreamUrl = (videoId) => {
  // TODO: return CDN stream URL for a given videoId
  // return `${BUNNY_CDN_URL}/${videoId}/playlist.m3u8`;
};

const deleteVideo = async (videoId) => {
  // TODO: DELETE request to Bunny.net API
};

module.exports = { getUploadUrl, getStreamUrl, deleteVideo };
