
/**
 * Profile type definition that matches the Supabase profiles table
 */
export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  password: string | null;
  wellness_score: number | null;
  birth_date: string | null;
  weight: string | null;
  height: string | null;
  career: string | null;
  hobbies: string | null;
  interests: string | null;
  bio: string | null;
};
