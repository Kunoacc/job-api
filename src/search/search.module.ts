import { HttpModule, Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [HttpModule.register({
    timeout: 5000,
    baseURL: 'https://search.torre.co'
  })],
  providers: [SearchService],
  controllers: [SearchController]
})
export class SearchModule {}
