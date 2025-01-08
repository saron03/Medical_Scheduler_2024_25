import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { CreatePatientDto } from './dto/createPatient.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @description Register a new patient
   * @param createPatientDto - Data for patient creation
   * @returns The created Patient object
   */
  async register(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { registered_by_id, ...patientData } = createPatientDto;

    const registeredBy = await this.userRepository.findOne({
      where: { user_id: registered_by_id },
    });

    if (!registeredBy) {
      throw new NotFoundException(
        `Receptionist with ID ${registered_by_id} not found`,
      );
    }

    const newPatient = this.patientRepository.create({
      ...patientData,
      registered_by: registeredBy,
    });

    return this.patientRepository.save(newPatient);
  }

  /**
   * @description Find a patient by ID
   * @param id - Patient ID
   * @returns The Patient object
   */
  async findById(id: number): Promise<Patient> {
    const patient = await this.patientRepository.findOne({
      where: { patient_id: id },
      relations: ['registered_by'],
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  /**
   * @description Find all registered patients
   * @returns List of all Patient objects
   */
  async findAll(): Promise<Patient[]> {
    return this.patientRepository.find({ relations: ['registered_by'] });
  }
}
