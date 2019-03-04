import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface IPostLike {
  id?: string;
  fk_user_id: string;
  fk_post_id: string;
}

type PostLikeInstance = Sequelize.Instance<IPostLike> & IPostLike;

export default class PostLike {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define('PostLike', {
      id: primaryUUID,
      fk_user_id: { type: Sequelize.UUID, allowNull: false },
      fk_post_id: { type: Sequelize.UUID, allowNull: false },
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'postLike'
    });
    
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onUpdate: 'CASCADE',
        onDelete: 'restrict',
      });
      Model.belongsTo(models.Posts, {
        foreignKey: 'fk_post_id',
        onUpdate: 'CASCADE',
        onDelete: 'restrict',
      });
    };
    return Model;
  }

  static Model = PostLike.init(sequelize, Sequelize);
}
