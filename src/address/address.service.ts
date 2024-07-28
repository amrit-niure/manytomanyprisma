import { Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AddressService {
  constructor(private readonly databaseService: DatabaseService) { }

  // Create a new address if it does not already exist
  async createAddressIfNotExists(addressDto: CreateAddressDto) {
    // Check if the address already exists
    const existingAddress = await this.databaseService.address.findUnique({
      where: {
        city_country: {
          city: addressDto.city,
          country: addressDto.country
        }
      }
    });

    if (existingAddress) {
      return existingAddress; // Address already exists
    }

    // Create a new address
    return this.databaseService.address.create({
      data: addressDto,
    });
  }


  async findAll() {
    return this.databaseService.address.findMany( {include: {
      customers: true
    }});
  }


  async findOne(id: string) {
    return this.databaseService.address.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    return this.databaseService.address.update({
      where: { id },
      data: updateAddressDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.address.delete({
      where: { id },
    });
  }
}
