import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { ServicesService } from './services.service';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { MulterError, diskStorage } from 'multer';
  import { ServiceEntity } from './services.entity';
  import { ServiceRegistrationDTO } from './dto/serviceRegistrationDTO';
  
  @Controller('services')
  export class ServcesController {
    constructor(private servicesService: ServicesService) {}
  
    //! Client Registration
    @Post('/serviceRegistration')
    @UseInterceptors(
      FileInterceptor('serviceImg', {
        fileFilter(req, serviceImg, cb) {
          if (
            serviceImg.originalname.match(
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
          destination: './uploads/services',
          filename: function (req, serviceImg, cb) {
            cb(null, serviceImg.originalname);
          },
        }),
      }),
    )
    @UsePipes(ValidationPipe)
    clientRegistration(
      @Body() serviceRegistrationDTO: ServiceRegistrationDTO,
      @UploadedFile() myFile: Express.Multer.File,
    ): Promise<ServiceEntity> {
      serviceRegistrationDTO.serviceImg = myFile.filename;
      return this.servicesService.serviceRegistration(
        serviceRegistrationDTO,
        myFile,
      );
    }
  }