import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class WorkerRegistrationDTO {

    // @IsNotEmpty()
    // @IsNumber()
     id:number;
 
     @IsNotEmpty()
     @IsString()
     name: string;
 
     //@IsNotEmpty()
     profilePicture: string;
 
 
     @IsNotEmpty()
     @IsEmail()
     email: string;
 
     @IsNotEmpty()
     @IsString()
     password: string;
 
     @IsNotEmpty()
     //@IsNumber()
     hourlyRate: number;
 
     //@IsBoolean()
     availability: boolean;
 }