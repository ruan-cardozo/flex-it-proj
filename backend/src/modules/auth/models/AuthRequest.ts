import { User } from '../../user/entities/user.entity';

export interface AuthRequest extends Request {
  user: User;
}
