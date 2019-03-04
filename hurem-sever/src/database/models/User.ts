import * as Sequelize from 'sequelize';
import { sequelize, IModels } from 'database';
import * as crypto from 'crypto';

import { primaryUUID } from 'lib/common';
import { generateToken } from 'lib/token';
import UserProfile from './UserProfile';

const {
  SECRET_KET,
} = process.env;

interface IUser {
  id?: string;
  email: string;
  password: string;
  thoughtCount?: number;
  generateToken?(token: string): any;
}

type Instance = Sequelize.Instance<IUser> & IUser;

function hash(password: string) {
  return crypto.createHmac('sha512', SECRET_KET).update(password).digest('hex');
}

interface IParameter {
  id?: string;
  email?: string;
  username?: string;
  password?: string;
  instance?: any;
}

export default class User {
  static init = (sequelize: Sequelize.Sequelize, Sequelize: Sequelize.DataTypes) => {
    const Model = sequelize.define<Instance, IUser>('User', {
      id: primaryUUID,
      email: { type: Sequelize.STRING, unique: true },
      password: { type: Sequelize.STRING },
      thoughtCount: { type: Sequelize.INTEGER, defaultValue: 0 },
    }, {
      timestamps: true,
      paranoid: true,
      tableName: 'user',
    });

    Model.associate = (models: IModels) => {
      Model.hasOne(models.UserProfile, {
        foreignKey: 'fk_user_id',
        onDelete: 'CASCADE',
        onUpdate: 'restrict',
      });
    };
    return Model;
  }
  static Model = User.init(sequelize, Sequelize);
  static findById (id: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: UserProfile.Model,
        attributes: ['username', 'thumbnail'],
      }],
      where: {
        id,
      },
      attributes: {exclude: ['password']},
      raw: true,
    });
  }
  static findByEmail (email: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: UserProfile.Model,
        attributes: ['username', 'thumbnail'],
        required: false,
      }],
      where: {
        email,
      },
    });
  }
  static findByUsername (username: string) {
    const { Model } = this;
    return Model.findOne({
      include: [{
        model: UserProfile.Model,
        where: {
          username,
        },
        attributes: ['username', 'thumbnail'],
        required: true,
      }],
    });
  }
  static localRegister({ email, password }: IParameter) {
    const { Model } = this;
    return Model.build({
      email,
      password: hash(password),
    }).save();
  }
  static validatePassword({ instance, password }: IParameter) {
    const hashed = hash(password);
    return instance.password === hashed ? true : false;
  }
  static generateToken({ instance, id }: IParameter) {
    const payload: any = {
      _id: id,
      profile: instance,
    };
    return generateToken({
      payload,
      subject: 'account',
    });
  }
  static increseThoughtCount(instance: any) {
    const { id, thoughtCount } = instance;
    const { Model } = this;
    return Model.update({ 
      thoughtCount: thoughtCount + 1 
    }, {
      where: { 
        id,
      }
    })
  }
}