const request = require('supertest');
const { server, db, teardown } = require('../spec/enmapi');
jest.setTimeout(10000);

afterAll(() => teardown());

describe('Donation Component', () => {
  it('Should create a new donations with card token from Stripe.js on client side', async () => {
    const validFundraiserUser = {
      email: 'jabba@hutt.com',
      password: 'W00k!33Ch3wB@((@',
      isFundraiser: true,
      fundraiserAcct: { stripe_user_id: 'acct_1C3AewJTbMyyirSw' }
    };
    await new db.User(validFundraiserUser).save();
    const loginFundraiserUser = await request(server)
      .post('/auth/login')
      .send(validFundraiserUser);
    const authedFundraiserUser = JSON.parse(loginFundraiserUser.res.text);
    const validDonorUser = {
      email: 'boba@sfett.com',
      password: 'W00k!33Ch3wB@((@'
    };
    const registerDonorUser = await request(server)
      .post('/auth/register')
      .send(validDonorUser);
    const authedDonorUser = JSON.parse(registerDonorUser.res.text);
    const createFundraiser = await request(server)
      .post('/fundraiser/create')
      .set('Authorization', authedFundraiserUser.token)
      .send({
        title: 'Test Donation Fundraiser',
        description: 'Test Donation Fundraiser',
        goal: 10000.03
      });
    const mockFundraiser = JSON.parse(createFundraiser.res.text);
    const createDonation = await request(server)
      .post('/donation/create')
      .set('Authorization', authedDonorUser.token)
      .send({
        token: { id: 'tok_visa' },
        donations: [{ fundraiser: mockFundraiser, amount: 15.31 }]
      });
    const mockDonation = JSON.parse(createDonation.res.text);
  });
});
