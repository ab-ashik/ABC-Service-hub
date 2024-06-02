import { IsNotEmpty, IsString, Length } from 'class-validator';
import { status } from '../services.entity';

export class ServiceRegistrationDTO {
  //! Service Name
  @IsNotEmpty()
  @IsString({
    message:
      '!Error, Invalid type for Service Name...Service Name Must be String',
  })
  service_name: string;

  //! provider_name
  @IsNotEmpty()
  @IsString({
    message:
      '!Error, Invalid type for provider_name...provider_name Must Be String',
  })
  provider_name: string;

  //! provider_contact
  @IsNotEmpty()
  @IsString()
  @Length(1, 11, {
    message: 'provider_contact number must not be longer than 11 digits',
  })
  provider_contact: string;

  //! service_description
  @IsNotEmpty()
  @IsString()
  service_description: string;

  //! location
  @IsString({ message: 'location must be a string' })
  location: string;

  //!  Rating
  rating: string;

  //! price
  price: number;

  //! Status
  status: status;

  //! Service img
  serviceImg?: string;
}