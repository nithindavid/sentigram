import db from '../../config/db';
import bcrypt from 'bcrypt';

const User = db.Model.extend({
  tableName: 'users',

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