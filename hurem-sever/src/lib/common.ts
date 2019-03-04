import * as Sequelize from 'sequelize';

export const primaryUUID = {
  type: Sequelize.UUID,
  defaultValue: Sequelize.UUIDV4,
  primaryKey: true,
};