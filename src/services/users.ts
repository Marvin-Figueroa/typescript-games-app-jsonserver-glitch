import { IUser } from '../models/user';
import { get } from './http';

export async function getUsers() {
  const allUsers = await get<IUser[]>(
    process.env.REACT_APP_GLITCH_BASE_URL + '/users'
  );

  return allUsers;
}
