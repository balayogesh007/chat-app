import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../modules/users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guards/auth.guard';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  providers: [JwtStrategy, JwtAuthGuard],
  exports: [JwtStrategy],
})
export class AuthModule {}
