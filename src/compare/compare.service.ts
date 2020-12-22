import { Injectable } from '@nestjs/common';
import { Person } from '@prisma/client';
import { ComparePeople } from 'src/interface/compare-api.interface';
import { PersonApiResponse } from 'src/interface/person-api.interface';
import { OpportunityService } from 'src/opportunity/opportunity.service';
import { PersonService } from 'src/person/person.service';
import { CreatePersonComparison } from './dto/create-person-comparison.dto';
import * as dayjs from 'dayjs';

@Injectable()
export class CompareService {

  constructor (private opportunity: OpportunityService, private person: PersonService) {}

  async comparePeople(first_id: string, second_id: string, skills: [] = []): Promise<ComparePeople> {
    const firstUser: PersonApiResponse = await this.person.getPerson(first_id);
    const firstUserLocal: Person = await this.person.retrievePerson({
      username: first_id
    })

    if (!firstUserLocal) {
      await this.person.createPerson(
        firstUser
      )
      this.comparePeople(first_id, second_id)
    }

    const firstUserCompared = this.buildComparedUser(firstUser, firstUserLocal, skills)
    
    
    const secondUser: PersonApiResponse = await this.person.getPerson(second_id)
    const secondUserLocal: Person = await this.person.retrievePerson({
      username: first_id
    })

    if (!secondUserLocal) {
      await this.person.createPerson(
        secondUser
      )
      this.comparePeople(first_id, second_id)
    }

    const secondCompared = this.buildComparedUser(secondUser, secondUserLocal, skills)

    const preferred = firstUserCompared.confidenceScore - secondCompared.confidenceScore > 0 ? 1 : 0 

    return {
      compared: {
        "1" : firstUserCompared,
        "2": secondCompared
      },
      preferredIndex: preferred
     } as ComparePeople

  }

  private buildComparedUser(user: PersonApiResponse, userLocal: Person, skills: []): CreatePersonComparison{
    const firstName = user.person.name.split(' ')[0]
    const comparedUser = CreatePersonComparison.generateFromApi(userLocal)
    comparedUser.confidenceScore = user.strengths.filter(x => skills.includes(x?.name as never)).length + user.person.weight
    const employmentDates = user.jobs.map(job => ([job.fromMonth && job.fromYear ? Date.parse(`${job.fromMonth}, ${job.fromYear}}`) : false, job.toMonth && job.toYear ? Date.parse(`${job.toMonth}, ${job.toYear}`) : Date.now()]))
    const employmentTimeStamps = employmentDates?.flat().filter(Boolean).sort((a: any, b: any) => b - a)
    const earliestEmployment = employmentTimeStamps[0]
    const mostRecentEmployment = employmentTimeStamps?.[employmentTimeStamps?.length - 1]
    let careerLifeSpan: any = dayjs(earliestEmployment)
    careerLifeSpan = careerLifeSpan.diff(mostRecentEmployment, 'year')

    comparedUser.employmentDuration = (`${firstName} has had total career lifespan of ${careerLifeSpan} years and worked at over, ${employmentDates.length} firms during the period.` )
    comparedUser.topFiveSkills = user.strengths.sort((a, b) => b.weight - a.weight).slice(0, 5)
    comparedUser.skillsBreakdown = skills.length > 0 ? `${firstName} has ${user.strengths.filter(x => skills.includes(x?.name as never))} of your selected skills!` : `You didn't select any skills so you can't get skill insights`
    comparedUser.numberOfOpportunities = `${firstName} has been involved in ${user.experiences.length} projects/jobs and volunteer expeirneces`
    return comparedUser;
  }

}
