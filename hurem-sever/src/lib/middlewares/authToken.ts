import { Context } from 'koa';
import { decodedToken, IPayload, generateToken } from 'lib/token';
 
export default async (ctx: Context, next: () => Promise<any>) => {
  const token: string | void = ctx.cookies.get('access_token');
  if (!token) {
    ctx.state.user = null;
    return next();
  }

  let decoded: any;
  try {
    decoded = await decodedToken(token);
    if (Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ 
        payload: {
          _id,
          profile,
        },
        subject: 'account',
      });
      ctx.cookies.set('access_tokne', freshToken, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 34 * 7,
      });
    }
  } catch (e) {
    ctx.throw(500, e);
    ctx.state.user = null;
  }
  ctx.state.user = decoded;
  return next();
};