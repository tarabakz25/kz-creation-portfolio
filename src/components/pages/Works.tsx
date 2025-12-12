import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';

interface WorkData {
  name: string;
  url: string;
  image: string;
  tags: string[];
}

const Works: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [works, setWorks] = useState<WorkData[]>([]);

  useEffect(() => {
    const loadWorks = async () => {
      const workModules = import.meta.glob<{ default: Omit<WorkData, 'image'> & { image: string } }>('/src/content/works/*.json', { eager: true });
      
      const imageModules = import.meta.glob<{ default: ImageMetadata }>('/src/assets/content/works/*.{png,jpg,jpeg,svg,webp}', { eager: true });

      const loadedWorks = Object.values(workModules).map((mod) => {
        const data = mod.default;
        
        const imageName = data.image.split('/').pop();
        const imagePath = Object.keys(imageModules).find(key => key.endsWith(`/${imageName}`));
        const imageSrc = imagePath ? imageModules[imagePath].default.src : '';

        return {
          ...data,
          image: imageSrc
        };
      });

      setWorks(loadedWorks);
    };

    loadWorks();
  }, []);

  useEffect(() => {
    if (works.length === 0 || !containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.work-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [works]);

  return (
    <div ref={containerRef} className="flex flex-col w-full h-full overflow-y-auto p-4 md:p-8 pt-64 relative z-10 gap-18">
      <div></div>
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 max-w-7xl mx-auto">
        {works.map((work, index) => (
          <div 
            key={index} 
            className="work-card break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer bg-white/5 backdrop-blur-sm"
          >
            <img 
              src={work.image} 
              alt={work.name} 
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white font-eurostile text-xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {work.name}
              </h3>
              <div className="flex flex-wrap gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                {work.tags.map(tag => (
                  <span key={tag} className="text-xs font-futura text-white/90 bg-white/20 px-2 py-1 rounded-full backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;
