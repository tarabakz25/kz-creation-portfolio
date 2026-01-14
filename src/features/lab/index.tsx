interface Work {
  name: string;
  url: string;
  image: string;
  tags: string[];
  imageData?: {
    src: string;
    width: number;
    height: number;
    format: string;
  };
}

interface LabContentProps {
  works: Work[];
}

export default function LabContent({ works }: LabContentProps) {
  return (
    <main className="w-full min-h-screen bg-[#131313] text-[#e0e0e0] pt-32 pb-20 px-6 md:px-12 lg:px-24 font-fira">
      {/* Title Section */}
      <div className="mb-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between border-b border-[#222] pb-6">
          <div>
            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-white/90 font-futura_pt">
              LAB
            </h1>
            <p className="text-sm md:text-base text-[#666] mt-2 font-mono tracking-widest uppercase">
              Experimental && Prototypes
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-right hidden md:block">
            <p className="text-xs text-[#444] font-mono">
              SYSTEM: ONLINE
              <br />
              LOC: /src/pages/lab
              <br />
              USER: GUEST
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-7xl mx-auto">
        {works.map((work, index) => (
          <a
            key={work.name}
            href={work.url || "#"}
            target={work.url ? "_blank" : "_self"}
            rel={work.url ? "noopener noreferrer" : ""}
            className="group relative flex flex-col gap-4"
          >
            {/* Image Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#111] border border-[#222] group-hover:border-[#444] transition-colors duration-500">
              {work.imageData && (
                <img
                  src={work.imageData.src}
                  alt={work.name}
                  className="w-full h-full object-cover opacity-60 grayscale transition-all duration-700 ease-out group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105"
                />
              )}

              {/* Overlay UI */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex justify-end">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-baseline border-b border-[#222] pb-2 group-hover:border-[#444] transition-colors">
                <span className="text-xs font-mono text-[#444]">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <span className="text-xs font-mono text-[#444] group-hover:text-[#888] transition-colors opacity-0 group-hover:opacity-100">
                  &lt;OPEN&gt;
                </span>
              </div>

              <h2 className="text-xl font-medium text-white/80 group-hover:text-white transition-colors mt-2 font-futura_pt tracking-wide">
                {work.name}
              </h2>

              <div className="flex flex-wrap gap-2 mt-1">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] text-[#666] uppercase tracking-wider font-mono"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
