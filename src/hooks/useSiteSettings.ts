import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface SiteSettings {
    admin_id?: string;
    admin_password?: string;
    phone?: string;
    email?: string;
    facebook_link?: string;
    instagram_link?: string;
    disabled_sections: string[];
}

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings>({
        phone: '8809295961',
        email: 'goldenshutter@gmail.com',
        facebook_link: '#',
        instagram_link: '#',
        disabled_sections: []
    });

    useEffect(() => {
        async function fetchSettings() {
            if (!supabase) return;
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .eq('id', 1)
                    .maybeSingle();

                if (data && !error) {
                    setSettings(data);
                }
            } catch (err) {
                console.warn('Could not fetch site settings');
            }
        }
        fetchSettings();
    }, []);

    return settings;
}
