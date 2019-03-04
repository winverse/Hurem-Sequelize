import { Context } from 'koa';

export default class LikesCtrl {
  like = async (ctx: Context) => {
    ctx.body = 'like';
  }

  unlike = async (ctx: Context) => {
    ctx.body = 'unlike';
  }
}