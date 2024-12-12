import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../modules/users/users.service';
import { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';
import { User } from '../modules/users/entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: 'rsa',
    });
  }

  async validate(payload: JwtPayload) {
    let isExpiredToken = false;
    const seconds = 1000;
    const date = new Date();
    const time = date.getTime();
    if (payload.exp < Math.round(time / seconds)) {
      isExpiredToken = true;
    }
    if (isExpiredToken) {
      //token expire check
      throw new UnauthorizedException('Token Expired');
    }

    //validate user by verify the email
    const user: User = await this.userService.validateUser(payload);
    if (!user?.uId) {
      throw new UnauthorizedException('Invalid Token');
    }
    return user;
  }
}
