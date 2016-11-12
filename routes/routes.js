const express     = require('express');
const router      = express.Router();
const generateRandomString = require('../js/generate-random-string.js');

module.exports = (collection) => {
  // index page
  router.get('/', (req, res) => {
    collection.find().toArray((err, results) => {
      res.render('pages/urls_index', {
        urlDatabase: results
      });
    });
  });

  // index page
  router.get('/urls', (req, res) => {
    collection.find().toArray((err, results) => {
      res.render('pages/urls_index', {
        urlDatabase: results
      });
    });
  });

  // create new page
  router.get('/urls/new', (req, res) => {
    res.render('pages/urls_new');
  });

  // use shortURL to get to longURL
  router.get('/u/:id', (req, res) => {
    collection.findOne({
        shortURL: req.params.id
      }, {
        longURL: 1
      }, (err, results) => {
      if (err) {
        res.status(404).send(`Can't find shortURL ${req.params.id}`);
        return;
      }
      res.redirect(results.longURL);
    });
  });

  // access shortURL update page
  router.get('/urls/:id', (req, res) => {
    collection.findOne(
      {
        shortURL: req.params.id
      },
      {
        longURL: 1
      }, (err, results) => {
      res.render('pages/urls_show',
      {
        shortURL: req.params.id,
        longURL: results.longURL
      });
    });
  });

  router.post('/urls', (req, res) => {
    const shortURL = generateRandomString.generateRandomString();
    collection.insertOne({
      shortURL,
      longURL: req.body.longURL
    });
    res.redirect(`/urls/${shortURL}`);
  });

  // deletes URLs from database
  router.delete('/urls/:id', (req, res) => {
    collection.deleteOne(
      {
        shortURL: req.params.id
      }
    );
    res.redirect('/urls');
  });

  router.put('/urls/:id', (req, res) => {
    collection.updateOne(
      {
        shortURL: req.params.id
      },
      {
        shortURL: req.params.id,
        longURL: req.body.longURL
      }
    );
    res.redirect(`/urls/${req.params.id}`);
  });

  return router;
}
