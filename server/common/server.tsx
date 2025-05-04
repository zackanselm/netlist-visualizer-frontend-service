import express, { Application } from 'express';
import * as React from 'react';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import l from './logger';
import routeConfig, { RouteConfig } from '../route-config';
import MainContextProvider from '../../client/store/MainContextProvider';

import errorHandler from '../api/middlewares/error.handler';

declare global {
  namespace NodeJS {
      interface Global {
          window: any;
      }
  }
}

if (!process.env.BROWSER) {
  (global as any).window = ({ document: {} } as any); // Temporarily define window for server-side
  (global as any).document = ({} as any); // Temporarily define window for server-side
}

const app = express();

process.on('uncaughtExceptionMonitor', (err, origin) => {
  l.error(`Uncaught exception (origin: ${origin}): ${err?.message}`)
});

export default class ExpressServer {
  private routes: (app: Application) => void;
  
  constructor() {
    const root = path.normalize(__dirname + '/../..');
    app.set('view engine', 'hbs');
    app.set('views', path.join(__dirname, '../views'));
    
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(express.static(`${root}/dist/static`));

    routeConfig.forEach((config: RouteConfig) => {
      const routePath = config.route;
      const routeView = config.view;
      const title = config.head.title;
      let description = config.head.description;

      app.get(routePath, (req, res) => {
        const promises: any = [];
        const staticContext: any = {};
        const initialState = {};

        // TODO: Prepopulate context store

        const markup = ReactDOMServer.renderToString(
          <MainContextProvider>
              <StaticRouter location={req.url}>
                  Hello, Server World
              </StaticRouter>
          </MainContextProvider>,
        );

        if (staticContext.url) {
          res.writeHead(staticContext.statusCode, {
              Location: staticContext.url,
          });
          res.end();
        } else {
            return res.render(routeView, {
                title,
                description,
                markup,
                routePath,
                state: {},
            });
        }
      });
    })
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    app.use(errorHandler);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      l.info(
        `up and running in ${
          process.env.NODE_ENV || 'development'
        } @: ${os.hostname()} on port: ${p}}`
      );

    http.createServer(app).listen(port, welcome(port));

    return app;
  }
}
