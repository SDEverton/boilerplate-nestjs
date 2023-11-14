import RepositoryInterface from '@domain/@shared/repository/repository-interface';
import Customer from '../entity/customer';

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
