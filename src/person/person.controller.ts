import { Body, ConflictException, Controller, Get, HttpStatus, Logger, NotFoundException, Param, Post, Req } from '@nestjs/common';
import { Person } from '@prisma/client';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {

  constructor (private personService: PersonService) {}

  @Post()
  async createPerson(@Body('userId') userId: string): Promise<Person>{
    Logger.log(userId)
    const user = await this.personService.retrievePerson({username: userId})
    if (user) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'The user has already been created'
      })
    }
    return await this.personService.createPerson(
      await this.personService.getPerson(userId)
    )
  }

  @Get(':id')
  async getPerson(@Param('id') id: string): Promise<any>{
    
    const result = await this.personService.retrievePerson({
      username: id
    })

    if (!result) {
      await this.personService.getPerson(id)
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'The user has not been generated',
        data: {
          type: 'not_generated'
        }
      })
    } else {
      return result
    }
  }

}
