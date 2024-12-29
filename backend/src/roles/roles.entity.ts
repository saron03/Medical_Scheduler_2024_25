import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const allowedRoleNames = [
  'Patient',
  'HeadOffice',
  'Branch',
  'Doctor',
  'Receptionist',
];

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({ unique: true })
  name: string;

  // Method to validate the role name
  validateRoleName() {
    if (!allowedRoleNames.includes(this.name)) {
      throw new Error(
        `Invalid role name. Allowed values are: ${allowedRoleNames.join(', ')}`,
      );
    }
  }
}
