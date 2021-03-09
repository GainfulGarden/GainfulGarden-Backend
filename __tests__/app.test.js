require('dotenv').config();

const { execSync } = require('child_process');

const fakeRequest = require('supertest');
const app = require('../lib/app');
const client = require('../lib/client');

describe('app routes', () => {
  describe('routes', () => {
    let token;
  
    beforeAll(async done => {
      execSync('npm run setup-db');
  
      client.connect();
  
      const signInData = await fakeRequest(app)
        .post('/auth/signup')
        .send({
          name: 'John',
          email: 'jon@user.com',
          password: '1234'
        });
      
      token = signInData.body.token; // eslint-disable-line
  
      return done();
    });
  
    afterAll(done => {
      return client.end(done);
    });

    // GET edible search
    test('returns the first result from a list of edible plants ', async() => {

      const expectation = {
        'id': 176845,
        'common_name': 'Garden sorrel',
        'slug': 'rumex-acetosa',
        'scientific_name': 'Rumex acetosa',
        'year': 1753,
        'bibliography': 'Sp. pl. 1:337.  1753, nom. cons.',
        'author': 'L.',
        'status': 'accepted',
        'rank': 'species',
        'family_common_name': 'Buckwheat family',
        'genus_id': 2722,
        'image_url': 'https://bs.plantnet.org/image/o/780b9f3c63318588b8874d608c2d4900fc2adce3',
        'synonyms': [
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
          'Lapathum acetosa'
      
        ],
      
        'genus': 'Rumex',
      
        'family': 'Polygonaceae',
      
        'links': {
      
          'self': '/api/v1/species/rumex-acetosa',
      
          'plant': '/api/v1/plants/rumex-acetosa',
      
          'genus': '/api/v1/genus/rumex'
      
        }
      
      };

      const response = await fakeRequest(app)
        .get('/api/edible_search')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });
  });

  // something else
  // test('returns the first result from a list of edible plants ', async() => {

  //   const expectation = {
  //     'id': 176845,
  //     'common_name': 'Garden sorrel',
  //     'slug': 'rumex-acetosa',
  //     'scientific_name': 'Rumex acetosa',
  //     'year': 1753,
  //     'bibliography': 'Sp. pl. 1:337.  1753, nom. cons.',
  //     'author': 'L.',
  //     'status': 'accepted',
  //     'rank': 'species',
  //     'family_common_name': 'Buckwheat family',
  //     'genus_id': 2722,
  //     'image_url': 'https://bs.plantnet.org/image/o/780b9f3c63318588b8874d608c2d4900fc2adce3',
  //     'synonyms': [
  //       'Acetosa pratensis subsp. fontanopaludosa',
    
  //       'Acetosa officinalis',
    
  //       'Rumex planellae',
    
  //       'Lapathum pratense',
    
  //       'Rumex fontanopaludosus',
    
  //       'Rumex triangularis',
    
  //       'Acetosa angustata',
    
  //       'Acetosa amplexicaulis',
    
  //       'Rumex oxyotus',
    
  //       'Acetosa hastulata',
    
  //       'Rumex oblongus',
    
  //       'Acetosa bidentula',
    
  //       'Acetosa olitoria',
    
  //       'Rumex acetosa subsp. biformis',
    
  //       'Acetosa pratensis subsp. biformis',
    
  //       'Rumex angustatus',
    
  //       'Rumex micranthus',
    
  //       'Acetosa subalpina',
    
  //       'Acetosa hastifolia',
    
  //       'Rumex pseudoacetosa',
    
  //       'Rumex commersonii',
  //       'Acetosa fontanopaludosa',
  //       'Rumex olitoria',
  //       'Acetosa agrestis',
  //       'Rumex agrestis',
  //       'Rumex acuminatus',
  //       'Rumex sagittifolius',
  //       'Rumex biformis',
  //       'Rumex bidentula',
  //       'Acetosa pratensis',
  //       'Rumex bulbosus',
  //       'Lapathum acetosa'
    
  //     ],
    
  //     'genus': 'Rumex',
    
  //     'family': 'Polygonaceae',
    
  //     'links': {
    
  //       'self': '/api/v1/species/rumex-acetosa',
    
  //       'plant': '/api/v1/plants/rumex-acetosa',
    
  //       'genus': '/api/v1/genus/rumex'
    
  //     }
    
  //   };

  //   const response = await fakeRequest(app)
  //     .get('/api/edible_search')
  //     .set('Authorization', token)
  //     .expect('Content-Type', /json/)
  //     .expect(200);

  //   expect(response.body.data[0]).toEqual(expectation);
  // });
});

