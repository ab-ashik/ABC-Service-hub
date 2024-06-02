import { IsDate, IsEmail, IsNotEmpty, IsString, isDate } from "class-validator";

export class worker_workerInfDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    //@IsNotEmpty()
    profilePicture: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;


    @IsNotEmpty()
    //@IsNumber()
    hourlyRate: number;

    //@IsBoolean()
    availability: boolean;


    bio: string;


    address: string;


    phone: string;

    //add birthdate

    birthDate: Date;
    
}