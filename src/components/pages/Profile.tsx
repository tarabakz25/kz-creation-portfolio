import React, { useMemo } from 'react';
import type { CollectionEntry } from 'astro:content';
import { FiAward } from "react-icons/fi";
import { FaXTwitter, FaGithub } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

import {
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadarChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import ProfileIcon from '~/assets/images/u3629887153_a_short-haired_anime_boy_sitting_wearing_a_black__7ac53e52-ff93-4e02-8942-30490f55db56_0.webp?url';

export type ProfileData = CollectionEntry<'profile'>['data'];

type ProfileProps = {
  data: ProfileData;
};

type ToolCategory = ProfileData['toolCategories'][number];
type ToolItem = ToolCategory['items'][number];
type SocialPlatform = ProfileData['socials'][number]['platform'];

const CHART_HEIGHT = 240;
const CHART_WIDTH = 280;
const SCORE_DOMAIN: [number, number] = [0, 100];

const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
];

const socialIconMap: Record<SocialPlatform, IconType | null> = {
  x: FaXTwitter,
  github: FaGithub,
  website: null,
  linkedin: null,
};

/**
 * レーダーチャートコンポーネント（メモ化）
 */
const RadarChartMemo = React.memo<{
  category: ToolCategory;
  color: string;
}>(({ category, color }) => {
  const chartData = useMemo(
    () =>
      category.items.map((item) => ({
        tool: item.name,
        score: item.score,
      })),
    [category.items]
  );

  return (
    <div
      className="flex flex-col items-center gap-4 flex-shrink-0 snap-center"
      style={{ width: CHART_WIDTH, minWidth: CHART_WIDTH, flexBasis: CHART_WIDTH }}
    >
      <div className="relative w-full" style={{ height: CHART_HEIGHT }}>
        <ResponsiveContainer width="100%" height="100%">
          <RechartsRadarChart
            data={chartData}
            cx="50%"
            cy="58%"
            outerRadius="70%"
            margin={{ top: 52, right: 16, bottom: 16, left: 16 }}
          >
            <PolarGrid />
            <PolarAngleAxis
              dataKey="tool"
              tick={{
                fill: 'currentColor',
                fontFamily: 'Eurostile, sans-serif',
                fontSize: 12,
                letterSpacing: '0.08em',
              }}
              axisLine={false}
              tickLine={false}
            />
            <PolarRadiusAxis
              domain={SCORE_DOMAIN}
              tick={false}
              tickLine={false}
              axisLine={false}
            />
            <Radar
              name="Skill Level"
              dataKey="score"
              stroke={color}
              fill={color}
              strokeWidth={2}
              fillOpacity={0.3}
              dot={false}
            />
            <Tooltip
              cursor={false}
              formatter={(value: number) => [`${value}`, 'Score']}
              labelFormatter={(label) => `${label}`}
              wrapperClassName="text-xs main-fg"
              contentStyle={{
                backgroundColor: 'rgba(16,16,16,0.85)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--foreground)',
              }}
            />
          </RechartsRadarChart>
        </ResponsiveContainer>
        <h3 className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 font-futura text-base sm:text-lg uppercase tracking-[0.2em]">
          {category.name}
        </h3>
      </div>
    </div>
  );
});

RadarChartMemo.displayName = 'RadarChartMemo';

const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-8 sm:gap-12 md:gap-16 px-4 sm:px-6 md:px-8 py-20 sm:py-24 md:py-0">
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
        {data.awards.map((award, index) => (
          <div key={index} className="flex items-center gap-2 main-fg">
            <FiAward className="w-5 sm:w-6 h-auto" />
            <span className="w-auto sm:w-64 font-futura text-base sm:text-lg font-bold text-center sm:text-left">{award}</span>
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8">
        <img src={ProfileIcon} alt="profile icon" className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-2xl sm:rounded-3xl" />
        <div className="flex flex-col main-fg gap-2 items-center md:items-start">
          <h1 className="text-2xl sm:text-3xl font-futura">{data.name}</h1>
          <h2 className="text-base sm:text-lg md:text-xl font-eurostile tracking-widest text-center md:text-left">{data.headline}</h2>
          <div className="flex gap-2 pt-2">
            {data.socials.map((social) => {
              const Icon = socialIconMap[social.platform];
              return (
                <a key={social.url} href={social.url} aria-label={social.label} target="_blank" rel="noreferrer">
                  {Icon ? (
                    <Icon className="inline-block mr-2 w-5 sm:w-6 h-auto" />
                  ) : (
                    <span className="inline-block mr-2 text-xs sm:text-sm">{social.label}</span>
                  )}
                </a>
              );
            })}
          </div>  
        </div>
      </div>
      <div className="w-full flex flex-nowrap items-start justify-center gap-6 sm:gap-8 md:gap-12 overflow-x-auto pb-4 main-fg snap-x snap-mandatory scrollbar-hide">
        {data.toolCategories.map((category, index) => (
          <RadarChartMemo
            key={category.name}
            category={category}
            color={chartColors[index % chartColors.length]}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
