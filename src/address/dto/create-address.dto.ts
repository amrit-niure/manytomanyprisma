import { IsString, IsUUID } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  city: string;

  @IsString()
  country: string;
}
