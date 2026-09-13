'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Cpu, ShieldAlert, Radio, Activity, Compass } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useLanguage } from '@/components/LanguageProvider';

export default function MineSimulation3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Keep references to scene objects for dynamic theme updates without full reload
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const ambientLightRef = useRef<THREE.AmbientLight | null>(null);
  const dirLightRef = useRef<THREE.DirectionalLight | null>(null);
  const radarMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const sweepLineMatRef = useRef<THREE.LineBasicMaterial | null>(null);
  const contourMatRef = useRef<THREE.LineBasicMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // -------------------------------------------------------------
    // SCENE, CAMERA & RENDERER SETUP
    // -------------------------------------------------------------
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const isLight = theme === 'light';
    const bgColor = isLight ? 0xdae2eb : 0x06090e;
    const fogDensity = isLight ? 0.008 : 0.012;

    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.FogExp2(bgColor, fogDensity);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.5, 500);
    const targetCameraPos = new THREE.Vector3(38, 30, 42);
    camera.position.copy(targetCameraPos);

    const lookAtTarget = new THREE.Vector3(0, -3, 0);
    camera.lookAt(lookAtTarget);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isLight ? 1.05 : 1.15;
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // LIGHTING: Tuned for crisp contrast in both Dark & Light modes
    // -------------------------------------------------------------
    const ambientColor = isLight ? 0x8fa3b8 : 0x16202c;
    const ambientIntensity = isLight ? 1.6 : 1.4;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);
    ambientLightRef.current = ambientLight;
    scene.add(ambientLight);

    const sunIntensity = isLight ? 2.5 : 2.2;
    const sunColor = isLight ? 0xfffaed : 0xfff5e6;
    const dirLight = new THREE.DirectionalLight(sunColor, sunIntensity);
    dirLightRef.current = dirLight;
    dirLight.position.set(45, 55, 30);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 10;
    dirLight.shadow.camera.far = 130;
    dirLight.shadow.camera.left = -40;
    dirLight.shadow.camera.right = 40;
    dirLight.shadow.camera.top = 40;
    dirLight.shadow.camera.bottom = -40;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const skyFill = new THREE.DirectionalLight(0x38bdf8, isLight ? 0.4 : 0.55);
    skyFill.position.set(-30, 25, -30);
    scene.add(skyFill);

    // -------------------------------------------------------------
    // PROCEDURAL OPEN-PIT MINE: RICH, NON-FADING GEOLOGICAL STRATA
    // -------------------------------------------------------------
    const pitBenchesGroup = new THREE.Group();
    scene.add(pitBenchesGroup);

    const benchCount = 8;
    const rimRadius = 26;
    const floorRadius = 5.5;
    const totalDepth = 12;

    // Rich saturated earthy rock colors (never washed out)
    const overburdenColor = new THREE.Color(isLight ? 0x6e523b : 0x3d3127);
    const oreZoneColor = new THREE.Color(isLight ? 0x334458 : 0x2d3748);
    const bedrockColor = new THREE.Color(isLight ? 0x242d38 : 0x1f2733);

    const contourColor = isLight ? 0x0284c7 : 0x00e5ff;
    const contourOpacity = isLight ? 0.28 : 0.16;

    const contourMat = new THREE.LineBasicMaterial({
      color: contourColor,
      transparent: true,
      opacity: contourOpacity,
    });
    contourMatRef.current = contourMat;

    for (let i = 0; i < benchCount; i++) {
      const t0 = i / benchCount;
      const t1 = (i + 1) / benchCount;

      const rOuter = rimRadius - t0 * (rimRadius - floorRadius);
      const rInner = rimRadius - t1 * (rimRadius - floorRadius);

      const yTop = -t0 * totalDepth;
      const yBottom = -t1 * totalDepth;

      let stratumColor = overburdenColor.clone();
      if (t0 > 0.25 && t0 < 0.75) {
        stratumColor.lerp(oreZoneColor, (t0 - 0.25) / 0.5);
      } else if (t0 >= 0.75) {
        stratumColor.lerp(bedrockColor, (t0 - 0.75) / 0.25);
      }

      const faceSegments = 48;
      const faceGeo = new THREE.CylinderGeometry(
        rOuter * 0.98,
        rInner,
        Math.abs(yBottom - yTop) * 0.75,
        faceSegments,
        1,
        true
      );

      const faceMat = new THREE.MeshStandardMaterial({
        color: stratumColor,
        roughness: 0.9,
        metalness: 0.15,
        flatShading: true,
      });

      const faceMesh = new THREE.Mesh(faceGeo, faceMat);
      faceMesh.position.y = (yTop + yBottom) / 2;
      faceMesh.receiveShadow = true;
      faceMesh.castShadow = true;
      pitBenchesGroup.add(faceMesh);

      // Shelf terrace
      const shelfGeo = new THREE.RingGeometry(rInner, rOuter, faceSegments);
      const shelfMat = new THREE.MeshStandardMaterial({
        color: stratumColor.clone().multiplyScalar(1.08),
        roughness: 0.85,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      const shelfMesh = new THREE.Mesh(shelfGeo, shelfMat);
      shelfMesh.rotation.x = -Math.PI / 2;
      shelfMesh.position.y = yTop;
      shelfMesh.receiveShadow = true;
      pitBenchesGroup.add(shelfMesh);

      // Contour elevation ring
      const ringPoints: THREE.Vector3[] = [];
      for (let a = 0; a <= faceSegments; a++) {
        const theta = (a / faceSegments) * Math.PI * 2;
        ringPoints.push(
          new THREE.Vector3(Math.cos(theta) * rOuter, yTop + 0.04, Math.sin(theta) * rOuter)
        );
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(ringPoints);
      const ringLine = new THREE.LineLoop(ringGeo, contourMat);
      pitBenchesGroup.add(ringLine);
    }

    // Bottom pit floor
    const floorGeo = new THREE.CircleGeometry(floorRadius, 36);
    const floorMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x1f2937 : 0x18202c,
      roughness: 0.75,
      metalness: 0.35,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -totalDepth;
    floorMesh.receiveShadow = true;
    pitBenchesGroup.add(floorMesh);

    // Plateau surrounding rim
    const outerTerrainGeo = new THREE.RingGeometry(rimRadius, rimRadius + 22, 48, 6);
    const posAttr = outerTerrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getY(i);
      const dist = Math.sqrt(vx * vx + vz * vz);
      if (dist > rimRadius + 1) {
        const elevation = Math.sin(vx * 0.15) * Math.cos(vz * 0.15) * 1.5;
        posAttr.setZ(i, elevation);
      }
    }
    outerTerrainGeo.computeVertexNormals();

    const outerTerrainMat = new THREE.MeshStandardMaterial({
      color: isLight ? 0x3d3023 : 0x221c17,
      roughness: 0.95,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });
    const outerTerrain = new THREE.Mesh(outerTerrainGeo, outerTerrainMat);
    outerTerrain.rotation.x = -Math.PI / 2;
    outerTerrain.position.y = 0;
    outerTerrain.receiveShadow = true;
    scene.add(outerTerrain);

    // -------------------------------------------------------------
    // SPIRAL HAUL ROAD & HAUL TRUCKS
    // -------------------------------------------------------------
    const spiralPoints: THREE.Vector3[] = [];
    const spiralTurns = 2.2;
    const spiralSteps = 100;
    for (let i = 0; i <= spiralSteps; i++) {
      const progress = i / spiralSteps;
      const angle = progress * Math.PI * 2 * spiralTurns + 0.3;
      const rad = rimRadius * 0.95 - progress * (rimRadius * 0.95 - floorRadius * 1.3);
      const y = -progress * (totalDepth - 0.4) + 0.08;
      spiralPoints.push(new THREE.Vector3(Math.cos(angle) * rad, y, Math.sin(angle) * rad));
    }
    const haulRoadCurve = new THREE.CatmullRomCurve3(spiralPoints);

    // Visual road ribbon
    const roadPoints = haulRoadCurve.getPoints(80);
    const roadGeo = new THREE.BufferGeometry().setFromPoints(roadPoints);
    const roadMat = new THREE.LineBasicMaterial({
      color: isLight ? 0x64748b : 0x475569,
      transparent: true,
      opacity: isLight ? 0.65 : 0.45,
      linewidth: 2,
    });
    scene.add(new THREE.Line(roadGeo, roadMat));

    function createHaulTruck() {
      const truckGroup = new THREE.Group();

      const chassisMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.7 });
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.3, 1.4), chassisMat);
      chassis.position.y = 0.25;
      truckGroup.add(chassis);

      const tireMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
      const tireGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.22, 12);
      tireGeo.rotateZ(Math.PI / 2);

      const tireOffsets = [
        [-0.45, 0.24, 0.45],
        [0.45, 0.24, 0.45],
        [-0.45, 0.24, -0.3],
        [0.45, 0.24, -0.3],
        [-0.45, 0.24, -0.6],
        [0.45, 0.24, -0.6],
      ];
      tireOffsets.forEach(([tx, ty, tz]) => {
        const tire = new THREE.Mesh(tireGeo, tireMat);
        tire.position.set(tx, ty, tz);
        truckGroup.add(tire);
      });

      // Vibrant CAT Safety Yellow Dump Body
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.35,
        metalness: 0.3,
      });
      const dumpBody = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 1.1), bodyMat);
      dumpBody.position.set(0, 0.65, -0.2);
      dumpBody.castShadow = true;
      truckGroup.add(dumpBody);

      const cabMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
      const cab = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.4, 0.4), cabMat);
      cab.position.set(-0.25, 0.6, 0.45);
      truckGroup.add(cab);

      // Status Beacon
      const pinMat = new THREE.MeshBasicMaterial({ color: isLight ? 0x0284c7 : 0x00e5ff });
      const pin = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.2, 4), pinMat);
      pin.position.set(0, 1.25, 0);
      truckGroup.add(pin);

      truckGroup.scale.set(0.85, 0.85, 0.85);
      return truckGroup;
    }

    interface TruckData {
      mesh: THREE.Group;
      progress: number;
      speed: number;
    }

    const trucks: TruckData[] = [
      { mesh: createHaulTruck(), progress: 0.15, speed: 0.0007 },
      { mesh: createHaulTruck(), progress: 0.48, speed: -0.00085 },
      { mesh: createHaulTruck(), progress: 0.8, speed: 0.00065 },
    ];

    trucks.forEach((t) => scene.add(t.mesh));

    // Excavator shovel
    const shovelMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 });
    const shovel = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.2, 1.8), shovelMat);
    shovel.position.set(10.5, -4.2, -8.5);
    scene.add(shovel);

    // -------------------------------------------------------------
    // RADAR / LIDAR SCAN
    // -------------------------------------------------------------
    const radarGeo = new THREE.CircleGeometry(rimRadius * 1.05, 36, 0, Math.PI / 4);
    const radarMat = new THREE.MeshBasicMaterial({
      color: isLight ? 0x0284c7 : 0x00e5ff,
      transparent: true,
      opacity: isLight ? 0.18 : 0.11,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    radarMatRef.current = radarMat;
    const radarSweep = new THREE.Mesh(radarGeo, radarMat);
    radarSweep.rotation.x = -Math.PI / 2;
    radarSweep.position.y = 0.2;
    scene.add(radarSweep);

    const sweepLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0.21, 0),
      new THREE.Vector3(rimRadius * 1.05, 0.21, 0),
    ]);
    const sweepLineMat = new THREE.LineBasicMaterial({
      color: isLight ? 0x0369a1 : 0x38bdf8,
      linewidth: 2,
      transparent: true,
      opacity: isLight ? 0.8 : 0.7,
    });
    sweepLineMatRef.current = sweepLineMat;
    radarSweep.add(new THREE.Line(sweepLineGeo, sweepLineMat));

    // -------------------------------------------------------------
    // PARTICLES (LiDAR Dust)
    // -------------------------------------------------------------
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 55;
      particlePos[i + 1] = Math.random() * 25 - 12;
      particlePos[i + 2] = (Math.random() - 0.5) * 55;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: isLight ? 0x0284c7 : 0x38bdf8,
      size: 0.24,
      transparent: true,
      opacity: isLight ? 0.45 : 0.35,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // -------------------------------------------------------------
    // MOUSE PARALLAX & CAMERA DAMPING
    // -------------------------------------------------------------
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = nx;
      mouse.targetY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // -------------------------------------------------------------
    // ANIMATION LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const cameraAngle = elapsed * 0.02;
      camera.position.x = Math.cos(cameraAngle) * 55 + mouse.x * 5;
      camera.position.z = Math.sin(cameraAngle) * 55 + mouse.y * 5;
      camera.position.y = 32 + mouse.y * 4;
      camera.lookAt(lookAtTarget);

      radarSweep.rotation.z -= delta * 0.3;

      trucks.forEach((t) => {
        t.progress += t.speed;
        if (t.progress > 1) t.progress = 0;
        if (t.progress < 0) t.progress = 1;

        const pos = haulRoadCurve.getPointAt(t.progress);
        t.mesh.position.copy(pos);

        const tangent = haulRoadCurve.getTangentAt(t.progress);
        if (t.speed < 0) tangent.negate();
        t.mesh.lookAt(pos.clone().add(tangent));
      });

      // Particle subtle elevation
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        posArray[i] += delta * 0.35;
        if (posArray[i] > 18) posArray[i] = -12;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [theme]);

  const isLight = theme === 'light';

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-full overflow-hidden select-none">
      <div ref={mountRef} className="absolute inset-0 w-full h-full" />

      {/* Edge blending for Dark and Light modes */}
      <div
        className={`absolute inset-0 pointer-events-none lg:w-36 z-10 ${
          isLight
            ? 'bg-gradient-to-r from-[#f8fafc] via-transparent to-transparent'
            : 'bg-gradient-to-r from-[#06090e] via-transparent to-transparent'
        }`}
      />
      <div
        className={`absolute inset-0 pointer-events-none h-24 bottom-0 top-auto z-10 ${
          isLight
            ? 'bg-gradient-to-t from-[#f8fafc] via-transparent to-transparent'
            : 'bg-gradient-to-t from-[#06090e] via-transparent to-transparent'
        }`}
      />

      {/* Subtle GIS Coordinates pill (top left of simulation) */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <div className="glass-card px-3 py-1.5 rounded-lg flex items-center gap-2 text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className={isLight ? 'text-slate-600' : 'text-slate-400'}>GSI-GIS GRID:</span>
          <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-cyan-300'}`}>
            ODISHA-BARBIL // LAT 22.12° N LON 85.38° E
          </span>
        </div>
      </div>

      {/* Floating 3D HUD Pin Markers from Reference Image */}
      {/* Pin 1: Real-time Monitoring */}
      <div className="absolute top-[28%] left-[22%] z-20 pointer-events-none hidden sm:block animate-pulse-slow">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-cyan-400/40 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyan-400 relative border border-white" />
          </div>
          <div
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium backdrop-blur-md border shadow-lg ${
              isLight
                ? 'bg-white/85 border-cyan-500/40 text-slate-900 shadow-slate-900/5'
                : 'bg-[#070e17]/85 border-cyan-400/40 text-cyan-200 shadow-cyan-950/40'
            }`}
          >
            {t.hudMonitoring}
          </div>
        </div>
      </div>

      {/* Pin 2: Safer Operations */}
      <div className="absolute top-[48%] left-[45%] z-20 pointer-events-none hidden sm:block animate-pulse-slow">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400/40 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-amber-400 relative border border-white" />
          </div>
          <div
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium backdrop-blur-md border shadow-lg ${
              isLight
                ? 'bg-white/85 border-amber-500/40 text-slate-900 shadow-slate-900/5'
                : 'bg-[#070e17]/85 border-amber-400/40 text-amber-200 shadow-amber-950/40'
            }`}
          >
            {t.hudSaferOps}
          </div>
        </div>
      </div>

      {/* Pin 3: Sustainable Growth */}
      <div className="absolute bottom-[28%] right-[18%] z-20 pointer-events-none hidden sm:block animate-pulse-slow">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-400/40 animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 relative border border-white" />
          </div>
          <div
            className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium backdrop-blur-md border shadow-lg ${
              isLight
                ? 'bg-white/85 border-emerald-500/40 text-slate-900 shadow-slate-900/5'
                : 'bg-[#070e17]/85 border-emerald-400/40 text-emerald-200 shadow-emerald-950/40'
            }`}
          >
            {t.hudSustainable}
          </div>
        </div>
      </div>

      {/* Integrated Floating HUD Overlays */}
      <div className="absolute top-4 right-4 z-20 hidden md:block">
        <div className="glass-card px-4 py-2.5 rounded-xl backdrop-blur-md shadow-lg">
          <div
            className={`text-[9px] font-mono tracking-wider mb-0.5 ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {t.hudDigitalTwinActive}
          </div>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xl font-bold font-mono ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              12
            </span>
            <span
              className={`text-[10px] font-mono font-semibold ${
                isLight ? 'text-amber-700' : 'text-amber-400'
              }`}
            >
              MAJOR PITS TRACKED
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2.5">
        <div className="glass-card px-3.5 py-2 rounded-xl backdrop-blur-md flex items-center gap-2.5 shadow-md">
          <Cpu className={`w-4 h-4 ${isLight ? 'text-amber-700' : 'text-cyan-400'}`} />
          <div>
            <div
              className={`text-[9px] font-mono ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              AI ENGINE
            </div>
            <div className="text-xs font-mono font-bold text-emerald-500">ONLINE</div>
          </div>
        </div>

        <div className="glass-card px-3.5 py-2 rounded-xl backdrop-blur-md flex items-center gap-2.5 shadow-md">
          <ShieldAlert className="w-4 h-4 text-emerald-500" />
          <div>
            <div
              className={`text-[9px] font-mono ${
                isLight ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              SAFETY
            </div>
            <div
              className={`text-xs font-mono font-bold ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              NOMINAL
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
