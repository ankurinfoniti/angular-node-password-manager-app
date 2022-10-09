export interface Password {
  id?: number;
  website: string;
  username: string;
  password: string;
  otherLoginType: string;
}

export interface PasswordResponse {
  status: number;
  error: string | null;
  response: Password[];
}
