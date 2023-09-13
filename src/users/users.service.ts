import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { RegisterUserDto } from 'src/auth/dto/user.dto';

import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async save(user: RegisterUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    });
  }
}
