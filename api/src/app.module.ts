import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { AuthGuard, RolesGuards } from './guards';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URL),
    JwtModule.register({
      global: true,
      secret: process.env.JSON_WEB_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AuthModule,
    UserModule,
    SeedModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuards
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
