import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DonationRepository } from './donations.repository';
import { DonationDTO } from './dto/DonationDTO';

@Injectable()
export class DonationsService {
  constructor(private readonly donationRepository: DonationRepository) {}

  async create(createDonationDto: DonationDTO) {
    const hasDonations = await this.donationRepository.find();

    if (hasDonations.length)
      throw new HttpException(
        `Cannot create more than one donation, please update the current donation`,
        HttpStatus.BAD_REQUEST,
      );

    await this.donationRepository.create(createDonationDto);

    return this.donationRepository.save(createDonationDto);
  }

  async findAll() {
    const donations = await this.donationRepository.find();
    if (donations.length > 1) {
      return donations.filter((donation) => donation.id === 1);
    }

    return donations;
  }

  async update(id: number, updateDonationDto: DonationDTO) {
    const donation = await this.donationRepository.findOne(id);

    if (!donation)
      throw new HttpException(
        `User with id ${id}, not found`,
        HttpStatus.NOT_FOUND,
      );

    updateDonationDto = { ...donation, ...updateDonationDto };

    await this.donationRepository.create(updateDonationDto);
    return this.donationRepository.save(updateDonationDto);
  }
}
