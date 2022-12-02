import HttpClient from './http';

const http = new HttpClient();

export async function getUsers() {
  const allUsers = await http.get(
    process.env.REACT_APP_GLITCH_BASE_URL + '/users'
  );

  return allUsers;
}
