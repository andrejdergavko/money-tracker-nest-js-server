import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';
import { CreateTransactionDto } from './dto/create-transactions.dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dtos: CreateTransactionDto[]): Promise<{ count: number }> {
    return this.prismaService.transaction.createMany({
      data: dtos,
    });
  }
}
