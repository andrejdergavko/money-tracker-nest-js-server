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
  NotFoundException,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TRANSACTION_NOT_FOUND_ERROR } from './transaction.constants';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  //Get transactions by user
  @Get()
  async getTransactions() {
    return this.transactionService.findAll();
  }

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
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
    try {
      return await this.transactionService.updateById(id, dto);
    } catch (error) {
      throw new NotFoundException(TRANSACTION_NOT_FOUND_ERROR);
    }
  }

  //Delete transaction
  @Delete(':id')
  async delete(@Param('id') id: string) {
    try {
      return await this.transactionService.deleteById(id);
    } catch (error) {
      throw new NotFoundException(TRANSACTION_NOT_FOUND_ERROR);
    }
  }
}
