import { getToken, saveToken, removeToken } from '../../utility';

test('Testing getToken, saveToken, removeToken fn', async () => {
  // Testing initial case
  let token = await getToken();

  expect(token).toMatch('');

  // Testing save token and get token
  await saveToken('Test');
  token = await getToken();

  expect(token).toMatch('Test');

  // Testing remove token
  await removeToken();
  token = await getToken();

  expect(token).toMatch('');
});
