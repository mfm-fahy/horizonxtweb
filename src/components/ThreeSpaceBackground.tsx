import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeSpaceBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ----------------------------------------------------
    // 0. WEBGL RENDERER & SCENE INITIALIZATION
    // ----------------------------------------------------
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x020612, 1.0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020612, 0.0055);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1400
    );
    camera.position.set(0, 1.2, 22);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Primary Brand Palette Constants
    const colorNavy = new THREE.Color(0x0a1d3b);
    const colorRoyal = new THREE.Color(0x1f3fae);
    const colorTeal = new THREE.Color(0x00a7b5);
    const colorGold = new THREE.Color(0xf5a623);

    // Primary Stellar Light Vector (Dominant Sun in the upper-right distance)
    const sunDirection = new THREE.Vector3(2.2, 1.4, 1.8).normalize();

    // ----------------------------------------------------
    // 1. PROCEDURAL REGOLITH & ROCK NORMAL MAP GENERATOR
    // (Generates authentic multi-scale rocky crater/regolith textures)
    // ----------------------------------------------------
    const generateAsteroidTextures = () => {
      const size = 512;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return { map: null, normalMap: null };

      // Base gray regolith
      const imgData = ctx.createImageData(size, size);
      const data = imgData.data;

      // Seeded random noise + crater pitting
      const heightMap = new Float32Array(size * size);
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = y * size + x;
          const nx = x / size;
          const ny = y / size;

          // Multi-octave fractal noise
          let n =
            Math.sin(nx * 18.0) * Math.cos(ny * 18.0) * 0.35 +
            Math.sin(nx * 38.0 + ny * 24.0) * 0.25 +
            (Math.random() - 0.5) * 0.2;

          heightMap[idx] = Math.max(0, Math.min(1, 0.5 + n * 0.4));
        }
      }

      // Add circular crater depressions
      const craterCount = 28;
      for (let c = 0; c < craterCount; c++) {
        const cx = Math.random() * size;
        const cy = Math.random() * size;
        const cr = 6 + Math.random() * 24;
        const depth = 0.25 + Math.random() * 0.45;

        const minPy = Math.max(0, Math.floor(cy - cr * 1.5));
        const maxPy = Math.min(size - 1, Math.ceil(cy + cr * 1.5));
        const minPx = Math.max(0, Math.floor(cx - cr * 1.5));
        const maxPx = Math.min(size - 1, Math.ceil(cx + cr * 1.5));

        for (let py = minPy; py <= maxPy; py++) {
          for (let px = minPx; px <= maxPx; px++) {
            const dx = px - cx;
            const dy = py - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const pIdx = py * size + px;

            if (dist < cr) {
              // Parabolic crater bowl
              const bowl = (1.0 - (dist / cr) * (dist / cr)) * depth;
              heightMap[pIdx] = Math.max(0, heightMap[pIdx] - bowl);
            } else if (dist < cr * 1.35) {
              // Raised crater shockwave rim
              const rimDist = (dist - cr) / (cr * 0.35);
              const rimElev = Math.sin(rimDist * Math.PI) * depth * 0.4;
              heightMap[pIdx] = Math.min(1, heightMap[pIdx] + rimElev);
            }
          }
        }
      }

      // Generate Albedo Texture (Charcoal chondrite + subtle mineral dust)
      for (let i = 0; i < size * size; i++) {
        const h = heightMap[i];
        const i4 = i * 4;
        // Dark charcoal gray regolith (#181c24) with subtle tonal variation
        const base = Math.floor(22 + h * 24);
        data[i4] = base; // R
        data[i4 + 1] = base + 3; // G (slight cool tone)
        data[i4 + 2] = base + 8; // B (subtle navy tint)
        data[i4 + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
      const albedoTex = new THREE.CanvasTexture(canvas);
      albedoTex.wrapS = THREE.RepeatWrapping;
      albedoTex.wrapT = THREE.RepeatWrapping;

      // Generate Normal Map via Sobel operator on heightMap
      const normalCanvas = document.createElement('canvas');
      normalCanvas.width = size;
      normalCanvas.height = size;
      const nCtx = normalCanvas.getContext('2d');
      if (!nCtx) return { map: albedoTex, normalMap: null };

      const normalData = nCtx.createImageData(size, size);
      const nData = normalData.data;
      const strength = 3.5;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const idx = y * size + x;
          const xL = (x - 1 + size) % size;
          const xR = (x + 1) % size;
          const yU = (y - 1 + size) % size;
          const yD = (y + 1) % size;

          const hL = heightMap[y * size + xL];
          const hR = heightMap[y * size + xR];
          const hU = heightMap[yU * size + x];
          const hD = heightMap[yD * size + x];

          const dx = (hR - hL) * strength;
          const dy = (hD - hU) * strength;
          const dz = 1.0;

          const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const nx = (dx / len) * 0.5 + 0.5;
          const ny = (dy / len) * 0.5 + 0.5;
          const nz = (dz / len) * 0.5 + 0.5;

          const i4 = idx * 4;
          nData[i4] = Math.floor(nx * 255);
          nData[i4 + 1] = Math.floor(ny * 255);
          nData[i4 + 2] = Math.floor(nz * 255);
          nData[i4 + 3] = 255;
        }
      }
      nCtx.putImageData(normalData, 0, 0);
      const normalTex = new THREE.CanvasTexture(normalCanvas);
      normalTex.wrapS = THREE.RepeatWrapping;
      normalTex.wrapT = THREE.RepeatWrapping;

      return { map: albedoTex, normalMap: normalTex };
    };

    const asteroidTextures = generateAsteroidTextures();

    // ----------------------------------------------------
    // 2. PHOTOREALISTIC GEOLOGICAL EXOPLANET SHADER
    // (Multi-octave PBR terrain, procedural impact craters, realistic terminator & Rayleigh atmosphere)
    // ----------------------------------------------------
    const planetVertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      varying float vElevation;

      // 3D Simplex noise
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      float getPlanetElevation(vec3 p) {
        // Multi-scale tectonic continental shelves
        float c1 = snoise(p * 0.42);
        float c2 = snoise(p * 1.15) * 0.45;
        float c3 = snoise(p * 2.8) * 0.2;
        // Mountain ridges (chiseled absolute peaks)
        float ridges = (1.0 - abs(snoise(p * 2.1))) * 0.32;
        return c1 + c2 + c3 + ridges;
      }

      void main() {
        vUv = uv;
        vec3 nNormal = normalize(normal);
        float elev = getPlanetElevation(position);
        vElevation = elev;

        // Physical geological displacement (mountains, plateaus, valleys)
        vec3 displacedPos = position + nNormal * (elev * 0.16);

        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(displacedPos, 1.0)).xyz;
        vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
        vWorldPosition = (modelMatrix * vec4(displacedPos, 1.0)).xyz;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPos, 1.0);
      }
    `;

    const planetFragmentShader = `
      uniform float uTime;
      uniform vec3 uSunDir;
      uniform vec3 uColorNavy;
      uniform vec3 uColorRoyal;
      uniform vec3 uColorTeal;
      uniform vec3 uColorGold;
      varying vec3 vNormal;
      varying vec3 vPosition;
      varying vec2 vUv;
      varying vec3 vWorldNormal;
      varying vec3 vWorldPosition;
      varying float vElevation;

      // 3D Simplex noise
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      // Analytical micro-relief terrain normal generator
      float getTerrainSample(vec3 p) {
        float f1 = snoise(p * 0.85);
        float f2 = snoise(p * 2.5) * 0.45;
        float f3 = snoise(p * 6.0) * 0.22;
        float f4 = snoise(p * 14.0) * 0.09;
        return f1 + f2 + f3 + f4;
      }

      void main() {
        vec3 viewDir = normalize(-vPosition);
        vec3 geometricN = normalize(vNormal);

        // Finite difference analytical normal perturbation for rocky crags
        float eps = 0.025;
        vec3 p = vWorldPosition;
        vec3 tangent = normalize(cross(geometricN, vec3(0.0, 1.0, 0.0)));
        if (length(tangent) < 0.01) tangent = normalize(cross(geometricN, vec3(1.0, 0.0, 0.0)));
        vec3 bitangent = cross(geometricN, tangent);

        float hCenter = getTerrainSample(p);
        float hT = getTerrainSample(p + tangent * eps);
        float hB = getTerrainSample(p + bitangent * eps);

        vec3 perturbedN = normalize(geometricN - tangent * (hT - hCenter) * 1.8 - bitangent * (hB - hCenter) * 1.8);

        // Primary Solar Illumination from distant star
        vec3 lightDir = normalize(uSunDir);
        float NdotL = dot(perturbedN, lightDir);
        float geoNdotL = dot(geometricN, lightDir);

        // Physically based shadow terminator with mountain cast shadows
        float directLight = smoothstep(-0.06, 0.32, NdotL) * smoothstep(-0.08, 0.18, geoNdotL);

        // Geological PBR Surface Layering (Believable, natural exoplanet tones)
        vec3 deepBasalt = uColorNavy * 0.42; // Deep basalt ocean basins
        vec3 darkRegolith = uColorNavy * 0.85; // Lowland plains
        vec3 mineralHighland = mix(uColorNavy, uColorRoyal, 0.55); // Continental highlands
        vec3 mountainRock = mix(uColorRoyal, uColorTeal, 0.4); // High altitude silicate crags
        vec3 peakFrost = mix(uColorTeal, vec3(0.85, 0.92, 1.0), 0.25); // Polar/alpine crystals

        float h = vElevation + hCenter * 0.35;
        vec3 albedo = deepBasalt;
        if (h > -0.2) albedo = mix(deepBasalt, darkRegolith, smoothstep(-0.2, 0.1, h));
        if (h > 0.1) albedo = mix(darkRegolith, mineralHighland, smoothstep(0.1, 0.45, h));
        if (h > 0.45) albedo = mix(mineralHighland, mountainRock, smoothstep(0.45, 0.8, h));
        if (h > 0.8) albedo = mix(mountainRock, peakFrost, smoothstep(0.8, 1.3, h));

        // Subterranean glowing energy fissures (HorizonX research signature)
        float energyNoise = abs(snoise(p * 2.8));
        float fissure = pow(clamp(1.0 - energyNoise, 0.0, 1.0), 12.0);
        vec3 glowingFissures = uColorTeal * fissure * 2.8;

        // Subtle Sunrise Gold graze along the solar terminator
        float terminatorGraze = smoothstep(-0.02, 0.16, geoNdotL) * smoothstep(0.38, 0.08, geoNdotL);
        vec3 goldTerminator = uColorGold * terminatorGraze * 0.65;

        // Natural Day Surface
        vec3 dayColor = albedo * (directLight * 1.25);

        // Night Surface: Deep space black with faint cosmic starlight + illuminated fault lines
        vec3 cosmicAmbient = uColorNavy * 0.04;
        vec3 nightColor = (glowingFissures + cosmicAmbient) * (1.0 - directLight);

        // Physically Based Atmospheric Rayleigh Scattering on the planet's limb
        float limbFactor = pow(clamp(1.0 - max(0.0, dot(geometricN, viewDir)), 0.0, 1.0), 3.8);
        float sunPhase = pow(max(0.0, dot(viewDir, lightDir) * 0.5 + 0.5), 2.2);
        vec3 atmosphereRayleigh = mix(uColorTeal, uColorRoyal, 0.35) * limbFactor * (0.8 + directLight * 1.6) * sunPhase;

        // Specular glint on silicate crystalline facets
        vec3 H = normalize(lightDir + viewDir);
        float spec = pow(max(0.0, dot(perturbedN, H)), 24.0) * directLight * 0.28;

        vec3 finalColor = dayColor + nightColor + goldTerminator + atmosphereRayleigh + vec3(1.0) * spec;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // High-resolution sphere geometry (6.8 radius)
    const planetGeo = new THREE.SphereGeometry(6.8, 128, 96);
    const planetMat = new THREE.ShaderMaterial({
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSunDir: { value: sunDirection },
        uColorNavy: { value: colorNavy },
        uColorRoyal: { value: colorRoyal },
        uColorTeal: { value: colorTeal },
        uColorGold: { value: colorGold },
      },
    });

    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    // Positioned on the RIGHT side (partially cropped right edge) to leave left side pristine for typography
    planetMesh.position.set(8.2, 0.3, -0.2);
    worldGroup.add(planetMesh);

    // ----------------------------------------------------
    // 3. THIN REALISTIC RAYLEIGH ATMOSPHERIC HAZE SHELL
    // (Non-cartoon, subtle, transparent, exponential dropoff)
    // ----------------------------------------------------
    const atmosphereVertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;
    const atmosphereFragmentShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      uniform vec3 uSunDir;
      uniform vec3 uColorTeal;
      uniform vec3 uColorRoyal;

      void main() {
        vec3 viewDir = normalize(-vPosition);
        vec3 N = normalize(vNormal);

        // Thin exponential limb drop-off
        float viewDot = dot(N, viewDir);
        float limb = pow(clamp(1.0 - abs(viewDot), 0.0, 1.0), 4.2);

        // Forward scattering towards the sun
        vec3 lightDir = normalize(uSunDir);
        float sunFacing = smoothstep(-0.25, 0.45, dot(N, lightDir));
        float forwardScatter = pow(max(0.0, dot(viewDir, lightDir) * 0.5 + 0.5), 3.0);

        vec3 atmoCol = mix(uColorTeal, uColorRoyal, 0.35);
        float opacity = limb * (sunFacing * 0.75 + forwardScatter * 0.55);

        gl_FragColor = vec4(atmoCol * 1.35, clamp(opacity * 0.65, 0.0, 0.85));
      }
    `;

    const atmoGeo = new THREE.SphereGeometry(6.96, 64, 48); // Only 2.3% larger than planet
    const atmoMat = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uSunDir: { value: sunDirection },
        uColorTeal: { value: colorTeal },
        uColorRoyal: { value: colorRoyal },
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false,
    });
    const atmosphereMesh = new THREE.Mesh(atmoGeo, atmoMat);
    planetMesh.add(atmosphereMesh);

    // ----------------------------------------------------
    // 4. DISTANT CRATERED SECONDARY MOON
    // ----------------------------------------------------
    const moonGeo = new THREE.SphereGeometry(1.6, 48, 32);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0x182236,
      roughness: 0.94,
      metalness: 0.04,
      normalMap: asteroidTextures.normalMap,
      normalScale: new THREE.Vector2(1.2, 1.2),
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(16.5, -4.8, -8.0);
    worldGroup.add(moonMesh);

    // ----------------------------------------------------
    // 5. PROCEDURAL HIGH-DETAIL ASTEROID GEOMETRY GENERATOR
    // (Creates 3 genuinely distinct, asymmetrical, cratered rock shapes)
    // ----------------------------------------------------
    const createProceduralAsteroidGeo = (type: number, detail: number) => {
      let geo: THREE.BufferGeometry;

      if (type === 0) {
        // Type 0: Elongated Chondrite Impactor (Potato-like, deep crater bowl)
        geo = new THREE.IcosahedronGeometry(1.0, detail);
        const p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let vx = p.getX(i);
          let vy = p.getY(i);
          let vz = p.getZ(i);

          // Asymmetric elongation
          vx *= 1.45;
          vy *= 0.85;
          vz *= 1.12;

          // Fractures & ridges
          const n =
            Math.sin(vx * 2.8) * Math.cos(vy * 3.2) * 0.28 +
            Math.sin(vz * 4.5 + vx * 2.2) * 0.14;
          const factor = 1.0 + n;
          vx *= factor;
          vy *= factor;
          vz *= factor;

          // Carve prominent impact crater depression on one hemisphere
          const distToCrater = Math.sqrt((vx - 0.7) * (vx - 0.7) + (vy - 0.4) * (vy - 0.4) + vz * vz);
          if (distToCrater < 0.85) {
            const depression = (1.0 - distToCrater / 0.85) * 0.35;
            vx -= depression * 0.5;
            vy -= depression * 0.3;
          }

          p.setXYZ(i, vx, vy, vz);
        }
      } else if (type === 1) {
        // Type 1: Angular Fracture Monolith (Sharp chisel cleavage planes)
        geo = new THREE.DodecahedronGeometry(1.0, detail);
        const p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let vx = p.getX(i);
          let vy = p.getY(i);
          let vz = p.getZ(i);

          // Sharp cleavage planes
          const cut1 = Math.abs(vx * 0.7 + vy * 0.5 + vz * 0.5);
          const cut2 = Math.abs(-vx * 0.4 + vy * 0.8 - vz * 0.4);
          const n = (cut1 * 0.25 - cut2 * 0.2) + (Math.sin(vx * 6.0) * 0.08);

          const factor = 1.0 + n;
          p.setXYZ(i, vx * factor * 1.15, vy * factor * 0.9, vz * factor * 1.25);
        }
      } else {
        // Type 2: Contact Binary / Cratered Slab Boulder
        geo = new THREE.IcosahedronGeometry(1.0, detail);
        const p = geo.attributes.position;
        for (let i = 0; i < p.count; i++) {
          let vx = p.getX(i);
          let vy = p.getY(i);
          let vz = p.getZ(i);

          // Flattened slab with waist indentation
          vx *= 1.35;
          vy *= 0.65;
          vz *= 1.3;

          const waist = 1.0 - Math.exp(-(vx * vx) * 1.8) * 0.3;
          vy *= waist;
          vz *= waist;

          const n = Math.sin(vx * 4.2) * Math.sin(vz * 3.8) * 0.18;
          p.setXYZ(i, vx * (1.0 + n), vy * (1.0 + n), vz * (1.0 + n));
        }
      }

      geo.computeVertexNormals();
      return geo;
    };

    // Shared photorealistic PBR material for asteroids
    const asteroidMaterial = new THREE.MeshStandardMaterial({
      map: asteroidTextures.map,
      normalMap: asteroidTextures.normalMap,
      normalScale: new THREE.Vector2(2.2, 2.2),
      roughness: 0.94, // Real asteroids are exceptionally matte regolith
      metalness: 0.05, // Natural rocky stone
      color: 0x1c2432,
    });

    // ----------------------------------------------------
    // 6. FOREGROUND HERO ASTEROIDS (Strictly Positioned on Right Periphery)
    // Completely clear left and center zones (zero rocks at X < 1.0)
    // ----------------------------------------------------
    const foregroundGroup = new THREE.Group();
    worldGroup.add(foregroundGroup);

    // Hero Asteroid 1: Lower-right foreground rock (below planet limb)
    const heroGeo1 = createProceduralAsteroidGeo(0, 3);
    const heroAsteroid1 = new THREE.Mesh(heroGeo1, asteroidMaterial);
    heroAsteroid1.position.set(8.4, -4.6, 10.5);
    heroAsteroid1.scale.set(1.9, 1.9, 1.9);
    heroAsteroid1.rotation.set(0.4, 0.8, -0.3);
    foregroundGroup.add(heroAsteroid1);

    // Hero Asteroid 2: Mid-right edge rock (framing the right limb)
    const heroGeo2 = createProceduralAsteroidGeo(1, 3);
    const heroAsteroid2 = new THREE.Mesh(heroGeo2, asteroidMaterial);
    heroAsteroid2.position.set(11.4, 1.6, 8.5);
    heroAsteroid2.scale.set(1.5, 1.5, 1.5);
    heroAsteroid2.rotation.set(-0.5, 1.2, 0.4);
    foregroundGroup.add(heroAsteroid2);

    // Hero Asteroid 3: Top-right drifting fragment
    const heroGeo3 = createProceduralAsteroidGeo(2, 3);
    const heroAsteroid3 = new THREE.Mesh(heroGeo3, asteroidMaterial);
    heroAsteroid3.position.set(9.8, 5.2, 7.5);
    heroAsteroid3.scale.set(1.2, 1.2, 1.2);
    heroAsteroid3.rotation.set(0.8, -0.6, 0.2);
    foregroundGroup.add(heroAsteroid3);

    // ----------------------------------------------------
    // 7. REALISTIC ASTEROID BELT (KEPLERIAN CLUSTERING via INSTANCED MESH)
    // ----------------------------------------------------
    const beltBaseGeo = createProceduralAsteroidGeo(0, 1);
    const beltCount = 1200;
    const beltInstancedMesh = new THREE.InstancedMesh(beltBaseGeo, asteroidMaterial, beltCount);

    const dummy = new THREE.Object3D();
    const beltRadii = new Float32Array(beltCount);
    const beltAngles = new Float32Array(beltCount);
    const beltSpeeds = new Float32Array(beltCount);
    const beltRotSpeeds = new Float32Array(beltCount * 3);
    const beltRotations = new Float32Array(beltCount * 3);
    const beltScales = new Float32Array(beltCount * 3);
    const beltYOffsets = new Float32Array(beltCount);

    for (let i = 0; i < beltCount; i++) {
      // Controlled Keplerian density clustering centered around R ~ 12.6 with Kirkwood gaps
      const rCenter = 12.6;
      const rSpread = (Math.random() - 0.5) * 5.0;
      const radius = rCenter + rSpread + (Math.random() > 0.88 ? (Math.random() - 0.5) * 2.5 : 0);

      // Orbital angle with natural clustering
      const angle = Math.random() * Math.PI * 2;
      // Keplerian speed: v ~ 1 / sqrt(r)
      const speed = (0.0005 + Math.random() * 0.0003) * (13.0 / Math.sqrt(radius));
      const yOffset = (Math.random() - 0.5) * 2.2 * (1.0 - Math.abs(rSpread) / 6.0);

      // Power-law realistic size distribution: vast majority are tiny pebbles, very few large
      let scale = 0.06 + Math.random() * 0.12;
      if (Math.random() < 0.15) scale = 0.2 + Math.random() * 0.22;
      if (Math.random() < 0.04) scale = 0.4 + Math.random() * 0.35;

      beltRadii[i] = radius;
      beltAngles[i] = angle;
      beltSpeeds[i] = speed;
      beltYOffsets[i] = yOffset;

      // Unique 3D tumbling rotation
      beltScales[i * 3] = scale * (0.85 + Math.random() * 0.3);
      beltScales[i * 3 + 1] = scale * (0.8 + Math.random() * 0.4);
      beltScales[i * 3 + 2] = scale * (0.85 + Math.random() * 0.3);

      beltRotSpeeds[i * 3] = (Math.random() - 0.5) * 0.008;
      beltRotSpeeds[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      beltRotSpeeds[i * 3 + 2] = (Math.random() - 0.5) * 0.008;

      beltRotations[i * 3] = Math.random() * Math.PI * 2;
      beltRotations[i * 3 + 1] = Math.random() * Math.PI * 2;
      beltRotations[i * 3 + 2] = Math.random() * Math.PI * 2;
    }

    const asteroidBeltGroup = new THREE.Group();
    asteroidBeltGroup.position.copy(planetMesh.position);
    asteroidBeltGroup.rotation.x = 0.52; // Cinematic tilt matching reference
    asteroidBeltGroup.rotation.z = -0.32;
    asteroidBeltGroup.add(beltInstancedMesh);
    worldGroup.add(asteroidBeltGroup);

    // ----------------------------------------------------
    // 8. DEEP-SPACE NEBULA COSMIC CLOUDS
    // (Volumetric fractal Brownian motion, low saturation, authentic cosmic gas)
    // ----------------------------------------------------
    const nebulaVertexShader = `
      varying vec2 vUv;
      varying vec3 vPosition;
      void main() {
        vUv = uv;
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const nebulaFragmentShader = `
      uniform float uTime;
      uniform vec3 uColorNavy;
      uniform vec3 uColorRoyal;
      uniform vec3 uColorTeal;
      uniform vec3 uColorGold;
      varying vec2 vUv;
      varying vec3 vPosition;

      // 3D Simplex Noise
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(
                  i.z + vec4(0.0, i1.z, i2.z, 1.0))
                + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      float fbm(vec3 p) {
        float val = 0.0;
        float amp = 0.52;
        for (int i = 0; i < 4; i++) {
          val += amp * snoise(p);
          p *= 2.08;
          amp *= 0.46;
        }
        return val;
      }

      void main() {
        vec2 uv = vUv;
        vec3 p = vec3(uv * 3.8, uTime * 0.015);

        float n1 = fbm(p);
        float n2 = fbm(p + vec3(2.4, 1.2, 0.5) + n1 * 0.4);
        float density = smoothstep(-0.15, 0.8, n2);

        // Natural cosmic ionization gradients (Deep space navy, royal blue, subtle teal)
        vec3 col = uColorNavy * 0.35;
        col = mix(col, uColorRoyal * 0.65, smoothstep(0.15, 0.55, n2));
        col = mix(col, uColorTeal * 0.75, smoothstep(0.45, 0.85, n2));

        // Very faint golden stellar nursery fringe
        float goldEdge = smoothstep(0.75, 0.98, n2);
        col = mix(col, uColorGold * 0.9, goldEdge * 0.32);

        // Edge vignette fade with left-side void protection for typography contrast
        float radial = 1.0 - smoothstep(0.12, 0.55, distance(uv, vec2(0.5)));
        float leftVoidProtection = smoothstep(0.15, 0.52, uv.x);
        float alpha = density * radial * (0.12 + leftVoidProtection * 0.26);

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const nebulaGeo = new THREE.PlaneGeometry(180, 110);
    const nebulaMat = new THREE.ShaderMaterial({
      vertexShader: nebulaVertexShader,
      fragmentShader: nebulaFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uColorNavy: { value: colorNavy },
        uColorRoyal: { value: colorRoyal },
        uColorTeal: { value: colorTeal },
        uColorGold: { value: colorGold },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });

    const nebulaMesh = new THREE.Mesh(nebulaGeo, nebulaMat);
    nebulaMesh.position.set(0, 0, -55);
    worldGroup.add(nebulaMesh);

    // ----------------------------------------------------
    // 9. MULTI-MAGNITUDE ASTRONOMICAL STAR FIELD (4,200 STARS)
    // ----------------------------------------------------
    const createStarSystem = () => {
      const starCount = 4200;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);

      const colorPureWhite = new THREE.Color(0xffffff);
      const colorCoolBlue = new THREE.Color(0xd0e8ff);
      const colorWarmStarlight = new THREE.Color(0xfff0dd);
      const colorPaleGold = new THREE.Color(0xf5d28a);

      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        // Spherical distribution
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const radius = 160.0 * (0.35 + 0.65 * Math.cbrt(Math.random()));

        pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        pos[i3 + 2] = radius * Math.cos(phi);

        // Power law sizes: 85% tiny pinpoints, 12% medium, 3% bright beacons
        const rand = Math.random();
        let starColor = colorPureWhite;
        let starSize = 0.35 + Math.random() * 0.25;

        if (rand < 0.15) {
          starColor = colorCoolBlue;
          starSize = 0.55 + Math.random() * 0.35;
        } else if (rand < 0.28) {
          starColor = colorWarmStarlight;
          starSize = 0.5 + Math.random() * 0.3;
        } else if (rand > 0.97) {
          starColor = colorPaleGold;
          starSize = 0.95 + Math.random() * 0.55;
        }

        colors[i3] = starColor.r;
        colors[i3 + 1] = starColor.g;
        colors[i3 + 2] = starColor.b;
        sizes[i] = starSize;
      }

      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      // Circular anti-aliased star canvas texture
      const c = document.createElement('canvas');
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext('2d');
      if (ctx) {
        const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.25, 'rgba(230,245,255,0.85)');
        g.addColorStop(0.65, 'rgba(0,167,181,0.2)');
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 32, 32);
      }
      const starTex = new THREE.CanvasTexture(c);

      const mat = new THREE.PointsMaterial({
        size: 0.7,
        vertexColors: true,
        map: starTex,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      return new THREE.Points(geo, mat);
    };

    const starPoints = createStarSystem();
    worldGroup.add(starPoints);

    // ----------------------------------------------------
    // 10. REALISTIC SCIENTIFIC RESEARCH SPACECRAFT (NASA/ESA AESTHETIC)
    // ----------------------------------------------------
    const createResearchSpacecraft = (scale: number) => {
      const shipGroup = new THREE.Group();

      // Fuselage: Angular research hull with dark radar-absorbent ceramic tiles
      const bodyGeo = new THREE.ConeGeometry(0.7, 3.4, 5);
      bodyGeo.rotateX(Math.PI * 0.5);
      const hullMat = new THREE.MeshStandardMaterial({
        color: 0x111c2e,
        roughness: 0.38,
        metalness: 0.75,
      });
      const body = new THREE.Mesh(bodyGeo, hullMat);
      shipGroup.add(body);

      // Swept instrument wings / radiator panels
      const wingGeo = new THREE.BoxGeometry(3.8, 0.06, 1.3);
      const wingMat = new THREE.MeshStandardMaterial({
        color: 0x182844,
        roughness: 0.45,
        metalness: 0.65,
      });
      const wings = new THREE.Mesh(wingGeo, wingMat);
      wings.position.set(0, 0, -0.35);
      shipGroup.add(wings);

      // Sensor array canopy (reflective sapphire glass)
      const canopyGeo = new THREE.BoxGeometry(0.48, 0.28, 0.95);
      const canopyMat = new THREE.MeshStandardMaterial({
        color: 0x00a7b5,
        roughness: 0.1,
        metalness: 0.95,
      });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.set(0, 0.28, 0.25);
      shipGroup.add(canopy);

      // Dual High-Energy Cyan Ion Thrusters
      const thrusterGeo = new THREE.CylinderGeometry(0.18, 0.24, 0.45, 12);
      thrusterGeo.rotateX(Math.PI * 0.5);
      const thrusterMat = new THREE.MeshBasicMaterial({ color: 0x66ffff });

      const leftThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
      leftThruster.position.set(-0.68, 0, -1.65);
      const rightThruster = new THREE.Mesh(thrusterGeo, thrusterMat);
      rightThruster.position.set(0.68, 0, -1.65);
      shipGroup.add(leftThruster);
      shipGroup.add(rightThruster);

      // Luminous Ion Plasma Exhaust Plumes
      const plumeGeo = new THREE.ConeGeometry(0.32, 2.1, 10);
      plumeGeo.rotateX(-Math.PI * 0.5);
      const plumeMat = new THREE.MeshBasicMaterial({
        color: 0x00a7b5,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
      });
      const leftPlume = new THREE.Mesh(plumeGeo, plumeMat);
      leftPlume.position.set(-0.68, 0, -2.7);
      const rightPlume = new THREE.Mesh(plumeGeo, plumeMat);
      rightPlume.position.set(0.68, 0, -2.7);
      shipGroup.add(leftPlume);
      shipGroup.add(rightPlume);

      // Sunrise Gold Wingtip Navigation Beacons
      const beaconGeo = new THREE.SphereGeometry(0.07, 8, 8);
      const beaconMat = new THREE.MeshBasicMaterial({ color: 0xf5a623 });
      const leftBeacon = new THREE.Mesh(beaconGeo, beaconMat);
      leftBeacon.position.set(-1.9, 0.05, -0.35);
      const rightBeacon = new THREE.Mesh(beaconGeo, beaconMat);
      rightBeacon.position.set(1.9, 0.05, -0.35);
      shipGroup.add(leftBeacon);
      shipGroup.add(rightBeacon);

      shipGroup.scale.set(scale, scale, scale);
      return shipGroup;
    };

    // Research Vessel 1 (Surveying the illuminated limb of the planet on the right)
    const researchVessel1 = createResearchSpacecraft(0.38);
    researchVessel1.position.set(5.8, 2.2, 4.2);
    researchVessel1.rotation.set(-0.25, -0.85, 0.18);
    worldGroup.add(researchVessel1);

    // Research Vessel 2 (Deep space surveyor cruising past the outer rings)
    const researchVessel2 = createResearchSpacecraft(0.24);
    researchVessel2.position.set(10.5, -2.4, -3.5);
    researchVessel2.rotation.set(0.18, 0.9, -0.12);
    worldGroup.add(researchVessel2);

    // ----------------------------------------------------
    // 11. PHOTOREALISTIC DEEP-SPACE LIGHTING
    // ----------------------------------------------------
    // Primary Star: Harsh, powerful directional starlight from upper-right
    const keyStarLight = new THREE.DirectionalLight(0xfff5e8, 3.6);
    keyStarLight.position.set(28, 18, 24);
    scene.add(keyStarLight);

    // Secondary Planetary Bounce: Cool blue/teal reflection from illuminated planet
    const planetBounceLight = new THREE.DirectionalLight(0x00a7b5, 0.4);
    planetBounceLight.position.set(12, -8, -4);
    scene.add(planetBounceLight);

    // Deep-space cosmic ambient light (preserves deep black shadows)
    const cosmicAmbient = new THREE.AmbientLight(0x020612, 0.35);
    scene.add(cosmicAmbient);

    // ----------------------------------------------------
    // 12. INTERACTION, SCROLL MOTOR & CINEMATIC CAMERA CHOREOGRAPHY
    // ----------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraTiltX = 0;
    let targetCameraTiltY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      targetCameraTiltX = mouseX * 0.75;
      targetCameraTiltY = mouseY * 0.55;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let rawScrollY = 0;
    let targetScrollY = 0;
    let currentScrollY = 0;
    let scrollVelocity = 0;

    const handleScroll = () => {
      rawScrollY = window.scrollY;
      targetScrollY = rawScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth scroll damping
      const scrollDelta = targetScrollY - currentScrollY;
      currentScrollY += scrollDelta * 0.07;
      const instantVel = Math.abs(scrollDelta);
      scrollVelocity += (instantVel * 0.015 - scrollVelocity) * 0.12;

      // Normalized scroll progress across entire document (0.0 to 1.0)
      const docHeight = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const scrollProgress = Math.min(Math.max(currentScrollY / docHeight, 0), 1);

      // Update shader uniforms
      planetMat.uniforms.uTime.value = elapsedTime;
      nebulaMat.uniforms.uTime.value = elapsedTime;

      // Slow, majestic planetary rotation on tilted axis
      planetMesh.rotation.y = elapsedTime * 0.035 + scrollProgress * 1.4;

      // Secondary moon slow orbital drift
      moonMesh.position.x = 14.5 + Math.cos(elapsedTime * 0.06) * 2.5;
      moonMesh.position.z = -9.0 + Math.sin(elapsedTime * 0.06) * 3.0;
      moonMesh.rotation.y = elapsedTime * 0.018;

      // ----------------------------------------------------
      // UPDATE ASTEROID BELT & TUMBLE
      // ----------------------------------------------------
      asteroidBeltGroup.position.copy(planetMesh.position);

      for (let i = 0; i < beltCount; i++) {
        beltAngles[i] += beltSpeeds[i] * (1.0 + scrollVelocity * 2.5);
        beltRotations[i * 3] += beltRotSpeeds[i * 3];
        beltRotations[i * 3 + 1] += beltRotSpeeds[i * 3 + 1];
        beltRotations[i * 3 + 2] += beltRotSpeeds[i * 3 + 2];

        const r = beltRadii[i];
        const a = beltAngles[i];
        const x = Math.cos(a) * r;
        const z = Math.sin(a) * r;
        const y = beltYOffsets[i];

        dummy.position.set(x, y, z);
        dummy.rotation.set(
          beltRotations[i * 3],
          beltRotations[i * 3 + 1],
          beltRotations[i * 3 + 2]
        );
        dummy.scale.set(
          beltScales[i * 3],
          beltScales[i * 3 + 1],
          beltScales[i * 3 + 2]
        );
        dummy.updateMatrix();

        beltInstancedMesh.setMatrixAt(i, dummy.matrix);
      }
      beltInstancedMesh.instanceMatrix.needsUpdate = true;

      // ----------------------------------------------------
      // UPDATE FOREGROUND HERO ASTEROIDS (Slow cinematic tumble on right periphery)
      // ----------------------------------------------------
      heroAsteroid1.rotation.x += 0.0015;
      heroAsteroid1.rotation.y += 0.0022;
      heroAsteroid1.position.y = -4.6 + Math.sin(elapsedTime * 0.25) * 0.25 - scrollProgress * 2.2;

      heroAsteroid2.rotation.x -= 0.0018;
      heroAsteroid2.rotation.z += 0.0025;
      heroAsteroid2.position.y = 1.6 + Math.cos(elapsedTime * 0.28) * 0.2 - scrollProgress * 1.8;

      heroAsteroid3.rotation.y += 0.002;
      heroAsteroid3.rotation.z -= 0.0012;
      heroAsteroid3.position.y = 5.2 + Math.sin(elapsedTime * 0.2) * 0.25 - scrollProgress * 2.0;

      // ----------------------------------------------------
      // UPDATE SPACECRAFT MOTION (Stationed around right-side planet)
      // ----------------------------------------------------
      researchVessel1.position.x = 5.8 + Math.cos(elapsedTime * 0.22) * 0.4;
      researchVessel1.position.y = 2.2 + Math.sin(elapsedTime * 0.3) * 0.25 - scrollProgress * 1.5;
      researchVessel1.rotation.z = 0.18 + Math.sin(elapsedTime * 0.25) * 0.05;

      const v2Angle = elapsedTime * 0.12;
      researchVessel2.position.set(
        planetMesh.position.x + Math.cos(v2Angle) * 7.5,
        planetMesh.position.y + Math.sin(v2Angle * 0.6) * 2.6,
        planetMesh.position.z + Math.sin(v2Angle) * 7.5
      );
      researchVessel2.rotation.y = -v2Angle + Math.PI * 0.5;

      // ----------------------------------------------------
      // CINEMATIC 3D CAMERA JOURNEY (7-STAGE SPACE FLIGHT)
      // ----------------------------------------------------
      let targetCamX = 0;
      let targetCamY = 1.0;
      let targetCamZ = 22;
      let targetLookX = 2.8;
      let targetLookY = 0.2;
      let targetLookZ = 0;

      if (scrollProgress < 0.14) {
        // HERO: Approaches planet on right; typography crystal-clear in left cosmic void
        const p = scrollProgress / 0.14;
        targetCamX = THREE.MathUtils.lerp(0.0, 1.2, p);
        targetCamY = THREE.MathUtils.lerp(1.0, 0.7, p);
        targetCamZ = THREE.MathUtils.lerp(22.0, 18.0, p);
        targetLookX = THREE.MathUtils.lerp(2.8, 4.0, p);
        targetLookY = 0.2;
        targetLookZ = 0;
      } else if (scrollProgress < 0.28) {
        // ABOUT: Travels past the planet limb revealing craters & geological fault lines
        const p = (scrollProgress - 0.14) / 0.14;
        targetCamX = THREE.MathUtils.lerp(1.4, 4.2, p);
        targetCamY = THREE.MathUtils.lerp(0.7, 1.8, p);
        targetCamZ = THREE.MathUtils.lerp(18.0, 13.5, p);
        targetLookX = THREE.MathUtils.lerp(4.2, 5.5, p);
        targetLookY = THREE.MathUtils.lerp(0.2, 0.5, p);
        targetLookZ = 0;
      } else if (scrollProgress < 0.46) {
        // CHALLENGES: Dives directly into the asteroid field
        const p = (scrollProgress - 0.28) / 0.18;
        targetCamX = THREE.MathUtils.lerp(4.2, -2.8, p);
        targetCamY = THREE.MathUtils.lerp(1.8, -0.7, p);
        targetCamZ = THREE.MathUtils.lerp(13.5, 11.2, p);
        targetLookX = THREE.MathUtils.lerp(5.5, 0.0, p);
        targetLookY = -0.4;
        targetLookZ = 0;
      } else if (scrollProgress < 0.62) {
        // TIMELINE: Follows orbital flight trajectory
        const p = (scrollProgress - 0.46) / 0.16;
        targetCamX = THREE.MathUtils.lerp(-2.8, 2.0, p);
        targetCamY = THREE.MathUtils.lerp(-0.7, -2.6, p);
        targetCamZ = THREE.MathUtils.lerp(11.2, 9.5, p);
        targetLookX = THREE.MathUtils.lerp(0.0, 2.5, p);
        targetLookY = -2.2;
        targetLookZ = 0;
      } else if (scrollProgress < 0.76) {
        // JUDGING: Passes between towering asteroids with dramatic parallax
        const p = (scrollProgress - 0.62) / 0.14;
        targetCamX = THREE.MathUtils.lerp(2.0, -3.5, p);
        targetCamY = THREE.MathUtils.lerp(-2.6, -1.3, p);
        targetCamZ = THREE.MathUtils.lerp(9.5, 12.2, p);
        targetLookX = THREE.MathUtils.lerp(2.5, -1.0, p);
        targetLookY = -1.0;
        targetLookZ = 0;
      } else if (scrollProgress < 0.88) {
        // PRIZES: Approaches the cratered secondary moon
        const p = (scrollProgress - 0.76) / 0.12;
        targetCamX = THREE.MathUtils.lerp(-3.5, 5.5, p);
        targetCamY = THREE.MathUtils.lerp(-1.3, -2.9, p);
        targetCamZ = THREE.MathUtils.lerp(12.2, 8.2, p);
        targetLookX = THREE.MathUtils.lerp(-1.0, 12.5, p);
        targetLookY = -3.8;
        targetLookZ = -7.0;
      } else {
        // FINAL CTA: Grand pull-back into deep space revealing the complete planetary system
        const p = (scrollProgress - 0.88) / 0.12;
        targetCamX = THREE.MathUtils.lerp(5.5, 0.0, p);
        targetCamY = THREE.MathUtils.lerp(-2.9, 4.5, p);
        targetCamZ = THREE.MathUtils.lerp(8.2, 38.0, p);
        targetLookX = THREE.MathUtils.lerp(12.5, 2.0, p);
        targetLookY = THREE.MathUtils.lerp(-3.8, 0.0, p);
        targetLookZ = 0;
      }

      // Smooth camera interpolation with mouse tilt
      camera.position.x += (targetCamX + targetCameraTiltX - camera.position.x) * 0.045;
      camera.position.y += (targetCamY + targetCameraTiltY - camera.position.y) * 0.045;
      camera.position.z += (targetCamZ - camera.position.z) * 0.045;

      const currentLookAt = new THREE.Vector3(targetLookX, targetLookY, targetLookZ);
      camera.lookAt(currentLookAt);

      renderer.render(scene, camera);
    };

    animate();

    // ----------------------------------------------------
    // RESIZE & CLEANUP
    // ----------------------------------------------------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planetGeo.dispose();
      planetMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      moonGeo.dispose();
      moonMat.dispose();
      beltBaseGeo.dispose();
      heroGeo1.dispose();
      heroGeo2.dispose();
      heroGeo3.dispose();
      asteroidMaterial.dispose();
      nebulaGeo.dispose();
      nebulaMat.dispose();
      if (asteroidTextures.map) asteroidTextures.map.dispose();
      if (asteroidTextures.normalMap) asteroidTextures.normalMap.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
