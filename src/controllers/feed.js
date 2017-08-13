import Post from '../models/Post';

const FeedController = {
  /**
   * GET /login
   * Login page.
   */
  getFeed(req, res) {
    req.user.posts().fetch().then(_posts => {
      console.log(_posts);
      res.render('feed', {
        title: 'Home',
        allPosts: _posts
      });
   });
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