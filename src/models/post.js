import db from '../../config/db';
import User from './user';

const Post = db.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,

  user() {
    return this.belongsTo(User);
  },
});

export default Post;