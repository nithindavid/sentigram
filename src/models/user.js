import db from '../../config/db';
import bcrypt from 'bcrypt';
import Post from './post';
import UserFollow from './user_follow';

const User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,

  posts() {
    return this.hasMany(Post);
  },

  following: function() {
    return this.belongsToMany(User, 'user_follows', 'followee_id', 'follower_id');
  },

  followers: function() {
    return this.belongsToMany(User, 'user_follows', 'follower_id', 'followee_id');
  },

  initialize() {
    this.on('saving', this.hashPassword);
  },


  hashPassword(model) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(model.attributes.password, 10,(err, hash) => {
        !!err && reject(err);
        model.set('password', hash);
        resolve(hash); // data is created only after this occurs
      });
    });
  },
});

export default User;