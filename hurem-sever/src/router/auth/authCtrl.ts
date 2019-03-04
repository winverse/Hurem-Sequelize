import { Context } from 'koa';
import * as Joi from 'joi';

import { 
  User,
  UserProfile,
} from 'database/models';

export default class AuthCtrl {

  static localRegister = async (ctx: Context) => {
    
    interface IBodySchema {
      email: string;
      password: string;
      username: string;
    }

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      username: Joi.string().required(),
    });

    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

    if (result.error) {
      ctx.status = 400; // Bad request
      ctx.body = {
        name: 'WRONG_SCHEMA',
        message: result.error,
      };
      return;
    }

    const { email, password, username }: IBodySchema = ctx.request.body;

    let existsUsername;
    let existsEmail;
    try {
      existsEmail = await User.findByEmail(email);
      existsUsername = await User.findByUsername(username);
    } catch (e) {
      ctx.throw(500, e);
    }

    if (existsEmail || existsUsername) {
      ctx.status = 409; // Conflict
      ctx.body = {
        name: existsEmail ? 'EMAIL_EXISTS' : 'USER_NAEM_EXISTS',
        key: existsEmail ? 'email' : 'username',
      };
      return;
    }

    let user;
    let userProfile: any;
    try {
      user = await User.localRegister({ email, password });
      userProfile = await UserProfile.localRegister({
        userId: user.id,
        username,
      });
    } catch (e) {
      ctx.throw(500, e);
    }

    let token: string;
    try {
      token = await User.generateToken({
        instance: userProfile,
        id: user.id,
      });
    } catch (e) {
      ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    ctx.body = {
      username: userProfile.username,
      thumbnail: userProfile.thumbnail,
    };
  }

  static localLogin = async (ctx: Context) => {
    interface IBodySchema {
      email: string;
      password: string;
    }

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

    if (result.error) {
      ctx.status = 400; // Bad Request
      ctx.body = {
        name: 'WRONG_SCHEMA',
        message: result.error,
      };
    }

    const { email, password }: IBodySchema = ctx.request.body;

    let account: any;
    try {
      account = await User.findByEmail(email);
    } catch (e) {
      ctx.throw(500, e);
    }

    if (!account) {
      ctx.status = 401; // Unauthorized
      ctx.body = {
        name: 'NOT_REGISTRED',
      };
    }

    let passwordValidate;
    try {
      passwordValidate = await User.validatePassword({
        instance: account,
        password,
      });
    } catch (e) {
      ctx.throw(500, e);
    }

    if (!passwordValidate) {
      ctx.status = 401; // Unauthorized
      ctx.body = {
        name: 'WRONG_CRUDENTIALS',
      };
    }

    let token: string;
    try {
      token = await User.generateToken({ 
        instance: account.UserProfile,
        id: account.id,
      });
    } catch (e) {
      ctx.throw(500, e);
    }

    ctx.cookies.set('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 7,
    });
    ctx.body = account.UserProfile;
  }

  static exists = async (ctx: Context) => {
    const { key, value } = ctx.params;
    let account: any;
    try {
      account = await (key === 'email' ? User.findByEmail(value) :  User.findByUsername(value));
    } catch (e) {
      ctx.throw(500, e);
    }
    ctx.body = {
      exists: account !== null,
    };
  }

  static check = async (ctx: Context) => {
    const { user } = ctx.state;
    if (!user) {
      ctx.status = 403; // Forbidden
      ctx.body = {
        name: 'FORBIDDEN',
      };
      return;
    }
    ctx.body = user.profile;
  }

  static logout = async (ctx: Context) => {
    ctx.cookies.set('access_token', null, {
      httpOnly: true,
      maxAge: 0,
    });
    ctx.status = 204;
  }
}