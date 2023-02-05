import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import { v4 as uuidv4 } from "uuid";
const { DataTypes } = Sequelize;

const Tenants = db.define(
  "tenants",
  {
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: () => uuidv4(),
    },
    URL: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    contact_number: {
      type: DataTypes.STRING,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  },
  {
    freezeTableName: true,
  }
);

(async () => {
  await db.sync();
})();

export default Tenants;
