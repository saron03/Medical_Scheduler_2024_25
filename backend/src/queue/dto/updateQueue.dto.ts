import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateQueueDto {
  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
