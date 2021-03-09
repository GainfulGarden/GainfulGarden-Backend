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

    // GET filtered search
    test('returns the first result from a list of edible plants filtered by edible part=roots, vegetable=true, and light=0,8', async() => {

      const expectation = {
        'id': 147680,
        'common_name': 'Tuberous sweetpea',
        'slug': 'lathyrus-tuberosus',
        'scientific_name': 'Lathyrus tuberosus',
        'year': 1753,
        'bibliography': 'Sp. pl. 2:732.  1753',
        'author': 'L.',
        'status': 'accepted',
        'rank': 'species',
        'family_common_name': 'Pea family',
        'genus_id': 3994,
        'image_url': 'https://bs.plantnet.org/image/o/2a9df55f9f77e98002806afe05b78392ab017f4d',
        'synonyms': [
          'Pisum tuberosum',
          'Lathyrus festivus',
          'Lathyrus tuberculatus'
        ],
        'genus': 'Lathyrus',
        'family': 'Fabaceae',
        'links': {
          'self': '/api/v1/species/lathyrus-tuberosus',
          'plant': '/api/v1/plants/lathyrus-tuberosus',
          'genus': '/api/v1/genus/lathyrus'
        }
      };

      const response = await fakeRequest(app)
        .get('/api/filtered_search?part=roots&vegetable=true&light=0,8')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });

    // GET search by name input
    test('returns the first result from a list of edible plants filtered by search input', async() => {

      const expectation = {
        'id': 165409,
        'common_name': 'Kidney bean',
        'slug': 'phaseolus-vulgaris',
        'scientific_name': 'Phaseolus vulgaris',
        'year': 1753,
        'bibliography': 'Sp. pl. 2:723.  1753',
        'author': 'L.',
        'status': 'accepted',
        'rank': 'species',
        'family_common_name': 'Pea family',
        'genus_id': 3221,
        'image_url': 'https://bs.plantnet.org/image/o/46b23b23e98319531962424fb9d88a4656610a0b',
        'synonyms': [
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
          'Phaseolus vulgaris var. humilis'
        ],
        'genus': 'Phaseolus',
        'family': 'Fabaceae',
        'links': {
          'self': '/api/v1/species/phaseolus-vulgaris',
          'plant': '/api/v1/plants/phaseolus-vulgaris',
          'genus': '/api/v1/genus/phaseolus'
        }
      };

      const response = await fakeRequest(app)
        .get('/api/name_search?name=bean')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });

    // GET plant details by id
    test('returns the details for a plant from a given id', async() => {

      const expectation = {
        'data': {
          'id': 116630,
          'common_name': 'coconut palm',
          'slug': 'cocos-nucifera',
          'scientific_name': 'Cocos nucifera',
          'main_species_id': 122263,
          'image_url': 'https://bs.plantnet.org/image/o/cdfddf30789d9ce9c13f0ca5a2a95ebe2189183c',
          'year': 1753,
          'bibliography': 'Sp. Pl.: 1188 (1753)',
          'author': 'L.',
          'family_common_name': 'Palm family',
          'genus_id': 1916,
          'observations': 'C. Malesia to SW. Pacific',
          'vegetable': false,
          'links': {
            'self': '/api/v1/plants/cocos-nucifera',
            'species': '/api/v1/plants/cocos-nucifera/species',
            'genus': '/api/v1/genus/cocos'
          },
          'main_species': {
            'id': 122263,
            'common_name': 'Coconut palm',
            'slug': 'cocos-nucifera',
            'scientific_name': 'Cocos nucifera',
            'year': 1753,
            'bibliography': 'Sp. Pl.: 1188 (1753)',
            'author': 'L.',
            'status': 'accepted',
            'rank': 'species',
            'family_common_name': 'Palm family',
            'genus_id': 1916,
            'observations': 'C. Malesia to SW. Pacific',
            'vegetable': false,
            'image_url': 'https://bs.plantnet.org/image/o/cdfddf30789d9ce9c13f0ca5a2a95ebe2189183c',
            'genus': 'Cocos',
            'family': 'Arecaceae',
            'duration': [
              'perennial'
            ],
            'edible_part': [
              'seeds'
            ],
            'edible': true,
            'images': {
              'flower': [
                {
                  'id': 3273509,
                  'image_url': 'https://bs.plantnet.org/image/o/166c764e0320c772f4a3d215258fdda21d76a2ce',
                  'copyright': 'Taken Jan 9, 2019 by Goustan Bodin (cc-by-sa)'
                },
                {
                  'id': 3273511,
                  'image_url': 'https://bs.plantnet.org/image/o/57a5aa044aaff0cad209e2d99dc64b0b98d4c6af',
                  'copyright': 'Taken Jan 9, 2019 by Goustan Bodin (cc-by-sa)'
                },
                {
                  'id': 3273512,
                  'image_url': 'https://bs.plantnet.org/image/o/e280a42d86c93985ec590b27cdeeeb0197290793',
                  'copyright': 'Taken Jan 9, 2019 by Goustan Bodin (cc-by-sa)'
                }
              ],
              'bark': [
                {
                  'id': 3273498,
                  'image_url': 'https://bs.plantnet.org/image/o/cdfddf30789d9ce9c13f0ca5a2a95ebe2189183c',
                  'copyright': 'Taken Mar 8, 2019 by Daniel Barthelemy (cc-by-sa)'
                }
              ],
              '': [
                {
                  'id': 3544053,
                  'image_url': 'https://storage.googleapis.com/powop-assets/palmweb/palm_tc_44645_4_fullsize.jpg',
                  'copyright': '© copyright of the Board of Trustees of the Royal Botanic Gardens, Kew.'
                },
                {
                  'id': 3544054,
                  'image_url': 'https://storage.googleapis.com/powop-assets/palmweb/palm_tc_44645_14_fullsize.jpg',
                  'copyright': '© copyright of the Board of Trustees of the Royal Botanic Gardens, Kew.'
                },
                {
                  'id': 3544055,
                  'image_url': 'https://storage.googleapis.com/powop-assets/palmweb/palm_tc_44645_9_fullsize.jpg',
                  'copyright': '© copyright of the Board of Trustees of the Royal Botanic Gardens, Kew.'
                }
              ]
            },
            'common_names': {
              'en': [
                'Coconut',
                'Coconut palm',
                'Copra',
                'Agbon',
                'Aku oyinbo',
                'Coco',
                'Coconut tree',
                'Cocotero',
                'Cocotier',
                'Coqueiro',
                'Kelapa',
                'Koko',
                'Kokosneut',
                'Kokosov orah',
                'Kokospalme',
                'Kookospalmu',
                'Mosara',
                'Nalikera',
                'Narikela',
                'Nariyal',
                'Nariyel',
                'Nazi',
                'Nirikel',
                'Niu',
                'Niyog',
                'Noril',
                'Nrglah',
                'Pol',
                'Ololani'
              ],
              'af': [
                'Kokospalm',
                'Kokosneut'
              ],
              'ak': [
                'Kube'
              ],
              'sq': [
                'Arra e kokosit'
              ],
              'am': [
                'ኮኮነት ዘምባባ'
              ],
              'ar': [
                'فارسی',
                'Jadhirdah',
                'Jooz al-hind',
                'جوز الهند'
              ],
              'hy': [
                'Կոկոսյան արմավենի'
              ],
              'az': [
                'Kokos palması'
              ],
              'eu': [
                'Kokondo'
              ],
              'be': [
                'Какосавая пальма'
              ],
              'bn': [
                'নারিকেল',
                'Narakel',
                'Nariyal',
                'Nirikel'
              ],
              'bi': [
                'Kokonas'
              ],
              'br': [
                'Gwez koko'
              ],
              'bg': [
                'Кокосова палма'
              ],
              'my': [
                'အုန်းသီး'
              ],
              'ca': [
                'Cocoter'
              ],
              'hr': [
                'Kokosova palma',
                'Kokosov orah'
              ],
              'cs': [
                'Kokosovník ořechoplodý'
              ],
              'da': [
                'Kokos'
              ],
              'dv': [
                'ކުރުނބާ'
              ],
              'nl': [
                'Kokospalm',
                'Coco',
                'Cocos',
                'Klapperboom'
              ],
              'eo': [
                'Kokoso'
              ],
              'et': [
                'Kookospalm'
              ],
              'fj': [
                'Niu'
              ],
              'fi': [
                'Kookospalmu'
              ],
              'fr': [
                'Cocotier',
                'Coco',
                'Cocotier commun',
                'Noix de coco',
                'Koko'
              ],
              'gl': [
                'Coco'
              ],
              'ka': [
                'ქოქოსი',
                'Ქოქოსი'
              ],
              'de': [
                'Kokosnuß',
                'Kokospalme',
                'Kokosnusspalme',
                'Kokos'
              ],
              'el': [
                'Κοκοφοίνικας'
              ],
              'gn': [
                'Mbokaja\'a'
              ],
              'gu': [
                'નારિયેળ'
              ],
              'ht': [
                'Kokoye'
              ],
              'ha': [
                'Mosara'
              ],
              'he': [
                'קוקוס'
              ],
              'hi': [
                'नारियल'
              ],
              'hu': [
                'Kókuszpálma'
              ],
              'is': [
                'Kókoshneta'
              ],
              'io': [
                'Kokoso'
              ],
              'ig': [
                'Aku oyinbo'
              ],
              'id': [
                'Kelapa',
                'Niyog',
                'Nyiur'
              ],
              'ia': [
                'Palma de coco'
              ],
              'ga': [
                'Cnó cócó'
              ],
              'it': [
                'Palma da cocco',
                'Cocco'
              ],
              'ja': [
                'ココナッツ'
              ],
              'jv': [
                'Krambil'
              ],
              'kn': [
                'ತೆಂಗಿನಕಾಯಿ'
              ],
              'kk': [
                'Кокос пальмасы'
              ],
              'km': [
                'ដើមដូង'
              ],
              'ku': [
                'Gûza hindê'
              ],
              'lo': [
                'ນາລິກາ'
              ],
              'lv': [
                'Kokospalma'
              ],
              'li': [
                'Kokespaum'
              ],
              'ln': [
                'Kokotí'
              ],
              'lt': [
                'Riešutinė kokospalmė'
              ],
              'lb': [
                'Kokosnoss'
              ],
              'mk': [
                'Кокосова палма'
              ],
              'ms': [
                'Pokok Kelapa',
                'Coconut'
              ],
              'ml': [
                'തെങ്ങ്'
              ],
              'mt': [
                'Kokonat'
              ],
              'gv': [
                'Cro bainney'
              ],
              'mr': [
                'नारळ'
              ],
              'mn': [
                'Далдуу мод'
              ],
              'mi': [
                'Kokonati'
              ],
              'nv': [
                'Mágí bichʼiyąʼ'
              ],
              'ne': [
                'नरिवल'
              ],
              'nb': [
                'Kokosnøtt'
              ],
              'nn': [
                'Kokospalme'
              ],
              'or': [
                'ନଡ଼ିଆ'
              ],
              'pa': [
                'ਨਾਰੀਅਲ'
              ],
              'ps': [
                'ناريال'
              ],
              'fa': [
                'نارگیل',
                'Nārgīlah'
              ],
              'pl': [
                'Palma kokosowa'
              ],
              'pt': [
                'Coco-da-bahia',
                'Coco-da-praia',
                'Coqueiro',
                'Coqueiro-da-bahia',
                'Coqueiro-da-praia',
                'Coco da Bahia',
                'Coco da India',
                'Coquerio de Bahia',
                'Coco',
                'Coco-verde',
                'Coqueiro da Bahia'
              ],
              'qu': [
                'Pikwayu'
              ],
              'ro': [
                'Cocotier'
              ],
              'ru': [
                'Кокосовая пальма'
              ],
              'sa': [
                'केरवृक्षः',
                'Narikela'
              ],
              'sr': [
                'Кокосова палма'
              ],
              'sd': [
                'ناريل'
              ],
              'si': [
                'පොල්',
                'Pol'
              ],
              'sk': [
                'Kokosovník'
              ],
              'sl': [
                'Kokosova palma'
              ],
              'so': [
                'Qumbe'
              ],
              'es': [
                'Cocotero',
                'Palma de Coco',
                'Coco de agua',
                'Palmera de coco',
                'Coco',
                'Coco fruto',
                'Pipa'
              ],
              'su': [
                'Kalapa'
              ],
              'sw': [
                'Mnazi',
                'Mnazi (mti)'
              ],
              'sv': [
                'Kokospalm',
                'Kokosnöt'
              ],
              'tl': [
                'Buko',
                'Niyog'
              ],
              'ty': [
                'Niu'
              ],
              'ta': [
                'தேங்காய்'
              ],
              'tt': [
                'Һинд чикләвеге'
              ],
              'te': [
                'కొబ్బరి'
              ],
              'th': [
                'มะพร้าว'
              ],
              'bo': [
                'བེ་ཏ།'
              ],
              'to': [
                'Niu'
              ],
              'tr': [
                'Hindistan cevizi'
              ],
              'uk': [
                'Кокосова пальма'
              ],
              'ur': [
                'ناریل'
              ],
              'vi': [
                'Dừa'
              ],
              'cy': [
                'Cnau coco'
              ],
              'fy': [
                'Kokospalm'
              ],
              'wo': [
                'Kokko',
                'Koko'
              ],
              'yi': [
                'קאקאס'
              ],
              'yo': [
                'Agbon'
              ],
              'por': [
                'coco-da-bahia',
                'coco-verde',
                'coqueiro',
                'coqueiro-da-praia'
              ],
              'msa': [
                'coconut'
              ],
              'deu': [
                'kokosnuß',
                'kokospalme'
              ],
              'spa': [
                'palma de coco',
                'cocotero'
              ],
              'eng': [
                'coconut',
                'coconut palm',
                'copra'
              ],
              'fra': [
                'cocotier'
              ],
              'swe': [
                'kokospalm'
              ],
              'swa': [
                'mnazi'
              ]
            },
            'distribution': {
              'native': [
                'Bismarck Archipelago',
                'Maluku',
                'New Guinea',
                'Philippines',
                'Queensland',
                'Samoa',
                'Santa Cruz Is.',
                'Solomon Is.',
                'Tonga',
                'Vanuatu'
              ],
              'introduced': [
                'Andaman Is.',
                'Angola',
                'Ascension',
                'Bahamas',
                'Bangladesh',
                'Belize',
                'Benin',
                'Bolivia',
                'Borneo',
                'Brazil North',
                'Brazil Northeast',
                'Brazil Southeast',
                'Cambodia',
                'Cameroon',
                'Caroline Is.',
                'Cayman Is.',
                'Central African Repu',
                'Central American Pac',
                'Chagos Archipelago',
                'Chile North',
                'China South-Central',
                'China Southeast',
                'Christmas I.',
                'Cocos (Keeling) Is.',
                'Colombia',
                'Cook Is.',
                'Costa Rica',
                'Cuba',
                'Dominican Republic',
                'Easter Is.',
                'El Salvador',
                'Fiji',
                'Florida',
                'Gabon',
                'Gambia',
                'Georgia',
                'Ghana',
                'Gilbert Is.',
                'Guinea',
                'Guinea-Bissau',
                'Gulf of Guinea Is.',
                'Hainan',
                'Haiti',
                'Hawaii',
                'Honduras',
                'India',
                'Ivory Coast',
                'Jamaica',
                'Jawa',
                'Kenya',
                'Laccadive Is.',
                'Leeward Is.',
                'Lesser Sunda Is.',
                'Liberia',
                'Line Is.',
                'Madagascar',
                'Malaya',
                'Maldives',
                'Marcus I.',
                'Marianas',
                'Marquesas',
                'Marshall Is.',
                'Mauritius',
                'Mexico Southeast',
                'Mexico Southwest',
                'Mozambique',
                'Mozambique Channel I',
                'Myanmar',
                'Nauru',
                'New Caledonia',
                'Nicaragua',
                'Nicobar Is.',
                'Nigeria',
                'Niue',
                'North Carolina',
                'Ogasawara-shoto',
                'Phoenix Is.',
                'Puerto Rico',
                'Réunion',
                'Senegal',
                'Seychelles',
                'Society Is.',
                'South Carolina',
                'South China Sea',
                'Southwest Caribbean',
                'Sri Lanka',
                'Sulawesi',
                'Sumatera',
                'Taiwan',
                'Tanzania',
                'Thailand',
                'Togo',
                'Tokelau-Manihiki',
                'Trinidad-Tobago',
                'Tuamotu',
                'Tubuai Is.',
                'Tuvalu',
                'Venezuela',
                'Venezuelan Antilles',
                'Vietnam',
                'Wallis-Futuna Is.',
                'Windward Is.',
                'Zaïre'
              ]
            },
            'distributions': {
              'native': [
                {
                  'id': 208,
                  'name': 'Bismarck Archipelago',
                  'slug': 'bis',
                  'tdwg_code': 'BIS',
                  'tdwg_level': 3,
                  'species_count': 1511,
                  'links': {
                    'self': '/api/v1/distributions/bis',
                    'plants': '/api/v1/distributions/bis/plants',
                    'species': '/api/v1/distributions/bis/species'
                  }
                },
                {
                  'id': 195,
                  'name': 'Maluku',
                  'slug': 'mol',
                  'tdwg_code': 'MOL',
                  'tdwg_level': 3,
                  'species_count': 3003,
                  'links': {
                    'self': '/api/v1/distributions/mol',
                    'plants': '/api/v1/distributions/mol/plants',
                    'species': '/api/v1/distributions/mol/species'
                  }
                },
                {
                  'id': 61,
                  'name': 'New Guinea',
                  'slug': 'nwg',
                  'tdwg_code': 'NWG',
                  'tdwg_level': 3,
                  'species_count': 12935,
                  'links': {
                    'self': '/api/v1/distributions/nwg',
                    'plants': '/api/v1/distributions/nwg/plants',
                    'species': '/api/v1/distributions/nwg/species'
                  }
                },
                {
                  'id': 66,
                  'name': 'Philippines',
                  'slug': 'phi',
                  'tdwg_code': 'PHI',
                  'tdwg_level': 3,
                  'species_count': 8991,
                  'links': {
                    'self': '/api/v1/distributions/phi',
                    'plants': '/api/v1/distributions/phi/plants',
                    'species': '/api/v1/distributions/phi/species'
                  }
                },
                {
                  'id': 67,
                  'name': 'Queensland',
                  'slug': 'qld',
                  'tdwg_code': 'QLD',
                  'tdwg_level': 3,
                  'species_count': 8269,
                  'links': {
                    'self': '/api/v1/distributions/qld',
                    'plants': '/api/v1/distributions/qld/plants',
                    'species': '/api/v1/distributions/qld/species'
                  }
                },
                {
                  'id': 220,
                  'name': 'Samoa',
                  'slug': 'sam',
                  'tdwg_code': 'SAM',
                  'tdwg_level': 3,
                  'species_count': 1085,
                  'links': {
                    'self': '/api/v1/distributions/sam',
                    'plants': '/api/v1/distributions/sam/plants',
                    'species': '/api/v1/distributions/sam/species'
                  }
                },
                {
                  'id': 112,
                  'name': 'Santa Cruz Is.',
                  'slug': 'scz',
                  'tdwg_code': 'SCZ',
                  'tdwg_level': 3,
                  'species_count': 247,
                  'links': {
                    'self': '/api/v1/distributions/scz',
                    'plants': '/api/v1/distributions/scz/plants',
                    'species': '/api/v1/distributions/scz/species'
                  }
                },
                {
                  'id': 113,
                  'name': 'Solomon Is.',
                  'slug': 'sol',
                  'tdwg_code': 'SOL',
                  'tdwg_level': 3,
                  'species_count': 2278,
                  'links': {
                    'self': '/api/v1/distributions/sol',
                    'plants': '/api/v1/distributions/sol/plants',
                    'species': '/api/v1/distributions/sol/species'
                  }
                },
                {
                  'id': 200,
                  'name': 'Tonga',
                  'slug': 'ton',
                  'tdwg_code': 'TON',
                  'tdwg_level': 3,
                  'species_count': 730,
                  'links': {
                    'self': '/api/v1/distributions/ton',
                    'plants': '/api/v1/distributions/ton/plants',
                    'species': '/api/v1/distributions/ton/species'
                  }
                },
                {
                  'id': 114,
                  'name': 'Vanuatu',
                  'slug': 'van',
                  'tdwg_code': 'VAN',
                  'tdwg_level': 3,
                  'species_count': 1055,
                  'links': {
                    'self': '/api/v1/distributions/van',
                    'plants': '/api/v1/distributions/van/plants',
                    'species': '/api/v1/distributions/van/species'
                  }
                }
              ],
              'introduced': [
                {
                  'id': 39,
                  'name': 'Andaman Is.',
                  'slug': 'and',
                  'tdwg_code': 'AND',
                  'tdwg_level': 3,
                  'species_count': 2058,
                  'links': {
                    'self': '/api/v1/distributions/and',
                    'plants': '/api/v1/distributions/and/plants',
                    'species': '/api/v1/distributions/and/species'
                  }
                },
                {
                  'id': 4,
                  'name': 'Angola',
                  'slug': 'ang',
                  'tdwg_code': 'ANG',
                  'tdwg_level': 3,
                  'species_count': 6391,
                  'links': {
                    'self': '/api/v1/distributions/ang',
                    'plants': '/api/v1/distributions/ang/plants',
                    'species': '/api/v1/distributions/ang/species'
                  }
                },
                {
                  'id': 193,
                  'name': 'Ascension',
                  'slug': 'asc',
                  'tdwg_code': 'ASC',
                  'tdwg_level': 3,
                  'species_count': 204,
                  'links': {
                    'self': '/api/v1/distributions/asc',
                    'plants': '/api/v1/distributions/asc/plants',
                    'species': '/api/v1/distributions/asc/species'
                  }
                },
                {
                  'id': 166,
                  'name': 'Bahamas',
                  'slug': 'bah',
                  'tdwg_code': 'BAH',
                  'tdwg_level': 3,
                  'species_count': 1349,
                  'links': {
                    'self': '/api/v1/distributions/bah',
                    'plants': '/api/v1/distributions/bah/plants',
                    'species': '/api/v1/distributions/bah/species'
                  }
                },
                {
                  'id': 41,
                  'name': 'Bangladesh',
                  'slug': 'ban',
                  'tdwg_code': 'BAN',
                  'tdwg_level': 3,
                  'species_count': 4664,
                  'links': {
                    'self': '/api/v1/distributions/ban',
                    'plants': '/api/v1/distributions/ban/plants',
                    'species': '/api/v1/distributions/ban/species'
                  }
                },
                {
                  'id': 154,
                  'name': 'Belize',
                  'slug': 'blz',
                  'tdwg_code': 'BLZ',
                  'tdwg_level': 3,
                  'species_count': 3523,
                  'links': {
                    'self': '/api/v1/distributions/blz',
                    'plants': '/api/v1/distributions/blz/plants',
                    'species': '/api/v1/distributions/blz/species'
                  }
                },
                {
                  'id': 29,
                  'name': 'Benin',
                  'slug': 'ben',
                  'tdwg_code': 'BEN',
                  'tdwg_level': 3,
                  'species_count': 2528,
                  'links': {
                    'self': '/api/v1/distributions/ben',
                    'plants': '/api/v1/distributions/ben/plants',
                    'species': '/api/v1/distributions/ben/species'
                  }
                },
                {
                  'id': 77,
                  'name': 'Bolivia',
                  'slug': 'bol',
                  'tdwg_code': 'BOL',
                  'tdwg_level': 3,
                  'species_count': 14675,
                  'links': {
                    'self': '/api/v1/distributions/bol',
                    'plants': '/api/v1/distributions/bol/plants',
                    'species': '/api/v1/distributions/bol/species'
                  }
                },
                {
                  'id': 185,
                  'name': 'Borneo',
                  'slug': 'bor',
                  'tdwg_code': 'BOR',
                  'tdwg_level': 3,
                  'species_count': 11191,
                  'links': {
                    'self': '/api/v1/distributions/bor',
                    'plants': '/api/v1/distributions/bor/plants',
                    'species': '/api/v1/distributions/bor/species'
                  }
                },
                {
                  'id': 78,
                  'name': 'Brazil North',
                  'slug': 'bzn',
                  'tdwg_code': 'BZN',
                  'tdwg_level': 3,
                  'species_count': 12863,
                  'links': {
                    'self': '/api/v1/distributions/bzn',
                    'plants': '/api/v1/distributions/bzn/plants',
                    'species': '/api/v1/distributions/bzn/species'
                  }
                },
                {
                  'id': 79,
                  'name': 'Brazil Northeast',
                  'slug': 'bze',
                  'tdwg_code': 'BZE',
                  'tdwg_level': 3,
                  'species_count': 10955,
                  'links': {
                    'self': '/api/v1/distributions/bze',
                    'plants': '/api/v1/distributions/bze/plants',
                    'species': '/api/v1/distributions/bze/species'
                  }
                },
                {
                  'id': 80,
                  'name': 'Brazil Southeast',
                  'slug': 'bzl',
                  'tdwg_code': 'BZL',
                  'tdwg_level': 3,
                  'species_count': 17731,
                  'links': {
                    'self': '/api/v1/distributions/bzl',
                    'plants': '/api/v1/distributions/bzl/plants',
                    'species': '/api/v1/distributions/bzl/species'
                  }
                },
                {
                  'id': 43,
                  'name': 'Cambodia',
                  'slug': 'cbd',
                  'tdwg_code': 'CBD',
                  'tdwg_level': 3,
                  'species_count': 3361,
                  'links': {
                    'self': '/api/v1/distributions/cbd',
                    'plants': '/api/v1/distributions/cbd/plants',
                    'species': '/api/v1/distributions/cbd/species'
                  }
                },
                {
                  'id': 31,
                  'name': 'Cameroon',
                  'slug': 'cmn',
                  'tdwg_code': 'CMN',
                  'tdwg_level': 3,
                  'species_count': 7208,
                  'links': {
                    'self': '/api/v1/distributions/cmn',
                    'plants': '/api/v1/distributions/cmn/plants',
                    'species': '/api/v1/distributions/cmn/species'
                  }
                },
                {
                  'id': 207,
                  'name': 'Caroline Is.',
                  'slug': 'crl',
                  'tdwg_code': 'CRL',
                  'tdwg_level': 3,
                  'species_count': 1018,
                  'links': {
                    'self': '/api/v1/distributions/crl',
                    'plants': '/api/v1/distributions/crl/plants',
                    'species': '/api/v1/distributions/crl/species'
                  }
                },
                {
                  'id': 177,
                  'name': 'Cayman Is.',
                  'slug': 'cay',
                  'tdwg_code': 'CAY',
                  'tdwg_level': 3,
                  'species_count': 726,
                  'links': {
                    'self': '/api/v1/distributions/cay',
                    'plants': '/api/v1/distributions/cay/plants',
                    'species': '/api/v1/distributions/cay/species'
                  }
                },
                {
                  'id': 32,
                  'name': 'Central African Repu',
                  'slug': 'caf',
                  'tdwg_code': 'CAF',
                  'tdwg_level': 3,
                  'species_count': 3784,
                  'links': {
                    'self': '/api/v1/distributions/caf',
                    'plants': '/api/v1/distributions/caf/plants',
                    'species': '/api/v1/distributions/caf/species'
                  }
                },
                {
                  'id': 358,
                  'name': 'Central American Pac',
                  'slug': 'cpi',
                  'tdwg_code': 'CPI',
                  'tdwg_level': 3,
                  'species_count': 237,
                  'links': {
                    'self': '/api/v1/distributions/cpi',
                    'plants': '/api/v1/distributions/cpi/plants',
                    'species': '/api/v1/distributions/cpi/species'
                  }
                },
                {
                  'id': 219,
                  'name': 'Chagos Archipelago',
                  'slug': 'cgs',
                  'tdwg_code': 'CGS',
                  'tdwg_level': 3,
                  'species_count': 210,
                  'links': {
                    'self': '/api/v1/distributions/cgs',
                    'plants': '/api/v1/distributions/cgs/plants',
                    'species': '/api/v1/distributions/cgs/species'
                  }
                },
                {
                  'id': 246,
                  'name': 'Chile North',
                  'slug': 'cln',
                  'tdwg_code': 'CLN',
                  'tdwg_level': 3,
                  'species_count': 1866,
                  'links': {
                    'self': '/api/v1/distributions/cln',
                    'plants': '/api/v1/distributions/cln/plants',
                    'species': '/api/v1/distributions/cln/species'
                  }
                },
                {
                  'id': 45,
                  'name': 'China South-Central',
                  'slug': 'chc',
                  'tdwg_code': 'CHC',
                  'tdwg_level': 3,
                  'species_count': 19960,
                  'links': {
                    'self': '/api/v1/distributions/chc',
                    'plants': '/api/v1/distributions/chc/plants',
                    'species': '/api/v1/distributions/chc/species'
                  }
                },
                {
                  'id': 46,
                  'name': 'China Southeast',
                  'slug': 'chs',
                  'tdwg_code': 'CHS',
                  'tdwg_level': 3,
                  'species_count': 11551,
                  'links': {
                    'self': '/api/v1/distributions/chs',
                    'plants': '/api/v1/distributions/chs/plants',
                    'species': '/api/v1/distributions/chs/species'
                  }
                },
                {
                  'id': 150,
                  'name': 'Christmas I.',
                  'slug': 'xms',
                  'tdwg_code': 'XMS',
                  'tdwg_level': 3,
                  'species_count': 380,
                  'links': {
                    'self': '/api/v1/distributions/xms',
                    'plants': '/api/v1/distributions/xms/plants',
                    'species': '/api/v1/distributions/xms/species'
                  }
                },
                {
                  'id': 213,
                  'name': 'Cocos (Keeling) Is.',
                  'slug': 'cki',
                  'tdwg_code': 'CKI',
                  'tdwg_level': 3,
                  'species_count': 128,
                  'links': {
                    'self': '/api/v1/distributions/cki',
                    'plants': '/api/v1/distributions/cki/plants',
                    'species': '/api/v1/distributions/cki/species'
                  }
                },
                {
                  'id': 82,
                  'name': 'Colombia',
                  'slug': 'clm',
                  'tdwg_code': 'CLM',
                  'tdwg_level': 3,
                  'species_count': 23796,
                  'links': {
                    'self': '/api/v1/distributions/clm',
                    'plants': '/api/v1/distributions/clm/plants',
                    'species': '/api/v1/distributions/clm/species'
                  }
                },
                {
                  'id': 163,
                  'name': 'Cook Is.',
                  'slug': 'coo',
                  'tdwg_code': 'COO',
                  'tdwg_level': 3,
                  'species_count': 650,
                  'links': {
                    'self': '/api/v1/distributions/coo',
                    'plants': '/api/v1/distributions/coo/plants',
                    'species': '/api/v1/distributions/coo/species'
                  }
                },
                {
                  'id': 155,
                  'name': 'Costa Rica',
                  'slug': 'cos',
                  'tdwg_code': 'COS',
                  'tdwg_level': 3,
                  'species_count': 10027,
                  'links': {
                    'self': '/api/v1/distributions/cos',
                    'plants': '/api/v1/distributions/cos/plants',
                    'species': '/api/v1/distributions/cos/species'
                  }
                },
                {
                  'id': 152,
                  'name': 'Cuba',
                  'slug': 'cub',
                  'tdwg_code': 'CUB',
                  'tdwg_level': 3,
                  'species_count': 6694,
                  'links': {
                    'self': '/api/v1/distributions/cub',
                    'plants': '/api/v1/distributions/cub/plants',
                    'species': '/api/v1/distributions/cub/species'
                  }
                },
                {
                  'id': 139,
                  'name': 'Dominican Republic',
                  'slug': 'dom',
                  'tdwg_code': 'DOM',
                  'tdwg_level': 3,
                  'species_count': 4491,
                  'links': {
                    'self': '/api/v1/distributions/dom',
                    'plants': '/api/v1/distributions/dom/plants',
                    'species': '/api/v1/distributions/dom/species'
                  }
                },
                {
                  'id': 342,
                  'name': 'Easter Is.',
                  'slug': 'eas',
                  'tdwg_code': 'EAS',
                  'tdwg_level': 3,
                  'species_count': 170,
                  'links': {
                    'self': '/api/v1/distributions/eas',
                    'plants': '/api/v1/distributions/eas/plants',
                    'species': '/api/v1/distributions/eas/species'
                  }
                },
                {
                  'id': 84,
                  'name': 'El Salvador',
                  'slug': 'els',
                  'tdwg_code': 'ELS',
                  'tdwg_level': 3,
                  'species_count': 3638,
                  'links': {
                    'self': '/api/v1/distributions/els',
                    'plants': '/api/v1/distributions/els/plants',
                    'species': '/api/v1/distributions/els/species'
                  }
                },
                {
                  'id': 176,
                  'name': 'Fiji',
                  'slug': 'fij',
                  'tdwg_code': 'FIJ',
                  'tdwg_level': 3,
                  'species_count': 2153,
                  'links': {
                    'self': '/api/v1/distributions/fij',
                    'plants': '/api/v1/distributions/fij/plants',
                    'species': '/api/v1/distributions/fij/species'
                  }
                },
                {
                  'id': 85,
                  'name': 'Florida',
                  'slug': 'fla',
                  'tdwg_code': 'FLA',
                  'tdwg_level': 3,
                  'species_count': 3918,
                  'links': {
                    'self': '/api/v1/distributions/fla',
                    'plants': '/api/v1/distributions/fla/plants',
                    'species': '/api/v1/distributions/fla/species'
                  }
                },
                {
                  'id': 50,
                  'name': 'Gabon',
                  'slug': 'gab',
                  'tdwg_code': 'GAB',
                  'tdwg_level': 3,
                  'species_count': 4969,
                  'links': {
                    'self': '/api/v1/distributions/gab',
                    'plants': '/api/v1/distributions/gab/plants',
                    'species': '/api/v1/distributions/gab/species'
                  }
                },
                {
                  'id': 33,
                  'name': 'Gambia',
                  'slug': 'gam',
                  'tdwg_code': 'GAM',
                  'tdwg_level': 3,
                  'species_count': 951,
                  'links': {
                    'self': '/api/v1/distributions/gam',
                    'plants': '/api/v1/distributions/gam/plants',
                    'species': '/api/v1/distributions/gam/species'
                  }
                },
                {
                  'id': 191,
                  'name': 'Georgia',
                  'slug': 'geo',
                  'tdwg_code': 'GEO',
                  'tdwg_level': 3,
                  'species_count': 3288,
                  'links': {
                    'self': '/api/v1/distributions/geo',
                    'plants': '/api/v1/distributions/geo/plants',
                    'species': '/api/v1/distributions/geo/species'
                  }
                },
                {
                  'id': 34,
                  'name': 'Ghana',
                  'slug': 'gha',
                  'tdwg_code': 'GHA',
                  'tdwg_level': 3,
                  'species_count': 3286,
                  'links': {
                    'self': '/api/v1/distributions/gha',
                    'plants': '/api/v1/distributions/gha/plants',
                    'species': '/api/v1/distributions/gha/species'
                  }
                },
                {
                  'id': 198,
                  'name': 'Gilbert Is.',
                  'slug': 'gil',
                  'tdwg_code': 'GIL',
                  'tdwg_level': 3,
                  'species_count': 224,
                  'links': {
                    'self': '/api/v1/distributions/gil',
                    'plants': '/api/v1/distributions/gil/plants',
                    'species': '/api/v1/distributions/gil/species'
                  }
                },
                {
                  'id': 51,
                  'name': 'Guinea',
                  'slug': 'gui',
                  'tdwg_code': 'GUI',
                  'tdwg_level': 3,
                  'species_count': 3118,
                  'links': {
                    'self': '/api/v1/distributions/gui',
                    'plants': '/api/v1/distributions/gui/plants',
                    'species': '/api/v1/distributions/gui/species'
                  }
                },
                {
                  'id': 52,
                  'name': 'Guinea-Bissau',
                  'slug': 'gnb',
                  'tdwg_code': 'GNB',
                  'tdwg_level': 3,
                  'species_count': 1519,
                  'links': {
                    'self': '/api/v1/distributions/gnb',
                    'plants': '/api/v1/distributions/gnb/plants',
                    'species': '/api/v1/distributions/gnb/species'
                  }
                },
                {
                  'id': 53,
                  'name': 'Gulf of Guinea Is.',
                  'slug': 'ggi',
                  'tdwg_code': 'GGI',
                  'tdwg_level': 3,
                  'species_count': 2236,
                  'links': {
                    'self': '/api/v1/distributions/ggi',
                    'plants': '/api/v1/distributions/ggi/plants',
                    'species': '/api/v1/distributions/ggi/species'
                  }
                },
                {
                  'id': 91,
                  'name': 'Hainan',
                  'slug': 'chh',
                  'tdwg_code': 'CHH',
                  'tdwg_level': 3,
                  'species_count': 3661,
                  'links': {
                    'self': '/api/v1/distributions/chh',
                    'plants': '/api/v1/distributions/chh/plants',
                    'species': '/api/v1/distributions/chh/species'
                  }
                },
                {
                  'id': 140,
                  'name': 'Haiti',
                  'slug': 'hai',
                  'tdwg_code': 'HAI',
                  'tdwg_level': 3,
                  'species_count': 4125,
                  'links': {
                    'self': '/api/v1/distributions/hai',
                    'plants': '/api/v1/distributions/hai/plants',
                    'species': '/api/v1/distributions/hai/species'
                  }
                },
                {
                  'id': 183,
                  'name': 'Hawaii',
                  'slug': 'haw',
                  'tdwg_code': 'HAW',
                  'tdwg_level': 3,
                  'species_count': 2153,
                  'links': {
                    'self': '/api/v1/distributions/haw',
                    'plants': '/api/v1/distributions/haw/plants',
                    'species': '/api/v1/distributions/haw/species'
                  }
                },
                {
                  'id': 87,
                  'name': 'Honduras',
                  'slug': 'hon',
                  'tdwg_code': 'HON',
                  'tdwg_level': 3,
                  'species_count': 6567,
                  'links': {
                    'self': '/api/v1/distributions/hon',
                    'plants': '/api/v1/distributions/hon/plants',
                    'species': '/api/v1/distributions/hon/species'
                  }
                },
                {
                  'id': 28,
                  'name': 'India',
                  'slug': 'ind',
                  'tdwg_code': 'IND',
                  'tdwg_level': 3,
                  'species_count': 7999,
                  'links': {
                    'self': '/api/v1/distributions/ind',
                    'plants': '/api/v1/distributions/ind/plants',
                    'species': '/api/v1/distributions/ind/species'
                  }
                },
                {
                  'id': 35,
                  'name': 'Ivory Coast',
                  'slug': 'ivo',
                  'tdwg_code': 'IVO',
                  'tdwg_level': 3,
                  'species_count': 3856,
                  'links': {
                    'self': '/api/v1/distributions/ivo',
                    'plants': '/api/v1/distributions/ivo/plants',
                    'species': '/api/v1/distributions/ivo/species'
                  }
                },
                {
                  'id': 153,
                  'name': 'Jamaica',
                  'slug': 'jam',
                  'tdwg_code': 'JAM',
                  'tdwg_level': 3,
                  'species_count': 3546,
                  'links': {
                    'self': '/api/v1/distributions/jam',
                    'plants': '/api/v1/distributions/jam/plants',
                    'species': '/api/v1/distributions/jam/species'
                  }
                },
                {
                  'id': 115,
                  'name': 'Jawa',
                  'slug': 'jaw',
                  'tdwg_code': 'JAW',
                  'tdwg_level': 3,
                  'species_count': 5587,
                  'links': {
                    'self': '/api/v1/distributions/jaw',
                    'plants': '/api/v1/distributions/jaw/plants',
                    'species': '/api/v1/distributions/jaw/species'
                  }
                },
                {
                  'id': 12,
                  'name': 'Kenya',
                  'slug': 'ken',
                  'tdwg_code': 'KEN',
                  'tdwg_level': 3,
                  'species_count': 6988,
                  'links': {
                    'self': '/api/v1/distributions/ken',
                    'plants': '/api/v1/distributions/ken/plants',
                    'species': '/api/v1/distributions/ken/species'
                  }
                },
                {
                  'id': 217,
                  'name': 'Laccadive Is.',
                  'slug': 'ldv',
                  'tdwg_code': 'LDV',
                  'tdwg_level': 3,
                  'species_count': 237,
                  'links': {
                    'self': '/api/v1/distributions/ldv',
                    'plants': '/api/v1/distributions/ldv/plants',
                    'species': '/api/v1/distributions/ldv/species'
                  }
                },
                {
                  'id': 158,
                  'name': 'Leeward Is.',
                  'slug': 'lee',
                  'tdwg_code': 'LEE',
                  'tdwg_level': 3,
                  'species_count': 2652,
                  'links': {
                    'self': '/api/v1/distributions/lee',
                    'plants': '/api/v1/distributions/lee/plants',
                    'species': '/api/v1/distributions/lee/species'
                  }
                },
                {
                  'id': 110,
                  'name': 'Lesser Sunda Is.',
                  'slug': 'lsi',
                  'tdwg_code': 'LSI',
                  'tdwg_level': 3,
                  'species_count': 3100,
                  'links': {
                    'self': '/api/v1/distributions/lsi',
                    'plants': '/api/v1/distributions/lsi/plants',
                    'species': '/api/v1/distributions/lsi/species'
                  }
                },
                {
                  'id': 55,
                  'name': 'Liberia',
                  'slug': 'lbr',
                  'tdwg_code': 'LBR',
                  'tdwg_level': 3,
                  'species_count': 2735,
                  'links': {
                    'self': '/api/v1/distributions/lbr',
                    'plants': '/api/v1/distributions/lbr/plants',
                    'species': '/api/v1/distributions/lbr/species'
                  }
                },
                {
                  'id': 339,
                  'name': 'Line Is.',
                  'slug': 'lin',
                  'tdwg_code': 'LIN',
                  'tdwg_level': 3,
                  'species_count': 101,
                  'links': {
                    'self': '/api/v1/distributions/lin',
                    'plants': '/api/v1/distributions/lin/plants',
                    'species': '/api/v1/distributions/lin/species'
                  }
                },
                {
                  'id': 56,
                  'name': 'Madagascar',
                  'slug': 'mdg',
                  'tdwg_code': 'MDG',
                  'tdwg_level': 3,
                  'species_count': 10979,
                  'links': {
                    'self': '/api/v1/distributions/mdg',
                    'plants': '/api/v1/distributions/mdg/plants',
                    'species': '/api/v1/distributions/mdg/species'
                  }
                },
                {
                  'id': 58,
                  'name': 'Malaya',
                  'slug': 'mly',
                  'tdwg_code': 'MLY',
                  'tdwg_level': 3,
                  'species_count': 8982,
                  'links': {
                    'self': '/api/v1/distributions/mly',
                    'plants': '/api/v1/distributions/mly/plants',
                    'species': '/api/v1/distributions/mly/species'
                  }
                },
                {
                  'id': 218,
                  'name': 'Maldives',
                  'slug': 'mdv',
                  'tdwg_code': 'MDV',
                  'tdwg_level': 3,
                  'species_count': 247,
                  'links': {
                    'self': '/api/v1/distributions/mdv',
                    'plants': '/api/v1/distributions/mdv/plants',
                    'species': '/api/v1/distributions/mdv/species'
                  }
                },
                {
                  'id': 365,
                  'name': 'Marcus I.',
                  'slug': 'mcs',
                  'tdwg_code': 'MCS',
                  'tdwg_level': 3,
                  'species_count': 14,
                  'links': {
                    'self': '/api/v1/distributions/mcs',
                    'plants': '/api/v1/distributions/mcs/plants',
                    'species': '/api/v1/distributions/mcs/species'
                  }
                },
                {
                  'id': 180,
                  'name': 'Marianas',
                  'slug': 'mrn',
                  'tdwg_code': 'MRN',
                  'tdwg_level': 3,
                  'species_count': 609,
                  'links': {
                    'self': '/api/v1/distributions/mrn',
                    'plants': '/api/v1/distributions/mrn/plants',
                    'species': '/api/v1/distributions/mrn/species'
                  }
                },
                {
                  'id': 265,
                  'name': 'Marquesas',
                  'slug': 'mrq',
                  'tdwg_code': 'MRQ',
                  'tdwg_level': 3,
                  'species_count': 454,
                  'links': {
                    'self': '/api/v1/distributions/mrq',
                    'plants': '/api/v1/distributions/mrq/plants',
                    'species': '/api/v1/distributions/mrq/species'
                  }
                },
                {
                  'id': 263,
                  'name': 'Marshall Is.',
                  'slug': 'mrs',
                  'tdwg_code': 'MRS',
                  'tdwg_level': 3,
                  'species_count': 157,
                  'links': {
                    'self': '/api/v1/distributions/mrs',
                    'plants': '/api/v1/distributions/mrs/plants',
                    'species': '/api/v1/distributions/mrs/species'
                  }
                },
                {
                  'id': 100,
                  'name': 'Mauritius',
                  'slug': 'mau',
                  'tdwg_code': 'MAU',
                  'tdwg_level': 3,
                  'species_count': 1717,
                  'links': {
                    'self': '/api/v1/distributions/mau',
                    'plants': '/api/v1/distributions/mau/plants',
                    'species': '/api/v1/distributions/mau/species'
                  }
                },
                {
                  'id': 159,
                  'name': 'Mexico Southeast',
                  'slug': 'mxt',
                  'tdwg_code': 'MXT',
                  'tdwg_level': 3,
                  'species_count': 8973,
                  'links': {
                    'self': '/api/v1/distributions/mxt',
                    'plants': '/api/v1/distributions/mxt/plants',
                    'species': '/api/v1/distributions/mxt/species'
                  }
                },
                {
                  'id': 88,
                  'name': 'Mexico Southwest',
                  'slug': 'mxs',
                  'tdwg_code': 'MXS',
                  'tdwg_level': 3,
                  'species_count': 14008,
                  'links': {
                    'self': '/api/v1/distributions/mxs',
                    'plants': '/api/v1/distributions/mxs/plants',
                    'species': '/api/v1/distributions/mxs/species'
                  }
                },
                {
                  'id': 26,
                  'name': 'Mozambique',
                  'slug': 'moz',
                  'tdwg_code': 'MOZ',
                  'tdwg_level': 3,
                  'species_count': 5547,
                  'links': {
                    'self': '/api/v1/distributions/moz',
                    'plants': '/api/v1/distributions/moz/plants',
                    'species': '/api/v1/distributions/moz/species'
                  }
                },
                {
                  'id': 216,
                  'name': 'Mozambique Channel I',
                  'slug': 'mci',
                  'tdwg_code': 'MCI',
                  'tdwg_level': 3,
                  'species_count': 87,
                  'links': {
                    'self': '/api/v1/distributions/mci',
                    'plants': '/api/v1/distributions/mci/plants',
                    'species': '/api/v1/distributions/mci/species'
                  }
                },
                {
                  'id': 59,
                  'name': 'Myanmar',
                  'slug': 'mya',
                  'tdwg_code': 'MYA',
                  'tdwg_level': 3,
                  'species_count': 9302,
                  'links': {
                    'self': '/api/v1/distributions/mya',
                    'plants': '/api/v1/distributions/mya/plants',
                    'species': '/api/v1/distributions/mya/species'
                  }
                },
                {
                  'id': 181,
                  'name': 'Nauru',
                  'slug': 'nru',
                  'tdwg_code': 'NRU',
                  'tdwg_level': 3,
                  'species_count': 176,
                  'links': {
                    'self': '/api/v1/distributions/nru',
                    'plants': '/api/v1/distributions/nru/plants',
                    'species': '/api/v1/distributions/nru/species'
                  }
                },
                {
                  'id': 111,
                  'name': 'New Caledonia',
                  'slug': 'nwc',
                  'tdwg_code': 'NWC',
                  'tdwg_level': 3,
                  'species_count': 3445,
                  'links': {
                    'self': '/api/v1/distributions/nwc',
                    'plants': '/api/v1/distributions/nwc/plants',
                    'species': '/api/v1/distributions/nwc/species'
                  }
                },
                {
                  'id': 62,
                  'name': 'Nicaragua',
                  'slug': 'nic',
                  'tdwg_code': 'NIC',
                  'tdwg_level': 3,
                  'species_count': 5670,
                  'links': {
                    'self': '/api/v1/distributions/nic',
                    'plants': '/api/v1/distributions/nic/plants',
                    'species': '/api/v1/distributions/nic/species'
                  }
                },
                {
                  'id': 63,
                  'name': 'Nicobar Is.',
                  'slug': 'ncb',
                  'tdwg_code': 'NCB',
                  'tdwg_level': 3,
                  'species_count': 1430,
                  'links': {
                    'self': '/api/v1/distributions/ncb',
                    'plants': '/api/v1/distributions/ncb/plants',
                    'species': '/api/v1/distributions/ncb/species'
                  }
                },
                {
                  'id': 36,
                  'name': 'Nigeria',
                  'slug': 'nga',
                  'tdwg_code': 'NGA',
                  'tdwg_level': 3,
                  'species_count': 4869,
                  'links': {
                    'self': '/api/v1/distributions/nga',
                    'plants': '/api/v1/distributions/nga/plants',
                    'species': '/api/v1/distributions/nga/species'
                  }
                },
                {
                  'id': 199,
                  'name': 'Niue',
                  'slug': 'nue',
                  'tdwg_code': 'NUE',
                  'tdwg_level': 3,
                  'species_count': 420,
                  'links': {
                    'self': '/api/v1/distributions/nue',
                    'plants': '/api/v1/distributions/nue/plants',
                    'species': '/api/v1/distributions/nue/species'
                  }
                },
                {
                  'id': 238,
                  'name': 'North Carolina',
                  'slug': 'nca',
                  'tdwg_code': 'NCA',
                  'tdwg_level': 3,
                  'species_count': 3237,
                  'links': {
                    'self': '/api/v1/distributions/nca',
                    'plants': '/api/v1/distributions/nca/plants',
                    'species': '/api/v1/distributions/nca/species'
                  }
                },
                {
                  'id': 250,
                  'name': 'Ogasawara-shoto',
                  'slug': 'oga',
                  'tdwg_code': 'OGA',
                  'tdwg_level': 3,
                  'species_count': 463,
                  'links': {
                    'self': '/api/v1/distributions/oga',
                    'plants': '/api/v1/distributions/oga/plants',
                    'species': '/api/v1/distributions/oga/species'
                  }
                },
                {
                  'id': 340,
                  'name': 'Phoenix Is.',
                  'slug': 'phx',
                  'tdwg_code': 'PHX',
                  'tdwg_level': 3,
                  'species_count': 70,
                  'links': {
                    'self': '/api/v1/distributions/phx',
                    'plants': '/api/v1/distributions/phx/plants',
                    'species': '/api/v1/distributions/phx/species'
                  }
                },
                {
                  'id': 89,
                  'name': 'Puerto Rico',
                  'slug': 'pue',
                  'tdwg_code': 'PUE',
                  'tdwg_level': 3,
                  'species_count': 3174,
                  'links': {
                    'self': '/api/v1/distributions/pue',
                    'plants': '/api/v1/distributions/pue/plants',
                    'species': '/api/v1/distributions/pue/species'
                  }
                },
                {
                  'id': 173,
                  'name': 'Réunion',
                  'slug': 'reu',
                  'tdwg_code': 'REU',
                  'tdwg_level': 3,
                  'species_count': 1633,
                  'links': {
                    'self': '/api/v1/distributions/reu',
                    'plants': '/api/v1/distributions/reu/plants',
                    'species': '/api/v1/distributions/reu/species'
                  }
                },
                {
                  'id': 37,
                  'name': 'Senegal',
                  'slug': 'sen',
                  'tdwg_code': 'SEN',
                  'tdwg_level': 3,
                  'species_count': 2267,
                  'links': {
                    'self': '/api/v1/distributions/sen',
                    'plants': '/api/v1/distributions/sen/plants',
                    'species': '/api/v1/distributions/sen/species'
                  }
                },
                {
                  'id': 174,
                  'name': 'Seychelles',
                  'slug': 'sey',
                  'tdwg_code': 'SEY',
                  'tdwg_level': 3,
                  'species_count': 686,
                  'links': {
                    'self': '/api/v1/distributions/sey',
                    'plants': '/api/v1/distributions/sey/plants',
                    'species': '/api/v1/distributions/sey/species'
                  }
                },
                {
                  'id': 187,
                  'name': 'Society Is.',
                  'slug': 'sci',
                  'tdwg_code': 'SCI',
                  'tdwg_level': 3,
                  'species_count': 967,
                  'links': {
                    'self': '/api/v1/distributions/sci',
                    'plants': '/api/v1/distributions/sci/plants',
                    'species': '/api/v1/distributions/sci/species'
                  }
                },
                {
                  'id': 192,
                  'name': 'South Carolina',
                  'slug': 'sca',
                  'tdwg_code': 'SCA',
                  'tdwg_level': 3,
                  'species_count': 2877,
                  'links': {
                    'self': '/api/v1/distributions/sca',
                    'plants': '/api/v1/distributions/sca/plants',
                    'species': '/api/v1/distributions/sca/species'
                  }
                },
                {
                  'id': 197,
                  'name': 'South China Sea',
                  'slug': 'scs',
                  'tdwg_code': 'SCS',
                  'tdwg_level': 3,
                  'species_count': 286,
                  'links': {
                    'self': '/api/v1/distributions/scs',
                    'plants': '/api/v1/distributions/scs/plants',
                    'species': '/api/v1/distributions/scs/species'
                  }
                },
                {
                  'id': 179,
                  'name': 'Southwest Caribbean',
                  'slug': 'swc',
                  'tdwg_code': 'SWC',
                  'tdwg_level': 3,
                  'species_count': 336,
                  'links': {
                    'self': '/api/v1/distributions/swc',
                    'plants': '/api/v1/distributions/swc/plants',
                    'species': '/api/v1/distributions/swc/species'
                  }
                },
                {
                  'id': 105,
                  'name': 'Sri Lanka',
                  'slug': 'srl',
                  'tdwg_code': 'SRL',
                  'tdwg_level': 3,
                  'species_count': 4136,
                  'links': {
                    'self': '/api/v1/distributions/srl',
                    'plants': '/api/v1/distributions/srl/plants',
                    'species': '/api/v1/distributions/srl/species'
                  }
                },
                {
                  'id': 70,
                  'name': 'Sulawesi',
                  'slug': 'sul',
                  'tdwg_code': 'SUL',
                  'tdwg_level': 3,
                  'species_count': 4307,
                  'links': {
                    'self': '/api/v1/distributions/sul',
                    'plants': '/api/v1/distributions/sul/plants',
                    'species': '/api/v1/distributions/sul/species'
                  }
                },
                {
                  'id': 116,
                  'name': 'Sumatera',
                  'slug': 'sum',
                  'tdwg_code': 'SUM',
                  'tdwg_level': 3,
                  'species_count': 6947,
                  'links': {
                    'self': '/api/v1/distributions/sum',
                    'plants': '/api/v1/distributions/sum/plants',
                    'species': '/api/v1/distributions/sum/species'
                  }
                },
                {
                  'id': 92,
                  'name': 'Taiwan',
                  'slug': 'tai',
                  'tdwg_code': 'TAI',
                  'tdwg_level': 3,
                  'species_count': 4703,
                  'links': {
                    'self': '/api/v1/distributions/tai',
                    'plants': '/api/v1/distributions/tai/plants',
                    'species': '/api/v1/distributions/tai/species'
                  }
                },
                {
                  'id': 22,
                  'name': 'Tanzania',
                  'slug': 'tan',
                  'tdwg_code': 'TAN',
                  'tdwg_level': 3,
                  'species_count': 10470,
                  'links': {
                    'self': '/api/v1/distributions/tan',
                    'plants': '/api/v1/distributions/tan/plants',
                    'species': '/api/v1/distributions/tan/species'
                  }
                },
                {
                  'id': 71,
                  'name': 'Thailand',
                  'slug': 'tha',
                  'tdwg_code': 'THA',
                  'tdwg_level': 3,
                  'species_count': 10475,
                  'links': {
                    'self': '/api/v1/distributions/tha',
                    'plants': '/api/v1/distributions/tha/plants',
                    'species': '/api/v1/distributions/tha/species'
                  }
                },
                {
                  'id': 106,
                  'name': 'Togo',
                  'slug': 'tog',
                  'tdwg_code': 'TOG',
                  'tdwg_level': 3,
                  'species_count': 2110,
                  'links': {
                    'self': '/api/v1/distributions/tog',
                    'plants': '/api/v1/distributions/tog/plants',
                    'species': '/api/v1/distributions/tog/species'
                  }
                },
                {
                  'id': 248,
                  'name': 'Tokelau-Manihiki',
                  'slug': 'tok',
                  'tdwg_code': 'TOK',
                  'tdwg_level': 3,
                  'species_count': 137,
                  'links': {
                    'self': '/api/v1/distributions/tok',
                    'plants': '/api/v1/distributions/tok/plants',
                    'species': '/api/v1/distributions/tok/species'
                  }
                },
                {
                  'id': 143,
                  'name': 'Trinidad-Tobago',
                  'slug': 'trt',
                  'tdwg_code': 'TRT',
                  'tdwg_level': 3,
                  'species_count': 3436,
                  'links': {
                    'self': '/api/v1/distributions/trt',
                    'plants': '/api/v1/distributions/trt/plants',
                    'species': '/api/v1/distributions/trt/species'
                  }
                },
                {
                  'id': 348,
                  'name': 'Tuamotu',
                  'slug': 'tua',
                  'tdwg_code': 'TUA',
                  'tdwg_level': 3,
                  'species_count': 181,
                  'links': {
                    'self': '/api/v1/distributions/tua',
                    'plants': '/api/v1/distributions/tua/plants',
                    'species': '/api/v1/distributions/tua/species'
                  }
                },
                {
                  'id': 245,
                  'name': 'Tubuai Is.',
                  'slug': 'tub',
                  'tdwg_code': 'TUB',
                  'tdwg_level': 3,
                  'species_count': 351,
                  'links': {
                    'self': '/api/v1/distributions/tub',
                    'plants': '/api/v1/distributions/tub/plants',
                    'species': '/api/v1/distributions/tub/species'
                  }
                },
                {
                  'id': 251,
                  'name': 'Tuvalu',
                  'slug': 'tuv',
                  'tdwg_code': 'TUV',
                  'tdwg_level': 3,
                  'species_count': 83,
                  'links': {
                    'self': '/api/v1/distributions/tuv',
                    'plants': '/api/v1/distributions/tuv/plants',
                    'species': '/api/v1/distributions/tuv/species'
                  }
                },
                {
                  'id': 142,
                  'name': 'Venezuela',
                  'slug': 'ven',
                  'tdwg_code': 'VEN',
                  'tdwg_level': 3,
                  'species_count': 16179,
                  'links': {
                    'self': '/api/v1/distributions/ven',
                    'plants': '/api/v1/distributions/ven/plants',
                    'species': '/api/v1/distributions/ven/species'
                  }
                },
                {
                  'id': 175,
                  'name': 'Venezuelan Antilles',
                  'slug': 'vna',
                  'tdwg_code': 'VNA',
                  'tdwg_level': 3,
                  'species_count': 1046,
                  'links': {
                    'self': '/api/v1/distributions/vna',
                    'plants': '/api/v1/distributions/vna/plants',
                    'species': '/api/v1/distributions/vna/species'
                  }
                },
                {
                  'id': 72,
                  'name': 'Vietnam',
                  'slug': 'vie',
                  'tdwg_code': 'VIE',
                  'tdwg_level': 3,
                  'species_count': 11299,
                  'links': {
                    'self': '/api/v1/distributions/vie',
                    'plants': '/api/v1/distributions/vie/plants',
                    'species': '/api/v1/distributions/vie/species'
                  }
                },
                {
                  'id': 221,
                  'name': 'Wallis-Futuna Is.',
                  'slug': 'wal',
                  'tdwg_code': 'WAL',
                  'tdwg_level': 3,
                  'species_count': 407,
                  'links': {
                    'self': '/api/v1/distributions/wal',
                    'plants': '/api/v1/distributions/wal/plants',
                    'species': '/api/v1/distributions/wal/species'
                  }
                },
                {
                  'id': 162,
                  'name': 'Windward Is.',
                  'slug': 'win',
                  'tdwg_code': 'WIN',
                  'tdwg_level': 3,
                  'species_count': 2527,
                  'links': {
                    'self': '/api/v1/distributions/win',
                    'plants': '/api/v1/distributions/win/plants',
                    'species': '/api/v1/distributions/win/species'
                  }
                },
                {
                  'id': 76,
                  'name': 'Zaïre',
                  'slug': 'zai',
                  'tdwg_code': 'ZAI',
                  'tdwg_level': 3,
                  'species_count': 9671,
                  'links': {
                    'self': '/api/v1/distributions/zai',
                    'plants': '/api/v1/distributions/zai/plants',
                    'species': '/api/v1/distributions/zai/species'
                  }
                }
              ]
            },
            'flower': {
              'color': null,
              'conspicuous': false
            },
            'foliage': {
              'texture': 'coarse',
              'color': [
                'green'
              ],
              'leaf_retention': true
            },
            'fruit_or_seed': {
              'conspicuous': true,
              'color': [
                'brown',
                'green'
              ],
              'shape': null,
              'seed_persistence': true
            },
            'sources': [
              {
                'last_update': '2020-06-21T20:16:56.437Z',
                'id': 'CONU',
                'name': 'USDA',
                'url': 'https://plants.usda.gov/core/profile?symbol=CONU',
                'citation': 'https://plants.sc.egov.usda.gov/core/profile?symbol=CONU'
              },
              {
                'last_update': '2020-06-16T21:21:14.650Z',
                'id': 'Cocos nucifera L.',
                'name': 'PlantNet',
                'url': 'https://identify.plantnet.org/species/the-plant-list/Cocos nucifera L.',
                'citation': null
              },
              {
                'last_update': '2020-06-16T21:21:14.681Z',
                'id': '2735117',
                'name': 'GBIF',
                'url': 'https://www.gbif.org/species/2735117',
                'citation': null
              },
              {
                'last_update': '2020-06-16T22:15:01.374Z',
                'id': 'urn:lsid:ipni.org:names:666160-1',
                'name': 'POWO',
                'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:666160-1',
                'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
              },
              {
                'last_update': '2020-09-24T09:27:30.563Z',
                'id': 'Coconut',
                'name': 'Wikipedia',
                'url': 'https://en.wikipedia.org/wiki/Coconut',
                'citation': null
              }
            ],
            'specifications': {
              'ligneous_type': 'tree',
              'growth_form': 'Single Stem',
              'growth_habit': 'Tree',
              'growth_rate': 'Moderate',
              'average_height': {
                'cm': 3000
              },
              'maximum_height': {
                'cm': 3500
              },
              'nitrogen_fixation': 'None',
              'shape_and_orientation': 'Erect',
              'toxicity': 'none'
            },
            'synonyms': [
              {
                'id': 47288,
                'name': 'Calappa nucifera',
                'author': '(L.) Kuntze',
                'sources': [
                  {
                    'last_update': '2019-01-12T01:51:28.566Z',
                    'id': '50311551',
                    'name': 'Tropicos',
                    'url': 'http://legacy.tropicos.org/Name/50311551',
                    'citation': 'Tropicos, botanical information system at the Missouri Botanical Garden - www.tropicos.org'
                  },
                  {
                    'last_update': '2020-06-16T22:15:01.418Z',
                    'id': 'urn:lsid:ipni.org:names:40946-2',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:40946-2',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 47290,
                'name': 'Cocos nana',
                'author': 'Griff.',
                'sources': [
                  {
                    'last_update': '2019-01-12T01:51:28.883Z',
                    'id': '50311553',
                    'name': 'Tropicos',
                    'url': 'http://legacy.tropicos.org/Name/50311553',
                    'citation': 'Tropicos, botanical information system at the Missouri Botanical Garden - www.tropicos.org'
                  },
                  {
                    'last_update': '2020-06-16T22:15:01.498Z',
                    'id': 'urn:lsid:ipni.org:names:666156-1',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:666156-1',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 47289,
                'name': 'Cocos indica',
                'author': 'Royle',
                'sources': [
                  {
                    'last_update': '2019-01-12T01:51:28.715Z',
                    'id': '50311552',
                    'name': 'Tropicos',
                    'url': 'http://legacy.tropicos.org/Name/50311552',
                    'citation': 'Tropicos, botanical information system at the Missouri Botanical Garden - www.tropicos.org'
                  },
                  {
                    'last_update': '2020-06-16T22:15:01.544Z',
                    'id': 'urn:lsid:ipni.org:names:666136-1',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:666136-1',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 47291,
                'name': 'Palma cocos',
                'author': 'Mill.',
                'sources': [
                  {
                    'last_update': '2019-01-12T01:51:28.989Z',
                    'id': '50238359',
                    'name': 'Tropicos',
                    'url': 'http://legacy.tropicos.org/Name/50238359',
                    'citation': 'Tropicos, botanical information system at the Missouri Botanical Garden - www.tropicos.org'
                  },
                  {
                    'last_update': '2020-06-16T22:15:01.630Z',
                    'id': 'urn:lsid:ipni.org:names:668649-1',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:668649-1',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 118819,
                'name': 'Cocos mamillaris',
                'author': 'Blanco',
                'sources': [
                  {
                    'last_update': '2020-06-16T22:15:01.454Z',
                    'id': 'urn:lsid:ipni.org:names:666145-1',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:666145-1',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 118820,
                'name': 'Cocos nucifera var. synphyllica',
                'author': 'Becc.',
                'sources': [
                  {
                    'last_update': '2020-06-16T22:15:01.578Z',
                    'id': 'urn:lsid:ipni.org:names:62614-2',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:62614-2',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 118821,
                'name': 'Diplothemium henryanum',
                'author': 'F.Br.',
                'sources': [
                  {
                    'last_update': '2020-06-16T22:15:01.605Z',
                    'id': 'urn:lsid:ipni.org:names:666708-1',
                    'name': 'POWO',
                    'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:666708-1',
                    'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
                  }
                ]
              },
              {
                'id': 626940,
                'name': 'Cocos nucifera var. spicata',
                'author': 'K.C.Jacob',
                'sources': [
                  {
                    'last_update': '2020-06-23T20:04:38.104Z',
                    'id': '8394854',
                    'name': 'GBIF',
                    'url': 'https://www.gbif.org/species/8394854',
                    'citation': null
                  }
                ]
              }
            ],
            'growth': {
              'description': '',
              'sowing': '',
              'days_to_harvest': null,
              'row_spacing': {
                'cm': null
              },
              'spread': {
                'cm': null
              },
              'ph_maximum': 8,
              'ph_minimum': 4,
              'light': 9,
              'atmospheric_humidity': null,
              'growth_months': null,
              'bloom_months': null,
              'fruit_months': null,
              'minimum_precipitation': {
                'mm': 508
              },
              'maximum_precipitation': {
                'mm': 2032
              },
              'minimum_root_depth': {
                'cm': 152
              },
              'minimum_temperature': {
                'deg_f': 19,
                'deg_c': -7
              },
              'maximum_temperature': {
                'deg_f': 122,
                'deg_c': 50
              },
              'soil_nutriments': null,
              'soil_salinity': null,
              'soil_texture': 4,
              'soil_humidity': null
            },
            'links': {
              'self': '/api/v1/species/cocos-nucifera',
              'plant': '/api/v1/plants/cocos-nucifera',
              'genus': '/api/v1/genus/cocos'
            }
          },
          'genus': {
            'id': 1916,
            'name': 'Cocos',
            'slug': 'cocos',
            'links': {
              'self': '/api/v1/genus/cocos',
              'plants': '/api/v1/genus/cocos/plants',
              'species': '/api/v1/genus/cocos/species',
              'family': '/api/v1/families/arecaceae'
            }
          },
          'family': {
            'id': 29,
            'name': 'Arecaceae',
            'common_name': 'Palm family',
            'slug': 'arecaceae',
            'links': {
              'self': '/api/v1/families/arecaceae',
              'division_order': '/api/v1/division_orders/arecales',
              'genus': '/api/v1/families/arecaceae/genus'
            }
          },
          'species': [
            {
              'id': 122263,
              'common_name': 'Coconut palm',
              'slug': 'cocos-nucifera',
              'scientific_name': 'Cocos nucifera',
              'year': 1753,
              'bibliography': 'Sp. Pl.: 1188 (1753)',
              'author': 'L.',
              'status': 'accepted',
              'rank': 'species',
              'family_common_name': 'Palm family',
              'genus_id': 1916,
              'image_url': 'https://bs.plantnet.org/image/o/cdfddf30789d9ce9c13f0ca5a2a95ebe2189183c',
              'synonyms': [
                'Calappa nucifera',
                'Cocos nana',
                'Cocos indica',
                'Palma cocos',
                'Cocos mamillaris',
                'Cocos nucifera var. synphyllica',
                'Diplothemium henryanum',
                'Cocos nucifera var. spicata'
              ],
              'genus': 'Cocos',
              'family': 'Arecaceae',
              'links': {
                'self': '/api/v1/species/cocos-nucifera',
                'plant': '/api/v1/plants/cocos-nucifera',
                'genus': '/api/v1/genus/cocos'
              }
            }
          ],
          'subspecies': [],
          'varieties': [],
          'hybrids': [],
          'forms': [],
          'subvarieties': [],
          'sources': [
            {
              'last_update': '2020-06-21T20:16:56.437Z',
              'id': 'CONU',
              'name': 'USDA',
              'url': 'https://plants.usda.gov/core/profile?symbol=CONU',
              'citation': 'https://plants.sc.egov.usda.gov/core/profile?symbol=CONU'
            },
            {
              'last_update': '2020-06-16T21:21:14.650Z',
              'id': 'Cocos nucifera L.',
              'name': 'PlantNet',
              'url': 'https://identify.plantnet.org/species/the-plant-list/Cocos nucifera L.',
              'citation': null
            },
            {
              'last_update': '2020-06-16T21:21:14.681Z',
              'id': '2735117',
              'name': 'GBIF',
              'url': 'https://www.gbif.org/species/2735117',
              'citation': null
            },
            {
              'last_update': '2020-06-16T22:15:01.374Z',
              'id': 'urn:lsid:ipni.org:names:666160-1',
              'name': 'POWO',
              'url': 'http://powo.science.kew.org/taxon/urn:lsid:ipni.org:names:666160-1',
              'citation': 'POWO (2019). Plants of the World Online. Facilitated by the Royal Botanic Gardens, Kew. Published on the Internet; http://www.plantsoftheworldonline.org/ Retrieved 2020-06-16'
            },
            {
              'last_update': '2020-09-24T09:27:30.563Z',
              'id': 'Coconut',
              'name': 'Wikipedia',
              'url': 'https://en.wikipedia.org/wiki/Coconut',
              'citation': null
            }
          ]
        },
        'meta': {
          'last_modified': '2021-03-04T20:15:22.740Z'
        }
      };

      const response = await fakeRequest(app)
        .get('/api/plant_detail/122263')
        .set('Authorization', token)
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body.data[0]).toEqual(expectation);
    });


  });
});
