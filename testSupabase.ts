import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Загружаем переменные окружения
dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or anon key is missing!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
  try {
    console.log("=== TEST Supabase ===");

    const { data: movies, error: moviesError } = await supabase
      .from("movies")
      .select("*");
    if (moviesError) throw moviesError;
    console.log("Movies:", movies);

    const { data: sessions, error: sessionsError } = await supabase
      .from("sessions")
      .select("*");
    if (sessionsError) throw sessionsError;
    console.log("Sessions:", sessions);

    const { data: orders, error: ordersError } = await supabase
      .from("orders")
      .select("*");
    if (ordersError) throw ordersError;
    console.log("Orders:", orders);

    console.log("=== SUCCESS ===");
  } catch (err) {
    console.error("Supabase test error:", err);
  }
}

testSupabase();
