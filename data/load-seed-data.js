/* eslint-disable indent */
const client = require('../lib/client');
// import our seed data:
const myGarden = require('./my_garden.js');
const wishlist = require('./wishlist.js');
const notes = require('./notes.js');
const usersData = require('./users.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    const users = await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (email, name, hash)
                      VALUES ($1, $2, $3)
                      RETURNING *;
                  `,
          [user.email, user.name, user.hash]);
      })
    );

    const user = users[0].rows[0];

    await Promise.all(
      myGarden.map(item => {
        return client.query(`
                    INSERT INTO my_garden (plant_id, plant_name, owner_id)
                    VALUES ($1, $2, $3);
                `,
          [item.plant_id, item.plant_name, user.id]);
      })
    );

    await Promise.all(
      wishlist.map(item => {
        return client.query(`
                    INSERT INTO wishlist (plant_id, owner_id)
                    VALUES ($1, $2);
                `,
          [item.plant_id, user.id]);
      })
    );

    await Promise.all(
      notes.map(item => {
        return client.query(`
                    INSERT INTO notes (plant_id, owner_id, date, note)
                    VALUES ($1, $2, $3, $4);
                `,
          [item.plant_id, user.id, item.date, item.note]);
      })
    );


    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
