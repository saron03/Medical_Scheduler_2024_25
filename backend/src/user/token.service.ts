import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './token.entity';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>, // Repository for Token
  ) {}

  /**
   * @description Find all tokens in the database
   * @returns List of all tokens
   */
  async findAll(): Promise<Token[]> {
    return this.tokenRepository.find();
  }

  /**
   * @description Find a token by its ID
   * @param id - Token ID
   * @returns Token object if found
   */
  async findOne(id: number): Promise<Token> {
    const token = await this.tokenRepository.findOne({ where: { id } });
    if (!token) {
      throw new NotFoundException(`Token with ID ${id} not found`);
    }
    return token;
  }

  /**
   * @description Create a new token
   * @param userId - The user ID associated with the token
   * @param tokenString - The token string
   * @param expiresAt - Expiration date for the token
   * @returns The created Token object
   */
  async create(
    userId: number,
    tokenString: string,
    expiresAt: Date,
  ): Promise<Token> {
    const newToken = this.tokenRepository.create({
      user_id: userId,
      token: tokenString,
      expired_at: expiresAt,
    });
    return this.tokenRepository.save(newToken);
  }

  /**
   * @description Delete a token by its ID
   * @param id - Token ID
   */
  async remove(id: number): Promise<void> {
    const token = await this.findOne(id);
    await this.tokenRepository.remove(token);
  }

  /**
   * @description Delete all expired tokens
   */
  async removeExpired(): Promise<void> {
    const now = new Date();
    await this.tokenRepository.delete({ expired_at: now });
  }

  /**
   * @description Validate a token to check if it is still valid
   * @param tokenString - The token string to validate
   * @returns True if valid, otherwise false
   */
  async validate(tokenString: string): Promise<boolean> {
    const token = await this.tokenRepository.findOne({
      where: { token: tokenString },
    });

    if (!token) return false;

    const now = new Date();
    return now < token.expired_at; // Check if token has not expired
  }
}
