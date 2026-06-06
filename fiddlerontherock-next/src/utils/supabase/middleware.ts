import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake can write user sessions to
  // the wrong response headers.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If request is for /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith("/admin") && request.nextUrl.pathname !== "/admin/login") {
    if (!user) {
      // Not logged in
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }

    // Optional: Check if they are in public.admin_profiles
    // Note: We can fetch this using the service role key or the current user's session if RLS permits.
    // In our migration, "admin manage profiles" policy uses public.is_booking_admin(), which checks public.admin_profiles where id = auth.uid().
    // So the authenticated user can query their own status or check if profile exists. Let's run a query to verify they are an admin.
    const { data: profile, error } = await supabase
      .from("admin_profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (error || !profile || profile.role !== "admin") {
      // User is authenticated but NOT an admin, redirect or sign out
      await supabase.auth.signOut();
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("error", "unauthorized");
      const redirectResponse = NextResponse.redirect(url);
      // Clear cookies
      redirectResponse.cookies.delete("sb-" + new URL(process.env.NEXT_PUBLIC_SUPABASE_URL!).hostname.split(".")[0] + "-auth-token");
      return redirectResponse;
    }
  }

  return supabaseResponse;
}
