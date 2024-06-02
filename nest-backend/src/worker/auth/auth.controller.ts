import { Body, Controller, ParseIntPipe, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";
import { WorkerDTO, loginDTO } from "../dto/worker.dto";
import * as bcrypt from 'bcrypt';
import { WorkersEntity } from "../worker.entity";
import { workerData } from "worker_threads";
import { WorkerRegistrationDTO } from "../dto/workerRegistration.dto";


@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService) {}

    // @Post('register')
    // @UseInterceptors(FileInterceptor('myfile',
    //     {
    //         fileFilter: (req, file, cb) => {
    //             if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
    //                 cb(null, true);
    //             else {
    //                 cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    //             }
    //         },
    //         limits: { fileSize: 30000 },
    //         storage: diskStorage({
    //             destination: './upload',
    //             filename: function (req, file, cb) {
    //                 cb(null, Date.now() + file.originalname)
    //             },
    //         })
    //     }
    // ))
    // @UsePipes(new ValidationPipe)
    // async addUser(@Body() myobj: WorkerDTO, @UploadedFile() myfile: Express.Multer.File): Promise<WorkerDTO> {
    //   const salt = await bcrypt.genSalt();
    //   const hashedpassword = await bcrypt.hash(myobj.password, salt); 
    //   myobj.password= hashedpassword;
    //   myobj.filename = myfile.filename;
    //     return this.authService.signUp(myobj);
    // }

    @Post('/register')
    @UseInterceptors(FileInterceptor('profilePicture',
    {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
                cb(null, true);
            else {
                cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 300000 },
        storage: diskStorage({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname)
            },
        })
    }
))  




    // @UseInterceptors(
    //     FileInterceptor('profilePicture', {
    //       fileFilter(req, profilePicture, cb) {
    //         if (
    //           profilePicture.originalname.match(
    //             /^.*\.(jpg|webp|png|jpeg|JPG|WEBP|PNG|JPEG)$/,
    //           )
    //         )
    //           cb(null, true);
    //         else {
    //           cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
    //         }
    //       },
    //       // limits: { fileSize: 30000 },
    //       storage: diskStorage({
    //         destination: './uploads',
    //         filename: function (req, profilePicture, cb) {
    //           cb(null, profilePicture.originalname);
    //         },
    //       }),
    //     }),
    //   )



    @UsePipes(ValidationPipe)
    async signUp(
      @Body() WorkerRegistrationDTO: WorkerRegistrationDTO,
      @UploadedFile() myFile: Express.Multer.File,
    ) : Promise<WorkerRegistrationDTO> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(WorkerRegistrationDTO.password, salt);
        
        WorkerRegistrationDTO.password = hashedPassword;

        WorkerRegistrationDTO.profilePicture = myFile.filename;

        //console.log("Name:", WorkerRegistrationDTO.name);
        console.log("Filename:", myFile.filename);
        
        //WorkerRegistrationDTO.hourlyRate =new ParseIntPipe(WorkerRegistrationDTO.hourlyRate);
        // return this.authService.signUp(workerData, profilePicture,);
        return this.authService.signUp(WorkerRegistrationDTO);
    }
//     @Controller('clientAuth')
// export class ClientAuthController {
//     constructor(private clientAuthService: ClientAuthService){}
//     @Post('/register')
//     @UseInterceptors(
//         FileInterceptor('profilePicture', {
//           fileFilter(req, profilePicture, cb) {
//             if (
//               profilePicture.originalname.match(
//                 /^.*\.(jpg|webp|png|jpeg|JPG|WEBP|PNG|JPEG)$/,
//               )
//             )
//               cb(null, true);
//             else {
//               cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
//             }
//           },
//           // limits: { fileSize: 30000 },
//           storage: diskStorage({
//             destination: './uploads',
//             filename: function (req, profilePicture, cb) {
//               cb(null, profilePicture.originalname);
//             },
//           }),
//         }),
//       )
//       @UsePipes(ValidationPipe)
//       async signUp(
//         @Body() clientRegistrationDTO: ClientRegistrationDTO,
//         @UploadedFile() myFile: Express.Multer.File,
//       ): Promise<ClientEntity> {
        
//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(clientRegistrationDTO.password, salt);

//         clientRegistrationDTO.password = hashedPassword;

//         clientRegistrationDTO.profilePicture = myFile.filename;
    
//         return this.clientAuthService.signUp(
//           clientRegistrationDTO,
//           myFile,
//         );
//       }

    @Post('login')
    signIn(@Body() loginData: loginDTO) {
        return this.authService.signIn(loginData);
    }


}