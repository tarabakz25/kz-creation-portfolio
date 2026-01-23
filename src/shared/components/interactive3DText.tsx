import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Interactive3DTextProps {
  englishText: string;
  japaneseText: string;
}

export default function Interactive3DText({ englishText, japaneseText }: Interactive3DTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create text geometry using canvas texture
    const createTextTexture = (text: string, fontSize: number) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) return null;

      canvas.width = 2048;
      canvas.height = 512;

      context.fillStyle = 'rgba(255, 255, 255, 0)';
      context.fillRect(0, 0, canvas.width, canvas.height);

      context.font = `italic ${fontSize}px Avenir, sans-serif`;
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, canvas.width / 2, canvas.height / 2);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Create English text plane
    const englishTexture = createTextTexture(englishText, 80);
    if (englishTexture) {
      const englishGeometry = new THREE.PlaneGeometry(8, 2);
      const englishMaterial = new THREE.MeshBasicMaterial({
        map: englishTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const englishMesh = new THREE.Mesh(englishGeometry, englishMaterial);
      englishMesh.position.y = 0.5;
      englishMesh.userData = { type: 'english' };
      scene.add(englishMesh);
    }

    // Create Japanese text plane
    const japaneseTexture = createTextTexture(japaneseText, 60);
    if (japaneseTexture) {
      const japaneseGeometry = new THREE.PlaneGeometry(6, 1.5);
      const japaneseMaterial = new THREE.MeshBasicMaterial({
        map: japaneseTexture,
        transparent: true,
        side: THREE.DoubleSide,
      });
      const japaneseMesh = new THREE.Mesh(japaneseGeometry, japaneseMaterial);
      japaneseMesh.position.y = -1;
      japaneseMesh.userData = { type: 'japanese' };
      scene.add(japaneseMesh);
    }

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePosition.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      scene.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          // 3D rotation based on mouse position
          const targetRotationX = mousePosition.current.y * 0.3;
          const targetRotationY = mousePosition.current.x * 0.3;

          child.rotation.x += (targetRotationX - child.rotation.x) * 0.05;
          child.rotation.y += (targetRotationY - child.rotation.y) * 0.05;

          // Add subtle floating animation
          const time = Date.now() * 0.001;
          if (child.userData.type === 'english') {
            child.position.y = 0.5 + Math.sin(time) * 0.1;
          } else if (child.userData.type === 'japanese') {
            child.position.y = -1 + Math.sin(time + Math.PI) * 0.1;
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [englishText, japaneseText]);

  return <div ref={containerRef} className="w-full h-full" />;
}
