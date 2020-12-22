import { Module } from '@nestjs/common';
import { OpportunityModule } from 'src/opportunity/opportunity.module';
import { PersonModule } from 'src/person/person.module';
import { CompareController } from './compare.controller';
import { CompareService } from './compare.service';

@Module({
  imports: [OpportunityModule, PersonModule],
  controllers: [CompareController],
  providers: [CompareService]
})
export class CompareModule {}
