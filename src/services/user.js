import knex from 'knex';
import User from '../models/user';
import Post from '../models/post';
import db from '../../config/db';

function fetchFolloweePosts(userId) {

  return new Promise((resolve, reject) => {
    let allPosts = [];

    let followees_q = db.knex
      .select('followee_id')
      .from('user_follows')
      .where({ follower_id: userId });

    db.knex
      .select()
      .from('posts')
      .whereIn('user_id', followees_q)
      .leftJoin('users', 'posts.user_id', 'users.id')
      .then(function(rows) {
        resolve(rows);
      })
      .catch(e => {
        console.log('errorr', e);
        reject(e);
      });

  });
}

export default {
  fetchFolloweePosts,
};