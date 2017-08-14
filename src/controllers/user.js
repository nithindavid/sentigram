import Posts from '../collections/posts';
import Users from '../collections/users';
import UserFollow from '../models/user_follow';

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
    Posts.forge({ user_id: req.user.id }).fetch({withRelated: 'user'}).then(_posts => {
      res.render('feed', {
        title: 'Home',
        allPosts: _posts.toJSON()
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