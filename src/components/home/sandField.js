// WebGL sand storm: grains blow in from the left, swirl and settle onto the
// pixels of an image, then a gust carries them away again. All motion runs in
// the vertex shader from a handful of uniforms, so a frame costs one draw call.

const VERTEX = `
attribute vec2 aTarget;
attribute vec3 aColor;
attribute vec4 aSeed;
attribute float aDelay; // negative marks an ambient dust mote

uniform vec2 uRes;
uniform vec4 uBox; // logo x, y, width, height in CSS px
uniform float uTime;
uniform float uTrail; // > 0 draws a fading motion-blur ghost this many seconds behind
uniform float uFlight;
uniform float uExit;
uniform float uHide;
uniform float uStep;
uniform float uDpr;

varying vec4 vColor;
varying float vRound;

const vec3 SAND_LIGHT = vec3(0.914, 0.812, 0.596);
const vec3 SAND_DARK = vec3(0.788, 0.647, 0.396);

vec2 gust(vec2 p, float t, float s) {
  return vec2(
    sin(p.y * 0.011 + t * 2.3 + s * 6.28) + 0.5 * sin(p.y * 0.027 - t * 4.1 + s * 3.1) + 0.25 * sin(p.x * 0.05 + t * 7.0),
    cos(p.x * 0.009 + t * 1.9 + s * 5.0) + 0.5 * cos(p.x * 0.023 + t * 3.7 - s * 2.0) + 0.25 * sin(p.y * 0.06 - t * 6.3)
  );
}

void main() {
  vec3 sand = mix(SAND_LIGHT, SAND_DARK, aSeed.w);
  vec2 pos;
  vec3 color;
  float alpha;
  float size;
  float round;

  if (aDelay < 0.0) {
    float blow = uExit * uExit;
    pos = vec2(
      mod(aSeed.x * (uRes.x + 40.0) + uTime * (14.0 + aSeed.z * 36.0), uRes.x + 40.0) - 20.0 + blow * (500.0 + aSeed.y * 700.0),
      aSeed.y * uRes.y + sin(uTime * 0.8 + aSeed.w * 6.28) * 18.0 - blow * aSeed.z * 160.0
    );
    color = mix(sand, vec3(1.0), 0.4);
    alpha = (0.1 + aSeed.w * 0.3) * smoothstep(0.0, 0.8, uTime) * (1.0 - smoothstep(0.4, 1.0, uExit));
    size = 1.2 + aSeed.z * 2.4;
    round = 1.0;
  } else {
    // Arrival: a curved gust from off-screen left, turbulence dying out on landing.
    float time = uTime - uTrail;
    float t = clamp((time - aDelay) / uFlight, 0.0, 1.0);
    float e = t >= 1.0 ? 1.0 : 1.0 - pow(2.0, -9.0 * t);
    float u = 1.0 - e;
    vec2 spawn = vec2(-40.0 - aSeed.x * uRes.x * 0.35, aTarget.y + (aSeed.y - 0.5) * uRes.y * 0.9);
    vec2 swirl = mix(spawn, aTarget, 0.55) + vec2((aSeed.z - 0.5) * 420.0, (aSeed.x - 0.5) * uRes.y * 0.75);
    pos = u * u * spawn + 2.0 * u * e * swirl + e * e * aTarget;
    pos += gust(pos, time, aSeed.x) * 90.0 * u;

    // Departure: the gust lifts the left edge first and carries grains off right.
    float nx = clamp((aTarget.x - uBox.x) / uBox.z, 0.0, 1.0);
    float lift = clamp((uExit - nx * 0.4 - aSeed.y * 0.2) / 0.4, 0.0, 1.0);
    float l2 = lift * lift;
    pos += vec2(l2 * (uRes.x * 0.8 + aSeed.z * 500.0), -l2 * (80.0 + aSeed.x * 260.0));
    pos += gust(pos, uTime, aSeed.y) * 70.0 * lift;

    float bloom = smoothstep(0.72, 1.0, t) * (1.0 - smoothstep(0.0, 0.5, lift));
    color = mix(sand, aColor, bloom);
    float sparkle = step(0.94, aSeed.z) * clamp(1.0 - smoothstep(0.7, 1.0, t) + lift, 0.0, 1.0);
    color += sparkle * 0.55 * (0.5 + 0.5 * sin(uTime * 23.0 + aSeed.x * 60.0));
    alpha = mix(0.9, 1.0, bloom) * (1.0 - smoothstep(0.55, 1.0, lift)) * (1.0 - uHide);
    if (uTrail > 0.0) alpha *= 0.4 * (1.0 - smoothstep(0.8, 1.0, t)) * (1.0 - lift);
    size = uStep * mix(1.4 + aSeed.w * 1.0, 1.18, smoothstep(0.55, 1.0, t)) * mix(1.0, 1.5, lift);
    round = max(1.0 - smoothstep(0.85, 1.0, t), lift);
  }

  gl_Position = vec4(pos.x / uRes.x * 2.0 - 1.0, 1.0 - pos.y / uRes.y * 2.0, 0.0, 1.0);
  gl_PointSize = max(size * uDpr, 1.0);
  vColor = vec4(color, alpha);
  vRound = round;
}
`

const FRAGMENT = `
precision mediump float;
varying vec4 vColor;
varying float vRound;

void main() {
  float circle = 1.0 - smoothstep(0.3, 0.5, length(gl_PointCoord - 0.5));
  float a = vColor.a * mix(1.0, circle, vRound);
  if (a < 0.01) discard;
  gl_FragColor = vec4(vColor.rgb * a, a);
}
`

const STRIDE = 10 // target 2, colour 3, seed 4, delay 1
// Arrival schedule in seconds: first grains leave, left-to-right sweep, random spread.
const START = 0.05
const SWEEP = 0.65
const JITTER = 0.3
const TRAIL = 0.03

function compile(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) || 'Sand shader failed to compile')
  }
  return shader
}

// One grain per grid cell of the image's opaque pixels, sized to reach `count`.
function sample(image, rect, count) {
  const width = Math.max(1, Math.round(rect.width))
  const height = Math.max(1, Math.round(rect.height))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(image, 0, 0, width, height)
  const { data } = ctx.getImageData(0, 0, width, height)

  let opaque = 0
  for (let i = 3; i < data.length; i += 4) if (data[i] > 127) opaque++
  const step = Math.max(1, Math.sqrt(opaque / count))

  const grains = []
  for (let y = step / 2; y < height; y += step) {
    for (let x = step / 2; x < width; x += step) {
      const i = (Math.floor(y) * width + Math.floor(x)) * 4
      if (data[i + 3] > 127) {
        grains.push(rect.left + x, rect.top + y, data[i] / 255, data[i + 1] / 255, data[i + 2] / 255)
      }
    }
  }
  return { grains, step }
}

export function createSandField(canvas, { image, rect, count, dust = 300, flight = 1 }) {
  const width = window.innerWidth
  const height = window.innerHeight
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)

  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, premultipliedAlpha: true })
  if (!gl) throw new Error('WebGL unavailable')

  const program = gl.createProgram()
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Sand program failed to link')
  gl.useProgram(program)

  const { grains, step } = sample(image, rect, count)
  const grainCount = grains.length / 5
  const total = grainCount + dust
  const buffer = new Float32Array(total * STRIDE)
  for (let g = 0; g < grainCount; g++) {
    const o = g * STRIDE
    const x = grains[g * 5]
    for (let k = 0; k < 5; k++) buffer[o + k] = grains[g * 5 + k]
    for (let k = 5; k < 9; k++) buffer[o + k] = Math.random()
    // Sweep left to right across the logo, with jitter so it reads as a gust.
    buffer[o + 9] = START + ((x - rect.left) / rect.width) * SWEEP + Math.random() * JITTER
  }
  for (let d = grainCount; d < total; d++) {
    const o = d * STRIDE
    for (let k = 5; k < 9; k++) buffer[o + k] = Math.random()
    buffer[o + 9] = -1
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(gl.ARRAY_BUFFER, buffer, gl.STATIC_DRAW)
  let offset = 0
  for (const [name, size] of [['aTarget', 2], ['aColor', 3], ['aSeed', 4], ['aDelay', 1]]) {
    const location = gl.getAttribLocation(program, name)
    gl.enableVertexAttribArray(location)
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, STRIDE * 4, offset * 4)
    offset += size
  }

  const uniform = (name) => gl.getUniformLocation(program, name)
  const uTime = uniform('uTime')
  const uTrail = uniform('uTrail')
  const uExit = uniform('uExit')
  const uHide = uniform('uHide')
  gl.uniform2f(uniform('uRes'), width, height)
  gl.uniform4f(uniform('uBox'), rect.left, rect.top, rect.width, rect.height)
  gl.uniform1f(uniform('uFlight'), flight)
  gl.uniform1f(uniform('uStep'), step)
  gl.uniform1f(uniform('uDpr'), dpr)

  gl.viewport(0, 0, canvas.width, canvas.height)
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
  gl.clearColor(0, 0, 0, 0)

  let raf = 0
  let startedAt = 0
  let hidden = false
  let exit = null // { duration, startedAt, resolve, promise }

  function frame(now) {
    startedAt ||= now
    let exitProgress = 0
    if (exit) {
      exit.startedAt ||= now
      exitProgress = Math.min((now - exit.startedAt) / exit.duration, 1)
    }
    gl.uniform1f(uTime, (now - startedAt) / 1000)
    gl.uniform1f(uExit, exitProgress)
    gl.uniform1f(uHide, hidden && !exit ? 1 : 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    // Ghost pass first for motion blur, then the grains themselves.
    gl.uniform1f(uTrail, TRAIL)
    gl.drawArrays(gl.POINTS, 0, grainCount)
    gl.uniform1f(uTrail, 0)
    gl.drawArrays(gl.POINTS, 0, total)

    if (exitProgress >= 1) {
      exit.resolve()
      return
    }
    raf = requestAnimationFrame(frame)
  }

  return {
    // Seconds into the storm by which every grain has landed.
    landsBy: START + SWEEP + JITTER + flight,
    start() {
      raf = requestAnimationFrame(frame)
    },
    hide(value) {
      hidden = value
    },
    exit(duration) {
      if (!exit) {
        let resolve
        const promise = new Promise((done) => { resolve = done })
        exit = { duration, startedAt: 0, resolve, promise }
      }
      return exit.promise
    },
    destroy() {
      cancelAnimationFrame(raf)
      exit?.resolve()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    },
  }
}
