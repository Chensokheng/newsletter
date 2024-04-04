import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
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
