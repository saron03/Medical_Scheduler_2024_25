import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';

@Controller('api/v1/roles') // REST API Versioning
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  /**
   * @route GET /api/v1/roles
   * @description Fetch all roles
   * @returns Array of roles
   */
  @Get()
  async findAll(): Promise<{ roles: String[] }> {
    const roles = this.rolesService.findAll();
    return {
      roles: (await roles).map((role) => role.name),
    };
  }

  /**
   * @route GET /api/v1/roles/:id
   * @description Fetch a single role by its ID
   * @param id - Role ID
   * @returns Role object
   */
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Role> {
    return this.rolesService.findOne(+id);
  }

  /**
   * @route POST /api/v1/roles
   * @description Create a new role
   * @param name - Role name
   * @returns The created role
   */
  @Post()
  async create(@Body('name') name: string): Promise<Role> {
    // Handle for duplicate values
    return this.rolesService.create(name);
  }

  /**
   * @route PUT /api/v1/roles/:id
   * @description Update an existing role by its ID
   * @param id - Role ID
   * @param name - Updated role name
   * @returns The updated role
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
  ): Promise<Role> {
    return this.rolesService.update(+id, name);
  }

  /**
   * @route DELETE /api/v1/roles/:id
   * @description Delete a role by its ID
   * @param id - Role ID
   */
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.rolesService.remove(+id);
  }
}
