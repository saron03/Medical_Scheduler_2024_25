import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UnauthorizedException,
  BadRequestException,
  Req,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenService } from './token.service';

@Controller('v1/users') // Versioned route
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * @route GET /v1/users
   * @description Fetch all users
   * @returns List of User objects
   */
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * @route GET /v1/users/user
   * @description Fetch the authenticated user
   * @param request - Express request object with JWT in headers
   * @returns Authenticated User object
   */
  @Get('user')
  async user(@Req() request: Request): Promise<User> {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      const { id } = await this.jwtService.verifyAsync(token);
      return this.userService.findById(id);
    } catch (error) {
      throw new UnauthorizedException("Couldn't verify the token");
    }
  }

  /**
   * @route POST /v1/users/register
   * @description Create a new user
   * @param createUserDto - DTO for user creation
   * @returns The created User object with a token
   */
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userService.create(createUserDto);
    const token = await this.jwtService.signAsync({ id: user.user_id });
    return { user, token };
  }

  /**
   * @route POST /v1/users/login
   * @description Authenticate a user and return tokens
   * @param email - User email
   * @param password - User password
   * @param response - Express response object to set cookies
   * @returns Access token for authentication
   */
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.user_id },
      { expiresIn: '10m' }, // Access token expires in 10 minutes
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: user.user_id },
      { expiresIn: '7d' }, // Refresh token expires in 7 days
    );

    // Save the refresh token in the database that expires in a week
    await this.tokenService.create(
      user.user_id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    ); // 7 days
    response.status(200);
    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { token: accessToken };
  }

  /**
   * @route POST /v1/users/refresh
   * @description Refresh the access token using the refresh token
   * @param request - Express request object with cookies
   * @param response - Express response object to set the new token
   * @returns New access token
   */
  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    const refreshToken = request.cookies['refresh_token'];
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    const isValid = await this.tokenService.validate(refreshToken);
    if (!isValid) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const { id } = await this.jwtService.verifyAsync(refreshToken);
    const newAccessToken = await this.jwtService.signAsync(
      { id },
      { expiresIn: '10m' },
    );
    response.status(200);
    return { token: newAccessToken };
  }

  /**
   * @route POST /v1/users/logout
   * @description Log out the user by clearing the refresh token
   * @param response - Express response object to clear cookies
   * @returns Logout confirmation message
   */
  @Post('logout')
  async logout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ message: string }> {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not provided');
    }

    // Remove the refresh token from the database
    await this.tokenService.remove(refreshToken);

    return { message: 'Successfully logged out' };
  }

  /**
   * @route PUT /v1/users/:id
   * @description Update an existing user
   * @param id - User ID
   * @param updateUserDto - DTO for user update
   * @returns The updated User object
   */
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * @route DELETE /v1/users/:id
   * @description Delete a user by ID
   * @param id - User ID
   * @returns Void
   */
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
