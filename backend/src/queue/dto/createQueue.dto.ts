import { IsNotEmpty, IsBoolean, IsNumber } from 'class-validator';

export class CreateQueueDto {
  @IsNotEmpty()
  @IsNumber()
  patient_id: number;

  @IsNotEmpty()
  @IsNumber()
  doctor_id: number;

  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
