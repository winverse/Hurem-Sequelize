import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';

interface ICommnent {
  id?: string;
  fk_post_id: string;
  fk_user_id: string;
  text: string;
}

export default class Comments {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<any, ICommnent>('comments', {
      id: primaryUUID,
      fk_post_id: { type: Sequelize.UUID, allowNull: false },
      fk_user_id: { type: Sequelize.UUID, allowNull: false },
      text: { type: Sequelize.STRING },
    }, {
      paranoid: true,
    });
    Model.associate = (models: IModels) => {
      Model.belongsTo(models.Posts, {
        foreignKey: 'fk_post_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
      Model.belongsTo(models.User, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }

  static Model = Comments.init(sequelize, Sequelize);
}