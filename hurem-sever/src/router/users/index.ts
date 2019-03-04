import * as Router from 'koa-router';

import userCtrl from './usersCtrl';

class UserRouter {
  public users: Router;

  constructor() {
    this.users = new Router();
    this.routes();
  }

  public routes = () => {
    const { users } = this; 
    users.get('/:username', userCtrl.getProfile);
    users.get('/:username/thumbnail', userCtrl.getThumbnail);
  }
}

const userRouter = new UserRouter();
const users = userRouter.users;

export default users;