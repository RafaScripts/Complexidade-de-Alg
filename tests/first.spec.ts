import {test, expect} from 'vitest';
import {execute1, execute2, execute3, totalAllDistances, totalDevices, totalUsers} from '../src/server';

test('createUser', () => {
  expect(execute1()).greaterThan(totalUsers);
});

test('createDevices', () => {
  expect(execute2()).greaterThanOrEqual(totalDevices);
});

test('allDistances', () => {
  expect(execute3()).greaterThanOrEqual(totalAllDistances);
});