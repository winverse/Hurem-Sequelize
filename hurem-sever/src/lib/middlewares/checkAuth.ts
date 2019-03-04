import { Context } from 'koa';
import { promises } from 'fs';

export default function (ctx: Context, next: () => Promise<any>) {
  const { user } = ctx.state;
  if (!user) {
    ctx.status = 401;
    ctx.body = {
      name: 'NOT_LOGGED',
    };
    return null;
  }
  return next();
}