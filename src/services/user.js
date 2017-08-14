import knex from 'knex';
import User from '../models/user';
import Post from '../models/post';
import UserFollow from '../models/user_follow';
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

function fetchProfile(userId) {
  return new Promise((resolve, reject) => {
    let allPosts = [];

    db.knex
      .select()
      .from('posts')
      .whereIn('user_id', userId)
      .then(feedData => {
        db.knex
          .select()
          .from('users')
          .where('id', userId)
          .then(userData => {
            resolve({ feedData, userData });
          });
      })
      .catch(e => {
        console.log('errorr', e);
        reject(e);
      });
  });
}

function isFollowing(followee_id, follower_id) {
  return new Promise((resolve, reject) => {
    new UserFollow({ followee_id: followee_id, follower_id: follower_id })
      .fetch()
      .then(action => {
        resolve(!!action);
      })
      .catch(error => {
        console.log(' ERRRRRRR',action);
        reject(error);
      });
  });
}

export default {
  fetchFolloweePosts,
  fetchProfile,
  isFollowing,
};