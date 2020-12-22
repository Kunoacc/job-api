import { Body, Controller, Post, Query } from '@nestjs/common';
import { PersonSearchApiResponse } from 'src/interface/person-search-api.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {


  constructor (private searchService: SearchService) { }

  @Post('/person')
  async getPeopleResults(
    @Body('name') name: string,
    @Body('skills') skills: [],
    @Body('experience') experience: string,
    @Query('offset') offset: string
  ): Promise<PersonSearchApiResponse>{
    return await this.searchService?.getPersonSearchResults(offset, {
      name,
      skills,
      experience
    })
  }
}
