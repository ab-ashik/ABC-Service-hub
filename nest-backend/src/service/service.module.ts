import { Module } from "@nestjs/common";
import { ServiceEntity } from "./services.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServcesController } from "./services.controller";
import { ServicesService } from "./services.service";

@Module({
    imports: [TypeOrmModule.forFeature([ServiceEntity])],
    controllers:[ServcesController],
    providers: [ServicesService] 
})
export class ServiceModule {}