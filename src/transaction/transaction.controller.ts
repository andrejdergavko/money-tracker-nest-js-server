import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';

@Controller('transaction')
export class TransactionController {
  //Get transactions by user
  @Get()
  async getTransactions() {
    return;
  }

  //Create transaction
  @Post('create')
  async create() {
    return {};
  }

  //Update transaction
  @Put(':id')
  async update(@Param('id') id: string) {
    return;
  }

  //Delete transaction
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return;
  }
}
