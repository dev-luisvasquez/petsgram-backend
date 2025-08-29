import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { CreatePet } from './dto/pets.dto';

@Injectable()
export class PetsService {

    constructor(private prisma: PrismaService) { }

    async createPet(data: CreatePet) {
        return this.prisma.pets.create({
            data: {
                id: uuidv4(),
                owner_id: data.owner_id,
                name: data.name ?? '',
                type: data.type ?? '',
                breed: data.breed ?? '',
                age: data.age ?? 0,
                bio: data.bio ?? '',
                avatar_url: data.avatar_url ?? '',
                created_at: data.created_at ?? new Date()
            }
        });
    }

    async findAllPets() {
        return this.prisma.pets.findMany();
    }

    async findPetById(id: string) {
        return this.prisma.pets.findUnique({
            where: { id }
        });
    }

    async updatePet(id: string, data: any) {
        return this.prisma.pets.update({
            where: { id },
            data
        });
    }

    async deletePet(id: string) {
        return this.prisma.pets.delete({
            where: { id }
        });
    }

    async getPetsByOwner(ownerId: string) {
        return this.prisma.pets.findMany({
            where: { owner_id: ownerId }
        });
    }

    async updatePetInfo(id: string, data: { name?: string; type?: string; breed?: string; age?: number; bio?: string; avatar_url?: string }) {
        return this.prisma.pets.update({
            where: { id },
            data
        });
    }

    async removePet(id: string) {
        return this.prisma.pets.delete({
            where: { id }
        });
    }

    async getPetInfo(id: string) {
        return this.prisma.pets.findUnique({
            where: { id }
        });
    }
}
