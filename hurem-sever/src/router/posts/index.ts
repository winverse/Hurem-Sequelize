import * as Router from 'koa-router';

import checkAuth from 'lib/middlewares/checkAuth';

import CommentsCtrl from './commentsCtrl';
import LikesCtrl from './likesCtrl';
import PostsCtrl from './postsCtrl';

const commentsCtrl = new CommentsCtrl();
const likesCtrl = new LikesCtrl();
const postsCtrl = new PostsCtrl();

class PostsRouter {
  public posts: Router;
  constructor() {
    this.posts = new Router();
    this.routes();
  }

  public routes = () => {
    const { posts } = this;
    posts.post('/', checkAuth, postsCtrl.write);
    posts.get('/', postsCtrl.list);
    posts.post('/:postId/likes', checkAuth, likesCtrl.like);
    posts.delete('/:postId/likes',checkAuth, likesCtrl.unlike);
    posts.post('/:postId/comments', checkAuth, commentsCtrl.comment);
  }
}

const postsRouter = new PostsRouter();
const posts = postsRouter.posts;

export default posts;