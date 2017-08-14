import Post from '../models/post';
import User from '../models/user';

import UserService from '../services/user';

const FeedController = {

  getFeed(req, res) {
    UserService.fetchFolloweePosts(req.user.id).then(feedData => {
      res.render('feed', {
        title: 'Home',
        allPosts: feedData,
      });
    })
  },

  postFeed (req, res) {
    req.assert('content', "Need more sentiments").notEmpty();
    req.getValidationResult()
      .then(result => {
        if (!result.isEmpty()) {
          req.flash('errors', result.mapped());
          return res.redirect('/login');
        }
      });

    let _post = new Post({ content: req.body.content, user_id: req.user.id })
    .save()
    .then(result => {
      console.log(result);
      res.redirect('/feed');
    })
    .catch((error) => {
      return done(null, false, { msg: 'Something went wrong! Try again.' });
    });
  }
};

export default FeedController;