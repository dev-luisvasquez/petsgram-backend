
export class CreateOwner {
    id: string;
    supabase_id: string;
    name: string;
    last_name: string;
    birth_date: Date | null;
    email: string;
    avatar_url: string | null;
    created_at: Date | null;
}

export class SupabaseUser {
    email: string;
    password: string;
}

