import { Module } from '@nestjs/common';
import { TransactionModule } from './transaction/transaction.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ConfigModule.forRoot(), TransactionModule, CategoryModule],
})
export class AppModule {}
