import * as Router from 'koa-router';

import auth from './auth';
import users from './users';
import posts from './posts';

export class ApiRouter {
  public api: Router;

  constructor() {
    this.api = new Router();
    this.routes();
  }

  public routes = () => {
    const { api } = this;
    api.use('/auth', auth.routes());
    api.use('/users', users.routes());
    api.use('/posts', posts.routes());
  }
}

const apiRouter = new ApiRouter();
const api = apiRouter.api;

export default api;