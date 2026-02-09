export const API_PATH = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  
    return {
      login: `${supabaseUrl}/auth/v1/token`,
      widget: {
        topPerson: `${supabaseUrl}/rest/v1/conversation_topPerson?select=*`,
        exposure: `${supabaseUrl}/rest/v1/conversation_exposure?select=*`,
        sentiment: `${supabaseUrl}/rest/v1/conversation_sentiment?select=*`,
        topicLocation: `${supabaseUrl}/rest/v1/conversation_topicLocation?select=*`,
      }
    }
}