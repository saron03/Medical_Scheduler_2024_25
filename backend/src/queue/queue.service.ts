import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from './queue.entity';
import { CreateQueueDto } from './dto/createQueue.dto';
import { UpdateQueueDto } from './dto/updateQueue.dto';
import { Patient } from 'src/patient/patient.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(Queue)
    private readonly queueRepository: Repository<Queue>,
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Queue[]> {
    return this.queueRepository.find({ relations: ['patient', 'doctor'] });
  }

  async findOne(id: number): Promise<Queue> {
    const queue = await this.queueRepository.findOne({
      where: { queue_id: id },
      relations: ['patient', 'doctor'],
    });

    if (!queue) {
      throw new NotFoundException(`Queue entry with ID ${id} not found`);
    }

    return queue;
  }

  async create(createQueueDto: CreateQueueDto): Promise<Queue> {
    const { patient_id, doctor_id, status } = createQueueDto;

    const patient = await this.patientRepository.findOne({
      where: { patient_id },
    });
    if (!patient) {
      throw new NotFoundException(`Patient with ID ${patient_id} not found`);
    }

    const doctor = await this.userRepository.findOne({
      where: { user_id: doctor_id },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${doctor_id} not found`);
    }

    const newQueue = this.queueRepository.create({ patient, doctor, status });
    return this.queueRepository.save(newQueue);
  }

  async update(id: number, updateQueueDto: UpdateQueueDto): Promise<Queue> {
    const queue = await this.findOne(id);

    if (updateQueueDto.status !== undefined) {
      queue.status = updateQueueDto.status;
    }

    return this.queueRepository.save(queue);
  }

  async remove(id: number): Promise<void> {
    const queue = await this.findOne(id);
    await this.queueRepository.remove(queue);
  }
}
