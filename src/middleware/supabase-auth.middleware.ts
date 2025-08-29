import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseAuthMiddleware implements NestMiddleware {
  private supabase;

  constructor() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase URL and Key must be provided in environment variables');
    }

    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authorization token is missing');
    }

    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    req['user'] = data.user;
    next();
  }
}
