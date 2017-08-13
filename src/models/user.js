import db from '../../config/db';
import bcrypt from 'bcrypt';
import Post from './post';

const User = db.Model.extend({
  tableName: 'users',

  posts() {
    return this.hasMany(Post);
  },

  following: function() {
    return this.belongsToMany(User, 'follows', 'user_id', 'follower_id');
  },

  followers: function() {
    return this.belongsToMany(User, 'follows', 'follower_id', 'user_id');
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