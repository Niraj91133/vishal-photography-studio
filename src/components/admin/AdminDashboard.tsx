import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImageIcon, CheckCircle, AlertCircle, LogOut, MessageSquare, Trash2, Camera, Film, Home, Plus, Layers, IndianRupee } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// 4 Focused Sections
const SECTIONS = [
    {
        id: 'hero',
        name: 'Top Website Banner',
        icon: ImageIcon,
        description: 'Hero section (Sabse upar) ki photo/video',
        categories: ['Main Banner']
    },
    {
        id: 'service_covers',
        name: 'Service Covers',
        icon: Layers,
        description: 'Photography cards ke main cover badlein',
        categories: [
            'Wedding',
            'Pre-Wedding',
            'Birthday',
            'Product',
            'Baby',
            'Videography',
            'Reels',
            'Wedding Films',
            'Editing',
            'Photo & Video Editing',
            'Album Design',
            'Custom Album',
            'Backlit Printing',
            'Portrait',
            'Commercial',
            'Cinematic Films'
        ]
    },
    {
        id: 'services',
        name: 'Gallery Showcase',
        icon: Camera,
        description: 'Showcase (Portfolio) ki photos/videos yahan se badlein',
        categories: [
            'Wedding',
            'Pre-Wedding',
            'Birthday',
            'Product',
            'Baby',
            'Videography',
            'Reels',
            'Wedding Films',
            'Editing',
            'Photo & Video Editing',
            'Album Design',
            'Custom Album',
            'Backlit Printing',
            'Portrait',
            'Commercial',
            'Cinematic Films'
        ]
    },
    {
        id: 'packages',
        name: 'Packages (Pricing)',
        icon: IndianRupee,
        description: 'Price list aur package features badlein',
        categories: ['Standard Package', 'Premium Package', 'Elite Package', 'Custom Package']
    },
    {
        id: 'testimonials',
        name: 'Client Reviews',
        icon: MessageSquare,
        description: 'Customer feedback aur unki photos',
        categories: ['Happy Client']
    }
];

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('services');
    const [uploading, setUploading] = useState(false);
    const [images, setImages] = useState<any[]>([]);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    // Form State
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('adminLoggedIn');
        if (!isLoggedIn) {
            navigate('/admin/login');
        }
        if (supabase) {
            fetchImages();
        }

        const sect = SECTIONS.find(s => s.id === activeTab);
        if (sect) setCategory(sect.categories[0]);

        setTitle('');
        setDescription('');
        setPrice('');
    }, [navigate, activeTab]);

    const fetchImages = async () => {
        if (!supabase) return;
        try {
            const { data, error } = await supabase
                .from('site_images')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!supabase || !window.confirm('Kya aap ise pakka delete karna chahte hain?')) return;

        try {
            const { error: dbError } = await supabase
                .from('site_images')
                .delete()
                .eq('id', id);

            if (dbError) throw dbError;

            setStatus({ type: 'success', message: 'Hogaya! Delete ho chuka hai.' });
            fetchImages();
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        navigate('/admin/login');
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!supabase) throw new Error('Backend connect nahi hai.');
            if (!e.target.files || e.target.files.length === 0) return;

            setUploading(true);
            setStatus(null);
            setUploadProgress(0);

            const files = Array.from(e.target.files);
            let successCount = 0;

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileExt = file.name.split('.').pop();
                const fileName = `${activeTab}-${Date.now()}-${i}.${fileExt}`;
                const filePath = `${activeTab}/${fileName}`;
                const isVideo = file.type.startsWith('video/');

                const { error: uploadError } = await supabase.storage
                    .from('photos')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('photos')
                    .getPublicUrl(filePath);

                let finalTitle = title;
                if (activeTab === 'packages') finalTitle = `${title} | ${price}`;

                const { error: dbError } = await supabase
                    .from('site_images')
                    .insert([{
                        url: publicUrl,
                        section: activeTab,
                        category: category,
                        title: finalTitle || 'Golden Moment',
                        description: description,
                        media_type: isVideo ? 'video' : 'image'
                    }]);

                if (dbError) throw dbError;

                successCount++;
                setUploadProgress(Math.round(((i + 1) / files.length) * 100));
            }

            setStatus({ type: 'success', message: `${successCount} items LIVE ho gaye!` });
            setTitle('');
            setDescription('');
            setPrice('');
            fetchImages();
        } catch (error: any) {
            setStatus({ type: 'error', message: error.message });
        } finally {
            setUploading(false);
            setUploadProgress(0);
        }
    };

    const currentSection = SECTIONS.find(s => s.id === activeTab);
    const filteredImages = images.filter(img => img.section === activeTab && img.category === category);

    return (
        <div className="min-h-screen bg-[#050505] flex text-white font-sans selection:bg-gold-500">
            <aside className="w-80 bg-[#0a0a0a] border-r border-white/5 flex flex-col sticky top-0 h-screen">
                <div className="p-8 border-b border-white/5 text-center">
                    <h2 className="text-xl font-serif font-black tracking-tight text-white mb-1">Golden Shutter</h2>
                    <p className="text-[10px] text-gold-500 uppercase font-black tracking-[0.2em]">Dashboard Panel</p>
                </div>

                <div className="p-6">
                    <nav className="space-y-3">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveTab(section.id)}
                                className={`w-full group flex flex-col gap-1 p-5 rounded-[2rem] transition-all duration-300 border ${activeTab === section.id
                                    ? 'bg-gold-600 border-gold-600 text-black shadow-lg shadow-gold-600/10'
                                    : 'bg-white/5 border-transparent text-gray-500 hover:border-white/10 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <section.icon className={`w-5 h-5 ${activeTab === section.id ? 'text-black' : 'group-hover:text-gold-500'}`} />
                                    <span className="font-black text-xs uppercase tracking-widest">{section.name}</span>
                                </div>
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-6 space-y-3">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-[1.5rem] text-gold-500 bg-gold-600/5 hover:bg-gold-600/10 transition-all border border-gold-600/20 font-black text-[10px] uppercase tracking-widest"
                    >
                        <Home className="w-4 h-4" />
                        Live Website Dekhein
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-[1.5rem] text-gray-600 hover:text-red-500 transition-all font-black text-[10px] uppercase tracking-widest"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <header className="h-28 bg-[#0a0a0a] border-b border-white/5 px-12 flex items-center justify-between sticky top-0 z-50">
                    <div>
                        <h1 className="text-3xl font-serif font-black text-white uppercase">{currentSection?.name}</h1>
                        <p className="text-[11px] text-gray-400 mt-1 uppercase font-bold tracking-widest">{currentSection?.description}</p>
                    </div>
                </header>

                <div className="p-12 max-w-7xl mx-auto space-y-16">
                    <section className="bg-[#0f0f0f] rounded-[3rem] border border-white/10 p-12 shadow-2xl">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] text-gold-500 font-black uppercase tracking-[0.2em]">Step 1: Category Chunein:</label>
                                    <div className="flex flex-wrap gap-2">
                                        {currentSection?.categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setCategory(cat)}
                                                className={`px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border-2 ${category === cat
                                                    ? 'bg-gold-600 border-gold-600 text-black shadow-md'
                                                    : 'bg-black border-white/5 text-gray-500 hover:border-gold-600/40'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="text-[10px] text-gold-500 font-black uppercase tracking-[0.2em]">Step 2: Details Bhariye:</label>
                                    <div className="space-y-4">
                                        <input
                                            type="text"
                                            placeholder={activeTab === 'testimonials' ? "Client Name" : "Title / Name"}
                                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-gold-600 transition-all text-sm font-bold placeholder:text-gray-800"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        {activeTab === 'packages' && (
                                            <input
                                                type="text"
                                                placeholder="Price (Jaise: ₹50,000 - ₹80,000)"
                                                className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-gold-600 transition-all text-sm font-bold text-gold-500 placeholder:text-gold-900/50"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                            />
                                        )}
                                        <textarea
                                            rows={activeTab === 'packages' ? 6 : 4}
                                            placeholder={
                                                activeTab === 'testimonials' ? "Customer Review Message..." :
                                                    activeTab === 'packages' ? "Har line me 1 feature likhein:\n- Unlimited Photos\n- 4K Video Editing\n- Album Included" :
                                                        "Kuch detail likhna ho toh (Optional)..."
                                            }
                                            className="w-full bg-black border border-white/5 rounded-2xl px-6 py-5 focus:outline-none focus:border-gold-600 transition-all text-sm resize-none font-bold placeholder:text-gray-800"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] text-gold-500 font-black uppercase tracking-[0.2em]">Step 3: Upload Karein (Select Multiple):</label>
                                <div className="relative group h-full max-h-[400px]">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleUpload}
                                        disabled={uploading}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        accept="image/*,video/*"
                                    />
                                    <div className={`h-full min-h-[300px] border-4 border-dashed rounded-[3rem] flex flex-col items-center justify-center p-12 transition-all duration-500 ${uploading
                                        ? 'border-gold-600 bg-gold-600/10'
                                        : 'border-white/5 bg-black group-hover:border-gold-600 group-hover:bg-gold-800/10'
                                        }`}>
                                        {uploading ? (
                                            <div className="text-center">
                                                <div className="w-20 h-20 rounded-full border-4 border-gold-600 border-t-transparent animate-spin mx-auto mb-6"></div>
                                                <span className="text-lg font-black text-gold-600 uppercase tracking-widest">{uploadProgress}% Live Hogaya</span>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-6 group-hover:bg-gold-600 transition-all duration-500">
                                                    <Plus className="w-12 h-12 text-gold-500 group-hover:text-black" />
                                                </div>
                                                <span className="text-xl font-black uppercase tracking-wider">Select Files</span>
                                                <p className="text-[11px] text-gray-600 font-black uppercase mt-2">1 ya usse zyada photos/videos</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {status && (
                                    <div className={`p-6 rounded-2xl border-2 text-xs font-black uppercase tracking-widest flex items-center gap-4 animate-in zoom-in-95 duration-500 ${status.type === 'success' ? 'bg-green-600/10 border-green-600/30 text-green-500' : 'bg-red-600/10 border-red-600/30 text-red-500'
                                        }`}>
                                        {status.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                                        {status.message}
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>

                    <section className="space-y-12 pb-32">
                        <div className="flex items-center justify-between border-b border-white/5 pb-8">
                            <div>
                                <h2 className="text-3xl font-serif font-black text-white flex items-center gap-4 uppercase">
                                    <Layers className="w-8 h-8 text-gold-500" />
                                    {category} me kya Live hai:
                                </h2>
                                <p className="text-xs text-gray-500 font-bold mt-1">Upar category badal kar dusri photos dekh sakte hain</p>
                            </div>
                            <div className="bg-gold-600/10 border border-gold-600/30 text-gold-500 px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest">
                                Total: {filteredImages.length}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {filteredImages.map((img) => (
                                <div key={img.id} className="group relative rounded-[2.5rem] overflow-hidden bg-[#0a0a0a] border border-white/5 hover:border-gold-600/30 transition-all">
                                    <div className="aspect-[4/5] relative bg-black">
                                        {img.media_type === 'video' ? (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <video src={img.url} className="absolute inset-0 w-full h-full object-cover opacity-60" muted />
                                                <Film className="w-12 h-12 text-gold-500/20 relative z-10" />
                                            </div>
                                        ) : (
                                            <img src={img.url} className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110" />
                                        )}
                                    </div>
                                    <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/60 translate-y-4 group-hover:translate-y-0">
                                        <button
                                            onClick={() => handleDelete(img.id)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-[1.5rem] flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                            Hataein
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {filteredImages.length === 0 && (
                                <div className="col-span-full py-40 text-center border-4 border-dashed border-white/5 rounded-[3rem]">
                                    <p className="text-gray-800 font-black uppercase tracking-[0.4em] text-sm italic">Khali hai! Is category me kuch dalein.</p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
