import React, { useState, useEffect } from 'react';
import { FaLayerGroup, FaRegClock, FaTint, FaGripLines, FaCube, FaCheck } from 'react-icons/fa';
import api from '../api';

const WeavingProcessPage = () => {
    const [processSettings, setProcessSettings] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchSettings = async () => {
            try {
                const response = await api.get('/settings/process_page');
                if (response.data) {
                    const data = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                    setProcessSettings(data);
                }
            } catch (error) {
                console.error("Failed to load process settings", error);
            }
        };
        fetchSettings();
    }, []);

    const defaultSteps = [
        { title: "Design & Planning", desc: "The journey begins with conceptualizing the design. Our master weavers sketch traditional Ikat patterns, ensuring each motif carries forward centuries of heritage.", icon: <FaLayerGroup size={24} style={{ color: 'var(--color-maroon)' }} /> },
        { title: "Yarn Preparation", desc: "High-quality silk or cotton yarns are carefully selected and prepared. The yarns are then wound onto bobbins, ready for the intricate dyeing process.", icon: <FaRegClock size={24} style={{ color: 'var(--color-maroon)' }} /> },
        { title: "Resist Dyeing (Ikat Technique)", desc: "This is the heart of Ikat weaving. Sections of yarn are tightly bound with threads before dyeing, creating resist patterns. The process is repeated multiple times with different colors to achieve the desired design.", icon: <FaTint size={24} style={{ color: 'var(--color-maroon)' }} /> },
        { title: "Warping & Setting Up the Loom", desc: "The dyed yarns are carefully arranged on the loom as warp threads. This requires immense skill and precision, as the alignment determines the final pattern quality.", icon: <FaGripLines size={24} style={{ color: 'var(--color-maroon)' }} /> },
        { title: "Hand Weaving", desc: "The actual weaving begins. Our skilled artisans work on traditional handlooms, carefully interlacing the weft threads with the warp. Each pass of the shuttle is deliberate and precise.", icon: <FaCube size={24} style={{ color: 'var(--color-maroon)' }} /> },
        { title: "Finishing & Quality Check", desc: "Once weaving is complete, the fabric undergoes careful finishing. Edges are hemmed, and each piece is thoroughly inspected to ensure it meets our exacting standards of quality and authenticity.", icon: <FaCheck size={24} style={{ color: 'var(--color-maroon)' }} /> }
    ];

    const defaultTimeline = [
        { year: '1995', title: 'Foundation', desc: 'Started working directly with master weavers in Pochampally' },
        { year: '2005', title: 'Recognition', desc: 'Received recognition for preserving traditional Ikat techniques' },
        { year: '2015', title: 'Expansion', desc: 'Expanded to serve customers across India' },
        { year: '2025', title: 'Today', desc: 'Continuing to preserve and promote authentic Pochampally Ikat' }
    ];

    const defaultArtisanImg = "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800";

    const defaultIntro = {
        p1: "Pochampally Ikat is more than just a fabric—it's a living art form that has been passed down through generations. The name \"Ikat\" comes from the Malay-Indonesian word \"mengikat,\" meaning \"to tie\" or \"to bind,\" referring to the resist-dyeing technique that creates these distinctive patterns.",
        p2: "Each piece takes weeks, sometimes months, to complete. From the initial design to the final thread, every step is performed by hand with meticulous attention to detail. Our weavers are not just craftspeople—they are artists preserving a heritage that dates back centuries.",
        p3: "What makes Pochampally Ikat unique is the precision required in aligning the dyed yarns during weaving. When done correctly, the patterns emerge with perfect clarity, creating geometric and floral motifs that are instantly recognizable."
    };

    const defaultArtisans = {
        p1: "Behind every saree is a master weaver who has dedicated their life to perfecting this craft. Many of our artisans come from families that have been weaving Ikat for generations, with skills passed down from parent to child.",
        p2: "We work directly with these talented craftspeople, ensuring fair compensation and supporting the continuation of this beautiful tradition. When you purchase a Pochampally Ikat piece from us, you're not just buying a saree—you're supporting an entire community of artisans and helping preserve a cultural heritage.",
        quote: "Every thread tells a story. Every pattern carries a memory. This is not just weaving—it's keeping our heritage alive.",
        quoteAuthor: "Master Weaver, Pochampally"
    };

    const intro = processSettings?.intro?.p1 ? processSettings.intro : defaultIntro;
    
    const displaySteps = defaultSteps.map((ds, i) => {
        const fetchedStep = processSettings?.steps?.[i];
        return {
            num: i + 1,
            title: fetchedStep?.title || ds.title,
            desc: fetchedStep?.desc || ds.desc,
            icon: ds.icon
        };
    });

    const displayTimeline = processSettings?.timeline?.[0]?.title 
        ? processSettings.timeline.filter(t => t.year || t.title) 
        : defaultTimeline;

    const artisanImg = processSettings?.artisans?.image || processSettings?.artisans?.images?.[0] || defaultArtisanImg;
    const artisansData = processSettings?.artisans?.p1 ? processSettings.artisans : defaultArtisans;

    return (
        <div style={{ backgroundColor: '#FAF8F5' }}>
            {/* Hero Section */}
            <section style={{ backgroundColor: 'var(--color-maroon)', padding: '100px 20px', textAlign: 'center', color: '#fff' }}>
                <h1 style={{ fontSize: '3.5rem', color: '#fff', marginBottom: '15px', fontFamily: 'var(--font-serif)', fontWeight: 'normal' }}>Our Weaving Process</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.9 }}>The Art of Pochampally Ikat</p>
            </section>

            {/* Intro Section */}
            <section style={{ backgroundColor: '#fff', padding: '80px 20px' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--color-maroon)', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 'normal' }}>
                        A Timeless Tradition
                    </h2>
                    <hr style={{ width: '80px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 0 40px 0' }} />
                    
                    <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '25px' }}>{intro.p1}</p>
                    <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8', marginBottom: '25px' }}>{intro.p2}</p>
                    <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: '1.8' }}>{intro.p3}</p>
                </div>
            </section>

            {/* Timeline Section */}
            <section style={{ padding: '80px 20px', backgroundColor: '#FAF8F5' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-maroon)', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 'normal' }}>
                            The Journey of Each Thread
                        </h2>
                        <hr style={{ width: '60px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 auto' }} />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {displaySteps.map((step, index) => (
                            <div key={index} style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '40px', display: 'flex', gap: '40px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'var(--color-maroon)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)', flexShrink: 0 }}>
                                    {step.num}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ marginBottom: '15px' }}>{step.icon}</div>
                                    <h3 style={{ fontSize: '1.6rem', color: '#333', marginBottom: '15px', fontFamily: 'var(--font-serif)', fontWeight: 'normal' }}>{step.title}</h3>
                                    <p style={{ fontSize: '1rem', color: '#666', lineHeight: '1.7', margin: 0 }}>{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Artisans Section */}
            <section style={{ backgroundColor: '#fff', padding: '80px 20px' }}>
                <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
                        {/* Single Image Display - Left Side */}
                        <div style={{ position: 'relative' }}>
                            <img src={artisanImg} alt="Artisan" style={{ width: '100%', height: 'auto', maxHeight: '700px', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }} />
                            <div style={{ position: 'absolute', bottom: '20px', left: 0, right: 0, textAlign: 'center', color: '#fff', textShadow: '1px 1px 10px rgba(0,0,0,0.9)' }}>
                                <h5 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 'normal' }}>Authentic</h5>
                                <h4 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-serif)' }}>Pochampally Ikat</h4>
                            </div>
                        </div>

                        {/* Text - Right Side */}
                        <div>
                            <h2 style={{ fontSize: '2.8rem', color: 'var(--color-maroon)', marginBottom: '15px', fontFamily: 'var(--font-serif)', fontWeight: 'normal' }}>
                                Meet Our Artisans
                            </h2>
                            <hr style={{ width: '60px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 0 30px 0' }} />
                            
                            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '20px' }}>{artisansData.p1}</p>
                            <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.8', marginBottom: '40px' }}>{artisansData.p2}</p>

                            <div style={{ backgroundColor: '#FDFBF7', padding: '30px', borderLeft: '4px solid var(--color-maroon)', borderRadius: '4px' }}>
                                <p style={{ fontSize: '1.15rem', color: '#333', fontStyle: 'italic', lineHeight: '1.6', marginBottom: '15px' }}>"{artisansData.quote}"</p>
                                <p style={{ fontSize: '1rem', color: '#777', margin: 0 }}>— {artisansData.quoteAuthor}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* History Timeline Section */}
            <section style={{ backgroundColor: '#FAF8F5', padding: '60px 20px' }}>
                <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '2.5rem', color: 'var(--color-maroon)', marginBottom: '10px', fontFamily: 'var(--font-serif)', fontWeight: 'normal' }}>
                            Our Heritage
                        </h2>
                        <hr style={{ width: '60px', borderTop: '2px solid var(--color-gold)', borderBottom: 'none', borderLeft: 'none', borderRight: 'none', margin: '0 auto' }} />
                    </div>

                    <div style={{ paddingLeft: '20px', position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ position: 'absolute', left: '29px', top: '10px', bottom: '20px', width: '2px', backgroundColor: 'var(--color-maroon)' }}></div>
                        
                        {displayTimeline.map((item, index) => (
                            <div key={index} style={{ position: 'relative', marginBottom: index !== displayTimeline.length - 1 ? '50px' : '0', paddingLeft: '50px' }}>
                                <div style={{ position: 'absolute', left: '0', top: '5px', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'var(--color-maroon)', border: '4px solid #FAF8F5', boxShadow: '0 0 0 2px var(--color-maroon)' }}></div>
                                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-maroon)', fontFamily: 'var(--font-serif)', margin: '0 0 10px 0', fontWeight: 'bold' }}>{item.year}</h3>
                                <h4 style={{ fontSize: '1.2rem', color: '#333', fontFamily: 'var(--font-serif)', margin: '0 0 5px 0', fontWeight: '600' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.95rem', color: '#666', margin: 0 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WeavingProcessPage;
