import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WorkersService } from "src/worker/worker.service";
import { WorkerDTO, loginDTO } from "../dto/worker.dto";
import * as bcrypt from 'bcrypt';
import { WorkerRegistrationDTO } from "../dto/workerRegistration.dto";
import { log } from "console";
import { WorkersEntity } from "../worker.entity";



@Injectable()
export class AuthService {
    constructor (
        private workerService: WorkersService,
        private jwtService: JwtService
    ) {}

    async signUp(WorkerRegistrationDTO: WorkerRegistrationDTO): Promise<WorkerRegistrationDTO> {
        return await this.workerService.createWorker(WorkerRegistrationDTO);
    }

    async signIn( loginData:loginDTO): Promise<{ access_token: string }> {
    const user = await this.workerService.findOneBy(loginData);
    if (!user) {
        throw new UnauthorizedException();
    }
    const isMatch = await bcrypt.compare(loginData.password, user.password);
    if (!isMatch) {
        throw new UnauthorizedException(loginData.password + " " + user.password);

    }
    const payload = loginData;
    return {
          access_token: await this.jwtService.signAsync(payload),
    };
    }
}