import React from 'react';
import { SimplexNoise } from '@paper-design/shaders-react';

const MotionBackground: React.FC = () => {
  return (
    <>
      <SimplexNoise
        className="absolute inset-0 w-full h-full -z-10"
        colors={["#262626", "#0f0f0f"]}
        stepsPerColor={2}
        softness={0}
        speed={0.5}
        scale={0.6}
      />
    </>
  )
}

export default MotionBackground;
