
import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ClientsModule } from '../clients.module';
import { JwtModule } from '@nestjs/jwt';
import { ClientAuthService } from './client-auth.service';
import { ClientAuthController } from './client-auth.controller';


dotenv.config();

@Module({
  imports: [
    ClientsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: '30m'},
    }),
  ],
  providers: [ClientAuthService],
  controllers: [ClientAuthController],
  exports: [ClientAuthService]
})
export class ClientAuthModule {}
