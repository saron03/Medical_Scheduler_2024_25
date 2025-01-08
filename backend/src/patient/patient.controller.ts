import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/createPatient.dto';
import { Patient } from './patient.entity';

@Controller('v1/patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  /**
   * @route POST /v1/patients
   * @description Register a new patient
   * @param createPatientDto - DTO for patient creation
   * @returns The created Patient object
   */
  @Post()
  async register(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientService.register(createPatientDto);
  }

  /**
   * @route GET /v1/patients/:id
   * @description Get details of a specific patient
   * @param id - Patient ID
   * @returns The Patient object
   */
  @Get(':id')
  async getPatient(@Param('id') id: number): Promise<Patient> {
    return this.patientService.findById(id);
  }

  /**
   * @route GET /v1/patients
   * @description Get all registered patients
   * @returns List of Patient objects
   */
  @Get()
  async getAllPatients(): Promise<Patient[]> {
    return this.patientService.findAll();
  }
}
