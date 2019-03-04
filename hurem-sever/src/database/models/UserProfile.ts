import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';

import { primaryUUID } from 'lib/common';
import { User } from 'database/models';

interface IUserProfile {
  id?: string;
  username: string;
  thumbnail?: string;
  fk_user_id?: string;
}

type Instance = Sequelize.Instance<IUserProfile> & IUserProfile;

interface IParameter {
  username?: string;
  userId?: string;
}

export default class UserProfile {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IUserProfile>('UserProfile', {
      id: primaryUUID,
      fk_user_id: { type: Sequelize.UUID },
      username: { type: Sequelize.STRING, unique: true },
      thumbnail: { type: Sequelize.STRING, defaultValue: '/static/images/default_thumbnail.png' }, 
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'userProfile',
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
  static Model = UserProfile.init(sequelize, Sequelize);
  static localRegister({ userId, username }: IParameter) {
    const { Model } = this;
    return Model.build({
      fk_user_id: userId,
      username,
    }).save();
  }
  static findByUsername(username: string) {
    const { Model } = this;
    return Model.findOne({
      where: { 
        username,
      },
      raw: true,
    });
  }
}