import { Injectable } from '@nestjs/common';
import { CreateOwner } from './dto/owners.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OwnersService {
    constructor(private prisma: PrismaService) {}

    async createOwner(data: CreateOwner) {
       const owner = await this.prisma.owners.create({
           data,
       });
       return owner;
    }
}

