import axios from 'axios';

const getGeoCode = (app) => {
  app.get('/geoCode', async (req, res) => {
    try {
      const regionInformation = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            key: process.env.GEO_CODE_API_KEY,
            latlng: req.query.latlng
          }
        });
      let regionCode = '';
      const { results } = regionInformation.data;
      const countryInfo = results[results.length - 1];
      const { address_components } = countryInfo;
      regionCode = address_components[0] && address_components[0].short_name;
      res.send(regionCode);
    } catch (err) {
      res.send(err);
      throw new Error(err);
    }
  });
};

export default getGeoCode;
