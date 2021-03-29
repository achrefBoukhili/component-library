import express from 'express';
import openBrowser from 'react-dev-utils/openBrowser';
import colors from 'colors';
import dotenv from 'dotenv';
import configServer from './configAppServer';
import videosList from './routers/videosList';
import geoCode from './routers/geoCode';

dotenv.config();

const TARGET = process.env.npm_lifecycle_event;
const modeDev = TARGET === 'dev';
const port = process.env.PORT || 3000;
const app = express();

configServer(app, modeDev, TARGET);
videosList(app);
geoCode(app);

const server = app.listen(port, async (err) => {
  if (err) {
    console.log(colors.red.underline(err)); //eslint-disable-line
  } else {
    server.keepAliveTimeout = 0;
    console.log(colors.green(`⚡️ App is running🔥: 🌎 http://localhost:${port}`)); //eslint-disable-line
    if (modeDev) {
      openBrowser(`http://localhost:${port}`);
    }
  }
});
