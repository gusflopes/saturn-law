import request from 'supertest';
import bcrypt from 'bcryptjs';
import auth from './auth';
import app from '../../app';

import truncate from '../../../__tests__/utils/truncate';
import factory from '../../../__tests__/utils/factories';

describe('Auth Middleware', () => {
  beforeEach(async () => {
    await truncate();
  });
  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
