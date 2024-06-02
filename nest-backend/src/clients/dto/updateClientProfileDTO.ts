import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateClientProfileDTO {
  @IsOptional()
  @IsString({ message: '!Error, Invalid type for First Name' })
  firstName?: string;

  @IsOptional()
  @IsString({ message: '!Error, Invalid type for Last Name' })
  lastName?: string;
  userName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
  password: string;
  profilePicture?: string;
  phoneNumber?: string;
  address?: string;
  dateOfBirth: Date;
}
