import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

type Props = {
  UserName?: string;
  cellSize?: number;
  cellGap?: number;
  heightScale?: number;
  maxClamp?: number;
};

type DayCell = {
  x: number;
  y: number;
  date: string;
  count: number;
  color: string;
};

type ContributionData = {
  total: number;
  width: number;
  height: number;
  days: DayCell[];
};

const fetchData = async (userName: string): Promise<ContributionData> => {
  const params = new URLSearchParams({ username: userName });
  const response = await fetch(`/api/github-contrib?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  return (await response.json()) as ContributionData;
};

export default function GithubContrib3D({
  UserName,
  cellSize = 5,
  cellGap = 1.5,
  heightScale = 0.6,
  maxClamp = 20,
}: Props) {
  const ContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resolvedUserName = UserName ?? "tarabakz25";

    if (!resolvedUserName) {
      console.warn("GithubContrib3D: GitHub username is not provided.");
      return;
    }

    let mounted = true;
    if (!ContentRef.current) return;

    const Content = ContentRef.current;
    
    const Scene = new THREE.Scene();

    const Renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    Renderer.setSize(Content.clientWidth, Content.clientHeight);
    Renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    Renderer.setClearColor(0x000000, 0);
    Content.appendChild(Renderer.domElement);

    const Camera = new THREE.PerspectiveCamera(38, Content.clientWidth / Content.clientHeight, 0.1, 1000);
    Camera.position.set(0, 130, 130);

    const rootGroup = new THREE.Group();
    Scene.add(rootGroup);
    rootGroup.scale.setScalar(0.42);
    rootGroup.rotation.set(-0.34, 0, 0);
    rootGroup.position.y = -6;

    Camera.lookAt(rootGroup.position);

    const AmbientLight = new THREE.AmbientLight(0xffffff, 0.65);
    Scene.add(AmbientLight);

    const DirectionalLight = new THREE.DirectionalLight(0xffffff, 1);
    DirectionalLight.position.set(120, 160, 140);
    Scene.add(DirectionalLight);

    const COLOR_HEIGHT_MAP: Record<string, number> = {
      "#ebedf0": 1,
      "#9be9a8": 4,
      "#40c463": 8,
      "#30a14e": 12,
      "#216e39": 16,
    };

    const createCell = (xIndex: number, yIndex: number, height: number, color: string) => {
      const radius = Math.min(cellSize * 0.4, 1);
      const Geometry = new RoundedBoxGeometry(cellSize, height, cellSize, 4, radius);
      const baseColor = new THREE.Color(color);
      const brightColor = baseColor.clone().lerp(new THREE.Color(0xffffff), 0.22);
      const Material = new THREE.MeshStandardMaterial({
        color: brightColor,
        emissive: brightColor.clone().multiplyScalar(0.12),
        roughness: 0.28,
        metalness: 0.1,
      });
      const Cell = new THREE.Mesh(Geometry, Material);
      const spacing = cellSize + cellGap;
      Cell.position.set(xIndex * spacing, height / 2, -yIndex * spacing);
      return Cell;
    };

    let AnimationId: number;

    const animate = () => {
      rootGroup.rotation.y += 0.0015;
      Renderer.render(Scene, Camera);
      AnimationId = requestAnimationFrame(animate);
    };
    animate();

    fetchData(resolvedUserName)
      .then((data) => {
        if (!mounted) return;
        const halfWidth = (data.width - 1) / 2;
        const halfHeight = (data.height - 1) / 2;

        data.days.forEach((day) => {
          const clampedCount = Math.min(day.count, maxClamp);
          const normalizedColor = day.color.toLowerCase();
          const colorHeightMultiplier = COLOR_HEIGHT_MAP[normalizedColor] ?? Math.max(clampedCount, 1);
          const height = Math.max(heightScale, colorHeightMultiplier * heightScale);
          const cell = createCell(
            day.x - halfWidth,
            day.y - halfHeight,
            height,
            day.color,
          );
          rootGroup.add(cell);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    const handleResize = () => {
      if (!ContentRef.current) return;
      Camera.aspect = ContentRef.current.clientWidth / ContentRef.current.clientHeight;
      Camera.updateProjectionMatrix();
      Renderer.setSize(ContentRef.current.clientWidth, ContentRef.current.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mounted = false;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(AnimationId);
      Renderer.dispose();
      Scene.clear();
      if (ContentRef.current) {
        ContentRef.current.removeChild(Renderer.domElement);
      }
    };
  }, [UserName, cellSize, cellGap, heightScale, maxClamp]);

  return <div ref={ContentRef} className="w-full h-full" />;
};
