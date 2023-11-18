import User from "./User";
import Conversation from "./Conversation";

User.hasMany(Conversation)
Conversation.belongsTo(User)