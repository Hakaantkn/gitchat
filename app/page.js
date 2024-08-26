
import React from "react";
import ChatHeader from "@/components/ChatHeader";
import { supabaseServer } from "@/lib/supabase/server";
import InitUser from "@/lib/store/initUser";

export default async function Page() {
  const supabase = supabaseServer();
  let data = null;  

  try {
    const sessionData = await supabase.auth.getSession();
    if (sessionData.error) {
      throw new Error(sessionData.error.message);
    }
    data = sessionData.data;
    console.log(data);
  } catch (error) {
    console.error('Error fetching session:', error);
  }

  return (
    <>
        <div className="max-w-3xl mx-auto md:py-10 h-screen">
      <div className="h-full border rounded-md">
        <ChatHeader user={data?.session?.user} /> 
      </div>
    </div>
    <InitUser user={data.session?.user}/>
    </>

  );
}
