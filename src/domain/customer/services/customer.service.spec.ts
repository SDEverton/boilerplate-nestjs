import { CustomerModule } from '@application/customer/customer.module';
import { faker } from '@faker-js/faker';
import { PismaCustomerRepository } from '@infrastructure/respositories/prisma/prisma-customer-repository';
import { PrismaRepository } from '@infrastructure/respositories/prisma/prisma-provider';
import { Test, TestingModule } from '@nestjs/testing';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { CustomerService } from './customer.service';

const fakeCustomer = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  address: {
    street: 'Quanda 50',
    number: '14A',
    zip: '67040560',
    city: 'Ananindeua',
  },
};
const moduleMocker = new ModuleMocker(global);

describe('Customer service test', () => {
  let service: CustomerService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CustomerModule],
      providers: [PismaCustomerRepository, PrismaRepository, CustomerService],
    })
      .useMocker((token) => {
        const mockMetadata = moduleMocker.getMetadata(
          token,
        ) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      })

      .compile();

    service = module.get<CustomerService>(CustomerService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should create a customer', async () => {
    await service.create(fakeCustomer);

    const response = await service.findByEmail(fakeCustomer.email);

    expect(response.email).toBe(fakeCustomer.email);
  });

  it('should findAll customer', async () => {
    const response = await service.findAll();

    expect(response).toBeDefined();
  });

  it('should find customer by email', async () => {
    fakeCustomer.email = faker.internet.email();
    await service.create(fakeCustomer);
    const response = await service.findByEmail(fakeCustomer.email);

    expect(response.email).toBe(fakeCustomer.email);
  });
});
