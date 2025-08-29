import { Controller, UseGuards } from '@nestjs/common';
import { Body, Post } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { CreateOwner, SupabaseUser } from './dto/owners.dto';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../supabase.client'; // Importa el cliente de Supabase
import { SupabaseAuthMiddleware } from '../middleware/supabase-auth.middleware';

@Controller('owners')
export class OwnersController {

    constructor(private ownersService: OwnersService) {}

    @Post('/sign-up')
    async signUpOwner(@Body() data: CreateOwner & SupabaseUser) {
        const { email, password, ...ownerData } = data;

        // Crear usuario en Supabase
        const { data: supabaseUser, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Opcional: confirma el email automáticamente
        });

        if (error) {
            throw new Error(`Error al crear el usuario en Supabase: ${error.message}`);
        }

        // Guardar el usuario en tu base de datos con el supabase_id
        const owner = {
            ...ownerData,
            id: uuidv4(),
            supabase_id: supabaseUser?.user.id, // ID generado por Supabase
            email
           
        };

        return this.ownersService.createOwner(owner);
    }

    @Post('/sign-in')
    async signInOwner(@Body() data: SupabaseUser) {
        const { email, password } = data;

        // Autenticar usuario en Supabase
        const { data: { session, user }, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw new Error(`Error al iniciar sesión en Supabase: ${error.message}`);
        }

        // Retornar el usuario y el token de sesión
        return { user, token: session?.access_token };
    }

    @UseGuards(SupabaseAuthMiddleware)
    @Post('/other-route')
    async otherRoute(@Body() data: any) {
        // Aquí puedes agregar lógica para otras rutas protegidas
    }
}
