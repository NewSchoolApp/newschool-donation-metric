import { Injectable } from '@nestjs/common';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  jwtSecret: string = this.configService.get<string>('JWT_SECRET');
  refreshTokenSecret: string = this.configService.get<string>(
    'REFRESH_TOKEN_SECRET',
  );

  nodeEnv: string = this.configService.get<string>('NODE_ENV');
  port: number = this.configService.get<number>('PORT');

  changePasswordExpirationTime: number = this.configService.get<number>(
    'CHANGE_PASSWORD_EXPIRATION_TIME',
  );

  databaseHost: string = this.configService.get<string>('DATABASE_HOST');
  databaseName: string = this.configService.get<string>('DATABASE_NAME');
  databasePort: number = this.configService.get<number>('DATABASE_PORT');
  databaseUsername: string = this.configService.get<string>(
    'DATABASE_USERNAME',
  );
  databasePassword: string = this.configService.get<string>(
    'DATABASE_PASSWORD',
  );
  synchronize: boolean = this.configService.get<string>('NODE_ENV') === 'TEST';
  logging: boolean = this.configService.get<string>('NODE_ENV') !== 'TEST';
  runMigrations: boolean =
    this.configService.get<string>('NODE_ENV') !== 'TEST';

  frontUrl: string = this.configService.get<string>('FRONT_URL');
  changePasswordFrontUrl: string = this.configService.get<string>(
    'CHANGE_PASSWORD_URL',
  );

  smtpHost: string = this.configService.get<string>('SMTP_HOST');
  smtpPort: number = this.configService.get<number>('SMTP_PORT');
  smtpSecure: boolean | undefined = this.configService.get<boolean | undefined>(
    'SMTP_SECURE',
  );
  smtpRequireTls: boolean = this.configService.get<boolean>('SMTP_REQUIRE_TLS');
  smtpUser: string = this.configService.get<string>('SMTP_USER');
  smtpPassword: string = this.configService.get<string>('SMTP_PASSWORD');
  smtpFrom: string = this.configService.get<string>('SMTP_FROM');

  awsAccessKey: string = this.configService.get<string>('AWS_ACCESS_KEY');
  awsAccessKeySecret: string = this.configService.get<string>(
    'AWS_ACCESS_KEY_SECRET',
  );
  awsUserBucket: string = this.configService.get<string>('AWS_USER_BUCKET');

  public getDatabaseConfig(): PostgresConnectionOptions {
    return {
      type: 'postgres',
      entities: [
        `${path.resolve(
          path.join(__dirname, '..', '..'),
        )}/**/*.entity{.ts,.js}`,
      ],
      migrationsRun: this.runMigrations,
      migrations: [
        `${path.resolve(
          path.join(__dirname, '..', '..'),
        )}/migration/*{.ts,.js}`,
      ],
      migrationsTableName: 'migration',
      cli: {
        migrationsDir: 'src/migration',
      },
      host: this.databaseHost,
      database: this.databaseName,
      port: this.databasePort,
      username: this.databaseUsername,
      password: this.databasePassword,
      synchronize: this.synchronize || false,
      logging: this.logging,
    };
  }
}
