import axios from 'axios';
import dotenv from 'dotenv';

const getVideos = (app) => {
  app.get('/videos', async (req, res) => {
    try {
      const result = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
          part: 'statistics',
          chart: 'mostPopular',
          regionCode: req.query.regionCode,
          key: process.env.YOUTUBE_API_KEY
        }
      });
      res.json(result.data);
    } catch (err) {
      res.send(err);
      throw new Error(err);
    }
  });
};

export default getVideos;
