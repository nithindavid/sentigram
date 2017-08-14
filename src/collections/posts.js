import db from '../../config/db';
import Post from '../models/post';

let Posts = db.Collection.extend({
    model: Post
});

export default Posts;