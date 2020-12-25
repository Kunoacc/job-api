import { ConflictException, HttpStatus, Logger } from '@nestjs/common';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ComparePeople } from 'src/interface/compare-api.interface';
import { CompareService } from './compare.service';

@Controller('compare')
export class CompareController {

  private static logger = new Logger(CompareController.name)

  constructor (private compareService: CompareService) { }

  @Get('/people/:person_1/:person_2')
  async comparePeople(
    @Param('person_1') person1: string, 
    @Param('person_2') person2: string,
    @Query('skills') skills?: []): Promise<ComparePeople> {

    try {
      const comparedResult = await this.compareService.comparePeople(person1, person2, skills)
      return comparedResult
    } catch (error) {
      Logger.verbose(error)
      throw new ConflictException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Whoops, something went wrong. Please try again'
      })
    }
  }

}
