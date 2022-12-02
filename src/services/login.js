import HttpClient from './http';

const http = new HttpClient();

async function login(credentials) {
  const user = await http.get(
    process.env.REACT_APP_GLITCH_BASE_URL +
      `/users?username=${credentials.username}`
  );

  if (user[0]) {
    return user[0].password === credentials.password ? user[0] : null;
  }

  return null;
}

export default { login };
