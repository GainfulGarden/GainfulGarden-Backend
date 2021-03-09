const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(256) NOT NULL,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(512) NOT NULL
            );           
            CREATE TABLE my_garden (
                id SERIAL PRIMARY KEY NOT NULL,
                main_species_id INTEGER NOT NULL,
                plant_name VARCHAR(512) NOT NULL,
                owner_id INTEGER NOT NULL REFERENCES users(id)
            );
            CREATE TABLE wishlist (
              id SERIAL PRIMARY KEY NOT NULL,
              main_species_id INTEGER NOT NULL,
              owner_id INTEGER NOT NULL REFERENCES users(id)
      );
      CREATE TABLE notes (
        id SERIAL PRIMARY KEY NOT NULL,
        main_species_id INTEGER NOT NULL,
        date VARCHAR(512) NOT NULL,
        note VARCHAR(512) NOT NULL,
        owner_id INTEGER NOT NULL REFERENCES users(id)
);
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
