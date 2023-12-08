import { User } from 'firebase/auth';

export interface AuthStateType {
  state: "loading" | "loaded" | "error";
  isAuthenticated?: boolean;
  user?: User | null;
  error?: Error;
}