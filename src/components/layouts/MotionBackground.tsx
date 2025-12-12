import React from 'react';
import { SimplexNoise } from '@paper-design/shaders-react';
import { GrainGradient } from '@paper-design/shaders-react';

const MotionBackground: React.FC = () => {
  return (
    <>
      {/* <SimplexNoise
        className="absolute inset-0 w-full h-full -z-10"
        colors={["#262626", "#0f0f0f"]}
        stepsPerColor={2}
        softness={0}
        speed={0.5}
        scale={0.6}
      /> */}
      <GrainGradient
        className="absolute inset-0 w-full h-full -z-10"
        colors={["#1b1f3b", "#0095ff", "#ff791a", "#52ff8e"]}
        colorBack="#0d0d0d"
        softness={0.5}
        intensity={0.5}
        noise={0.31}
        shape="wave"
        speed={1}
        scale={1.08}
        offsetX={-0.02}
        offsetY={0.3}
      />
    </>
  )
}

export default MotionBackground;
