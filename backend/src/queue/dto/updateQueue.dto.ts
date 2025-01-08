import { IsOptional, IsNumber } from 'class-validator';

export class UpdateQueueDto {
  @IsOptional()
  @IsNumber()
  status?: number; // Status: 1 (Unpending), 2 (Pending), 3 (Resolved)
}
