import { Body, Controller, Post, Session, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { ClientRegistrationDTO } from '../dto/clientRegistrationDTO';
import { ClientAuthService } from './client-auth.service';
import * as bcrypt from 'bcrypt';
import { ClientEntity } from '../clients.entity';
import { ClientLoginDTO } from '../dto/clientLoginDTO';


@Controller('clientAuth')
export class ClientAuthController {
    constructor(private clientAuthService: ClientAuthService){}
    @Post('/register')
    @UseInterceptors(
        FileInterceptor('profilePicture', {
          fileFilter(req, profilePicture, cb) {
            if (
              profilePicture.originalname.match(
                /^.*\.(jpg|webp|png|jpeg|JPG|WEBP|PNG|JPEG)$/,
              )
            )
              cb(null, true);
            else {
              cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
          },
          // limits: { fileSize: 30000 },
          storage: diskStorage({
            destination: './uploads',
            filename: function (req, profilePicture, cb) {
              cb(null, profilePicture.originalname);
            },
          }),
        }),
      )
      @UsePipes(ValidationPipe)
      async signUp(
        @Body() clientRegistrationDTO: ClientRegistrationDTO,
        @UploadedFile() myFile: Express.Multer.File,
      ): Promise<ClientEntity> {
        
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(clientRegistrationDTO.password, salt);

        clientRegistrationDTO.password = hashedPassword;

        clientRegistrationDTO.profilePicture = myFile.filename;
    
        return this.clientAuthService.signUp(
          clientRegistrationDTO,
          myFile,
        );
      }

      @Post('/clientLogin')
      clientSignIn(@Body() clientLogindata: ClientLoginDTO, @Session() session) {
        session.email = clientLogindata.email;
        return this.clientAuthService.clientSignIn(clientLogindata);
      }
}
