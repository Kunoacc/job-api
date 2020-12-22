import { HttpService, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { OpportunityApiResponse } from 'src/interface/opportunity-api.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { AxiosResponse, AxiosError } from 'axios'
import { Opportunity, Prisma } from '@prisma/client';
import { CreateOpportunity } from './dto/create-opportunity.dto';

@Injectable()
export class OpportunityService {

  constructor (private http: HttpService, private prsima: PrismaService) { }

  async getOppurtunity(id: string): Promise<OpportunityApiResponse> {
    try {
      const data: AxiosResponse<OpportunityApiResponse> = await this.http.get<OpportunityApiResponse>(id).toPromise()
      return data?.data
    } catch(error) {
      throw new NotFoundException({
        status: (error as AxiosError)?.response?.status,
        error: (error as AxiosError)?.response?.data?.message || 'Opportunity not found'
      })
    }
  }

  async createOpportunity(opportunity: OpportunityApiResponse): Promise<Opportunity> {
    try {
      return this.prsima.opportunity.create({
        data: CreateOpportunity.generateFromApi(opportunity)
      })
    } catch (error) {
      Logger.verbose(error)
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops, something went wrong.'
      })
    }
  }

  async retrieveOppurtunity(data: Prisma.OpportunityWhereUniqueInput): Promise<Opportunity>{
    try {
      return this.prsima.opportunity.findFirst({
        where: data,
        include: {
          company: {
            include: {
              profile: {},
              people: {}
            }
          },
          poster: {},
          skills: {}
        }
      })
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops, Something went wrong'
      })
    }
  }
}
