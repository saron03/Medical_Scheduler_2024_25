import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { TokenService } from './user/token.service';
import { Token } from './user/token.entity';
import { PatientModule } from './patient/patient.module';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes ConfigService available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'default_username'),
        password: configService.get<string>('DB_PASSWORD', 'default_password'),
        database: configService.get<string>('DB_NAME', 'default_database'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        synchronize: false,
      }),
    }),
    TypeOrmModule.forFeature([Token]),
    RolesModule,
    UserModule,
    PatientModule,
    QueueModule,
  ],
  controllers: [AppController],
  providers: [AppService, TokenService],
})
export class AppModule {}
