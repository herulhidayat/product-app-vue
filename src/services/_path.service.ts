export const API_PATH = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  
    return {
      login: `${supabaseUrl}/auth/v1/token`,
    }
}