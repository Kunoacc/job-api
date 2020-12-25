import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { PrismaService } from './prisma/prisma.service';
import { OpportunityModule } from './opportunity/opportunity.module';
import { CompareModule } from './compare/compare.module';
import { SearchModule } from './search/search.module';
import { LoggerMiddleware } from './logger.middleware';

@Module({
  imports: [PersonModule, OpportunityModule, CompareModule, SearchModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
