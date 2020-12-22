import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PrismaService } from './prisma/prisma.service';
import { OpportunityModule } from './opportunity/opportunity.module';
import { CompareModule } from './compare/compare.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [PersonModule, OpportunityModule, CompareModule, SearchModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
