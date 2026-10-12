// "Sunrise over the sea": the sun climbs out of a night sea and settles into
// the logo's own sun, the logo surfaces as a backlit silhouette, sunlight
// spreads colour across it, then a wave washes the scene away. One full-screen
// fragment shader draws every frame; this module only keys its uniforms.
import { LOGO_SHORE, LOGO_SUN } from './logoBitmap'

// Seconds.
export const SUNRISE = { leaveAt: 4.2, leave: 0.8, skip: 0.55 }

// Device pixels per CSS pixel for the scene, kept within a fill-rate budget.
export function sceneDpr(width, height) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  return Math.min(dpr, Math.sqrt(4.2e6 / (width * height)))
}

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const FRAGMENT = `
precision highp float;

uniform vec2 uRes;      // CSS px
uniform float uDpr;
uniform float uTime;
uniform float uExposure;
uniform float uDawn;
uniform float uZoom;
uniform float uLogo;
uniform float uSweep;
uniform float uSweepMax;
uniform float uFlare;
uniform float uWave;
uniform vec3 uSun;      // centre x, y and radius in CSS px
uniform float uShore;   // horizon line
uniform vec4 uRect;     // logo box
uniform sampler2D uLogoTex;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < OCTAVES; i++) {
    v += a * noise(p);
    p = p * 2.03 + 17.1;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y * uDpr - gl_FragCoord.y) / uDpr;
  vec2 centre = uRes * 0.5;
  vec2 p = centre + (frag - centre) / uZoom; // slow push-in towards the logo
  float t = uTime;
  vec2 sun = uSun.xy;
  float R = uSun.z;
  float d = distance(p, sun);
  vec3 warm = vec3(1.0, 0.66, 0.32);

  // Sky: night blues warming to amber at the horizon as the sun comes up.
  float above = clamp((uShore - p.y) / uShore, 0.0, 1.0);
  vec3 top = mix(vec3(0.012, 0.045, 0.075), vec3(0.035, 0.16, 0.25), uDawn);
  vec3 low = mix(vec3(0.035, 0.15, 0.21), vec3(0.95, 0.56, 0.3), uDawn);
  vec3 col = mix(low, top, pow(above, 0.55));
  col += warm * exp(-d / (R * 2.4)) * 0.55 * uDawn;
  col += vec3(1.0, 0.8, 0.5) * exp(-d / (R * 7.0)) * 0.22 * uDawn;

  float sky = step(p.y, uShore);
  float angle = atan(p.y - sun.y, p.x - sun.x);
  float rays = noise(vec2(angle * 9.0, t * 0.15)) * noise(vec2(angle * 23.0 + 3.0, -t * 0.1));
  col += vec3(1.0, 0.78, 0.45) * rays * rays * exp(-d / (R * 4.5)) * smoothstep(R * 0.9, R * 1.6, d) * uDawn * sky;

  float star = hash(floor(p / 3.0));
  col += step(0.9975, star) * (0.55 + 0.45 * sin(t * 3.0 + star * 90.0)) * (1.0 - uDawn) * above * 0.8;

  vec3 sunCol = mix(vec3(1.0, 0.64, 0.28), vec3(1.0, 0.94, 0.72), smoothstep(R, 0.0, d));
  col = mix(col, sunCol, smoothstep(R, R - 1.5, d) * sky);

  // Sea: perspective swell with a glittering path of sunlight.
  if (p.y > uShore) {
    float depth = (p.y - uShore) / max(uRes.y - uShore, 1.0);
    float z = 1.0 / (depth + 0.035);
    vec2 w = vec2((p.x - sun.x) / uRes.x * z * 1.6, z * 0.9 + t * 0.35);
    float swell = fbm(w * vec2(1.0, 3.0));
    float chop = fbm(w * vec2(2.3, 6.0) + 4.0);
    vec3 deep = mix(vec3(0.01, 0.06, 0.09), vec3(0.03, 0.14, 0.19), uDawn);
    col = mix(mix(low, top, 0.25) * 0.7, deep, smoothstep(0.0, 0.5, depth)) * (0.75 + 0.5 * swell);
    float spread = R * (0.6 + depth * 5.0);
    float path = exp(-pow((p.x - sun.x) / spread, 2.0));
    float glint = pow(clamp(chop * 1.6 - 0.55, 0.0, 1.0), 3.0);
    float streak = pow(0.5 + 0.5 * sin(z * 14.0 + swell * 9.0 + t * 1.3), 6.0);
    col += vec3(1.0, 0.78, 0.45) * path * (glint * 2.2 + streak * 0.35) * uDawn * (1.0 - depth * 0.4);
    col += vec3(1.0, 0.7, 0.38) * exp(-abs(p.x - sun.x) / (R * 0.7)) * exp(-(p.y - uShore) / (R * 0.6)) * 0.6 * uDawn;
  }
  col += vec3(1.0, 0.75, 0.5) * exp(-abs(p.y - uShore) / 3.0) * 0.25 * uDawn;

  // Logo: a backlit silhouette that sunlight colours outward from the sun.
  vec2 uv = (p - uRect.xy) / uRect.zw;
  if (uLogo > 0.0 && uv.x >= 0.0 && uv.y >= 0.0 && uv.x <= 1.0 && uv.y <= 1.0) {
    vec4 tex = texture2D(uLogoTex, uv); // premultiplied
    vec2 toSun = normalize(sun - p + 0.0001);
    float rim = clamp(tex.a - texture2D(uLogoTex, uv + toSun * 3.0 / uRect.zw).a, 0.0, 1.0);
    vec3 silhouette = (vec3(0.05, 0.035, 0.045) + warm * rim * 1.3) * tex.a;
    float reach = uSweep * uSweepMax;
    float lit = smoothstep(reach, reach - 70.0, d);
    float front = exp(-abs(d - reach) / 22.0) * step(0.001, uSweep) * (1.0 - smoothstep(0.85, 1.0, uSweep));
    vec3 logo = mix(silhouette, tex.rgb, lit) + vec3(1.0, 0.82, 0.55) * front * 0.55 * tex.a;
    col = col * (1.0 - tex.a * uLogo) + logo * uLogo;
  }

  // Until the light reaches it, the sun burns through the silhouette.
  float burn = (1.0 - smoothstep(0.0, 0.35, uSweep)) * uLogo;
  col = mix(col, sunCol, smoothstep(R * 1.02, R * 0.85, d) * burn * 0.82);
  col += vec3(1.0, 0.7, 0.35) * exp(-d / (R * 1.2)) * 0.3 * uDawn * (1.0 - smoothstep(0.2, 0.8, uSweep));

  // Lens flare as the sun locks into the logo.
  if (uFlare > 0.0) {
    vec2 axis = centre - sun;
    col += vec3(1.0, 0.85, 0.6) * exp(-d / (R * 3.0)) * 0.55 * uFlare;
    col += vec3(1.0, 0.82, 0.6) * exp(-abs(p.y - sun.y) / 2.5) * exp(-abs(p.x - sun.x) / (uRes.x * 0.3)) * 0.9 * uFlare;
    col += vec3(0.5, 0.9, 1.0) * smoothstep(R * 0.35, R * 0.2, distance(p, sun + axis * 1.3)) * 0.12 * uFlare;
    col += vec3(1.0, 0.6, 0.3) * smoothstep(R * 0.6, R * 0.35, distance(p, sun + axis * 1.8)) * 0.09 * uFlare;
    col += vec3(0.7, 1.0, 0.6) * smoothstep(R * 0.18, R * 0.1, distance(p, sun + axis * 0.6)) * 0.15 * uFlare;
  }

  vec2 v = frag / uRes - 0.5;
  col *= 1.0 - dot(v, v) * 0.55;
  col += (hash(frag + fract(t) * 100.0) - 0.5) * 0.025;
  col *= uExposure;

  // Exit: a wave rolls up the screen; behind its foam the page shows through.
  if (uWave > 0.0) {
    float crest = mix(uRes.y + 30.0, -260.0, uWave)
      + (noise(vec2(frag.x * 0.012, t * 1.5)) - 0.5) * 60.0
      + sin(frag.x * 0.018 + t * 4.0) * 10.0;
    float wash = frag.y - crest;
    if (wash > 0.0) {
      // Frothy crest, lace of foam trailing behind it, then clear turquoise water.
      vec2 q = frag * vec2(0.03, 0.05) + vec2(t * 0.6, t * 2.2);
      float lace = noise(q) * 0.65 + noise(q * 2.7 + 5.0) * 0.35;
      float crestFoam = 1.0 - smoothstep(0.0, 16.0 + lace * 26.0, wash);
      float trail = smoothstep(0.52, 0.7, lace) * (1.0 - smoothstep(30.0, 170.0, wash));
      float foam = max(crestFoam, trail * 0.85);
      float water = (1.0 - smoothstep(40.0, 320.0, wash)) * 0.7;
      float a = max(foam, water);
      vec3 sea = mix(vec3(0.16, 0.62, 0.66), vec3(0.06, 0.38, 0.46), smoothstep(0.0, 320.0, wash));
      vec3 wc = mix(sea, vec3(0.97, 0.99, 1.0), foam / max(a, 0.001));
      gl_FragColor = vec4(wc * a, a);
      return;
    }
    // The wave's lip catches the light just above the foam, with shade beyond it.
    col = mix(col, vec3(0.75, 0.93, 0.95), exp(wash / 5.0) * 0.6);
    col *= 1.0 - exp(wash / 40.0) * 0.3;
  }

  gl_FragColor = vec4(col, 1.0);
}
`

const clamp01 = (v) => Math.min(Math.max(v, 0), 1)
const ramp = (from, to, t) => clamp01((t - from) / (to - from))
const smooth = (from, to, t) => { const x = ramp(from, to, t); return x * x * (3 - 2 * x) }
const easeOut = (x) => 1 - (1 - x) ** 3
const easeInOut = (x) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2)
// The wave surges from the first frame and only eases off as it clears the top.
const surge = (x) => 1 - (1 - x) ** 1.6

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'Sunrise shader failed to compile')
  }
  return shader
}

export function createSunriseScene(canvas, { logo, rect, dpr, modest = false, onLeave }) {
  const width = window.innerWidth
  const height = window.innerHeight
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)

  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true })
  if (!gl) throw new Error('WebGL unavailable')

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, `#define OCTAVES ${modest ? 3 : 4}\n${FRAGMENT}`))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Sunrise program failed to link')
  gl.useProgram(program)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, logo)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  const u = {}
  for (const name of ['uRes', 'uDpr', 'uTime', 'uExposure', 'uDawn', 'uZoom', 'uLogo', 'uSweep', 'uSweepMax',
    'uFlare', 'uWave', 'uSun', 'uShore', 'uRect', 'uLogoTex']) {
    u[name] = gl.getUniformLocation(program, name)
  }

  // The sun ends exactly on the logo's sun; the horizon runs under the island.
  const sun = {
    x: rect.left + LOGO_SUN.x * rect.width,
    y: rect.top + LOGO_SUN.y * rect.height,
    r: LOGO_SUN.r * rect.width,
  }
  const shore = rect.top + LOGO_SHORE * rect.height
  const sweepMax = Math.max(
    ...[[rect.left, rect.top], [rect.right, rect.top], [rect.left, rect.bottom], [rect.right, rect.bottom]]
      .map(([x, y]) => Math.hypot(x - sun.x, y - sun.y)),
  ) + 80

  gl.uniform2f(u.uRes, width, height)
  gl.uniform1f(u.uDpr, dpr)
  gl.uniform1f(u.uShore, shore)
  gl.uniform1f(u.uSweepMax, sweepMax)
  gl.uniform4f(u.uRect, rect.left, rect.top, rect.width, rect.height)
  gl.uniform1i(u.uLogoTex, 0)
  gl.viewport(0, 0, canvas.width, canvas.height)

  // Drivers may compile lazily on the first draw. Pay that cost now, with the
  // screen still black, so it doesn't eat into the opening seconds.
  gl.uniform1f(u.uExposure, 0)
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4))

  let raf = 0
  let startedAt = 0
  let wave = null // { duration, startedAt }
  let finish
  const finished = new Promise((resolve) => { finish = resolve })

  function beginWave(seconds) {
    if (wave) return
    wave = { duration: seconds * 1000, startedAt: 0 }
    onLeave?.(seconds * 1000)
  }

  function frame(now) {
    startedAt ||= now
    const t = (now - startedAt) / 1000
    if (t >= SUNRISE.leaveAt) beginWave(SUNRISE.leave)

    // 0.5–2.8s the sun climbs from below the horizon onto the logo's sun.
    const rise = easeOut(ramp(0.5, 2.8, t))
    const sunY = shore + sun.r * 1.05 + (sun.y - shore - sun.r * 1.05) * rise
    const sunR = sun.r * (1.18 - 0.18 * rise)
    const flare = smooth(2.75, 2.95, t) * (1 - smooth(2.95, 3.9, t))

    let waveProgress = 0
    if (wave) {
      wave.startedAt ||= now
      waveProgress = surge(clamp01((now - wave.startedAt) / wave.duration))
    }

    gl.uniform1f(u.uTime, t)
    gl.uniform1f(u.uExposure, smooth(0, 0.6, t))
    gl.uniform1f(u.uDawn, easeInOut(ramp(0.3, 2.9, t)))
    gl.uniform1f(u.uZoom, 0.93 + 0.07 * easeOut(ramp(0, 2.9, t)))
    gl.uniform1f(u.uLogo, smooth(1.9, 2.8, t))
    gl.uniform1f(u.uSweep, easeOut(ramp(2.85, 3.75, t)))
    gl.uniform1f(u.uFlare, flare)
    gl.uniform1f(u.uWave, waveProgress)
    gl.uniform3f(u.uSun, sun.x, sunY, sunR)
    gl.drawArrays(gl.TRIANGLES, 0, 3)

    if (wave && waveProgress >= 1) {
      finish()
      return
    }
    raf = requestAnimationFrame(frame)
  }

  return {
    // Resolves once the wave has cleared the screen.
    start() {
      raf = requestAnimationFrame(frame)
      return finished
    },
    skip() {
      beginWave(SUNRISE.skip)
    },
    destroy() {
      cancelAnimationFrame(raf)
      finish()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
