import db from '../../config/db';
import User from './user';

const UserFollow = db.Model.extend({
  tableName: 'user_follows',
  hasTimestamps: true,

  user() {
    return this.belongsTo(User);
  },
  follower() {
    return this.belongsTo(User);
  },
});

export default UserFollow;