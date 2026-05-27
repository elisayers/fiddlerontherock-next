import { NextResponse } from "next/server";
import { supabaseConfigured, supabaseRpc } from "@/lib/booking/supabase";

export async function POST() {
  if (!supabaseConfigured()) return NextResponse.json({ released: 0, demo: true, note: "Supabase is not configured." });
  const released = await supabaseRpc<number>("release_expired_holds", {});
  return NextResponse.json({ released, demo: false });
}
