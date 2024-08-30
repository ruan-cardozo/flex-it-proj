import * as bcrypt from 'bcrypt';

export function hashPassword(password: string): string {
    
  return bcrypt.hashSync(password, 10);
}