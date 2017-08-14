import Posts from '../collections/posts';
import Users from '../collections/users';
import UserFollow from '../models/user_follow';

import UserService from '../services/user';

const jsonResponse = (res, { message, error, following }) => {
  res.setHeader('Content-Type', 'application/json');
  if (!!message) {
    res.send(JSON.stringify({ message, following }));
  } else {
    res.end(JSON.stringify({error}));
  }
}
const UserController = {

  getProfile(req, res) {
    UserService
    .fetchProfile(req.params.user_id)
    .then(({ feedData, userData }) => {
      UserService
      .isFollowing(req.user.id, req.params.user_id)
      .then(_isFollowing => {

        res.render('profile', {
          title: 'Home',
          allPosts: feedData,
          userData: userData[0],
          isFollowing: _isFollowing,
        });
      })
      .catch(e => {
        console.log('errorr', e);
      });
    });
  },

  getFollowers(req, res) {
    Users.forge({ id: req.user.id }).fetch({withRelated: 'following'}).then(_user => {
      console.log(_user.toJSON());
      res.render('feed', {
        title: 'Home',
        allPosts: _user.toJSON()
      });
    });
  },

  followUser(req, res) {
    new UserFollow({ followee_id: req.params.followee_id, follower_id: req.user.id })
    .fetch()
    .then(action => {
      if (!!action) {
        new UserFollow()
        .where({ followee_id: req.params.followee_id, follower_id: req.user.id })
        .destroy()
        .then(action => {
          jsonResponse(res,{ message: 'unfollowed', following: false });
        });
      } else {
        new UserFollow({ followee_id: req.params.followee_id, follower_id: req.user.id })
        .save()
        .then(action => {
          jsonResponse(res,{ message: 'unfollowed', following: true });
        })
      }
    })
    .catch(error => {
      jsonResponse(res,{ error: 'Something went wrong' });
    });
  },
};

export default UserController;