import { HttpService, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { AxiosResponse, AxiosError } from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import { PersonApiResponse } from '../interface/person-api.interface'
import { CreatePerson } from './dto/create-person.dto'
import { Person, Prisma } from '@prisma/client'

@Injectable()
export class PersonService {

  constructor (private http: HttpService, private prisma: PrismaService) {  }

  async getPerson(id: string): Promise<PersonApiResponse> {
    try {
      const data: AxiosResponse<PersonApiResponse> = await this.http.get<PersonApiResponse>(`${id}`).toPromise()
      return data?.data
    } catch (error) {
      throw new NotFoundException({
        status: (error as AxiosError)?.response?.status,
        error: (error as AxiosError)?.response?.data.message
      })
    }
  }

  async createPerson(person: PersonApiResponse): Promise<Person> {
    try {
      return this.prisma.person.create({
        data: CreatePerson.generateFromApi(person)
      })
    } catch (error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops, something went wrong'
      })
    }
  }

  async retrievePerson(data: Prisma.PersonWhereUniqueInput): Promise<Person>{
    try {
      return this.prisma.person.findFirst({
        where: data
      })
    } catch(error) {
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: error?.message || 'Oops. Something went wrong'
      })
    }
  }
}
