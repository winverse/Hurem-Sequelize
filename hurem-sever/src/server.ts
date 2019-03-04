import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as koaBody from 'koa-body';

import { sequelize, sync } from 'database';
import authToken from 'lib/middlewares/authToken';

import api from 'router';

export default class Server {

  public app: Koa;
  public router: Router;

  constructor() {
    this.app = new Koa();
    this.router = new Router();
    this.initializeDB();
    this.routes();
    this.middleware();
  }

  public initializeDB = (): void => {
    sequelize.authenticate().then(
      () => {
        sync();
        console.log('DB connection is established');
      },
      (err) => {
        console.log(`Unable to connect to be DB: ${err}`);
      },
    );
  }

  public routes = (): void => {
    const { router } = this;
    router.use('/api', api.routes());
  }

  public middleware = (): void => {
    const { app, router } = this;
    app.use(koaBody());
    app.use(authToken);
    app.use(router.routes()).use(router.allowedMethods());
  }

  public listen = (port: number): void => {
    const { app } = this;
    app.listen(port, () => {
      console.log(`server is running, port number is ${port}`);
    });
  }
}