import { Module } from '@nestjs/common';
import { TeammatesService } from './teammates.service';
import { TeammatesController } from './teammates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../auth/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecretqwer242',
      signOptions: {
        expiresIn: 36000,
      },
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  providers: [TeammatesService, JwtStrategy],
  controllers: [TeammatesController],
  exports: [
    JwtStrategy,
    PassportModule
  ],
})
export class TeammatesModule {}
