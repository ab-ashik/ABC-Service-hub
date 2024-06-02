import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientsService } from '../clients.service';
import { ClientRegistrationDTO } from '../dto/clientRegistrationDTO';
import { ClientLoginDTO } from '../dto/clientLoginDTO';
import * as bcrypt from 'bcrypt';
import { ClientEntity } from '../clients.entity';

@Injectable()
export class ClientAuthService {
  constructor(
    private clientService: ClientsService,
    private jwtService: JwtService,
  ) {}

  async signUp(
    clientDTO: ClientRegistrationDTO,
    file: Express.Multer.File,
  ): Promise<ClientEntity> {
    return await this.clientService.clientRegistration(clientDTO, file);
  }

  async clientSignIn(
    clientLogindata: ClientLoginDTO,
  ): Promise<{ access_token: string }> {
    const user = await this.clientService.findOne(clientLogindata);
    if (!user) {
      throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(clientLogindata.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = clientLogindata;
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
