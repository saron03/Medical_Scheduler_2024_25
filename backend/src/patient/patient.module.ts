import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './patient.entity';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { User } from 'src/user/user.entity'; // Ensure User entity is accessible

@Module({
  imports: [TypeOrmModule.forFeature([Patient, User])],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
})
export class PatientModule {}
