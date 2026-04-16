import { createServerSideClient } from "./supabase-server"
import { ADMIN_EMAIL } from "./auth-constants"

export async function getUser() {
  const supabase = await createServerSideClient()
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    return user
  } catch (error) {
    return null
  }
}

export { ADMIN_EMAIL }
