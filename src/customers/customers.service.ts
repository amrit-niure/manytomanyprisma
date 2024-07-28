import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerWithAddressDto } from './dto/create-customer.dto';
import { DatabaseService } from 'src/database/database.service';
import { AddressService } from 'src/address/address.service';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly addressService: AddressService
  ) { }

  async createCustomerWithAddresses(createCustomerWithAddressDto: CreateCustomerWithAddressDto) {
    // Handle address creation if not exists
    const addressPromises = createCustomerWithAddressDto.addresses.map(address =>
      this.addressService.createAddressIfNotExists(address)
    );
    const updatedAddresses = await Promise.all(addressPromises);

    // Get the IDs of the addresses
    const addressIds = updatedAddresses.map(address => address.id);

    // Create the customer and connect to the addresses
    return this.databaseService.customer.create({
      data: {
        name: createCustomerWithAddressDto.name,
        email: createCustomerWithAddressDto.email,
        addresses: {
          connect: addressIds.map(id => ({ id })),
        }
      },
      include: {
        addresses: true
      }
    });
  }

  async findAll() {
    const customers = await this.databaseService.customer.findMany({ include: { addresses: true } })
    return customers
  }

  async findOne(id: string) {
    const customer = await this.databaseService.customer.findFirst({
      where: {
        id
      },
      include: {
        addresses: true
      }
    })
    return customer;
  }

  async updateCustomerWithAddresses(id: string, updateCustomerWithAddressDto: UpdateCustomerDto) {
    // Handle address creation if not exists
    const addressPromises = updateCustomerWithAddressDto.addresses.map(address =>
      this.addressService.createAddressIfNotExists(address)
    );
    const updatedAddresses = await Promise.all(addressPromises);

    // Get the IDs of the addresses
    const addressIds = updatedAddresses.map(address => address.id);

    // Update the customer and connect to the addresses
    const updatedCustomer = await this.databaseService.customer.update({
      where: { id },
      data: {
        name: updateCustomerWithAddressDto.name,
        email: updateCustomerWithAddressDto.email,
        addresses: {
          connect: addressIds.map(id => ({ id })),
        }
      },
      include: {
        addresses: true
      }
    });
    return updatedCustomer;
  }

  async remove(id: string) {
    // Find the customer and their addresses
    const customer = await this.databaseService.customer.findUnique({
      where: { id },
      include: { addresses: true },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Get addresses of the customer
    const customerAddresses = customer.addresses;

    // Delete the customer
    await this.databaseService.customer.delete({
      where: { id },
    });

    // Check each address to see if it is associated with other customers
    for (const address of customerAddresses) {
      const isAddressUsedByOtherCustomers = await this.databaseService.address.findFirst({
        where: {
          id: address.id,
          customers: { some: {} },
        },
      });

      if (!isAddressUsedByOtherCustomers) {
        // If address is not used by other customers, delete it
        await this.addressService.remove(address.id);
      }
    }

    return { message: 'Customer and only unused addresses removed successfully' };
  }
}
