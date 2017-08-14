import Post from '../models/post';
import User from '../models/user';

import UserService from '../services/user';

const FeedController = {

  getFeed(req, res) {
    UserService.fetchFolloweePosts(req.user.id).then(feedData => {
      UserService.fetchFollowableUsers(req.user.id).then(followableUsers => {
        res.render('feed', {
          title: 'Home',
          allPosts: feedData,
          followableUsers: followableUsers,
          currentUserData: req.user.toJSON()
        });
      });
    })
  },

  postFeed (req, res) {
    req.assert('content', "Stop writing novels! Reduce Your post size").len(1, 140);
    req.assert('content', "Post is as empty as your soul!").notEmpty();
    req.getValidationResult()
      .then(result => {
        if (!result.isEmpty()) {
          req.flash('errors', result.useFirstErrorOnly().array()[0]);
          return res.redirect('/feed');
        } else {
          let _post = new Post({ content: req.body.content, user_id: req.user.id })
          .save()
          .then(result => {
            res.redirect('/feed');
          })
          .catch((error) => {
            req.flash('errors', 'Something went wrong');
            return res.redirect('/feed');
          });
        }
      });
  }
};

export default FeedController;