//import { IsEmail, IsString } from "@nestjs/class-validator";
import { ArrayNotEmpty, ArrayUnique, IsArray, IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength, isEmail } from "class-validator";
import { Column, PrimaryGeneratedColumn } from "typeorm";


export class WorkerDTO {

   // @IsNotEmpty()
   // @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    profilePicture: string;


    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    // @IsNotEmpty()
    // @IsPhoneNumber('BD')
    // phone:string;

    // @IsNotEmpty()
    // @IsString()
    // address: string;

    // @IsNotEmpty()
    // @IsString()
    // bio: string;

    // @IsArray()
    // @ArrayNotEmpty()
    // @ArrayUnique()
    // @IsString({each: true})
    // skills: string[];

    @IsNotEmpty()
    @IsNumber()
    hourlyRate: number;

    @IsBoolean()
    availability: boolean;
}

export class loginDTO {
    @IsEmail()
    email : string;

    @IsNotEmpty() 
    password: string;

}

export class updateWorkerDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    // @IsNotEmpty()
    // @IsPhoneNumber('BD')
    // phone:string;

    // @IsNotEmpty()
    // @IsString()
    // address: string;

    // @IsNotEmpty()
    // @IsString()
    // bio: string;

    // @IsArray()
    // @ArrayNotEmpty()
    // @ArrayUnique()
    // @IsString({each: true})
    // skills: string[];

    @IsNotEmpty()
    hourlyRate: number;

    @IsBoolean()
    availability: boolean;
}

