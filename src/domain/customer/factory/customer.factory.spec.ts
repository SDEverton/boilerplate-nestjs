import Address from '../value-object/address';
import CustomerFactory from './customer.factory';

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John', 'john@gmail.com');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.Address).toBeUndefined();
  });

  it('should create a customer with an address', () => {
    const address = new Address('Street', '1', '13330-250', 'São Paulo');

    const customer = CustomerFactory.createWithAddress(
      'John',
      'john@gmail.com',
      address,
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.Address).toBe(address);
  });
});
