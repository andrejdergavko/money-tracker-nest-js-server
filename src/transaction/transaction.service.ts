import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    transactions:
      | Prisma.TransactionCreateManyInput
      | Prisma.TransactionCreateManyInput[],
  ): Promise<{ count: number }> {
    return this.prismaService.transaction.createMany({
      data: transactions,
    });
  }
}
