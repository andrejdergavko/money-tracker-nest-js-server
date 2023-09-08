import { Injectable } from '@nestjs/common';
import { Category } from '@prisma/client';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }
}
