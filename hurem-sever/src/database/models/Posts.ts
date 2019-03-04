import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface IPost {
  id?: string;
  fk_user_id: string;
  writer?: string;
  count?: number;
  content?: string;
}

interface IPara {
  username?: string;
  content?: string;
  count?: number;
  fk_user_id: string;
}

type PostInstance = Sequelize.Instance<IPost> & IPost;

export default class Posts {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<PostInstance, IPost>('posts', {
      id: primaryUUID,
      fk_user_id: { type: Sequelize.UUID },
      writer: { type: Sequelize.STRING },
      count: { type: Sequelize.INTEGER },
      content: { type: Sequelize.TEXT },
    }, {
      timestamps: true,
      paranoid: true,
      indexes: [{
        fields: ['createdAt'],
      }]
    });
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = Posts.init(sequelize, Sequelize);
  static write({ count, username, content, fk_user_id }: IPara) {
    const { Model } = this;
    return Model.build({
      writer: username,
      count,
      content,
      fk_user_id,
    }).save();
  }
}