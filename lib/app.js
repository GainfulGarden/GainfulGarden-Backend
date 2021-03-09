/* eslint-disable quotes */
const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging

const authRoutes = createAuthRoutes();

// setup authentication routes to give user an auth token
// creates a /auth/signin and a /auth/signup POST route.
// each requires a POST body with a .email and a .password
app.use('/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

// and now every request that has a token in the Authorization header will have a `req.userId` property for us to see who's talking
app.get('/api/test', (req, res) => {
  res.json({
    message: `in this protected route, we get the user's id like so: ${req.userId}`,
  });
});

// GET Endpoint my_garden details
app.get('/my_garden/:id', async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * from my_garden 
      JOIN notes 
      ON my_garden.user_id = notes.user_id 
      AND my_garden.plant_id = notes.plant_id`
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET Endpoint my_garden all
app.get('/my_garden', async (req, res) => {
  try {
    const data = await client.query('SELECT * from my_garden');

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET Endpoint wishlist page
app.get('api/wishlist', async (req, res) => {
  try {
    const data = await client.query('SELECT * from wishlist');

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST Endpoint to add to wishlist
app.post('api/wishlist', async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO wishlist 
      (plant_id, owner_id) 
      VALUES ($1,$2) 
      RETURNING *`,
      [req.body.plant_id, req.userId]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST Endpoint to add to my_garden
app.post('api/my_garden', async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO my_garden 
      (plant_id, plant_name, owner_id) 
      VALUES ($1,$2,$3) 
      RETURNING *`,
      [req.body.plant_id, req.body.plant_name, req.userId]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST to notes
app.post('api/notes', async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO notes 
      (plant_id, user_id, date, note) 
      VALUES ($1,$2,$3,$4) 
      RETURNING *`,
      [req.body.plant_id, req.userId, req.body.date, req.body.note]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE endpoint to remove a plant from my_garden
app.delete('api/my_garden/:id', async (req, res) => {
  try {
    const data = await client.query(
      'DELETE from my_garden where user_id=$1 AND id=$2 returning *',
      [req.userId, req.params.id]
    );

    res.json(data.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE endpoint to remove a plant from wishlist
app.delete('api/wishlist/:id', async (req, res) => {
  try {
    const data = await client.query(
      'DELETE from wishlist where user_id=$1 AND id=$2 returning *',
      [req.userId, req.params.id]
    );

    res.json(data.rows[0]);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET Filtered edible plants
app.get('api/edible_search', async (req, res) => {
  try {
    const data = await (
      await request.get(`https://trefle.io/api/v1/plants?filter[edible]=true`)
    ).set('Authorization', `${process.env.TREFLE_TOKEN}`);

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
