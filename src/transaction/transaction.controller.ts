import { Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  //Get transactions by user
  // @Get()
  // async getTransactions() {
  //   return;
  // }

  //Create transactions
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(
    @Body()
    transactions:
      | Prisma.TransactionCreateManyInput
      | Prisma.TransactionCreateManyInput[],
  ) {
    return this.transactionService.create(transactions);
  }

  //Update transaction
  // @Put(':id')
  // async update(@Param('id') id: string) {
  //   return;
  // }

  //Delete transaction
  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return;
  // }
}
