import knex from 'knex';
import User from '../models/user';
import db from '../../config/db';

const randomUserPic = () => {
  return `https://randomuser.me/api/portraits/women/${Math.floor(Math.random() * 100)}.jpg`
};

const saveUser = (body) => {
  return new User({
      username: body.username,
      name: body.name,
      password: body.password,
      photo_url: randomUserPic()
    })
    .save();
}

const fetchUser = (body) => {
  return new User({ username: body.username })
    .fetch();
}

export default {
  saveUser,
  fetchUser
};