import { LoggerMiddleware } from '@application/middleware/logger.middleware';
import { CustomerService } from '@domain/customer/services/customer.service';
import { PismaCustomerRepository } from '@infrastructure/respositories/prisma/prisma-customer-repository';
import { PrismaRepository } from '@infrastructure/respositories/prisma/prisma-provider';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService, PismaCustomerRepository, PrismaRepository],
  exports: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CustomerController);
  }
}
