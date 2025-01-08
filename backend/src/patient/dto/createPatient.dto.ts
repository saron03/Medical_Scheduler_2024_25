import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsString,
  IsDate,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone_number?: string;

  @IsOptional()
  @IsDate()
  date_of_birth?: Date;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNotEmpty()
  registered_by_id: number; // Receptionist ID
}
