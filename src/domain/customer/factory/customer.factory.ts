import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import Address from '../value-object/address';

export default class CustomerFactory {
  public static create(name: string, email: string): Customer {
    return new Customer(uuid(), name, email);
  }

  public static createWithAddress(
    name: string,
    email: string,
    address: Address,
  ): Customer {
    const customer = new Customer(uuid(), name, email);
    customer.changeAddress(address);
    return customer;
  }
}
