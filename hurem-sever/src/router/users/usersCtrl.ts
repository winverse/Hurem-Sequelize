import { Context } from 'koa';
import * as Joi from 'joi';

import {
  User,
  UserProfile,
} from 'database/models';

export default class UserCtrl {

  static getProfile = async (ctx: Context) => {
    const { username } = ctx.params;

    let account: any;
    try {
      account = await User.findByUsername(username);
    } catch (e) {
      ctx.throw(500, e);
    }

    if (!account) {
      ctx.status = 404; // NOTFOUND
      ctx.body = {
        name: 'NOT_FOUND_USER',
      };
      return;
    }

    ctx.body = {
      profile: account.UserProfile,
      thoughtCount: account.thoughtCount,
    };
  }

  static getThumbnail = async (ctx: Context) => {
    const { username } = ctx.params;

    let account: any;
    try {
      account = await User.findByUsername(username);
    } catch (e) {
      ctx.throw(500, e);
    }

    if (!account) {
      ctx.status = 404; // NOTFOUND
      ctx.body = {
        name: 'NOT_FOUNT_USER',
      };
      return;
    }
    ctx.redirect(account.UserProfile.thumbnail);
  }
}