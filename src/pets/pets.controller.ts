import { Controller, UseGuards } from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePet } from './dto/pets.dto';
import { Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { SupabaseAuthMiddleware } from '../middleware/supabase-auth.middleware';

@Controller('pets')
@UseGuards(SupabaseAuthMiddleware)
export class PetsController {

    constructor(private readonly petsService: PetsService) { }

    @Post('/')
    async createPet(@Body() createPetDto: CreatePet) {
        return this.petsService.createPet(createPetDto);
    }

    @Get('/owner/:ownerId')
    async getPetsByOwner(@Param('ownerId') ownerId: string) {
        return this.petsService.getPetsByOwner(ownerId);
    }

    @Get('/:id')
    async getPetInfo(@Param('id') id: string) {
        return this.petsService.getPetInfo(id);
    }

    @Patch('/:id')
    async updatePetInfo(@Param('id') id: string, @Body() updateData: { name?: string; type?: string; breed?: string; age?: number; bio?: string; avatar_url?: string }) {
        return this.petsService.updatePetInfo(id, updateData);
    }

    @Delete('/:id')
    async removePet(@Param('id') id: string) {
        return this.petsService.removePet(id);
    }
}
