import { CreateCustomerDto } from '@application/customer/dto/create-customer.dto';
import { FindCustomerDto } from '@application/customer/dto/find-customer.dto';
import { PismaCustomerRepository } from '@infrastructure/respositories/prisma/prisma-customer-repository';
import { Injectable } from '@nestjs/common';
import CustomerFactory from '../factory/customer.factory';
import Address from '../value-object/address';

@Injectable()
export class CustomerService {
  constructor(private readonly repository: PismaCustomerRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<void> {
    const address = new Address(
      createCustomerDto.address.street,
      createCustomerDto.address.number,
      createCustomerDto.address.zip,
      createCustomerDto.address.city,
    );
    const factory = CustomerFactory.createWithAddress(
      createCustomerDto.name,
      createCustomerDto.email,
      address,
    );
    await this.repository.create(factory);
  }

  async find(id: string): Promise<FindCustomerDto> {
    const customer = await this.repository.find(id);
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      },
    };
  }
}
