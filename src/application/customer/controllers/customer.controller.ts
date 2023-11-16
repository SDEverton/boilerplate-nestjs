import { LoggingInterceptor } from '@application/interceptors/logging.interceptor';
import {
  Context,
  LoggerService,
} from '@domain/@shared/services/logger.service';
import { CustomerService } from '@domain/customer/services/customer.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { FindCustomerDto } from '../dto/find-customer.dto';

const controller: string = 'customer';

@Controller(controller)
@UseInterceptors(LoggingInterceptor)
export class CustomerController {
  private Log: LoggerService = new LoggerService('createOperation');
  constructor(private readonly customerService: CustomerService) {}

  @Get('/check')
  get(): string {
    const context: Context = { module: controller, method: 'get' };
    this.Log.logger('Hello World!', context);
    return 'Hello World!';
  }

  @Get('/:id')
  async getAll(@Param('id') id: string): Promise<FindCustomerDto> {
    const context: Context = { module: controller, method: 'find' };
    this.Log.logger(id, context);
    return await this.customerService.find(id);
  }

  @Post('/')
  async create(@Body() customer: CreateCustomerDto): Promise<void> {
    const context: Context = { module: controller, method: 'create' };
    this.Log.logger(customer, context);
    return this.customerService.create(customer);
  }
}
