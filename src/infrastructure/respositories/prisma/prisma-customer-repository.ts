import Customer from '@domain/customer/entity/customer';
import CustomerRepositoryInterface from '@domain/customer/repository/customer-repsitory.interface';
import Address from '@domain/customer/value-object/address';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from './prisma-provider';

@Injectable()
export class PismaCustomerRepository implements CustomerRepositoryInterface {
  constructor(private readonly prisma: PrismaRepository) {}

  async create(entity: Customer): Promise<void> {
    await this.prisma.customer.create({
      data: {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
      },
    });
  }

  async find(id: string): Promise<Customer> {
    const customerModel = await this.prisma.customer.findUnique({
      where: { id },
    });

    if (!customerModel) {
      throw new Error('Customer not found');
    }

    const customer = new Customer(id, customerModel.name, customerModel.email);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city,
    );
    customer.changeAddress(address);
    return customer;
  }
}
