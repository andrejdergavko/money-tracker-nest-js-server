import { Injectable } from '@nestjs/common';
import { Transaction } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dtos: CreateTransactionDto[]): Promise<{ count: number }> {
    return this.prismaService.transaction.createMany({
      data: dtos,
    });
  }

  async findAll(): Promise<Transaction[]> {
    return this.prismaService.transaction.findMany();
  }

  async updateById(
    id: string,
    dto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return this.prismaService.transaction.update({
      where: { id },
      data: dto,
    });
  }

  async deleteById(id: string): Promise<Transaction> {
    return this.prismaService.transaction.delete({ where: { id } });
  }
}
