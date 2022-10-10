const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/db.config');
const encrypter = require('./encrypter');

const app = express();
const port = 3000;

app.use(cors());

// parse application/json
app.use(bodyParser.json());

/**
 * Get All Passwords
 *
 * @return response()
 */
app.get('/api/passwords', (req, res) => {
  let sqlQuery =
    'SELECT id, website, username, password, other_login_type as otherLoginType FROM password';

  let query = connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    // decrypt data
    if (results.length) {
      results = results.map((value) => {
        if (value.password) {
          value.password = encrypter.dencrypt(value.password);
        }
        return value;
      });
    }

    res.send(apiResponse(results));
  });
});

/**
 * Get Single Password
 *
 * @return response()
 */
app.get('/api/password/:id', (req, res) => {
  let sqlQuery =
    'SELECT id, website, username, password, other_login_type as otherLoginType FROM password WHERE id=' +
    req.params.id;

  let query = connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    // decrypt data
    if (results.length) {
      results = results.map((value) => {
        if (value.password) {
          value.password = encrypter.dencrypt(value.password);
        }
        return value;
      });
    }
    res.send(apiResponse(results));
  });
});

/**
 * Create New Password
 *
 * @return response()
 */
app.post('/api/password', (req, res) => {
  let password = req.body.password ? encrypter.encrypt(req.body.password) : '';
  let data = {
    website: req.body.website,
    username: req.body.username,
    password: password,
    other_login_type: req.body.otherLoginType,
  };

  let sqlQuery = 'INSERT INTO password SET ?';
  let query = connection.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Update Password
 *
 * @return response()
 */
app.put('/api/password/:id', (req, res) => {
  let password = req.body.password ? encrypter.encrypt(req.body.password) : '';
  let sqlQuery =
    "UPDATE password SET website='" +
    req.body.website +
    "', username='" +
    req.body.username +
    "', password='" +
    password +
    "', other_login_type='" +
    req.body.otherLoginType +
    "' WHERE id=" +
    req.params.id;

  let query = connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * Delete Password
 *
 * @return response()
 */
app.delete('/api/password/:id', (req, res) => {
  let sqlQuery = 'DELETE FROM password WHERE id=' + req.params.id + '';

  let query = connection.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

/**
 * Server listening
 */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
