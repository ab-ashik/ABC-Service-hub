import { ClientRegistrationDTO } from './dto/clientRegistrationDTO';
import { UpdateClientProfileDTO } from './dto/updateClientProfileDTO';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { status } from './clients.entity';
import { MoreThan, Repository } from 'typeorm';
import { ContactInfoEntity } from './contact-info.entity';
import { ClientEntity } from 'src/clients/clients.entity';
import { OrderEntity } from 'src/order/order.entity';
import { ServiceEntity } from 'src/service/services.entity';
import { JwtService } from '@nestjs/jwt';
import { ClientLoginDTO } from './dto/clientLoginDTO';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailDTO } from './dto/mailDTO';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(ClientEntity)
    private userRepository: Repository<ClientEntity>,
    @InjectRepository(ContactInfoEntity)
    private contactInfoRepository: Repository<ContactInfoEntity>,
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
    @InjectRepository(ServiceEntity)
    private serviceRepository: Repository<ServiceEntity>,
    private jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}
  // private clients: Client[] = [];

  //! Get  Clients
  // getAllClients(): Client[] {
  //   return this.clients;
  // }
  async getAllClients(): Promise<ClientEntity[]> {
    return this.userRepository.find();
  }

  // getClientById(id: string): Client {
  //   const found = this.clients.find((client) => client.id === id);
  //   if (!found) {
  //     throw new NotFoundException('!Client Not Found');
  //   }
  //   return found;
  // }

  //! get Client by ID
  async getClientById(id: number): Promise<ClientEntity | undefined> {
    const found = await this.userRepository.findOneBy({ id: id });
    if (!found) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    } else {
      return found;
    }
  }

  //! Get client by Inactive Status
  async getClientByInactiveStatus(status: status): Promise<ClientEntity[]> {
    return this.userRepository.find({
      where: { status: status },
    });
  }

  //! Get client older 40
  async getClientOlder40(): Promise<ClientEntity[]> {
    return this.userRepository.find({
      where: { age: MoreThan(40) },
    });
  }

  // getClientByIdAndUserName(id: string, userName: string): Client {
  //   return this.clients.find(
  //     (client) => client.id === id && client.userName === userName,
  //   );
  // }

  // clientRegistration(
  //   clientRegistrationDTO: ClientRegistrationDTO,
  //   file: Express.Multer.File,
  // ): Client {
  //   const {
  //     firstName,
  //     lastName,
  //     userName,
  //     email,
  //     fbLinks,
  //     phoneNumber,
  //     address,
  //     dateOfBirth,
  //     password,
  //   } = clientRegistrationDTO;

  //   const client: Client = {
  //     id: uuidv4(),
  //     firstName: firstName,
  //     lastName: lastName,
  //     userName: userName,
  //     email: email,
  //     password: password,
  //     phoneNumber: phoneNumber,
  //     address: address,
  //     dateOfBirth: dateOfBirth,
  //     fbLinks: fbLinks,
  //     profilePicture: file?.filename,
  //   };

  //   this.clients.push(client);
  //   return client;
  // }

  //! Get Client With Contact Info
  async getClientDetails(
    id: number,
  ): Promise<{ client: ClientEntity; contactInfo: ContactInfoEntity }> {
    const client = await this.getClientById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    const contactInfo = await this.contactInfoRepository.findOne({
      where: { client: { id } },
    });
    if (!contactInfo) {
      throw new NotFoundException(
        `Contact info not found for client with ID ${id}`,
      );
    }

    return { client, contactInfo };
  }

  //! Get orders by Client ID
  async getOrdersByClientId(clientId: number): Promise<OrderEntity[]> {
    return this.orderRepository.find({ where: { client: { id: clientId } } });
  }

  //! Get services with clients
  async getServicesWithClients(): Promise<ServiceEntity[]> {
    return this.serviceRepository.find({ relations: ['clients'] });
  }

  //! Client Registration
  async clientRegistration(
    clientRegistrationDTO: ClientRegistrationDTO,
    file: Express.Multer.File,
  ): Promise<ClientEntity> {
    clientRegistrationDTO.profilePicture = file?.filename;
    return this.userRepository.save(clientRegistrationDTO);
  }

  //! Add client Contact Info
  async addContactInfoOfClient(
    clientId: number,
    contactInfo: ContactInfoEntity,
  ): Promise<ContactInfoEntity> {
    const client = await this.getClientById(clientId);

    contactInfo.client = client;

    return this.contactInfoRepository.save(contactInfo);
  }

  //! add Services to client
  async addServicesToClient(
    serviceId: number,
    clientId: number,
  ): Promise<ServiceEntity> {
    const service = await this.serviceRepository.findOne({
      where: { serviceId: serviceId },
      relations: ['clients'],
    });
    const client = await this.getClientById(clientId);
    if (service && client) {
      service.clients = [...service.clients, client];
      return this.serviceRepository.save(service);
    }
  }

  // clientLogin(email: string, password: string): Client {
  //   return this.clients.find(
  //     (client) => client.email === email && client.password === password,
  //   );
  //   // if(client) {
  //   // return client;
  //   // }
  //   // else {
  //   //   return "Error! User Not Found";
  //   // }
  // }

  // updateClientProfile(
  //   id: string,
  //   updateClientProfileDTO: UpdateClientProfileDTO,
  // ): Client {
  //   const client = this.getClientById(id);

  //   if (updateClientProfileDTO.firstName !== undefined) {
  //     client.firstName = updateClientProfileDTO.firstName;
  //   }

  //   if (updateClientProfileDTO.lastName !== undefined) {
  //     client.lastName = updateClientProfileDTO.lastName;
  //   }

  //   if (updateClientProfileDTO.email !== undefined) {
  //     client.email = updateClientProfileDTO.email;
  //   }

  //   if (updateClientProfileDTO.password !== undefined) {
  //     client.password = updateClientProfileDTO.password;
  //   }

  //   if (updateClientProfileDTO.phoneNumber !== undefined) {
  //     client.phoneNumber = updateClientProfileDTO.phoneNumber;
  //   }

  //   if (updateClientProfileDTO.profilePicture !== undefined) {
  //     client.profilePicture = updateClientProfileDTO.profilePicture;
  //   }

  //   if (updateClientProfileDTO.address !== undefined) {
  //     client.address = updateClientProfileDTO.address;
  //   }

  //   if (updateClientProfileDTO.dateOfBirth !== undefined) {
  //     client.dateOfBirth = updateClientProfileDTO.dateOfBirth;
  //   }

  //   return client;
  // }

  //! Create order
  async createOrder(
    clientId: number,
    order: OrderEntity,
  ): Promise<OrderEntity> {
    const client = await this.getClientById(clientId);
    order.client = client;
    return this.orderRepository.save(order);
  }

  //! Update Client Profile
  async updateClientProfile(
    id: number,
    updateClientProfileDTO: UpdateClientProfileDTO,
  ): Promise<ClientEntity> {
    // Update the user with the provided ID using the updatedUser
    //data;
    const result = await this.userRepository.update(id, updateClientProfileDTO);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    }
    // Return the updated user
    return this.userRepository.findOneBy({ id: id });
  }

  //! Update Status
  async updateStatus(id: number, newStatus: status): Promise<ClientEntity> {
    const client = await this.userRepository.findOneBy({ id: id });
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    } else {
      client.status = newStatus;
      return this.userRepository.save(client);
    }
  }

  //! Remove Service from Client
  async removeServiceFromClient(
    clientId: number,
    serviceId: number,
  ): Promise<object> {
    const service = await this.serviceRepository.findOne({
      where: { serviceId: serviceId },
      relations: ['clients']
  });
    const client = await this.getClientById(clientId);
    if (service && client) {
      service.clients = service.clients.filter((c) => c.id !== client.id);
      await this.serviceRepository.save(service);
      return {Message:`Service ${serviceId} is Deleted from the Client ${clientId}`}
    }
  }

  //! Delete Client
  // deleteClientProfile(id: string): object {
  //   const found = this.getClientById(id);
  //   this.clients = this.clients.filter((client) => client.id !== found.id);
  //   return { Message: 'Client is deleted' };
  // }

  async deleteClientProfile(id: number): Promise<string> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not Found`);
    } else {
      return 'Client ptofile deleted successfully';
    }
  }

  async findOne( clientLoginData:ClientLoginDTO): Promise<any> {
    return await this.userRepository.findOneBy({email:clientLoginData.email});
  }

  //! Sen Mail 
  async sendingEmail(emailDTO: SendMailDTO) {
    const { recipient, subject, text } = emailDTO;
    const mail = await this.mailerService.sendMail({
        to: recipient,
        subject: subject,
        text: text,
    });
    console.log(mail);
}

}
