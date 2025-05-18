import { supabase } from "./supabaseClient";

export const fetchDailyActivities = async (userId: string) => {
  const { data, error } = await supabase
    .from("daily_activities")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching daily activities:", error);
    throw error;
  }

  return data;
};

export const addDailyActivity = async (userId: string, date: string, activityType: string, isCompleted: boolean) => {
  const { data, error } = await supabase.from("daily_activities").insert([
    {
      user_id: userId,
      date,
      activity_type: activityType,
      is_completed: isCompleted,
    },
  ]);

  if (error) {
    console.error("Error adding daily activity:", error);
    throw error;
  }

  return data;
};