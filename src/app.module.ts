import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonController } from './person/person.controller';
import { PersonService } from './person/person.service';
import { PersonModule } from './person/person.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [PersonModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
