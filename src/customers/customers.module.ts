import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { DatabaseModule } from 'src/database/database.module';
import { AddressModule } from 'src/address/address.module';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [DatabaseModule,AddressModule],
  controllers: [CustomersController],
  providers: [CustomersService,AddressService],
})
export class CustomersModule {}
