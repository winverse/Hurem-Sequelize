import { Context } from 'koa';

export default class CommentsCtrl {
  comment = async (ctx: Context) => {
    ctx.body = 'comment';
  }
}