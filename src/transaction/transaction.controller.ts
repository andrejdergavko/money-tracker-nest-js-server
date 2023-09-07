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
  ParseArrayPipe,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transactions.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  //Get transactions by user
  // @Get()
  // async getTransactions() {
  //   return;
  // }

  //Create transactions
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(
    @Body(new ParseArrayPipe({ items: CreateTransactionDto }))
    dtos: CreateTransactionDto[],
  ) {
    return this.transactionService.create(dtos);
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
