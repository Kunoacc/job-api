import { HttpModule, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OpportunityController } from './opportunity.controller';
import { OpportunityService } from './opportunity.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    baseURL: 'https://torre.co/api/opportunities'
  })],
  providers: [OpportunityService, PrismaService],
  controllers: [OpportunityController],
  exports: [OpportunityService]
})
export class OpportunityModule {}
