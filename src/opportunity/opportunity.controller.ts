import { Body, ConflictException, Controller, Get, HttpStatus, Logger, NotFoundException, Param, Post } from '@nestjs/common';
import { Opportunity } from '@prisma/client';
import { OpportunityService } from './opportunity.service';

@Controller('opportunity')
export class OpportunityController {

  constructor (private opportunityService: OpportunityService) {}

  @Post()
  async createOpportunity(@Body('opportunityId') opportunityId: string): Promise<Opportunity> {
    Logger.log(opportunityId)
    const opportunity = await this.opportunityService.retrieveOppurtunity({ uid: opportunityId})
    if (opportunity) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'This opportunity has already been created'
      })
    }
    return await this.opportunityService.createOpportunity(
      await this.opportunityService.getOppurtunity(opportunityId)
    )
  }

  @Get(':id')
  async getOpportunity(@Param('id') id: string): Promise<any> {
    const result = await this.opportunityService.retrieveOppurtunity({
      uid: id
    })

    if (!result) {
      await this.opportunityService.getOppurtunity(id)
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'The opportunity has not been generated',
        data: {
          type: 'not_generated'
        }
      })
    } else {
      return result
    }
  }
}
