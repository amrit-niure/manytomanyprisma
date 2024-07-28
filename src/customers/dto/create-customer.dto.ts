// src/customer/dto/create-customer-with-address.dto.ts

import { IsEmail, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from 'src/address/dto/create-address.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerWithAddressDto {
  @ApiProperty({ description: 'The name of the customer' })
  @IsString()
  name: string;
  
  @ApiProperty({ description: 'The email of the customer' })
  @IsEmail()
  email: string;

  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsArray()
  addresses: CreateAddressDto[];
}
