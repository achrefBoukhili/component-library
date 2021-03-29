import webpack from 'webpack';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import config from '../../webpack.config.babel';
import pkg from '../../package.json';

const configServer = (app, modeDev, TARGET) => {
  const sessionOpts = {
    saveUninitialized: false,
    resave: false,
    secret: 'BestProduct',
    cookie: { httpOnly: true, maxAge: 2419200000 }
  };

  const compiler = webpack(config);

  app.set('views', path.join(__dirname, './renderedPages/'));
  app.set('view engine', 'pug');
  if (TARGET === 'start' || TARGET === 'dev' || !TARGET) {
    app.use(morgan('dev'));
    app.use(
      require('webpack-dev-middleware')(compiler, { //eslint-disable-line
        noInfo: true,
        publicPath: config.output.publicPath
      })
    );
    app.use(require('webpack-hot-middleware')(compiler)); //eslint-disable-line
  }

  app.use(cookieParser('coding challenge'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session(sessionOpts));
  app.use(cors());

  app.get('/', (req, res) => {
    res.render(path.join(__dirname, './renderedPages/index'), { bundledFile: `./${pkg.version}.bundle.js`, title: 'plaisio' });
  });
};

export default configServer;
