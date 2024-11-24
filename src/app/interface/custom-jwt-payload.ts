import { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  username: string;
  userId: number;
  role: {
    id: number;
    name: string;
  };
}
