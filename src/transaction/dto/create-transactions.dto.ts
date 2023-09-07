import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  userId: string;

  @IsString()
  date: string;

  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  amount: number;

  @IsNumber()
  amountInUsd: number;

  @IsString()
  bank: string;

  @IsOptional()
  @IsString()
  categoryUuid?: string;

  @IsString()
  originalCsvRow: string;
}
