import { IsNotEmpty, IsNumber } from 'class-validator';

export class DonationDTO {
  @IsNotEmpty()
  @IsNumber()
  readonly families: number;

  @IsNotEmpty()
  @IsNumber()
  readonly donors: number;

  @IsNotEmpty()
  @IsNumber()
  readonly total_value: number;

  @IsNotEmpty()
  @IsNumber()
  readonly impacted_people: number;

  @IsNotEmpty()
  @IsNumber()
  readonly donated_baskets: number;
}
