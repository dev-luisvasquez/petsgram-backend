export class CreatePost {
    id: string;
    pet_id: string;
    owner_id: string; // Relación con el modelo owners
    caption: string | null;
    media_url: string[];
    like_count: number | null;
    comment_count: number | null;
    is_hidden: boolean | null;
    created_at: Date | null;
}