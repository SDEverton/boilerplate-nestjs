import Address from '../value-object/address';
import Customer from './customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer('', 'John', 'John@gmail.com');
    }).toThrow('Id is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const customer = new Customer('123', '', 'John@gmail.com');
    }).toThrow('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'John', 'John@gmail.com');

    customer.changeName('Jane');

    expect(customer.name).toBe('Jane');
  });

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1', 'John@gmail.com');
    const address = new Address('Street 1', '123', '13330-250', 'São Paulo');
    customer.Address = address;

    expect(customer.Address.street).toBe('Street 1');
  });
});
