import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";

const supabaseAdmin = createClient<Database>(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SERVICE_ROLE!,
	{
		auth: {
			autoRefreshToken: false,
			persistSession: false,
		},
	}
);

export default supabaseAdmin;
