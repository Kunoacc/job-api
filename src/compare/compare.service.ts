import { Injectable, Logger } from '@nestjs/common';
import { Person } from '@prisma/client';
import { ComparePeople } from 'src/interface/compare-api.interface';
import { PersonApiResponse } from 'src/interface/person-api.interface';
import { OpportunityService } from 'src/opportunity/opportunity.service';
import { PersonService } from 'src/person/person.service';
import { CreatePersonComparison } from './dto/create-person-comparison.dto';

@Injectable()
export class CompareService {

  constructor (private person: PersonService) {}

  async comparePeople(first_id: string, second_id: string, skills: [] = []): Promise<ComparePeople> {
    const firstUser: PersonApiResponse = await this.person.getPerson(first_id);
    let firstUserLocal: Person = await this.person.retrievePerson({
      username: first_id
    })

    if (!firstUserLocal) {
      await this.person.createPerson(
        firstUser
      )
      firstUserLocal = await this.person.retrievePerson({
        username: first_id
      })
    }

    const firstUserCompared = this.buildComparedUser(firstUser, firstUserLocal, skills)
    
    
    const secondUser: PersonApiResponse = await this.person.getPerson(second_id)
    let secondUserLocal: Person = await this.person.retrievePerson({
      username: second_id
    })

    if (!secondUserLocal) {
      await this.person.createPerson(
        secondUser
      )
      secondUserLocal = await this.person.retrievePerson({
        username: second_id
      })
    }

    const secondCompared = this.buildComparedUser(secondUser, secondUserLocal, skills)

    const preferred = firstUserCompared.confidenceScore - secondCompared.confidenceScore > 0 ? 1 : 2 

    return {
      compared: {
        "1" : firstUserCompared,
        "2": secondCompared
      },
      preferredIndex: preferred
     } as ComparePeople

  }

  // @tslint-disable
  private buildComparedUser(user: PersonApiResponse, userLocal: Person, skills: []): CreatePersonComparison{
    const firstName = user.person.name.split(' ')[0]
    const comparedUser = CreatePersonComparison.generateFromApi(userLocal)
    comparedUser.confidenceScore = user.strengths.filter(x => skills.includes(x?.name as never)).length + user.person.weight
    const employmentDates = user.jobs.map(job => ([job.fromMonth && job.fromYear ? new Date(`${job.fromMonth}, ${job.fromYear}`) : false, job.toMonth && job.toYear ? new Date(`${job.toMonth}, ${job.toYear}`) : new Date()]))
    const employmentTimeStamps = employmentDates?.flat().filter(Boolean).sort((a: any, b: any) => a - b)
    const earliestEmployment = employmentTimeStamps?.[0]
    const mostRecentEmployment = employmentTimeStamps?.[employmentTimeStamps?.length - 1]
    let careerLifeSpan = (mostRecentEmployment as unknown as Date)?.getFullYear() - (earliestEmployment as unknown as Date)?.getFullYear()

    comparedUser.employmentDuration = (`${firstName} has had total career lifespan of ${careerLifeSpan} years and worked at over, ${employmentDates.length} firms during the period.` )
    comparedUser.topFiveSkills = user.strengths.sort((a, b) => b.weight - a.weight).slice(0, 5)
    comparedUser.skillsBreakdown = skills.length > 0 ? 
      user.strengths.filter(x => skills.includes(x?.name as never)).length > 0 ? `${firstName} has ${user.strengths.filter(x => skills.includes(x?.name as never)).length} of your selected skills!`
        : `${firstName} does not have any of your selected strengths as skills` : `You didn't select any skills so you can't get skill insights`
    comparedUser.numberOfOpportunities = `${firstName} has been involved in ${user.experiences.length} projects/jobs and volunteer expeirneces`
    return comparedUser;
  }

}
