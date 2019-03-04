import { Context } from 'koa';
import * as Joi from 'joi';

import { User, Posts, Comments } from 'database/models';

export default class PostsCtrl {
  write = async (ctx: Context) => {

    interface IBodySchema {
      content: string;
    }

    const { user } = ctx.state;
    const { _id } = user;
    
    let account: any;
    try {
      account = await User.findById(_id);
    } catch (e) {
      ctx.throw(500, e);
    }

    if (!account) {
      ctx.status = 403;
      ctx.body = {
        name: "NOT_LOGGED",
      }
    }

    const schema = Joi.object().keys({
      content: Joi.string().min(5).max(1000).required(),
    });

    const result: Joi.ValidationResult<string> = Joi.validate(ctx.request.body, schema);

    if (result.error) {
      ctx.status = 400;
      ctx.body = {
        name: 'WRONG_SCHEMA',
      };
    }

    const { content }: IBodySchema = ctx.request.body;

    let post: any;
    try {
      const count = account.thoughtCount + 1;
      post = await Posts.write({
        username: account['UserProfile.username'],
        fk_user_id: account.id,
        count, 
        content,
      });
      await User.increseThoughtCount(account);
    } catch (e) {
      ctx.throw(500, e);
    }

    post = post.toJSON();
    post.liked = false; 
    account.setPassword('werewr');
    ctx.body = post;
  }

  list = async (ctx: Context) => {
    ctx.body = 'list';
  }
}