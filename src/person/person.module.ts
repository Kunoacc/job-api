import { HttpModule, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    baseURL: 'https://torre.bio/api/bios/'
  })],
  providers: [PersonService, PrismaService],
  controllers: [PersonController]
})
export class PersonModule {}
