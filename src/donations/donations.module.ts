import { Module } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationsController } from './donations.controller';
import { Donation } from './entities/donation.entity';
import { DonationRepository } from './donations.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, DonationRepository])],
  controllers: [DonationsController],
  providers: [DonationsService],
})
export class DonationsModule {}
