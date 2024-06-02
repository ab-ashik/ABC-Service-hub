import { Injectable } from "@nestjs/common";
import { ServiceEntity} from "./services.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceRegistrationDTO } from './dto/serviceRegistrationDTO';


@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(ServiceEntity)
        private serviceRepository: Repository<ServiceEntity>,
    ) {}

//! Service Registration 
  
  async serviceRegistration(
    serviceRegistrationDTO: ServiceRegistrationDTO,
    file: Express.Multer.File
  ): Promise<ServiceEntity> {
    serviceRegistrationDTO.serviceImg = file?.filename;
    return this.serviceRepository.save(serviceRegistrationDTO);
  }

}