import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './clients.entity';
import { ContactInfoEntity } from './contact-info.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ServiceEntity } from 'src/service/services.entity';
import { ClientAuthService } from './client-auth/client-auth.service';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClientEntity,
      ContactInfoEntity,
      OrderEntity,
      ServiceEntity,
    ]),
    JwtModule.register({
      global: true,
      secret: '3NP_Backend_Admin',
      signOptions: { expiresIn: '30m' },
    }),
    MailerModule.forRoot({
      transport: {
      host: 'smtp.gmail.com',
      port: 465,
      ignoreTLS: true,
      secure: true,
      auth: {
      user: 'somelahmed88@gmail.com',
      pass: 'irmo nbdt yvhc rreb'
      },
      }
      })
      
  ],
  controllers: [ClientsController],
  providers: [ClientsService, ClientAuthService],
  exports: [ClientsService],
})
export class ClientsModule {}
