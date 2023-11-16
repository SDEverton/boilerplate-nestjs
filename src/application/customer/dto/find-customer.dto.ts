import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AddressDto, CreateCustomerDto } from './create-customer.dto';

export class FindCustomerDto extends CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @Type(() => AddressDto)
  address: AddressDto;
}
