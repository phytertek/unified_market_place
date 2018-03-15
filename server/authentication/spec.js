const request = require('supertest');
const { server, db, teardown } = require('../spec/enmapi');

afterAll(() => teardown());

describe('Authentication Component', () => {
  it('Should respond with error if post to registration does not include password', async () => {
    expect.assertions;
    const userNoPassword = { email: 'test@email.com' };
    const postRegister = await request(server)
      .post('/auth/register')
      .send(userNoPassword);
    const response = JSON.parse(postRegister.res.text);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('password, email are required');
  });

  it('Should respond with error if post to registration does not include email', async () => {
    expect.assertions;
    const userNoEmail = { password: 'Password' };
    const postRegister = await request(server)
      .post('/auth/register')
      .send(userNoEmail);
    const response = JSON.parse(postRegister.res.text);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('password, email are required');
  });

  it('Should register a valid new user and respond with a new auth token', async () => {
    expect.assertions(2);
    const validUser = {
      email: 'anakin@skywalker.com',
      password: 'W00k!33Ch3wB@((@'
    };
    const postRegister = await request(server)
      .post('/auth/register')
      .send(validUser);
    const response = JSON.parse(postRegister.res.text);
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('email');
  });

  it('Should respond with error if post to login does not include email', async () => {
    expect.assertions;
    const userNoEmail = { password: 'Password' };
    const postLogin = await request(server)
      .post('/auth/login')
      .send(userNoEmail);
    const response = JSON.parse(postLogin.res.text);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('email, password are required');
  });

  it('Should respond with error if post to login does not include password', async () => {
    expect.assertions;
    const userNoPassword = { email: 'test@email.com' };
    const postLogin = await request(server)
      .post('/auth/login')
      .send(userNoPassword);
    const response = JSON.parse(postLogin.res.text);
    expect(response).toHaveProperty('message');
    expect(response.message).toBe('email, password are required');
  });

  it('Should login valid user and respond with new auth token', async () => {
    expect.assertions(3);
    const validUser = {
      email: 'anakin@skywalker.com',
      password: 'W00k!33Ch3wB@((@'
    };
    const postLogin = await request(server)
      .post('/auth/login')
      .send(validUser);
    const response = JSON.parse(postLogin.res.text);
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('email');
    expect(response).toHaveProperty('_id');
  });

  it('Should respond with error when trying to validate with no Authorization header', async () => {
    expect.assertions(2);
    const getValidation = await request(server).get('/auth/validate');
    const result = JSON.parse(getValidation.res.text);
    expect(result).toHaveProperty('message');
    expect(result.message).toBe('No token provided');
  });

  it('Should respond with error when trying to validate with invalid token', async () => {
    expect.assertions(2);
    const getValidation = await request(server)
      .get('/auth/validate')
      .set(
        'Authorization',
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1YWE4ZGNlOGNhOTdjZDMzMWEyNzRlZmUiLCJlbWFpbCI6ImhhbkBzb2xvLmNvbSIsImlhdCI6MTUyMTAxNjA0MDY2Nn0.r9NwFs1xA7qz0sNwm3dvCubdoEa-XuCjX3_an1Ewzc'
      );
    const result = JSON.parse(getValidation.res.text);
    expect(result).toHaveProperty('message');
    expect(result.message).toBe('Error: Signature verification failed');
  });

  it('Should respond with user email of successfully validated token', async () => {
    expect.assertions(1);
    const validUser = {
      email: 'anakin@skywalker.com',
      password: 'W00k!33Ch3wB@((@'
    };
    const postLogin = await request(server)
      .post('/auth/login')
      .send(validUser);
    const validUserResponse = JSON.parse(postLogin.res.text);
    const getValidation = await request(server)
      .get('/auth/validate')
      .set('Authorization', validUserResponse.token);
    const result = JSON.parse(getValidation.res.text);
    expect(result).toHaveProperty('email');
  });
});
