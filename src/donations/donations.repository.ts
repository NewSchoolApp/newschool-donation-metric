import { EntityRepository, Repository } from 'typeorm';
import { Donation } from './entities/donation.entity';

@EntityRepository(Donation)
export class DonationRepository extends Repository<Donation> {}
