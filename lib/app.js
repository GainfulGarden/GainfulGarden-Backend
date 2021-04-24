/* eslint-disable quotes */
const express = require('express');
const cors = require('cors');
const client = require('./client.js');
const app = express();
const morgan = require('morgan');
const ensureAuth = require('./auth/ensure-auth');
const createAuthRoutes = require('./auth/create-auth-routes');
const request = require('superagent');
const { user } = require('./client.js');

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

//  GET Endpoint my_garden details
app.get('/api/notes/:id', async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * from notes 
      WHERE owner_id=$1
      AND main_species_id=$2
      `,
      [req.userId, req.params.id]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET Endpoint my_garden all
// I'd prefer to see kabob case here
app.get('/api/my-garden', async (req, res) => {
  try {
    const data = await client.query(
      'SELECT * from my_garden WHERE owner_id=$1',
      [req.userId]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET Endpoint wishlist page
app.get('/api/wishlist', async (req, res) => {
  try {
    const data = await client.query(
      'SELECT * from wishlist WHERE owner_id=$1',
      [req.userId]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST Endpoint to add to wishlist
app.post('/api/wishlist', async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO wishlist 
      (main_species_id, owner_id) 
      VALUES ($1,$2) 
      RETURNING *`,
      [req.body.main_species_id, req.userId]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST Endpoint to add to my_garden
app.post('/api/my-garden', async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO my_garden 
      (main_species_id, plant_name, owner_id) 
      VALUES ($1,$2,$3) 
      RETURNING *`,
      [req.body.main_species_id, req.body.plant_name, req.userId]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST to notes
app.post('/api/notes', async (req, res) => {
  try {
    const data = await client.query(
      `INSERT INTO notes 
      (main_species_id, owner_id, date, note) 
      VALUES ($1,$2,$3,$4) 
      RETURNING *`,
      [req.body.main_species_id, req.userId, req.body.date, req.body.note]
    );
    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE endpoint to remove a plant from my_garden
app.delete('/api/my-garden/:id', async (req, res) => {
  try {
    const data = await client.query(
      'DELETE from my_garden where owner_id=$1 AND id=$2 returning *',
      [req.userId, req.params.id]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE endpoint to remove a plant from wishlist
app.delete('/api/wishlist/:id', async (req, res) => {
  try {
    const data = await client.query(
      'DELETE from wishlist where owner_id=$1 AND id=$2 returning *',
      [req.userId, req.params.id]
    );

    res.json(data.rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET Filtered edible plants, search page default on mount
app.get('/api/edible-search', async (req, res) => {
  try {
    const data = await request
      .get('https://trefle.io/api/v1/plants?filter[edible]=true')
      .set('Authorization', `${process.env.TREFLE_TOKEN}`);
    res.json(data.body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET detailed information when clicking on a single plant
app.get('/api/plant-detail/:id', async (req, res) => {
  try {
    const data = await request
      .get(`https://trefle.io/api/v1/plants/${req.params.id}`)
      .set('Authorization', `${process.env.TREFLE_TOKEN}`);

    res.json(data.body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET three filter options on search page, part of plant, is it a veg?, light range
app.get('/api/filtered-search', async (req, res) => {
  try {
    const data = await request
      .get(
        `https://trefle.io/api/v1/plants?filter[edible_part]=${req.query.part}&filter[vegetable]=${req.query.vegetable}&range[light]=${req.query.light}`
      )
      .set('Authorization', `${process.env.TREFLE_TOKEN}`);

    res.json(data.body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// GET (input field) searching by common, family, or scientific name of entire API-- on search page
app.get('/api/name-search', async (req, res) => {
  try {
    const data = await request
      .get(`https://trefle.io/api/v1/plants/search?q=${req.query.name}`)
      .set('Authorization', `${process.env.TREFLE_TOKEN}`);

    res.json(data.body);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.use(require('./middleware/error'));

module.exports = app;
