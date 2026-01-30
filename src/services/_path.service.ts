export const API_PATH = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  
    return {
      login: `${supabaseUrl}/auth/v1/token`,
      widget: {
        topPerson: `${supabaseUrl}/rest/v1/conversation_topPerson?select=*`
      }
    }
}