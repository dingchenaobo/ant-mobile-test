const faker = require('faker');
const _ = require('lodash');

module.exports = function() {
  return {
    user: _.times(10, () => {
      return {
        id: faker.random.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        address: faker.address.streetAddress() + faker.address.city() + faker.address.country(),
        bio: faker.lorem.sentences(),
        image: faker.image.avatar()
      };
    }),
  };
}