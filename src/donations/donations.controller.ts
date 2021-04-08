import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { DonationsService } from './donations.service';
import { DonationDTO } from './dto/DonationDTO';

@Controller('donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  create(@Body() createDonationDto: DonationDTO) {
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  findAll() {
    return this.donationsService.findAll();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDonationDto: DonationDTO) {
    return this.donationsService.update(+id, updateDonationDto);
  }
}
