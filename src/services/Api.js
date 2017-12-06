import Rest, { headers } from 'grommet/utils/Rest';
// import xhr from '../utils/xhr';
/* eslint-disable */

let hostName;
switch (process.env.NODE_ENV) {
  case 'development':
  case 'test':
    // Mock Server url
    hostName = 'http://localhost:8010';
    break;
  case 'development_production':
    // Proxy Server url
    hostName = 'https://localhost:8081';
    break;
  default:
    hostName = '';
}

Rest.setHeaders(headers);

export async function getApp(queryString, queryParams, handler) {
  console.log(queryString); //eslint-disable-line
  try {
    const items = [
  {
    "id": "5a26e46d014d3064f774c194",
    "name": "Dawn Humphrey",
    "category": "Hand Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d687bbd054de229b1",
    "name": "Pittman Barton",
    "category": "Rotors",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d56084341a03bc82d",
    "name": "Greene Avila",
    "category": "Cutting Tools",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46dc5cc1bdc4a3ef73e",
    "name": "Hattie Terrell",
    "category": "Rotors",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46db0baa9d26d08e19a",
    "name": "Misty Reese",
    "category": "Grease",
    "brand": "Addison"
  },
  {
    "id": "5a26e46daa3dd5d252674903",
    "name": "Ashley Gardner",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dedf19ad54a6de61d",
    "name": "Campos Powers",
    "category": "Hand Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d9fe93ce88fa62d70",
    "name": "Liliana Knox",
    "category": "Rotors",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46dc5698bcce0669541",
    "name": "Hillary Mckee",
    "category": "Cutting Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46df95d80bdb42f376c",
    "name": "Frankie Nunez",
    "category": "Hand Tools",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d6c4774f5961fa817",
    "name": "Harriett Donaldson",
    "category": "Grease",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d3d32f319ff5ed8d1",
    "name": "Rosario Fuentes",
    "category": "Grease",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46dd61d28f558461202",
    "name": "Mavis Hood",
    "category": "Grease",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d311445f70c272681",
    "name": "Patel Kemp",
    "category": "Grease",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46dced0e6b11e9efa36",
    "name": "Katharine Conley",
    "category": "Cutting Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d4696b327e9c0713e",
    "name": "Patton Mooney",
    "category": "Grease",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46dacf05feb8c7db4f6",
    "name": "Corrine Waters",
    "category": "Rotors",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d60770daecc20d7b8",
    "name": "Bass Schultz",
    "category": "Hand Tools",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46da3929fddc25a7e3e",
    "name": "Caitlin Mckenzie",
    "category": "Cutting Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46dc82ad3011b17708c",
    "name": "Dickson Bruce",
    "category": "Grease",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46dc3e9106940d26dac",
    "name": "Barker Dean",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d9fcc1a2f04045aa9",
    "name": "Terry Rosales",
    "category": "Cutting Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d462596a389758312",
    "name": "Beverly Martinez",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46db1b0c587209b632d",
    "name": "Catalina Kramer",
    "category": "Hand Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d6efb7012b31c8391",
    "name": "Hoover Forbes",
    "category": "Grease",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d8a4d7e5420c09dc3",
    "name": "Mann Miller",
    "category": "Motors",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d969b15c9fbf87346",
    "name": "Little Hopper",
    "category": "Motors",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d8198eae62158fa46",
    "name": "Francis Frank",
    "category": "Cutting Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46dd68b1329f03b84c3",
    "name": "Queen Lloyd",
    "category": "Cutting Tools",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d77ccfbc251032f2b",
    "name": "Davidson Wheeler",
    "category": "Hand Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46da8fad41e780eec70",
    "name": "Gladys Monroe",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46de127eb98acfde607",
    "name": "Bryan Fleming",
    "category": "Hand Tools",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d93551d50637eb528",
    "name": "Julianne Greer",
    "category": "Hand Tools",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d6d79bce3aedf8ca1",
    "name": "Hess Kidd",
    "category": "Hand Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d4f9164852f506250",
    "name": "Rocha Mueller",
    "category": "Rotors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d65c2e89103f517aa",
    "name": "Crystal Wilder",
    "category": "Cutting Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d8ce26a71940c1c98",
    "name": "Tate Battle",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dbe6d5e3e883e57ec",
    "name": "Vaughan Andrews",
    "category": "Grease",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d44ab58f773ca345c",
    "name": "Hodge Carr",
    "category": "Rotors",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d4587f16577a5ffdf",
    "name": "Brewer Joseph",
    "category": "Cutting Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46dc43a6f47b15ee99d",
    "name": "Sheree Gaines",
    "category": "Grease",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d3fd3229742d0713d",
    "name": "Myra Osborne",
    "category": "Grease",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dbce5a036097a035e",
    "name": "Horn Vaughan",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46dff110eb6d0d26ebd",
    "name": "Moss Butler",
    "category": "Cutting Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d483483ec6666e8fd",
    "name": "Lynn Henderson",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46dcafc354d769b05ad",
    "name": "Mullins Anthony",
    "category": "Grease",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d0b4206eeb3780106",
    "name": "Jillian Tran",
    "category": "Motors",
    "brand": "Addison"
  },
  {
    "id": "5a26e46deb8b6536c767c09a",
    "name": "Cassandra Bridges",
    "category": "Cutting Tools",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d5ea61012fdc732ca",
    "name": "Kirsten Morton",
    "category": "Cutting Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46dd5b72923bc69b341",
    "name": "Donna Mays",
    "category": "Hand Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46de74cd3adf64d0a10",
    "name": "Joni Sellers",
    "category": "Motors",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dbd674701090e5450",
    "name": "Riley Price",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d0fd50267c165727b",
    "name": "Melton Wyatt",
    "category": "Grease",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d0641a03eb5b3a954",
    "name": "Bowen Gilliam",
    "category": "Rotors",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46dc7be95dd635351e0",
    "name": "Tamra Parks",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d9f8e40583d23ef99",
    "name": "Green Swanson",
    "category": "Rotors",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d78d78fa10da2ceba",
    "name": "Delgado Armstrong",
    "category": "Motors",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d99cf207bd93cf8ca",
    "name": "Oliver Carroll",
    "category": "Rotors",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d0441a9c5a803e1bf",
    "name": "Tabitha Harrison",
    "category": "Grease",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d7ff6d19dd2468bce",
    "name": "Ayers Byrd",
    "category": "Motors",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46da04b3ba38aeb9aeb",
    "name": "Newman Burgess",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d902b8989b3e4eb7f",
    "name": "Hinton Hooper",
    "category": "Hand Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d8d101c4ca5e9b25b",
    "name": "Cummings Berg",
    "category": "Cutting Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46de571057feb62850f",
    "name": "Thomas Daniel",
    "category": "Rotors",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dab184e1ec475f728",
    "name": "Earnestine Mckay",
    "category": "Hand Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46daebd28dc6929a53e",
    "name": "Veronica Burch",
    "category": "Grease",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d8cd91eee64e8a779",
    "name": "Madeline Whitney",
    "category": "Hand Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d98a21f9c2a006278",
    "name": "Nadia Wagner",
    "category": "Hand Tools",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d19e06ead09d1a22a",
    "name": "Lorrie Gonzalez",
    "category": "Motors",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d4e2f70bd970e386e",
    "name": "Monica Dotson",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d26831aa5848e3331",
    "name": "Etta Lang",
    "category": "Hand Tools",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d0200b02bdffe9865",
    "name": "Fields Nicholson",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46dd491379f495a050e",
    "name": "Sybil Guthrie",
    "category": "Motors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d6e691006e3f1c00d",
    "name": "Stephenson Reeves",
    "category": "Rotors",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46db4d63b93bbfa5c7b",
    "name": "Avila Kaufman",
    "category": "Motors",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d1e519b1002c49ceb",
    "name": "Teresa Suarez",
    "category": "Motors",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d34582f8845d94401",
    "name": "Bean Neal",
    "category": "Rotors",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46de98c14149d659fc4",
    "name": "Lily Craft",
    "category": "Rotors",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d9a375a7a1c2ee0b1",
    "name": "Dale Cannon",
    "category": "Rotors",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46de3c2cc204f0b18be",
    "name": "Hahn Massey",
    "category": "Hand Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d097152cef2e9bf31",
    "name": "Roth Hodge",
    "category": "Cutting Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d1fb32e03230e89bb",
    "name": "Gay Good",
    "category": "Rotors",
    "brand": "Addison"
  },
  {
    "id": "5a26e46dff41a2df4206c68b",
    "name": "Tommie Santos",
    "category": "Grease",
    "brand": "Hyundai"
  },
  {
    "id": "5a26e46d04a7b274fe734b22",
    "name": "Luna Blevins",
    "category": "Hand Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d395c624018c07265",
    "name": "Hester Robinson",
    "category": "Hand Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46de53479933b6f9d44",
    "name": "Mallory Walker",
    "category": "Grease",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dd17fee0f7e88a042",
    "name": "Ramsey Clay",
    "category": "Motors",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46d041b635fab0ee01d",
    "name": "Ballard Cline",
    "category": "Grease",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46da7da6e0fd5f63fe8",
    "name": "Janna Head",
    "category": "Cutting Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46dfd396ee5fb1debe1",
    "name": "Addie Albert",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46dae6fad4311c816c6",
    "name": "Leonard Lara",
    "category": "Hand Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d7783a74b63cdc2b2",
    "name": "Hull Melton",
    "category": "Motors",
    "brand": "Addison"
  },
  {
    "id": "5a26e46d3a11f8ca96dbeb04",
    "name": "Durham Rojas",
    "category": "Hand Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46dc154ca120355ecd6",
    "name": "Howard Michael",
    "category": "Cutting Tools",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46d0a8100771a40e54a",
    "name": "Allison Oconnor",
    "category": "Grease",
    "brand": "Taparia"
  },
  {
    "id": "5a26e46de719bb4ca6ccc3cd",
    "name": "Mayo Parker",
    "category": "Cutting Tools",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46df7929041b5e6e9e0",
    "name": "Cathy Harmon",
    "category": "Hand Tools",
    "brand": "Maruthi"
  },
  {
    "id": "5a26e46d54dfcb33535c5334",
    "name": "Coleman Meyers",
    "category": "Grease",
    "brand": "Zumbi"
  },
  {
    "id": "5a26e46d80d2ec0a835a8607",
    "name": "Erika Yates",
    "category": "Cutting Tools",
    "brand": "Hanuman"
  },
  {
    "id": "5a26e46dee6b4f460a9ce262",
    "name": "Josie Cochran",
    "category": "Rotors",
    "brand": "Maruthi"
  }
];

    let filteredItems = items.filter(
      (item) => (String(item[queryParams.search.searchBy])
        .indexOf(String(queryParams.search.value)) !== -1));


  let filteredItems2 = [];
  let filteredItems3 = [];


  if(queryParams.filters.category.values.length > 0) {
    for (let i=0; i<queryParams.filters.category.values.length; i++) {
        filteredItems2 = filteredItems.filter(
          (item) => (String(item['category'])
            .indexOf(String(queryParams.filters.category.values[i])) !== -1));
        filteredItems3.push.apply(filteredItems3, filteredItems2)
    }
    filteredItems = filteredItems3;
  }
  filteredItems2 = [];
  filteredItems3 = [];
  if(queryParams.filters.brand.values.length > 0) {
    for (let j=0; j<queryParams.filters.brand.values.length; j++) {
        filteredItems2 = filteredItems.filter(
          (item) => (String(item['brand'])
            .indexOf(String(queryParams.filters.brand.values[j])) !== -1));
        filteredItems3.push.apply(filteredItems3, filteredItems2)
    }
    filteredItems = filteredItems3;
  }
    const res = {
      body: {
        start: queryParams.start,
        count: queryParams.count,
        total: filteredItems.length,
        members: filteredItems.splice(queryParams.start, queryParams.count),
      },
    };

    return setTimeout(() => (handler(res)), 300);
  } catch (error) {
    console.log(`Error occured: ${JSON.stringify(error)}`); // eslint-disable-line no-console
    return handler(null, error);
  }
}

export async function getAllFilters(handler) {
  console.log(queryString); //eslint-disable-line
  try {
    const filter = [
      {
        category: ['Cutting Tools', 'Hand Tools', 'Rotors', 'Motors', 'Grease'],
        brand: ['Addison', 'Taparia', 'Maruthi', 'Hanuman', 'Hyundai', 'Zumbi'],
      },
    ];

    const res = filter;
    return setTimeout(() => (handler(res)), 300);
  } catch (error) {
    console.log(`Error occured: ${JSON.stringify(error)}`); // eslint-disable-line no-console
    return handler(null, error);
  }
}

