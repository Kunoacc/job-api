import { BadRequestException, Body, Controller, HttpStatus, Post, Query } from '@nestjs/common';
import { OpportunitySearchApiResponse } from 'src/interface/opportunity-search-api.interface';
import { PersonSearchApiResponse } from 'src/interface/person-search-api.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {


  constructor (private searchService: SearchService) { }

  @Post('/person')
  async getPeopleResults(
    @Body('name') name: string,
    @Body('skills') skills: [] = [],
    @Query('offset') offset: string = "0"
  ): Promise<PersonSearchApiResponse>{
    if (!name && skills.length < 1) {
      throw new BadRequestException({
        error: 'Either a name of skill has to be passed',
        status: HttpStatus.BAD_REQUEST
      })
    }
    return await this.searchService?.getPersonSearchResults(offset, {
      name,
      skills
    })
  }

  @Post('/opportunity')
  async getOpportunityResults(
    @Body('code') code: string,
    @Body('skills') skills: [] = [],
    @Query('offset') offset: string = "0"
  ): Promise<OpportunitySearchApiResponse>{
    return await this.searchService?.getOpportunitySearchResults(offset, {
      code,
      skills,
    })
  }

  
}
