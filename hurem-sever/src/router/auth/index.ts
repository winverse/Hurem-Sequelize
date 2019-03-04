import * as Router from 'koa-router';

import authCtrl from './authCtrl';

class AuthRouter {
  public auth: Router;

  constructor() {
    this.auth = new Router();
    this.routes();
  }

  public routes = () => {
    const { auth } = this;
    auth.post('/register/local', authCtrl.localRegister);
    auth.post('/login/local', authCtrl.localLogin);
    auth.get('/exists/:key(email|username)/:value', authCtrl.exists);
    auth.post('/logout', authCtrl.logout);
    auth.get('/check', authCtrl.check);
  }
}

const authRouter = new AuthRouter();
const auth = authRouter.auth;

export default auth;