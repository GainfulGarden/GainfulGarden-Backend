require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;

    beforeAll(async (done) => {
      execSync('npm run setup-db');

      client.connect();

      const signInData = await fakeRequest(app).post('/auth/signup').send({
        name: 'John',
        email: 'jon@user.com',
        password: '1234',
      });

      token = signInData.body.token; // eslint-disable-line

      return done();
    });

    afterAll((done) => {
      return client.end(done);
    });

    // GET edible search
    test('returns the first result from a list of edible plants ', async () => {
      const expectation = {
        id: 176845,
        common_name: 'Garden sorrel',
        slug: 'rumex-acetosa',
        scientific_name: 'Rumex acetosa',
        year: 1753,
        bibliography: 'Sp. pl. 1:337.  1753, nom. cons.',
        author: 'L.',
        status: 'accepted',
        rank: 'species',
        family_common_name: 'Buckwheat family',
        genus_id: 2722,
        image_url:
          'https://bs.plantnet.org/image/o/780b9f3c63318588b8874d608c2d4900fc2adce3',
        synonyms: [
          'Acetosa pratensis subsp. fontanopaludosa',

          'Acetosa officinalis',

          'Rumex planellae',

          'Lapathum pratense',

          'Rumex fontanopaludosus',

          'Rumex triangularis',

          'Acetosa angustata',

          'Acetosa amplexicaulis',

          'Rumex oxyotus',

          'Acetosa hastulata',

          'Rumex oblongus',

          'Acetosa bidentula',

          'Acetosa olitoria',

          'Rumex acetosa subsp. biformis',

          'Acetosa pratensis subsp. biformis',

          'Rumex angustatus',

          'Rumex micranthus',

          'Acetosa subalpina',

          'Acetosa hastifolia',

          'Rumex pseudoacetosa',

          'Rumex commersonii',
          'Acetosa fontanopaludosa',
          'Rumex olitoria',
          'Acetosa agrestis',
          'Rumex agrestis',
          'Rumex acuminatus',
          'Rumex sagittifolius',
          'Rumex biformis',
          'Rumex bidentula',
          'Acetosa pratensis',
          'Rumex bulbosus',
          'Lapathum acetosa',
        ],

        genus: 'Rumex',

        family: 'Polygonaceae',

        links: {
          self: '/api/v1/species/rumex-acetosa',

          plant: '/api/v1/plants/rumex-acetosa',

          genus: '/api/v1/genus/rumex',
        },
      };

      const response = await fakeRequest(app)
        .get('/api/edible_search')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });

    // GET filtered search
    test('returns the first result from a list of edible plants filtered by edible part=roots, vegetable=true, and light=0,8', async () => {
      const expectation = {
        id: 147680,
        common_name: 'Tuberous sweetpea',
        slug: 'lathyrus-tuberosus',
        scientific_name: 'Lathyrus tuberosus',
        year: 1753,
        bibliography: 'Sp. pl. 2:732.  1753',
        author: 'L.',
        status: 'accepted',
        rank: 'species',
        family_common_name: 'Pea family',
        genus_id: 3994,
        image_url:
          'https://bs.plantnet.org/image/o/2a9df55f9f77e98002806afe05b78392ab017f4d',
        synonyms: [
          'Pisum tuberosum',
          'Lathyrus festivus',
          'Lathyrus tuberculatus',
        ],
        genus: 'Lathyrus',
        family: 'Fabaceae',
        links: {
          self: '/api/v1/species/lathyrus-tuberosus',
          plant: '/api/v1/plants/lathyrus-tuberosus',
          genus: '/api/v1/genus/lathyrus',
        },
      };

      const response = await fakeRequest(app)
        .get('/api/filtered_search?part=roots&vegetable=true&light=0,8')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });

    // GET search by name input
    test('returns the first result from a list of edible plants filtered by search input', async () => {
      const expectation = {
        id: 165409,
        common_name: 'Kidney bean',
        slug: 'phaseolus-vulgaris',
        scientific_name: 'Phaseolus vulgaris',
        year: 1753,
        bibliography: 'Sp. pl. 2:723.  1753',
        author: 'L.',
        status: 'accepted',
        rank: 'species',
        family_common_name: 'Pea family',
        genus_id: 3221,
        image_url:
          'https://bs.plantnet.org/image/o/46b23b23e98319531962424fb9d88a4656610a0b',
        synonyms: [
          'Phaseolus nanus',
          'Phaseolus haematocarpus',
          'Phaseolus asparagioides',
          'Phaseolus principissae',
          'Phaseolus umbilicalis',
          'Phaseolus albus',
          'Phaseolus oblongus',
          'Phaseolus sphaericus',
          'Phaseolus praecox',
          'Phaseolus domingensis',
          'Phaseolus communis',
          'Phaseolus deliciosus',
          'Phaseolus esculentus',
          'Phaseolus subglobosus',
          'Phaseolus cruentus',
          'Phaseolus triangulus',
          'Phaseolus melanospermus',
          'Phaseolus zebra',
          'Phaseolus zembra',
          'Phaseolus lilac',
          'Phaseolus vulgaris var. aborigineus',
          'Phaseolus tumidus',
          'Phaseolus lupinoides',
          'Phaseolus saponaceus',
          'Phaseolus ferrugineus',
          'Phaseolus ionocarpus',
          'Phaseolus mexicanus',
          'Phaseolus romanus',
          'Phaseolus dimidiatus',
          'Phaseolus pisiformis',
          'Phaseolus compressus',
          'Phaseolus nigricans',
          'Phaseolus nigerrimus',
          'Phaseolus ovalispermus',
          'Phaseolus stipularis',
          'Phaseolus aborigineus',
          'Phaseolus mesoleucus',
          'Phaseolus gonospermos',
          'Phaseolus sinensis',
          'Phaseolus saccharatus',
          'Phaseolus vulgaris var. humilis',
        ],
        genus: 'Phaseolus',
        family: 'Fabaceae',
        links: {
          self: '/api/v1/species/phaseolus-vulgaris',
          plant: '/api/v1/plants/phaseolus-vulgaris',
          genus: '/api/v1/genus/phaseolus',
        },
      };

      const response = await fakeRequest(app)
        .get('/api/name_search?name=bean')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });

    // GET plant details by id
    test('returns the details for a plant from a given id', async () => {
      const expectation = {
        data: {
          id: 116630,
          common_name: 'coconut palm',
        },
      };

      const response = await fakeRequest(app)
        .get('/api/plant_detail/122263')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data.common_name).toEqual(
        expectation.data.common_name
      );
    });

    // POST to wishlist
    test('adds a plant to the wishlist', async () => {
      const newWishlistPlant = {
        main_species_id: 122263,
        owner_id: 2,
      };

      const dbWishlist = [{ ...newWishlistPlant, id: 3 }];

      const response = await fakeRequest(app)
        .post('/api/wishlist')
        .send(newWishlistPlant)
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(dbWishlist);
    });

    // GET our wishlist
    test('gets the wishlist', async () => {
      const dbWishlist = [
        {
          main_species_id: 122263,
          owner_id: 2,
          id: 3,
        },
      ];

      const response = await fakeRequest(app)
        .get('/api/wishlist')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(dbWishlist);
    });

    // DELETE an item from our wishlist
    test('deletes an item from the wishlist', async () => {
      const expectation = [
        {
          main_species_id: 122263,
          owner_id: 2,
          id: 3,
        },
      ];

      const response = await fakeRequest(app)
        .delete('/api/wishlist/3')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(expectation);

      const nothing = await fakeRequest(app)
        .get('/api/wishlist')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(nothing.body).toEqual([]);
    });

    // POST plant to my_garden
    test('adds a plant to the my_garden', async () => {
      const newPlant = {
        main_species_id: 122263,
        plant_name: 'Jordan',
        owner_id: 2,
      };

      const dbPlantlist = [{ ...newPlant, id: 3 }];

      const response = await fakeRequest(app)
        .post('/api/my_garden')
        .send(newPlant)
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(dbPlantlist);
    });

    // GET my_garden items
    test('gets my_garden', async () => {
      const dbMyGarden = [
        {
          main_species_id: 122263,
          owner_id: 2,
          plant_name: 'Jordan',
          id: 3,
        },
      ];

      const response = await fakeRequest(app)
        .get('/api/my_garden')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(dbMyGarden);
    });

    // POST to notes
    test('adds a post to user notes', async () => {
      const newNote = {
        main_species_id: 122263,
        owner_id: 2,
        date: '2021-04-02',
        note: 'Watered a lot',
      };

      const dbJournal = [{ ...newNote, id: 3 }];

      const response = await fakeRequest(app)
        .post('/api/notes')
        .send(newNote)
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(dbJournal);
    });

    // GET notes
    test('gets user notes for one plant', async () => {
      const plant = [
        {
          main_species_id: 122263,
          owner_id: 2,
          date: '2021-04-02',
          note: 'Watered a lot',
          id: 3,
        },
      ];

      const response = await fakeRequest(app)
        .get('/api/notes/122263')
        .set('Authorization', token);
      // .expect('Content-Type', /json/);
      // .expect(200);
      expect(response).toEqual(plant);
    });

    // DELETE an item from my_garden
    test('deletes an item from my_garden', async () => {
      const expectation = [
        {
          main_species_id: 122263,
          owner_id: 2,
          plant_name: 'Jordan',
          id: 3,
        },
      ];

      const response = await fakeRequest(app)
        .delete('/api/my_garden/3')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body).toEqual(expectation);

      const nothing = await fakeRequest(app)
        .get('/api/my_garden')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);
      expect(nothing.body).toEqual([]);
    });
  });
});
