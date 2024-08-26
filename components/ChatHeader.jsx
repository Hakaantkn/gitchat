'use client'; // Bu satır, bileşeni bir istemci bileşeni olarak işaretler
import React from 'react';
import { Button } from '@/components/ui/button';
import { supabaseBrowser } from '@/lib/supabase/browser';
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation'; // Doğru import path'i kontrol edin

export default function ChatHeader({ user }) {
    const router = useRouter(); // useRouter'ı doğrudan kullanabilirsiniz

    if (user && typeof user === 'object') {
        console.log('oldu');
    } else {
        console.log('olmadı');
    }

    const handleLoginGithub = () => {
        const supabase = supabaseBrowser();
        supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: Location.origin + "/auth/callback"
            }
        });
    };

    const handleLogout = async () => {
        const supabase = supabaseBrowser();
        await supabase.auth.signOut();
        router.refresh(); // useRouter hook'u ile router işlemlerini kullanabilirsiniz
    };

    return (
        <div className="max-w-3xl mx-auto md:py-10 h-screen">
            <div className="h-full border rounded-md">
                <div className="h-20">
                    <div className="p-5 border-b flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold">Daily Chat</h1>
                            <div className="flex items-center gap-1">
                                <div className="h-4 w-4 bg-green-500 rounded-full animate-pulse"></div>
                                <h1 className="text-sm text-gray-400">
                                    2 onlines
                                </h1>
                            </div>
                        </div>
                        {user ? (
                            <Button onClick={handleLogout}>Logout</Button>
                        ) : (
                            <Button onClick={handleLoginGithub}>Login</Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
