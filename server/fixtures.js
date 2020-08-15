const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Author = require('./models/Author');
const Category = require('./models/Category');
const Book = require('./models/Book');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
    displayName: 'Madonna',
    avatar: "fixtures/madonna.jpeg"
  }, {
    username: 'admin',
    password: '123',
    role: 'admin',
    token: nanoid(),
    displayName: 'Zeus the Thunderer',
    avatar: "fixtures/madonna.jpeg"
  });

  const [frai, zlotnikov, azimov, aitmatov, bulgakov, dekhlevi] = await Author.create({
    name: 'Max Frai',
    biography: 'Svetlana Martynchik is a real name of Max Frai',
  }, {
    name: 'Roman Zlotnikov',
    biography: 'A famous modern writer in genre "Alternative history',
  }, {
    name: 'Aizek Azimov',
    biography: 'A world-wide famous writer in genre "Science fiction',
  }, {
    name: 'Chingiz Aitmatov',
    biography: 'The only Kyrgyz writer who is world-wide known',
  }, {
    name: 'Mikhail Bulgakov',
    biography: 'A very well known classic Russian writer',
  }, {
    name: 'Amir Dekhlevi',
    biography: 'A world-known Indian-Turc poet of 13-14 centuries',
  });

  const [fantasy, althistory, scfiction, prose, classic, poetry] = await Category.create({
    title: 'Fantasy',
    description: 'Modern tale-like prose',
  }, {
    title: 'Alternative history',
    description: 'What-if-something-did-not-happen stories',
  }, {
    title: 'Science fiction',
    description: 'Scientific implementation to modern fiction',
  }, {
    title: 'Prose',
    description: 'Fiction based on realities',
  }, {
    title: 'Classic',
    description: 'Classic fiction prose-format stories',
  }, {
    title: 'Poetry',
    description: 'Poems',
  });

  const [navajdeniya, labirint, elita, parokhod, gardens] = await Book.create({
    title: 'Navajdeniya',
    image: "fixtures/Navajdeniya.jpg",
    price: 500,
    description: 'Delusions that happen to hero',
    author: frai,
    category: fantasy,
  }, {
    title: 'Labirint Mjonina',
    image: "fixtures/Labirint_Mjonina.jpeg",
    price: 500,
    description: 'A trip to mystical place',
    author: frai,
    category: fantasy,
  }, {
    title: 'Elita elit',
    image: "fixtures/Elita_elit.jpeg",
    price: 500,
    description: 'About a man who came from another time and place',
    author: zlotnikov,
    category: althistory,
  }, {
    title: 'Belyi parokhod',
    image: "fixtures/Belyj_parohod.jpg",
    price: 200,
    description: 'Delusions that happen to hero',
    author: aitmatov,
    category: prose,
  }, {
    title: 'Vosem raiskih sadov',
    image: "fixtures/Vosem_rajskih_sadov.jpg",
    price: 800,
    description: 'A poem consisting of 8 stories',
    author: dekhlevi,
    category: poetry,
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});