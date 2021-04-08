import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService as ConfigService } from './configModule/service/app-config.service';
import { DonationsModule } from './donations/donations.module';
import { ConfigModule } from './configModule/config.module';

const typeOrmAsyncModule: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (appConfigService: ConfigService) =>
    appConfigService.getDatabaseConfig(),
};
@Module({
  imports: [
    DonationsModule,
    ConfigModule,
    NestConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
