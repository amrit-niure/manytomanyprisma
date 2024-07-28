import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerWithAddressDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerWithAddressDto) {}
