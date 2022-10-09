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

export interface PasswordReturnResponse {
  status: number;
  error: string | null;
  response: {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
  };
}
