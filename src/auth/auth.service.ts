import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  private supabase;

  constructor() {
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_KEY;

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      throw new Error('Supabase URL and Key must be provided in environment variables');
    }

    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new Error(`Error refreshing token: ${error.message}`);
    }

    return {
      access_token: data.session?.access_token,
      refresh_token: data.session?.refresh_token,
    };
  }
}
