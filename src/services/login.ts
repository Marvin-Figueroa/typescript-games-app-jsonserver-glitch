import { IUser } from '../models/user';
import { IUserCredentials } from '../models/userCredentials';
import { get } from './http';

async function login(credentials: IUserCredentials) {
  const user = await get<IUser[]>(
    process.env.REACT_APP_GLITCH_BASE_URL +
      `/users?username=${credentials.username}`
  );

  if (user[0]) {
    return user[0].password === credentials.password ? user[0] : null;
  }

  return null;
}

export default { login };
