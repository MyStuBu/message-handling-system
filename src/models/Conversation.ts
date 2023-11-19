import {DataTypes, Model} from "sequelize";
import {sequelize} from "../database/sequalize";

class Conversation extends Model {
    declare id: bigint
    declare title: string
}

Conversation.init({
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    modelName: 'Conversation'
})

export default Conversation