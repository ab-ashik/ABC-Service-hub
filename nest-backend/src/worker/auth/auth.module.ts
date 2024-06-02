import { Module } from "@nestjs/common";
import { WorkersModule } from "../worker.module";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from "./auth.controller";
import { jwtConstants } from "./constants";


@Module({
    imports: [
        WorkersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '30m'}
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule{}