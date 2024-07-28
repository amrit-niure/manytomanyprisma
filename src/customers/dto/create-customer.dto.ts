// src/customer/dto/create-customer-with-address.dto.ts

import { IsEmail, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';

export class CreateCustomerWithAddressDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsArray()
  addresses: CreateAddressDto[];
}
