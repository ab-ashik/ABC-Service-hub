import { IsEmail, IsNotEmpty} from 'class-validator';

export class ClientLoginDTO {
   @IsEmail() email: string;
  @IsNotEmpty() password: string;    

}
