const request = require('supertest');
const { server, db, teardown } = require('../spec/enmapi');

afterAll(() => teardown());

describe('Fundraiser Component', () => {
  it('Should return an empty array on first get all call', async () => {
    expect.assertions(2);
    const getAll = await request(server).get('/fundraiser/all');
    const result = JSON.parse(getAll.res.text);
    expect(Array.isArray(result)).toBeTruthy();
    expect(result).toHaveLength(0);
  });

  it('Should create a new fundraiser', async () => {
    expect.assertions(4);
    const validUser = {
      email: 'anakin@skywalker.com',
      password: 'W00k!33Ch3wB@((@'
    };
    const postRegister = await request(server)
      .post('/auth/register')
      .send(validUser);
    const registeredUser = JSON.parse(postRegister.res.text);
    const createFundraiser = await request(server)
      .post('/fundraiser/create')
      .set('Authorization', registeredUser.token)
      .send({
        title: 'Test Fundraiser',
        description: 'Test Fundraiser',
        goal: 10000.03
      });
    const mockFundraiser = JSON.parse(createFundraiser.res.text);
    expect(mockFundraiser).toHaveProperty('goal');
    expect(mockFundraiser).toHaveProperty('title');
    expect(mockFundraiser).toHaveProperty('description');
    expect(mockFundraiser).toHaveProperty('owner');
  });

  it('Should return array with one result on get all call after creating a fundraiser', async () => {
    expect.assertions(5);
    const getAll = await request(server).get('/fundraiser/all');
    const result = JSON.parse(getAll.res.text);
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('goal');
    expect(result[0]).toHaveProperty('title');
    expect(result[0]).toHaveProperty('description');
    expect(result[0]).toHaveProperty('owner');
  });
});
