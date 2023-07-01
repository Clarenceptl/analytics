import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from 'src/enums';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JSON_WEB_TOKEN_SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    }),
    ClientsModule.register([
      {
        name: SERVICE_NAME.MAILING,
        transport: Transport.TCP,
        options: {
          host: 'mailing-service',
          port: 3024
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
