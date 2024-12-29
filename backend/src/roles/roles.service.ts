import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepository.find();
  }

  async findOne(roleId: number): Promise<Role> {
    return await this.roleRepository.findOne({ where: { role_id: roleId } });
  }

  async create(roleName: string): Promise<Role> {
    const newRole = await this.roleRepository.create({ name: roleName });
    return this.roleRepository.save(newRole);
  }

  async update(roleId: number, roleName: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { role_id: roleId },
    });
    if (role) {
      role.name = roleName;
      return this.roleRepository.save(role);
    }
    throw new Error('Role not found');
  }

  async remove(roleId: number): Promise<void> {
    await this.roleRepository.delete({ role_id: roleId });
  }
}
