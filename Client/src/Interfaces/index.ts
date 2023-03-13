export interface authResponseInterface {
  accessToken: string;
  refreshToken: string;
  user: userDtoInterface;
}
export interface userDtoInterface {
  id: string;
  email: string;
}

export interface visitInterface {
  id: string;
  userId: string;
  date: string;
  time: string;
  location: string;
  description: string;
}
