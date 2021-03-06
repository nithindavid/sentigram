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
      .orderBy('id', 'desc')
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

function fetchFollowableUsers(userId) {
  return new Promise((resolve, reject) => {
    let allPosts = [];

    let followees_q = db.knex
      .select('followee_id')
      .from('user_follows')
      .where({ follower_id: userId });

    db.knex
      .select()
      .from('users')
      .whereNotIn('id', followees_q)
      .whereNot('id', userId)
      .limit(3)
      .then(function(rows) {
        console.log('%%%%%%%%%', rows);
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
      .orderBy('id', 'desc')
      .leftJoin('users', 'posts.user_id', 'users.id')
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

function fetchCounts(userId) {
  return new Promise((resolve, reject) => {
  db.knex('user_follows')
      .count('follower_id as jockey')
      .where({ follower_id: userId })
      .then(followersCount => {
        db.knex('user_follows')
          .count('followee_id as jockey')
          .where({ followee_id: userId })
          .then(followeesCount => {
            resolve({ followersCount , followeesCount });
          });
      });
  });
}

function isFollowing(follower_id, followee_id) {
  return new Promise((resolve, reject) => {
    new UserFollow({ followee_id: followee_id, follower_id: follower_id })
      .fetch()
      .then(action => {
        resolve(!!action);
      })
      .catch(error => {
        reject(error);
      });
  });
}

const jsonResponse = (res, { message, error, following }) => {
  res.setHeader('Content-Type', 'application/json');
  if (!!message) {
    res.send(JSON.stringify({ message, following }));
  } else {
    res.end(JSON.stringify({error}));
  }
}

export default {
  fetchFolloweePosts,
  fetchFollowableUsers,
  fetchProfile,
  isFollowing,
  jsonResponse,
  fetchCounts,
};