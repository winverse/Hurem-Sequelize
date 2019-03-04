import * as Sequelize from 'sequelize';

const { MSQYL_PW } = process.env;

const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col,
};

export const sequelize: Sequelize.Sequelize = new Sequelize('hurem', 'root', MSQYL_PW, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  port: 3306,
  operatorsAliases,
  define: {
    freezeTableName: true,
  },
});

import { 
  User,
  UserProfile,
  Posts,
  Comments,
  PostsLike,
} from 'database/models';

export interface IModels {
  User?: any;
  UserProfile?: any;
  Posts?: any;
  Comments?: any;
  PostsLike?: any;
}

function associate() {
  const models: IModels = {
    User: User.Model,
    UserProfile: UserProfile.Model,
    Posts: Posts.Model,
    Comments: Comments.Model,
    PostsLike: PostsLike.Model,
  };

  Object.values(models).map((model: any) => {
    if (model.associate) {
      model.associate(models);
    }
  });
}

export function sync() {
  associate();
  sequelize.sync();
}