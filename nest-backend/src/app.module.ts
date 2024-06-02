import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeORM.config';
import { ServiceModule } from './service/service.module';
import { ClientAuthModule } from './clients/client-auth/client-auth.module';
import { AuthModule } from './worker/auth/auth.module';
import { WorkersModule } from './worker/worker.module';

@Module({

  imports: [TypeOrmModule.forRoot(typeOrmConfig), ServiceModule, ClientsModule, AuthModule, ClientAuthModule, WorkersModule]
})
export class AppModule {}