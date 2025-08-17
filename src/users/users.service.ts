import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const user = await this.prisma.owners.create({
                data: {
                    id: crypto.randomUUID(), // Generar un UUID para el nuevo usuario
                    display_name: createUserDto.display_name,
                    avatar_url: createUserDto.avatar_url,
                    bio: createUserDto.bio,
                    location: createUserDto.location,
                    phone_number: createUserDto.phone_number,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            });
            
            return {
                success: true,
                data: user,
                message: 'Usuario creado exitosamente'
            };
        } catch (error) {
            return {
                success: false,
                error: error.message,
                message: 'Error al crear el usuario'
            };
        }
    }
}