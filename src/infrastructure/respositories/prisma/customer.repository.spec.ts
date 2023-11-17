import { CustomerModule } from '@application/customer/customer.module';
import CustomerFactory from '@domain/customer/factory/customer.factory';
import Address from '@domain/customer/value-object/address';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { PismaCustomerRepository } from './prisma-customer-repository';
import { PrismaRepository } from './prisma-provider';

const fakeCustomer = [
  {
    name: faker.person.fullName(),
    email: faker.internet.email(),

    street: 'Quanda 50',
    number: '14A',
    zipcode: '67040560',
    city: 'Ananindeua',
  },
];

const moduleMocker = new ModuleMocker(global);

describe('Customer repository test', () => {
  let prisma: PismaCustomerRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
      providers: [PismaCustomerRepository, PrismaRepository],
    })
      .useMocker((token) => {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      })

      .compile();

    prisma = module.get<PismaCustomerRepository>(PismaCustomerRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    const address = new Address('Street', '1', '13330-250', 'São Paulo');

    const customer = CustomerFactory.createWithAddress(
      fakeCustomer[0].name,
      fakeCustomer[0].email,
      address,
    );

    await prisma.create(customer);

    const response = await prisma.find(customer.id);

    expect(response.email).toBe(fakeCustomer[0].email);
  });

  it('should findAll customer', async () => {
    const response = await prisma.findAll();

    expect(response).toBeDefined();
  });

  it('should find customer by email', async () => {
    const address = new Address('Street', '1', '13330-250', 'São Paulo');

    const customer = CustomerFactory.createWithAddress(
      fakeCustomer[0].name,
      faker.internet.email(),
      address,
    );

    await prisma.create(customer);
    const response = await prisma.findByEmail(fakeCustomer[0].email);

    expect(response.email).toBe(fakeCustomer[0].email);
  });
});
