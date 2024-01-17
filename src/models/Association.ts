import User from './User';
import Conversation from './Conversation';

export default class DatabaseAssociations {
    static associateModels(): void {
        User.hasMany(Conversation)
        Conversation.belongsTo(User)
    }
}
