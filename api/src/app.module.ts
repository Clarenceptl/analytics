import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { AuthGuard, RolesGuards } from './guards';
import { MailModule } from './mail/mail.module';
import { SeedModule } from './seed/seed.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_MONGO_URL),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AuthModule,
    UserModule,
    SeedModule,
    MailModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuards
    }
  ]
})
export class AppModule {}
