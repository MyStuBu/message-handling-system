import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/dbConnection";

class User extends Model {
    declare id: number
    declare username: string
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'User'
})

export default User