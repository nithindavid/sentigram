import db from '../../config/db';
import User from '../models/user';

let Users = db.Collection.extend({
    model: User
});

export default Users;