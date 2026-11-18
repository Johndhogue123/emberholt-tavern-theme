import type { EngineInterface, Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// The Tavern of Emberholt, as a page of the hold's illuminated chronicle. By day: parchment, oak-gall ink, rubric red,
// lapis blue and gold leaf (a light window). By night: the same page by candlelight (a dark window).
const DAY = makeColors({
  label: 'Emberholt Chronicle',
  only: 'light',
  roles: {
    accent: '#a8322a', // rubric red
    danger: '#8e2418', // a blot of sealing wax
    success: '#4f7a3a', // the vine in the margin
    warning: '#b0801c', // gold leaf
    pro: '#1f3a7a', // lapis blue
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e2cc9e', // the margins: old, sun-browned parchment
        'surface-1': '#f1e4c6', // a fresh leaf
        'surface-2': '#f6ecd4', // the scribe's best vellum
        'text-primary': '#2b1d12', // oak-gall ink
        'text-secondary': '#4a3624',
        'text-muted': '#655039',
      },
    },
  },
})
const NIGHT = makeColors({
  label: 'Emberholt Chronicle by Night',
  only: 'dark',
  roles: { accent: '#e07a5a', danger: '#e05a48', success: '#7ab05a', warning: '#e0b04a', pro: '#7a9ae0' },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#1f170e', // the page's edge, out of the candle's reach
        'surface-1': '#2a2016', // vellum by candlelight
        'surface-2': '#33271a',
        'surface-3': '#3a2d1e',
        'text-primary': '#f2e4c4', // candlelit ink
        'text-secondary': '#d8c4a0',
        'text-muted': '#b39c78',
      },
    },
  },
})

// The page itself, drawn behind the chat (generated: each scene is one SVG string). Keep @media rules and <filter>s
// out of it: in the desktop app either one freezes every animation in the scene.
const SCENE_DAY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><style>
  @keyframes flick { 0%,100% { transform: scale(1,1) } 20% { transform: scale(.92,1.14) } 45% { transform: scale(1.06,.9) } 70% { transform: scale(.96,1.1) } }
  .flame { transform-origin: 468px 878px; animation: flick 1.1s ease-in-out infinite }
  .flame.b { animation-duration: 1.5s; animation-delay: -.4s }
  @keyframes glow { 0%,100% { opacity: .35 } 50% { opacity: .7 } }
  .glow { animation: glow 2.3s ease-in-out infinite }
  @keyframes glint { 0%,80%,100% { opacity: .5 } 88% { opacity: 1 } }
  .glint { animation: glint 6s ease-in-out infinite }
  @keyframes sheen { 0%,70% { transform: translateX(-260px) } 100% { transform: translateX(260px) } }
  .sheen { animation: sheen 7s ease-in-out infinite }
  @keyframes sip { 0%,55%,100% { transform: rotate(0deg) } 65%,85% { transform: rotate(-55deg) } }
  .sip { transform-origin: 30px 40px; animation: sip 7s ease-in-out infinite }
  .sip.b { animation-delay: -3.2s; transform-origin: 10px 40px; animation-name: sip2 }
  @keyframes sip2 { 0%,55%,100% { transform: rotate(0deg) } 65%,85% { transform: rotate(55deg) } }
  @keyframes pour { 0%,40%,100% { transform: rotate(0deg) } 50%,75% { transform: rotate(-35deg) } }
  .pour { transform-origin: 30px 40px; animation: pour 9s ease-in-out infinite }
  @keyframes drip { 0%,52% { opacity: 0 } 56%,72% { opacity: 1 } 76%,100% { opacity: 0 } }
  .drip { animation: drip 9s linear infinite }
  @keyframes swing { 0%,100% { transform: rotate(-5deg) } 50% { transform: rotate(5deg) } }
  .sign { transform-origin: 1140px 790px; animation: swing 4s ease-in-out infinite }
  @keyframes tail { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(28deg) } }
  .tail { transform-origin: 2px 26px; animation: tail 1.6s ease-in-out infinite }
  @keyframes look { 0%,30%,100% { transform: translateY(0) } 40%,60% { transform: translateY(-5px) } }
  .cathead { animation: look 12s ease-in-out infinite }
  @keyframes scurry { 0%,8% { transform: translateX(0) } 30% { transform: translateX(400px) } 34%,46% { transform: translateX(400px) } 70% { transform: translateX(660px) } 70.1%,100% { transform: translateX(800px); opacity: 0 } }
  .mouse { animation: scurry 12s linear infinite }
  @keyframes feet { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
  .mouse .body { animation: feet .18s linear infinite }
  @keyframes hop { 0%,18% { transform: translate(0,0) } 22% { transform: translate(8px,-30px) } 26%,48% { transform: translate(16px,70px) } 52% { transform: translate(4px,40px) } 56%,78% { transform: translate(-6px,170px) } 84% { transform: translate(10px,80px) } 90%,100% { transform: translate(0,0) } }
  .bird { animation: hop 14s ease-in-out infinite }
  @keyframes peck { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(18deg) } }
  .bird .head { transform-origin: 32px -4px; animation: peck 1.4s ease-in-out infinite }
  @keyframes leaf { 0%,100% { transform: rotate(-6deg) } 50% { transform: rotate(6deg) } }
  .leaf { animation: leaf 3.5s ease-in-out infinite }
  @keyframes creep { 0% { transform: translateX(0) } 50% { transform: translateX(-46px) } 100% { transform: translateX(0) } }
  .snail { animation: creep 40s ease-in-out infinite }
  @keyframes eyes { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-12deg) } }
  .stalks { transform-origin: 112px 70px; animation: eyes 2.4s ease-in-out infinite }
  @keyframes lance { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-3deg) } }
  .knight { transform-origin: 50px 190px; animation: lance 3s ease-in-out infinite }
  @keyframes ears { 0%,86%,100% { transform: rotate(0deg) } 90% { transform: rotate(-16deg) } 94% { transform: rotate(6deg) } }
  .ears { transform-origin: 196px 196px; animation: ears 5s ease-in-out infinite }
  @keyframes wtail { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-10deg) } }
  .wtail { transform-origin: 196px 830px; animation: wtail 4s ease-in-out infinite }
  @keyframes blink { 0%,92%,100% { transform: scaleY(1) } 95% { transform: scaleY(.1) } }
  .blink { animation: blink 6s linear infinite }
  .blink.l { transform-origin: 1418px 214px } .blink.r { transform-origin: 1442px 214px }
  @keyframes zz { 0% { transform: translate(0,0); opacity: 0 } 25% { opacity: .9 } 100% { transform: translate(26px,-60px); opacity: 0 } }
  .zz { animation: zz 4s ease-out infinite; opacity: 0 }
  @keyframes berry { 0%,100% { opacity: 1 } 50% { opacity: .55 } }
  .berry { animation: berry 3s ease-in-out infinite }
  @keyframes nod { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(6deg) } }
  .nod { transform-origin: 62px 56px; animation: nod 4s ease-in-out infinite }
  @keyframes smoke { 0% { transform: translate(0,0) scale(.6); opacity: 0 } 20% { opacity: .5 } 100% { transform: translate(14px,-70px) scale(1.6); opacity: 0 } }
  .smoke { animation: smoke 5s ease-out infinite; opacity: 0 }
</style>
<defs>
<radialGradient id="parch" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#f6ead0"/><stop offset=".7" stop-color="#ecd9ae"/><stop offset="1" stop-color="#d9bf88"/></radialGradient>
<radialGradient id="stain" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#b98a48" stop-opacity=".16"/><stop offset="1" stop-color="#b98a48" stop-opacity="0"/></radialGradient>
<radialGradient id="candle" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc870" stop-opacity=".22"/><stop offset="1" stop-color="#ffc870" stop-opacity="0"/></radialGradient>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d27a"/><stop offset=".5" stop-color="#d4a43a"/><stop offset="1" stop-color="#8a6418"/></linearGradient>
<linearGradient id="sheenG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="gemR" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9a8a"/><stop offset=".45" stop-color="#a8322a"/><stop offset="1" stop-color="#6e1d18"/></radialGradient>
<radialGradient id="gemB" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9ab8ff"/><stop offset=".45" stop-color="#2b55b0"/><stop offset="1" stop-color="#142857"/></radialGradient>
<radialGradient id="fireGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb04a" stop-opacity=".8"/><stop offset="1" stop-color="#ffb04a" stop-opacity="0"/></radialGradient>
<pattern id="diaper" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#1f3a7a"/><path d="M0 0 L14 14 L0 28 M28 0 L14 14 L28 28" stroke="#d4a43a" stroke-width="1.2" fill="none"/><path d="M14 0 L28 14 L14 28 L0 14 Z" fill="#a8322a"/><circle cx="14" cy="14" r="2" fill="#f3d27a"/><circle cx="0" cy="0" r="1.6" fill="#f3d27a"/><circle cx="28" cy="28" r="1.6" fill="#f3d27a"/></pattern>
<pattern id="tiles" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#b8865a"/><path d="M0 0 H40 M0 10 H40 M0 20 H40 M10 0 V10 M30 10 V20" stroke="#7a5236" stroke-width="1.5"/><rect x="11" y="1" width="18" height="8" fill="#c99a6a"/></pattern>
<clipPath id="mini"><rect x="378" y="668" width="844" height="168" rx="6"/></clipPath>
<clipPath id="cap"><rect x="372" y="112" width="126" height="126"/></clipPath>
</defs>
<rect width="1600" height="1000" fill="url(#parch)"/><ellipse cx="240" cy="180" rx="260" ry="182" fill="url(#stain)"/><ellipse cx="1320" cy="260" rx="300" ry="210" fill="url(#stain)"/><ellipse cx="700" cy="520" rx="360" ry="251.99999999999997" fill="url(#stain)"/><ellipse cx="1100" cy="820" rx="280" ry="196" fill="url(#stain)"/><ellipse cx="300" cy="760" rx="240" ry="168" fill="url(#stain)"/><ellipse cx="960" cy="120" rx="200" ry="140" fill="url(#stain)"/>
<rect x="296" y="26" width="976" height="948" fill="none" stroke="url(#gold)" stroke-width="6"/>
<path fill-rule="evenodd" d="M300 30 H1268 V970 H300 Z M342 72 H1226 V928 H342 Z" fill="#1f3a7a"/>
<rect x="342" y="72" width="884" height="856" fill="none" stroke="#a8322a" stroke-width="3"/>
<rect x="348" y="78" width="872" height="844" fill="none" stroke="url(#gold)" stroke-width="1.5"/>
<ellipse cx="356.5" cy="59.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 356.5 59.8)"/>
<circle cx="356.5" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="417.6" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 417.6 38.2)"/>
<circle cx="417.6" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="478.7" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 478.7 59.8)"/>
<circle cx="478.7" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="539.7" cy="38.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 539.7 38.2)"/>
<circle cx="539.7" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="600.8" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 600.8 59.8)"/>
<circle cx="600.8" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="661.9" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 661.9 38.2)"/>
<circle cx="661.9" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="722.9" cy="59.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 722.9 59.8)"/>
<circle cx="722.9" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="784.0" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 784.0 38.2)"/>
<circle cx="784.0" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="845.1" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 845.1 59.8)"/>
<circle cx="845.1" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="906.1" cy="38.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 906.1 38.2)"/>
<circle cx="906.1" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="967.2" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 967.2 59.8)"/>
<circle cx="967.2" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1028.3" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1028.3 38.2)"/>
<circle cx="1028.3" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1089.3" cy="59.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 1089.3 59.8)"/>
<circle cx="1089.3" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1150.4" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1150.4 38.2)"/>
<circle cx="1150.4" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1211.5" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 1211.5 59.8)"/>
<circle cx="1211.5" cy="38.2" r="2.6" fill="#f6ead0"/>
<path d="M326 49 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0" fill="none" stroke="#d4a43a" stroke-width="3"/>
<ellipse cx="356.5" cy="961.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 356.5 961.8)"/>
<circle cx="356.5" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="417.6" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 417.6 940.2)"/>
<circle cx="417.6" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="478.7" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 478.7 961.8)"/>
<circle cx="478.7" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="539.7" cy="940.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 539.7 940.2)"/>
<circle cx="539.7" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="600.8" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 600.8 961.8)"/>
<circle cx="600.8" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="661.9" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 661.9 940.2)"/>
<circle cx="661.9" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="722.9" cy="961.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 722.9 961.8)"/>
<circle cx="722.9" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="784.0" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 784.0 940.2)"/>
<circle cx="784.0" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="845.1" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 845.1 961.8)"/>
<circle cx="845.1" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="906.1" cy="940.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 906.1 940.2)"/>
<circle cx="906.1" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="967.2" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 967.2 961.8)"/>
<circle cx="967.2" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1028.3" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1028.3 940.2)"/>
<circle cx="1028.3" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1089.3" cy="961.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 1089.3 961.8)"/>
<circle cx="1089.3" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1150.4" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1150.4 940.2)"/>
<circle cx="1150.4" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1211.5" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 1211.5 961.8)"/>
<circle cx="1211.5" cy="940.2" r="2.6" fill="#f6ead0"/>
<path d="M326 951 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0" fill="none" stroke="#d4a43a" stroke-width="3"/>
<ellipse cx="329.8" cy="85.6" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 329.8 85.6)"/>
<circle cx="308.2" cy="85.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="144.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 144.8)"/>
<circle cx="329.8" cy="144.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="204.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 204.0)"/>
<circle cx="308.2" cy="204.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="263.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 308.2 263.2)"/>
<circle cx="329.8" cy="263.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="322.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 322.4)"/>
<circle cx="308.2" cy="322.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="381.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 381.6)"/>
<circle cx="329.8" cy="381.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="440.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 329.8 440.8)"/>
<circle cx="308.2" cy="440.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="500.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 500.0)"/>
<circle cx="329.8" cy="500.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="559.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 559.2)"/>
<circle cx="308.2" cy="559.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="618.4" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 308.2 618.4)"/>
<circle cx="329.8" cy="618.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="677.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 677.6)"/>
<circle cx="308.2" cy="677.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="736.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 736.8)"/>
<circle cx="329.8" cy="736.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="796.0" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 329.8 796.0)"/>
<circle cx="308.2" cy="796.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="855.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 855.2)"/>
<circle cx="329.8" cy="855.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="914.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 914.4)"/>
<circle cx="308.2" cy="914.4" r="2.6" fill="#f6ead0"/>
<path d="M319 56 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2" fill="none" stroke="#d4a43a" stroke-width="3"/>
<ellipse cx="1259.8" cy="85.6" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 1259.8 85.6)"/>
<circle cx="1238.2" cy="85.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="144.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 144.8)"/>
<circle cx="1259.8" cy="144.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="204.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 204.0)"/>
<circle cx="1238.2" cy="204.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="263.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 1238.2 263.2)"/>
<circle cx="1259.8" cy="263.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="322.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 322.4)"/>
<circle cx="1238.2" cy="322.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="381.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 381.6)"/>
<circle cx="1259.8" cy="381.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="440.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 1259.8 440.8)"/>
<circle cx="1238.2" cy="440.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="500.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 500.0)"/>
<circle cx="1259.8" cy="500.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="559.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 559.2)"/>
<circle cx="1238.2" cy="559.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="618.4" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 1238.2 618.4)"/>
<circle cx="1259.8" cy="618.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="677.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 677.6)"/>
<circle cx="1238.2" cy="677.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="736.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 736.8)"/>
<circle cx="1259.8" cy="736.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="796.0" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 1259.8 796.0)"/>
<circle cx="1238.2" cy="796.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="855.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 855.2)"/>
<circle cx="1259.8" cy="855.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="914.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 914.4)"/>
<circle cx="1238.2" cy="914.4" r="2.6" fill="#f6ead0"/>
<path d="M1249 56 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2" fill="none" stroke="#d4a43a" stroke-width="3"/>
<g><rect x="300" y="30" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 321 51)"/><circle cx="321" cy="51" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-0s" cx="316.45" cy="46.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="1226" y="30" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1247 51)"/><circle cx="1247" cy="51" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-1.7s" cx="1242.45" cy="46.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="300" y="928" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 321 949)"/><circle cx="321" cy="949" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-3.4s" cx="316.45" cy="944.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="1226" y="928" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1247 949)"/><circle cx="1247" cy="949" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-5.1s" cx="1242.45" cy="944.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="522" y="33" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 540 51)"/><circle cx="540" cy="51" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-0.7999999999999998s" cx="536.5" cy="47.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="766" y="33" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 784 51)"/><circle cx="784" cy="51" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-2.5s" cx="780.5" cy="47.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="1010" y="33" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1028 51)"/><circle cx="1028" cy="51" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-4.199999999999999s" cx="1024.5" cy="47.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="522" y="931" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 540 949)"/><circle cx="540" cy="949" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-5.9s" cx="536.5" cy="945.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="1010" y="931" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1028 949)"/><circle cx="1028" cy="949" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-1.5999999999999996s" cx="1024.5" cy="945.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="303" y="482" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 321 500)"/><circle cx="321" cy="500" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-3.299999999999999s" cx="317.5" cy="496.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="1229" y="482" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1247 500)"/><circle cx="1247" cy="500" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-5s" cx="1243.5" cy="496.5" r="2.8000000000000003" fill="#fff"/></g>
<g transform="translate(372 112) scale(2.1)">
    <path d="M1.2 1.6 58.6 1 59 58.7 1 58.9Z" fill="#7a1e14"/>
    <path d="M3.4 3.6 56.5 3.2 56.8 56.6 3.1 56.9Z" fill="#e0b954"/>
    <path d="M5.6 5.8 54.4 5.5 54.5 54.4 5.4 54.6Z" fill="#23386a"/>
    <g fill="none" stroke="#e9c766" stroke-width="1.3" stroke-linecap="round">
    <path d="M8 52C11 44 7 37 13 31S12 18 9 14C13 15 15 11 13 8"/>
    <path d="M13 31c4 1 6-2 4-5s-5 0-3 2"/>
    <path d="M52 8C49 16 53 23 47 29S48 42 51 46C47 45 45 49 47 52"/>
    <path d="M47 29c-4-1-6 2-4 5s5 0 3-2"/>
    <path d="M10 9c4-2 9 0 12-3"/>
    <path d="M50 51c-4 2-9 0-12 3"/>
    <path d="M22 52c3-3 7-2 9-5"/>
    <path d="M38 8c-3 3-7 2-9 5"/></g>
    <g fill="#5d8a3a" stroke="#2c4a1c" stroke-width=".5">
    <path d="M9 14c-4-2-5-6-3-8 3 1 4 5 3 8z"/>
    <path d="M13 31c-4 0-6-3-5-6 3 0 5 3 5 6z"/>
    <path d="M8 52c-3-3-2-7 1-8 1 3 1 6-1 8z"/>
    <path d="M51 46c4 2 5 6 3 8-3-1-4-5-3-8z"/>
    <path d="M47 29c4 0 6 3 5 6-3 0-5-3-5-6z"/>
    <path d="M52 8c3 3 2 7-1 8-1-3-1-6 1-8z"/>
    <path d="M22 6c2-3 6-3 7-1-2 2-5 2-7 1z"/>
    <path d="M38 54c-2 3-6 3-7 1 2-2 5-2 7-1z"/></g>
    <g fill="#c0392b">
    <circle cx="17" cy="44" r="1.4"/>
    <circle cx="43" cy="16" r="1.4"/>
    <circle cx="30" cy="50" r="1.1"/>
    <circle cx="30" cy="10" r="1.1"/></g>
    <g fill="#f6ecd0">
    <circle cx="15" cy="20" r=".8"/>
    <circle cx="45" cy="40" r=".8"/>
    <circle cx="20" cy="9" r=".7"/>
    <circle cx="40" cy="51" r=".7"/>
    <circle cx="11" cy="40" r=".7"/>
    <circle cx="49" cy="20" r=".7"/></g>
    <path d="M43.47 16.60L43.47 16.60L39.81 20.86Q36.46 18.54 33.26 18.09L33.26 18.09Q33.07 19.93 33.00 22.30L33.00 22.30L41.88 22.30L41.88 27.37L33.11 27.37Q33.17 29.82 33.60 33.06L33.60 33.06L28.66 34.87Q32.72 38.52 39.96 38.52L39.96 38.52Q40.78 38.52 41.64 38.47L41.64 38.47L36.93 44.83Q27.80 43.85 22.89 38.39Q17.99 32.93 17.99 22.30L17.99 22.30L34.66 12.52Q37.69 14.61 43.47 16.60ZM27.01 33.10L27.01 33.10L28.60 32.57Q27.95 27.86 27.95 24.42Q27.95 20.99 28.06 18.92L28.06 18.92Q26.77 19.57 25.97 20.43Q25.16 21.29 24.81 22.09Q24.45 22.90 24.45 24.37Q24.45 25.84 24.50 26.59L24.50 26.59Q24.65 29.99 27.01 33.10Z" fill="#f8ecc6" stroke="#7a1e14" stroke-width="2.6" stroke-linejoin="round" paint-order="stroke"/>
  </g>
<g clip-path="url(#cap)"><rect class="sheen" x="300" y="80" width="90" height="200" fill="url(#sheenG)" transform="rotate(0)"/></g>
<path transform="translate(520 170) scale(.92)" d="M0.9-27.4L0.9-27.4Q7.5-31.1 13.6-34.5L13.6-34.5Q18.7-32.2 23.4-31.1L23.4-31.1L17.2-26.8Q15.7-27.1 14.5-27.7Q13.2-28.3 12.3-28.6Q11.4-28.8 10.6-28.8Q9.9-28.8 9.3-28.1Q8.8-27.4 8.8-26.8Q8.8-26.1 8.8-25.9L8.8-25.9L8.8-19.8L17.0-24.9Q22.5-20.0 27.2-13.5L27.2-13.5Q25.3-8.0 22.8-2.9Q20.3 2.2 16.4 6.5L16.4 6.5Q14.7 8.4 13.2 8.4L13.2 8.4Q12.2 8.4 11.5 7.8Q10.8 7.2 10.2 6.7Q9.6 6.2 9.0 5.6L9.0 5.6Q15.3 4.1 17.8-0.7L17.8-0.7Q19.5-4.0 19.5-7.2L19.5-7.2Q19.5-8.7 19.0-10.6Q18.6-12.4 16.2-16.3L16.2-16.3Q14.6-18.7 12.6-18.7L12.6-18.7Q11.3-18.7 9.9-17.9L9.9-17.9Q9.5-17.6 8.8-17.1L8.8-17.1L8.7-10.4Q8.7-9.5 9.2-9.2Q9.7-8.9 10.5-8.6Q11.3-8.4 12.5-7.9Q13.8-7.5 15.7-7.5L15.7-7.5L10.7-0.7Q4.8-2.0 0.6-4.2L0.6-4.2Q2.2-10.2 2.2-16.0Q2.2-21.9 0.9-27.4ZM39.3-0.7L39.3-0.7L28.6-5.0Q29.2-8.4 29.2-12.0Q29.2-15.7 28.5-19.6L28.5-19.6L36.2-24.2L36.2-24.3L36.3-24.2L36.3-24.2L45.0-18.0L35.9-8.4Q36.9-7.3 38.0-7.2Q39.1-7.1 39.8-7.1Q40.6-7.1 41.6-7.2Q42.6-7.2 44.0-7.3L44.0-7.3Q42.8-5.6 41.7-4.0Q40.5-2.3 39.3-0.7ZM35.6-18.2L35.6-18.2Q34.3-18.2 34.3-14.6L34.3-14.6Q34.3-12.6 35.0-10.6L35.0-10.6Q35.0-10.4 35.0-10.3L35.0-10.3L38.7-14.1Q39.0-14.5 39.0-14.9Q39.0-15.3 38.6-15.9Q38.3-16.6 37.8-17.0L37.8-17.0Q36.4-18.2 35.6-18.2ZM49.7-24.3L54.4-21.0L57.3-23.9Q61.8-20.8 63.4-17.6L63.4-17.6L59.8-12.8Q59.2-14.6 58.1-15.9Q57.1-17.3 54.7-18.7L54.7-18.7L53.9-17.7L53.5-10.0Q53.4-8.8 55.0-7.6Q56.5-6.3 57.4-6.0L57.4-6.0L53.7-0.7L46.7-6.1Q48.0-7.6 48.0-9.2L48.0-9.2L48.0-17.8Q47.9-18.9 46.3-20.0L46.3-20.0L49.7-24.3ZM75.4-0.7L75.4-0.7L64.6-5.0Q65.2-8.4 65.2-12.0Q65.2-15.7 64.5-19.6L64.5-19.6L72.3-24.2L72.3-24.3L72.3-24.2L72.3-24.2L81.1-18.0L72.0-8.4Q72.9-7.3 74.0-7.2Q75.2-7.1 75.9-7.1Q76.6-7.1 77.6-7.2Q78.6-7.2 80.1-7.3L80.1-7.3Q78.9-5.6 77.7-4.0Q76.5-2.3 75.4-0.7ZM71.7-18.2L71.7-18.2Q70.3-18.2 70.3-14.6L70.3-14.6Q70.3-12.6 71.0-10.6L71.0-10.6Q71.0-10.4 71.1-10.3L71.1-10.3L74.7-14.1Q75.1-14.5 75.1-14.9Q75.1-15.3 74.7-15.9Q74.3-16.6 73.9-17.0L73.9-17.0Q72.5-18.2 71.7-18.2ZM93.5-29.1L93.5-29.1L93.7-30.1Q98.2-31.7 103.3-34.5L103.3-34.5L104.8-33.6Q101.6-31.7 101.5-26.4L101.5-26.4L101.5-21.8L105.3-24.7Q107.0-24.0 108.4-21.9L108.4-21.9Q111.3-17.7 111.8-13.0L111.8-13.0Q111.9-12.4 111.9-11.5Q111.9-10.6 111.4-10.0L111.4-10.0L104.0-0.3L94.3-5.1Q94.9-6.3 95.4-7.7Q95.9-9.1 95.9-10.7L95.9-10.7L95.7-26.3Q95.7-27.9 93.5-29.1ZM101.5-19.1L101.5-19.1L101.5-9.4Q101.7-8.2 103.0-7.6Q104.3-7.0 104.8-7.0Q105.3-7.0 105.4-7.1L105.4-7.1Q107.4-7.5 107.4-9.6L107.4-9.6Q107.4-10.1 107.3-10.6L107.3-10.6Q106.5-14.4 105.0-16.4Q103.6-18.3 101.5-19.1ZM124.1-0.7L124.1-0.7L113.4-5.0Q114.0-8.4 114.0-12.0Q114.0-15.7 113.3-19.6L113.3-19.6L121.0-24.2L121.0-24.3L121.1-24.2L121.1-24.2L129.8-18.0L120.8-8.4Q121.7-7.3 122.8-7.2Q123.9-7.1 124.6-7.1Q125.4-7.1 126.4-7.2Q127.4-7.2 128.8-7.3L128.8-7.3Q127.6-5.6 126.5-4.0Q125.3-2.3 124.1-0.7ZM120.4-18.2L120.4-18.2Q119.1-18.2 119.1-14.6L119.1-14.6Q119.1-12.6 119.8-10.6L119.8-10.6Q119.8-10.4 119.9-10.3L119.9-10.3L123.5-14.1Q123.8-14.5 123.8-14.9Q123.8-15.3 123.5-15.9Q123.1-16.6 122.7-17.0L122.7-17.0Q121.2-18.2 120.4-18.2ZM131.8-17.0L131.8-17.0L140.6-24.2L150.0-19.5Q148.2-18.0 148.2-16.1L148.2-16.1L148.2-8.6Q148.1-7.9 149.5-5.6Q150.8-3.3 151.5-2.7L151.5-2.7L142.6 7.4Q137.4 6.3 131.0 5.8L131.0 5.8L136.8-1.5Q133.9-2.7 131.8-4.5L131.8-4.5Q132.6-5.5 132.8-7.6L132.8-7.6L132.7-14.4Q132.8-15.9 131.8-17.0ZM144.7 2.1L146.0 0.3Q143.4-2.6 143.2-6.9L143.2-6.9L137.1 1.0Q140.6 1.0 144.7 2.1L144.7 2.1ZM140.1-5.7L143.1-9.5L143.0-16.9L139.0-18.8Q137.7-16.8 137.7-15.3L137.7-15.3L137.7-9.8Q137.7-8.1 138.2-7.5Q138.7-6.8 139.1-6.4Q139.5-6.0 140.1-5.7L140.1-5.7ZM152.7-20.0L152.7-20.0L156.1-24.3L161.2-21.9Q160.9-21.0 160.6-20.1Q160.3-19.2 160.3-18.3L160.3-18.3L159.9-9.2Q159.9-9.1 159.9-9.0L159.9-9.0Q159.9-7.9 160.6-7.2Q161.3-6.5 162.2-6.2L162.2-6.2L157.7-0.7L152.9-4.5Q154.2-6.1 154.2-7.6L154.2-7.6L154.4-17.8Q154.4-18.9 152.7-20.0ZM161.9-30.7L153.4-24.5L155.2-33.3L161.9-30.7ZM167.0-24.3L171.7-21.0L174.3-24.3L181.5-19.1L180.8-16.4L180.5-9.2Q180.5-9.1 180.5-9.1L180.5-9.1Q180.5-8.0 181.2-7.2Q181.9-6.5 182.7-6.2L182.7-6.2L178.3-0.7Q176.6-2.0 175.7-3.0Q174.8-4.0 174.8-7.2L174.8-7.2Q174.8-7.4 174.8-7.6L174.8-7.6L175.0-15.9Q175.0-16.9 172.1-19.1L172.1-19.1L171.2-17.7L170.8-9.2Q170.8-9.1 170.8-9.1L170.8-9.1Q170.8-8.0 171.4-7.2Q172.1-6.5 173.0-6.2L173.0-6.2L168.5-0.7L163.8-4.5Q165.0-6.1 165.0-7.6L165.0-7.6L165.2-17.8Q165.2-18.9 163.6-20.0L163.6-20.0L167.0-24.3ZM187.8-24.3L192.6-21.0L195.2-24.3L202.4-19.1L201.7-16.4L201.4-9.2Q201.4-9.1 201.4-9.1L201.4-9.1Q201.4-8.0 202.1-7.2Q202.8-6.5 203.6-6.2L203.6-6.2L199.1-0.7Q197.5-2.0 196.6-3.0Q195.7-4.0 195.7-7.2L195.7-7.2Q195.7-7.4 195.7-7.6L195.7-7.6L195.8-15.9Q195.8-16.9 193.0-19.1L193.0-19.1L192.1-17.7L191.6-9.2Q191.6-9.1 191.6-9.1L191.6-9.1Q191.6-8.0 192.3-7.2Q193.0-6.5 193.9-6.2L193.9-6.2L189.4-0.7L184.6-4.5Q185.9-6.1 185.9-7.6L185.9-7.6L186.1-17.8Q186.1-18.9 184.4-20.0L184.4-20.0L187.8-24.3ZM216.1-0.7L216.1-0.7L205.3-5.0Q205.9-8.4 205.9-12.0Q205.9-15.7 205.2-19.6L205.2-19.6L213.0-24.2L213.0-24.3L213.0-24.2L213.0-24.2L221.8-18.0L212.7-8.4Q213.6-7.3 214.7-7.2Q215.8-7.1 216.6-7.1Q217.3-7.1 218.3-7.2Q219.3-7.2 220.7-7.3L220.7-7.3Q219.6-5.6 218.4-4.0Q217.2-2.3 216.1-0.7ZM212.3-18.2L212.3-18.2Q211.0-18.2 211.0-14.6L211.0-14.6Q211.0-12.6 211.7-10.6L211.7-10.6Q211.7-10.4 211.8-10.3L211.8-10.3L215.4-14.1Q215.8-14.5 215.8-14.9Q215.8-15.3 215.4-15.9Q215.0-16.6 214.6-17.0L214.6-17.0Q213.2-18.2 212.3-18.2ZM234.2-6.2L234.2-6.2L229.2-0.7Q227.6-2.0 225.9-3.2Q224.3-4.5 222.6-5.8L222.6-5.8Q225.1-7.9 225.1-10.3L225.1-10.3L225.2-19.7L223.3-19.7L223.3-21.4Q226.3-25.8 231.0-32.8L231.0-32.8L232.1-32.6Q231.6-30.1 231.2-28.6Q230.8-27.0 230.7-24.6L230.7-24.6L234.7-24.6L234.7-19.8L230.7-19.8L230.6-10.2Q230.6-8.5 230.9-8.3Q231.2-8.1 234.2-6.2ZM247.3-5.8L247.3-5.8Q243.4-1.5 242.3-0.3L242.3-0.3Q240.6-1.6 239.0-2.9Q237.3-4.1 235.7-5.4L235.7-5.4Q237.2-6.7 237.7-7.8Q238.2-9.0 238.2-10.0L238.2-10.0L238.3-23.6Q238.3-25.0 238.2-27.0Q238.1-29.1 237.2-30.5L237.2-30.5L244.6-34.5Q244.0-31.8 243.9-28.9Q243.8-26.0 243.8-23L243.8-23L243.8-20.9L248.2-24.3Q254.4-18.3 254.4-10.7L254.4-10.7Q254.4-2.3 247.9 7.7L247.9 7.7L244.6 6.6Q249.6 1.1 249.6-6.0L249.6-6.0Q249.6-13.6 243.8-18.7L243.8-18.7L243.7-9.8Q243.7-8.1 244.0-7.9Q244.3-7.7 247.3-5.8ZM278.5-6.2L278.5-6.2L273.5-0.7Q271.9-2.0 270.2-3.2Q268.5-4.5 266.9-5.8L266.9-5.8Q269.4-7.9 269.4-10.3L269.4-10.3L269.5-19.7L267.6-19.7L267.6-21.4Q270.6-25.8 275.3-32.8L275.3-32.8L276.4-32.6Q275.9-30.1 275.5-28.6Q275.1-27.0 275.0-24.6L275.0-24.6L279.0-24.6L279.0-19.8L275.0-19.8L274.9-10.2Q274.9-8.5 275.2-8.3Q275.5-8.1 278.5-6.2ZM291.6-5.8L291.6-5.8Q287.7-1.5 286.6-0.3L286.6-0.3Q284.9-1.6 283.3-2.9Q281.6-4.1 280.0-5.4L280.0-5.4Q281.5-6.7 282.0-7.8Q282.5-9.0 282.5-10.0L282.5-10.0L282.6-23.6Q282.6-25.0 282.5-27.0Q282.4-29.1 281.5-30.5L281.5-30.5L288.9-34.5Q288.3-31.8 288.2-28.9Q288.1-26.0 288.1-23L288.1-23L288.1-20.9L292.5-24.3Q298.7-18.3 298.7-10.7L298.7-10.7Q298.7-2.3 292.2 7.7L292.2 7.7L288.8 6.6Q293.9 1.1 293.9-6.0L293.9-6.0Q293.9-13.6 288.1-18.7L288.1-18.7L288.0-9.8Q288.0-8.1 288.3-7.9Q288.6-7.7 291.6-5.8ZM311.2-0.7L311.2-0.7L300.5-5.0Q301.1-8.4 301.1-12.0Q301.1-15.7 300.4-19.6L300.4-19.6L308.1-24.2L308.1-24.3L308.2-24.2L308.2-24.2L316.9-18.0L307.8-8.4Q308.8-7.3 309.9-7.2Q311.0-7.1 311.7-7.1Q312.5-7.1 313.5-7.2Q314.5-7.2 315.9-7.3L315.9-7.3Q314.7-5.6 313.6-4.0Q312.4-2.3 311.2-0.7ZM307.5-18.2L307.5-18.2Q306.2-18.2 306.2-14.6L306.2-14.6Q306.2-12.6 306.9-10.6L306.9-10.6Q306.9-10.4 307.0-10.3L307.0-10.3L310.6-14.1Q310.9-14.5 310.9-14.9Q310.9-15.3 310.6-15.9Q310.2-16.6 309.8-17.0L309.8-17.0Q308.3-18.2 307.5-18.2ZM329.2-16.4L329.2-16.4Q333.4-22.1 340.1-28.3L340.1-28.3Q339.0-29.2 337.7-29.2L337.7-29.2Q336.0-29.2 330.3-26.8L330.3-26.8L335.7-35.1Q342.3-34.4 347.9-34.4Q353.5-34.4 358.6-35.1L358.6-35.1Q356.1-29.3 355.2-27.0L355.2-27.0Q352.7-28.1 350.0-28.7L350.0-28.7L350.2-10.2Q346.2-9.8 342.6-7.3L342.6-7.3Q345.5-5.0 349.5-5.0Q353.6-5.0 358.3-7.4L358.3-7.4Q358.2-5.9 358.2-4.4L358.2-4.4Q345.8 1.3 339.1-2.6Q332.3-6.4 329.2-16.4ZM342.3-25.9L342.3-25.9Q338.9-22.7 338.2-19.2L338.2-19.2Q338.0-18.0 338.0-16.3Q338.0-14.6 338.9-12.5Q339.7-10.4 341.1-8.9L341.1-8.9Q342.7-10.5 342.8-13.8L342.8-13.8Q342.9-20.0 342.9-22.2Q342.9-24.4 342.3-25.9ZM357.8-17.0L357.8-17.0L366.5-24.2L376.5-19.5Q374.7-18.0 374.7-16.1L374.7-16.1L374.6-8.6Q374.6-7.9 375.4-6.9Q376.2-6.0 376.9-5.4L376.9-5.4L372.4-0.7L368.9-4.3Q367.6-3.3 366.4-2.4Q365.1-1.6 364.1-0.7L364.1-0.7Q360.7-1.9 357.8-4.5L357.8-4.5Q358.6-5.6 358.7-7.6L358.7-7.6L358.7-14.4Q358.7-14.5 358.7-14.6L358.7-14.6Q358.7-15.9 357.8-17.0ZM369.0-16.9L365.5-18.8Q364.2-16.8 364.2-15.3L364.2-15.3L364.2-9.8Q364.2-8.1 364.8-7.4L364.8-7.4Q365.3-6.6 365.7-6.1Q366.2-5.5 367.1-5.2L367.1-5.2L369.0-6.5L369.0-16.9ZM397.0-9.8L389.5-0.3Q381.8-3.3 379.1-4.5L379.1-4.5Q379.9-6.0 380.3-6.9Q380.7-7.7 380.8-10.3L380.8-10.3L380.8-14.9Q380.8-16.7 379.3-17.7Q377.8-18.8 377.3-19.2L377.3-19.2L382.3-24.3L386.6-20.4L389.8-24.3Q391.5-23.6 393.2-21.7L393.2-21.7Q397.0-17.6 397.7-13.2L397.7-13.2Q397.8-12.7 397.8-12.2L397.8-12.2Q397.8-10.7 397.0-9.8L397.0-9.8ZM386.6-15.8L386.5-8.3Q389.6-6.9 390.7-6.9L390.7-6.9Q390.9-6.9 391-6.9L391-6.9Q392.9-7.4 392.9-9.4L392.9-9.4Q392.9-9.9 392.8-10.5L392.8-10.5Q392.3-13.3 390.8-15.2Q389.3-17.1 387.7-18.1L387.7-18.1Q386.7-17.2 386.6-15.8L386.6-15.8ZM410.4-0.7L410.4-0.7L399.6-5.0Q400.3-8.4 400.3-12.0Q400.3-15.7 399.6-19.6L399.6-19.6L407.3-24.2L407.3-24.3L407.4-24.2L407.4-24.2L416.1-18.0L407.0-8.4Q407.9-7.3 409.1-7.2Q410.2-7.1 410.9-7.1Q411.6-7.1 412.6-7.2Q413.6-7.2 415.1-7.3L415.1-7.3Q413.9-5.6 412.7-4.0Q411.6-2.3 410.4-0.7ZM406.7-18.2L406.7-18.2Q405.4-18.2 405.4-14.6L405.4-14.6Q405.4-12.6 406.0-10.6L406.0-10.6Q406.0-10.4 406.1-10.3L406.1-10.3L409.7-14.1Q410.1-14.5 410.1-14.9Q410.1-15.3 409.7-15.9Q409.3-16.6 408.9-17.0L408.9-17.0Q407.5-18.2 406.7-18.2ZM420.8-24.3L425.4-21.0L428.4-23.9Q432.9-20.8 434.5-17.6L434.5-17.6L430.9-12.8Q430.3-14.6 429.2-15.9Q428.2-17.3 425.7-18.7L425.7-18.7L425.0-17.7L424.6-10.0Q424.5-8.8 426.1-7.6Q427.6-6.3 428.5-6.0L428.5-6.0L424.7-0.7L417.8-6.1Q419.0-7.6 419.1-9.2L419.1-9.2L419.0-17.8Q419.0-18.9 417.4-20.0L417.4-20.0L420.8-24.3ZM439.1-24.3L443.9-21.0L446.5-24.3L453.6-19.1L453.0-16.4L452.7-9.2Q452.7-9.1 452.7-9.1L452.7-9.1Q452.7-8.0 453.4-7.2Q454.0-6.5 454.9-6.2L454.9-6.2L450.4-0.7Q448.7-2.0 447.8-3.0Q447.0-4.0 447.0-7.2L447.0-7.2Q447.0-7.4 447.0-7.6L447.0-7.6L447.1-15.9Q447.1-16.9 444.2-19.1L444.2-19.1L443.3-17.7L442.9-9.2Q442.9-9.1 442.9-9.1L442.9-9.1Q442.9-8.0 443.6-7.2Q444.3-6.5 445.1-6.2L445.1-6.2L440.6-0.7L435.9-4.5Q437.2-6.1 437.2-7.6L437.2-7.6L437.4-17.8Q437.4-18.9 435.7-20.0L435.7-20.0L439.1-24.3ZM468.7-18.0L468.7-18.0Q473.9-21.5 477.4-24.3L477.4-24.3Q479.1-23.6 480.8-21.7L480.8-21.7Q484.6-17.6 485.3-13.2L485.3-13.2Q485.4-12.7 485.4-12.2L485.4-12.2Q485.4-10.7 484.6-9.8L484.6-9.8L477.1-0.3L467.5-5.1Q469.1-8.2 469.1-10.5L469.1-10.5L469.0-15.8Q468.9-17.4 468.7-18.0ZM474.7-18.8L474.7-18.8L474.6-9.2Q474.8-8.1 476.2-7.5Q477.5-6.9 478.0-6.9Q478.4-6.9 478.6-6.9L478.6-6.9Q480.6-7.4 480.6-9.4L480.6-9.4Q480.6-9.9 480.4-10.5L480.4-10.5Q479.7-14.2 478.2-16.1Q476.8-18.0 474.7-18.8ZM499.4-27.0L499.4-27.0Q497.8-28.0 495.5-28.3L495.5-28.3Q495.1-27.7 494.3-26.5L494.3-26.5Q494.7-25.6 494.9-24.3L494.9-24.3L498.6-24.3L498.6-18.6L495.3-18.6Q495.3-16.5 495.2-14.3Q495.1-12.2 495.1-10.3L495.1-10.3Q495.0-6.0 488.9 8.9L488.9 8.9Q488.1 8.0 487.1 7.8L487.1 7.8Q488.6 2.2 488.9-4.1Q489.2-10.5 489.2-14.7Q489.2-18.9 489.1-22.3L489.1-22.3Q489.1-24.1 487.3-25.5L487.3-25.5Q489.2-27.6 490.9-29.6Q492.5-31.6 494.4-33.6L494.4-33.6Q496.5-33.4 498.8-32.9Q501.2-32.4 503.5-32.0L503.5-32.0Q502.5-30.7 501.5-29.5Q500.5-28.2 499.4-27.0ZM537.2-30.2L537.2-30.2L533.4-25.8Q529.9-28.2 526.5-28.7L526.5-28.7Q526.3-26.7 526.2-24.3L526.2-24.3L535.5-24.3L535.5-19.0L526.3-19.0Q526.4-16.4 526.9-13.0L526.9-13.0L521.7-11.1Q525.9-7.3 533.5-7.3L533.5-7.3Q534.4-7.3 535.3-7.3L535.3-7.3L530.3-0.7Q520.8-1.7 515.7-7.4Q510.5-13.1 510.5-24.3L510.5-24.3L528.0-34.5Q531.1-32.3 537.2-30.2ZM520.0-13.0L520.0-13.0L521.6-13.5Q521.0-18.4 521.0-22.0Q521.0-25.6 521.1-27.8L521.1-27.8Q519.7-27.1 518.9-26.2Q518.0-25.3 517.7-24.5Q517.3-23.6 517.3-22.1Q517.3-20.6 517.3-19.8L517.3-19.8Q517.5-16.2 520.0-13.0ZM546.5-20.9L546.5-20.9L549.1-24.3L554.9-20.0L558.3-24.3L565.5-19.1L564.8-16.4L564.5-9.2Q564.5-9.1 564.5-9.0L564.5-9.0Q564.5-7.9 565.2-7.2Q565.8-6.5 566.7-6.2L566.7-6.2L562.2-0.7Q560.5-2.0 559.6-3.0Q558.8-4.0 558.8-7.2L558.8-7.2Q558.8-7.4 558.8-7.6L558.8-7.6L558.9-15.9Q558.9-16.8 556.5-18.9L556.5-18.9L555.6-17.3L555.3-9.2Q555.3-9.1 555.3-9.1L555.3-9.1Q555.3-8.0 555.9-7.2Q556.6-6.5 557.5-6.2L557.5-6.2L553.0-0.7L548.2-4.5Q549.5-6.0 549.5-7.6L549.5-7.6L549.7-15.9Q549.7-16.9 547.0-19.1L547.0-19.1L545.7-17.5L545.5-9.2Q545.5-8.0 546.2-7.3Q546.9-6.5 547.7-6.2L547.7-6.2L543.2-0.7L538.5-4.5Q539.8-6.1 539.8-7.6L539.8-7.6L540.0-17.8Q540.0-18.9 538.3-20.0L538.3-20.0L541.7-24.3L546.5-20.9ZM568.3-29.1L568.3-29.1L568.5-30.1Q573.0-31.7 578.2-34.5L578.2-34.5L579.6-33.6Q576.4-31.7 576.4-26.4L576.4-26.4L576.3-21.8L580.1-24.7Q581.8-24.0 583.2-21.9L583.2-21.9Q586.2-17.7 586.7-13.0L586.7-13.0Q586.7-12.4 586.7-11.5Q586.7-10.6 586.2-10.0L586.2-10.0L578.8-0.3L569.2-5.1Q569.7-6.3 570.2-7.7Q570.7-9.1 570.7-10.7L570.7-10.7L570.5-26.3Q570.5-27.9 568.3-29.1ZM576.3-19.1L576.3-19.1L576.3-9.4Q576.5-8.2 577.8-7.6Q579.2-7.0 579.6-7.0Q580.1-7.0 580.3-7.1L580.3-7.1Q582.2-7.5 582.2-9.6L582.2-9.6Q582.2-10.1 582.1-10.6L582.1-10.6Q581.3-14.4 579.9-16.4Q578.4-18.3 576.3-19.1ZM599.0-0.7L599.0-0.7L588.2-5.0Q588.8-8.4 588.8-12.0Q588.8-15.7 588.1-19.6L588.1-19.6L595.9-24.2L595.9-24.3L595.9-24.2L595.9-24.2L604.7-18.0L595.6-8.4Q596.5-7.3 597.6-7.2Q598.7-7.1 599.5-7.1Q600.2-7.1 601.2-7.2Q602.2-7.2 603.7-7.3L603.7-7.3Q602.5-5.6 601.3-4.0Q600.1-2.3 599.0-0.7ZM595.2-18.2L595.2-18.2Q593.9-18.2 593.9-14.6L593.9-14.6Q593.9-12.6 594.6-10.6L594.6-10.6Q594.6-10.4 594.7-10.3L594.7-10.3L598.3-14.1Q598.7-14.5 598.7-14.9Q598.7-15.3 598.3-15.9Q597.9-16.6 597.5-17.0L597.5-17.0Q596.1-18.2 595.2-18.2ZM609.3-24.3L614.0-21.0L616.9-23.9Q621.4-20.8 623.0-17.6L623.0-17.6L619.4-12.8Q618.8-14.6 617.8-15.9Q616.7-17.3 614.3-18.7L614.3-18.7L613.6-17.7L613.1-10.0Q613.1-8.8 614.6-7.6Q616.2-6.3 617.0-6.0L617.0-6.0L613.3-0.7L606.3-6.1Q607.6-7.6 607.6-9.2L607.6-9.2L607.6-17.8Q607.5-18.9 605.9-20.0L605.9-20.0L609.3-24.3ZM635.4-5.8L635.4-5.8Q631.5-1.5 630.4-0.3L630.4-0.3Q628.7-1.6 627.1-2.9Q625.4-4.1 623.8-5.4L623.8-5.4Q625.3-6.7 625.8-7.8Q626.3-9.0 626.3-10.0L626.3-10.0L626.4-23.6Q626.4-25.0 626.3-27.0Q626.2-29.1 625.3-30.5L625.3-30.5L632.7-34.5Q632.1-31.8 632.0-28.9Q631.9-26.0 631.9-23L631.9-23L631.9-20.9L636.3-24.3Q642.5-18.3 642.5-10.7L642.5-10.7Q642.5-2.3 636.0 7.7L636.0 7.7L632.7 6.6Q637.7 1.1 637.7-6.0L637.7-6.0Q637.7-13.6 631.9-18.7L631.9-18.7L631.8-9.8Q631.8-8.1 632.1-7.9Q632.4-7.7 635.4-5.8ZM645.2-18.0L645.2-18.0Q650.4-21.5 653.9-24.3L653.9-24.3Q655.6-23.6 657.3-21.7L657.3-21.7Q661.1-17.6 661.8-13.2L661.8-13.2Q661.9-12.7 661.9-12.2L661.9-12.2Q661.9-10.7 661.1-9.8L661.1-9.8L653.6-0.3L644.0-5.1Q645.5-8.2 645.5-10.5L645.5-10.5L645.5-15.8Q645.4-17.4 645.2-18.0ZM651.2-18.8L651.2-18.8L651.1-9.2Q651.3-8.1 652.7-7.5Q654.0-6.9 654.5-6.9Q654.9-6.9 655.1-6.9L655.1-6.9Q657.0-7.4 657.0-9.4L657.0-9.4Q657.0-9.9 656.9-10.5L656.9-10.5Q656.2-14.2 654.7-16.1Q653.3-18.0 651.2-18.8ZM674.8-5.8L674.8-5.8Q671.0-1.5 669.9-0.3L669.9-0.3Q668.2-1.6 666.5-2.9Q664.9-4.1 663.2-5.4L663.2-5.4Q664.8-6.7 665.2-7.8Q665.7-9.0 665.7-10.0L665.7-10.0L665.9-23.6Q665.9-25.0 665.7-27.0Q665.6-29.1 664.7-30.5L664.7-30.5L672.1-34.5Q671.5-31.8 671.4-28.9Q671.3-26.0 671.3-23L671.3-23L671.2-9.8Q671.2-8.1 671.6-7.9Q671.9-7.7 674.8-5.8ZM687.3-6.2L687.3-6.2L682.3-0.7Q680.6-2.0 679.0-3.2Q677.3-4.5 675.7-5.8L675.7-5.8Q678.1-7.9 678.2-10.3L678.2-10.3L678.3-19.7L676.3-19.7L676.3-21.4Q679.4-25.8 684.0-32.8L684.0-32.8L685.2-32.6Q684.7-30.1 684.3-28.6Q683.9-27.0 683.8-24.6L683.8-24.6L687.8-24.6L687.8-19.8L683.7-19.8L683.7-10.2Q683.7-8.5 684.0-8.3Q684.3-8.1 687.3-6.2Z" fill="#2b1d12"/>
<text x="522" y="202" font-family="'Palatino Linotype',Palatino,Georgia,serif" font-size="17" font-style="italic" fill="#a8322a" letter-spacing="1">wherein the ale is warm, the fire is warmer, and the cat is in charge</text>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 119px"><ellipse cx="208.1" cy="119" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 119)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="157.8" cy="111" r="7" fill="#a8322a"/><circle cx="157.8" cy="111" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 173px"><ellipse cx="143.9" cy="173" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 173)"/></g>
<circle cx="191.6" cy="179" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 227px"><ellipse cx="208.1" cy="227" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 198.1 227)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="157.8" cy="219" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="219" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:176px 281px"><ellipse cx="143.9" cy="281" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 281)"/></g>
<circle cx="191.6" cy="287" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 335px"><ellipse cx="208.1" cy="335" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 335)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="157.8" cy="327" r="7" fill="#a8322a"/><circle cx="157.8" cy="327" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 389px"><ellipse cx="143.9" cy="389" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 153.9 389)"/></g>
<circle cx="191.6" cy="395" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 443px"><ellipse cx="208.1" cy="443" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 443)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="157.8" cy="435" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="435" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:176px 497px"><ellipse cx="143.9" cy="497" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 497)"/></g>
<circle cx="191.6" cy="503" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 551px"><ellipse cx="208.1" cy="551" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 198.1 551)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="157.8" cy="543" r="7" fill="#a8322a"/><circle cx="157.8" cy="543" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 605px"><ellipse cx="143.9" cy="605" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 605)"/></g>
<circle cx="191.6" cy="611" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 659px"><ellipse cx="208.1" cy="659" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 659)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="157.8" cy="651" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="651" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:176px 713px"><ellipse cx="143.9" cy="713" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 153.9 713)"/></g>
<circle cx="191.6" cy="719" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 767px"><ellipse cx="208.1" cy="767" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 767)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="157.8" cy="759" r="7" fill="#a8322a"/><circle cx="157.8" cy="759" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 821px"><ellipse cx="143.9" cy="821" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 821)"/></g>
<circle cx="191.6" cy="827" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 875px"><ellipse cx="208.1" cy="875" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 198.1 875)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="157.8" cy="867" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="867" r="2.6" fill="#f3d27a"/></g>
<path d="M176 92 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54" fill="none" stroke="#d4a43a" stroke-width="4"/>
<path d="M176 92 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54" fill="none" stroke="#f3d27a" stroke-width="1.2" transform="translate(-1.5 -1)"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 119px"><ellipse cx="1397.9" cy="119" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 119)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="1448.2" cy="111" r="7" fill="#a8322a"/><circle cx="1448.2" cy="111" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 173px"><ellipse cx="1462.1" cy="173" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 173)"/></g>
<circle cx="1414.4" cy="179" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 227px"><ellipse cx="1397.9" cy="227" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 1407.9 227)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="1448.2" cy="219" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="219" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:1430px 281px"><ellipse cx="1462.1" cy="281" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 281)"/></g>
<circle cx="1414.4" cy="287" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 335px"><ellipse cx="1397.9" cy="335" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 335)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="1448.2" cy="327" r="7" fill="#a8322a"/><circle cx="1448.2" cy="327" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 389px"><ellipse cx="1462.1" cy="389" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 1452.1 389)"/></g>
<circle cx="1414.4" cy="395" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 443px"><ellipse cx="1397.9" cy="443" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 443)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="1448.2" cy="435" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="435" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:1430px 497px"><ellipse cx="1462.1" cy="497" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 497)"/></g>
<circle cx="1414.4" cy="503" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 551px"><ellipse cx="1397.9" cy="551" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 1407.9 551)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="1448.2" cy="543" r="7" fill="#a8322a"/><circle cx="1448.2" cy="543" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 605px"><ellipse cx="1462.1" cy="605" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 605)"/></g>
<circle cx="1414.4" cy="611" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 659px"><ellipse cx="1397.9" cy="659" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 659)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="1448.2" cy="651" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="651" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:1430px 713px"><ellipse cx="1462.1" cy="713" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 1452.1 713)"/></g>
<circle cx="1414.4" cy="719" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 767px"><ellipse cx="1397.9" cy="767" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 767)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="1448.2" cy="759" r="7" fill="#a8322a"/><circle cx="1448.2" cy="759" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 821px"><ellipse cx="1462.1" cy="821" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 821)"/></g>
<circle cx="1414.4" cy="827" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 875px"><ellipse cx="1397.9" cy="875" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 1407.9 875)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="1448.2" cy="867" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="867" r="2.6" fill="#f3d27a"/></g>
<path d="M1430 92 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54" fill="none" stroke="#d4a43a" stroke-width="4"/>
<path d="M1430 92 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54" fill="none" stroke="#f3d27a" stroke-width="1.2" transform="translate(-1.5 -1)"/>
<g transform="translate(120 160)"><ellipse cx="60" cy="58" rx="40" ry="24" fill="#b08a62" stroke="#2b1d12" stroke-width="2"/><circle cx="92" cy="40" r="16" fill="#b08a62" stroke="#2b1d12" stroke-width="2"/><circle cx="98" cy="38" r="2.4" fill="#2b1d12"/><circle cx="24" cy="54" r="8" fill="#f1e2bf" stroke="#2b1d12" stroke-width="1.5"/><path d="M50 80 l-6 10 M78 80 l4 10" stroke="#2b1d12" stroke-width="3"/></g>
<g class="ears"><path d="M206 196 q-6 -46 6 -50 q10 4 0 50 z M214 196 q8 -42 22 -40 q6 8 -12 42 z" fill="#b08a62" stroke="#2b1d12" stroke-width="2"/></g>
<g transform="translate(96 740)"><path d="M40 100 q-30 -40 10 -70 q30 -20 60 0 q20 14 10 40 q-10 24 -40 30 z" fill="#4f7a3a" stroke="#2b1d12" stroke-width="2"/><path d="M60 30 q-10 -30 10 -46 l20 6 l-8 6 l12 8 l-14 4 q-2 14 -10 22" fill="#4f7a3a" stroke="#2b1d12" stroke-width="2"/><circle cx="80" cy="-8" r="2.5" fill="#a8322a"/><path d="M50 40 q-40 -20 -30 -60 q20 20 40 30 z" fill="#a8322a" stroke="#2b1d12" stroke-width="1.5" opacity=".9"/><path d="M60 70 h30 M58 82 h28" stroke="#d4a43a" stroke-width="2"/></g>
<g class="wtail"><path d="M196 830 q40 10 50 -20 q6 -20 -10 -30 l14 -4 l-4 14" fill="none" stroke="#2b1d12" stroke-width="7" stroke-linecap="round"/><path d="M196 830 q40 10 50 -20 q6 -20 -10 -30" fill="none" stroke="#4f7a3a" stroke-width="4" stroke-linecap="round"/></g>
<g transform="translate(1392 176)"><path d="M10 80 q-14 -40 6 -66 q14 -16 28 0 q20 26 6 66 z" fill="#8a6a48" stroke="#2b1d12" stroke-width="2"/><path d="M14 10 l-8 -14 l14 8 M46 10 l8 -14 l-14 8" fill="#8a6a48" stroke="#2b1d12" stroke-width="2"/><circle cx="26" cy="38" r="11" fill="#f1e2bf" stroke="#2b1d12" stroke-width="1.5"/><circle cx="50" cy="38" r="11" fill="#f1e2bf" stroke="#2b1d12" stroke-width="1.5"/><path d="M34 46 l4 8 l4 -8 z" fill="#d4a43a"/><path d="M20 62 q18 10 36 0 M22 70 q16 8 32 0" stroke="#5a4028" stroke-width="2" fill="none"/><path d="M4 84 h56" stroke="#6b4a2a" stroke-width="6"/></g>
<ellipse class="blink l" cx="1418" cy="214" rx="5" ry="5" fill="#2b1d12"/><ellipse class="blink r" cx="1442" cy="214" rx="5" ry="5" fill="#2b1d12"/>
<g transform="translate(1350 760)"><path d="M10 120 C12 80 30 52 60 46 C90 52 108 80 110 120 Z" fill="#6b4a32" stroke="#2b1d12" stroke-width="2"/><path d="M34 120 C36 96 42 78 50 66 M60 120 V70 M86 120 C84 96 78 78 70 66" stroke="#4a3020" stroke-width="2.2" fill="none"/><path d="M34 92 Q60 100 86 92" stroke="#c9a46a" stroke-width="3.4" fill="none"/><path d="M58 96 l-4 18 M62 96 l3 18" stroke="#c9a46a" stroke-width="2.4"/><path d="M40 56 C46 46 74 46 80 56 C76 66 44 66 40 56 Z" fill="#4a3020" stroke="#2b1d12" stroke-width="1.4"/><path d="M46 90 q14 8 28 0" stroke="#2b1d12" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M46 90 q14 8 28 0" stroke="#6b4a32" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="60" cy="95" r="4.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><g class="nod"><ellipse cx="62" cy="38" rx="15" ry="17" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M57 38 q2 1.6 4 0 M63 38 q2 1.6 4 0" stroke="#2b1d12" stroke-width="1.1" fill="none"/><path d="M62 39 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><ellipse cx="62" cy="45" rx="1.8" ry="2.2" fill="#2b1d12"/><circle cx="56.5" cy="42" r="2" fill="#e07a6a" opacity=".55"/><circle cx="67.5" cy="42" r="2" fill="#e07a6a" opacity=".55"/><path d="M47 32 C48 18 76 18 77 32" stroke="#6b3b1c" stroke-width="5" fill="none"/><ellipse cx="62" cy="24" rx="9" ry="4" fill="#f0c8a0"/></g><rect x="104" y="96" width="22" height="26" rx="3" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1.5"/><rect x="103" y="91" width="24" height="7" rx="3.5" fill="#f6ead0"/><path d="M126 102 q10 0 10 8 q0 8 -10 8" fill="none" stroke="#8e9aa8" stroke-width="4"/></g>
<text class="zz" x="1440" y="772" font-family="Georgia,serif" font-size="26" font-style="italic" fill="#1f3a7a">z</text><text class="zz" style="animation-delay:-2s" x="1452" y="772" font-family="Georgia,serif" font-size="20" font-style="italic" fill="#1f3a7a">z</text>
<g transform="translate(36 0)"><path d="M360 260 C390 320 330 380 360 440 S390 560 350 620" fill="none" stroke="#d4a43a" stroke-width="3"/>
<g class="leaf" style="animation-delay:-1s;transform-origin:370px 300px"><ellipse cx="382" cy="300" rx="14" ry="6" fill="#4f7a3a" transform="rotate(30 370 300)"/></g>
<g class="leaf" style="animation-delay:-2s;transform-origin:342px 380px"><ellipse cx="354" cy="380" rx="14" ry="6" fill="#4f7a3a" transform="rotate(-150 342 380)"/></g>
<g class="leaf" style="animation-delay:-0s;transform-origin:376px 470px"><ellipse cx="388" cy="470" rx="14" ry="6" fill="#4f7a3a" transform="rotate(30 376 470)"/></g>
<g class="leaf" style="animation-delay:-0s;transform-origin:346px 560px"><ellipse cx="358" cy="560" rx="14" ry="6" fill="#4f7a3a" transform="rotate(-150 346 560)"/></g>
<circle cx="356" cy="340" r="7" fill="#a8322a"/><circle cx="356" cy="340" r="3" fill="#f3d27a"/>
<circle cx="380" cy="430" r="7" fill="#a8322a"/><circle cx="380" cy="430" r="3" fill="#f3d27a"/>
<circle cx="352" cy="520" r="7" fill="#a8322a"/><circle cx="352" cy="520" r="3" fill="#f3d27a"/>
<circle cx="368" cy="600" r="7" fill="#a8322a"/><circle cx="368" cy="600" r="3" fill="#f3d27a"/>
</g>
<g class="bird"><g transform="translate(408 286)"><path d="M0 0 q14 -18 34 -10 q10 4 22 -2 q-6 12 -18 14 q-14 14 -34 8 z" fill="#1f3a7a"/><path d="M6 0 q-10 4 -16 -4" stroke="#1f3a7a" stroke-width="4" fill="none"/><g class="head"><circle cx="38" cy="-8" r="8" fill="#1f3a7a"/><circle cx="41" cy="-10" r="2" fill="#fff"/><path d="M45 -10 l11 -1 l-9 6 z" fill="#d4a43a"/></g><path d="M18 10 v8 M26 10 v8" stroke="#8a6418" stroke-width="2"/></g></g>
<g transform="translate(760 440)"><g class="knight"><path d="M40 150 l-7 38 M60 150 l6 38" stroke="#2b1d12" stroke-width="8" stroke-linecap="round"/><path d="M40 150 l-7 38 M60 150 l6 38" stroke="#9aa6b2" stroke-width="5.4" stroke-linecap="round" stroke-dasharray="2 2"/><path d="M26 190 h12 l-2 -5 h-8 z M60 190 h14 l-4 -5 h-8 z" fill="#2b1d12"/><path d="M34 92 C30 110 28 134 24 156 Q50 162 78 156 C74 134 72 110 68 92 Z" fill="#f4ecd8" stroke="#2b1d12" stroke-width="1.6"/><path d="M51 98 V150 M36 118 H66" stroke="#a8322a" stroke-width="7"/><path d="M40 104 C38 124 36 140 33 154 M62 104 C64 124 66 140 69 154" stroke="#d8ccb0" stroke-width="1.4" fill="none"/><path d="M36 52 h32 v34 q-16 7 -32 0 z" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1.8"/><path d="M36 66 h32" stroke="#2b1d12" stroke-width="3.2"/><path d="M52 52 v34" stroke="#b8c2cc" stroke-width="1.4"/><circle cx="44" cy="76" r="1.2" fill="#2b1d12"/><circle cx="49" cy="78" r="1.2" fill="#2b1d12"/><circle cx="56" cy="78" r="1.2" fill="#2b1d12"/><circle cx="61" cy="76" r="1.2" fill="#2b1d12"/><path d="M36 52 h32 l-3 -5 h-26 z" fill="#d4a43a" stroke="#2b1d12" stroke-width="1"/><path d="M52 47 q-10 -30 16 -36 q-10 12 -6 36 z" fill="#a8322a" stroke="#2b1d12" stroke-width="1"/><path d="M14 96 l170 34" stroke="#6b4a2a" stroke-width="6" stroke-linecap="round"/><path d="M178 125 l20 8 l-21 5 z" fill="#c8ccd2" stroke="#2b1d12" stroke-width="1"/><path d="M150 119 l24 -2 l-10 8 l12 6 l-26 -1 z" fill="#a8322a" stroke="#2b1d12" stroke-width=".8"/><path d="M18 98 h28 v22 q0 18 -14 28 q-14 -10 -14 -28 z" fill="#1f3a7a" stroke="#d4a43a" stroke-width="2.2"/><path d="M20 112 l12 8 l12 -8 M21 124 l11 8 l11 -8" stroke="#d4a43a" stroke-width="2.6" fill="none"/></g></g>
<g class="snail"><g transform="translate(952 506)"><path d="M-6 88 q70 10 120 -4 q10 -10 4 -18 q-30 10 -120 8 z" fill="#d8b47a" stroke="#2b1d12" stroke-width="2"/><g class="stalks"><path d="M112 70 l10 -30 M118 72 l20 -24" stroke="#2b1d12" stroke-width="2"/><circle cx="122" cy="40" r="4" fill="#2b1d12"/><circle cx="138" cy="48" r="4" fill="#2b1d12"/></g><circle cx="50" cy="44" r="40" fill="#c98a4a" stroke="#2b1d12" stroke-width="2.5"/><path d="M50 44 m-5 0 a5 5 0 1 1 10 0 a12 12 0 1 1 -22 0 a19 19 0 1 1 36 0 a26 26 0 1 1 -50 0" fill="none" stroke="#7a4a1e" stroke-width="4"/><path d="M100 66 q5 4 9 0" stroke="#2b1d12" stroke-width="2" fill="none"/></g></g>
<g transform="translate(784 752) scale(.92) translate(-800 -752)">
<rect x="370" y="660" width="860" height="184" rx="8" fill="url(#gold)" stroke="#8a6418" stroke-width="2"/>
<g clip-path="url(#mini)"><g transform="translate(0 -102)">
<rect x="378" y="770" width="844" height="170" fill="url(#diaper)"/>
<polygon points="378,940 1222,940 1222,880 378,880" fill="url(#tiles)"/>
<circle class="glow" cx="470" cy="850" r="130" fill="url(#fireGlow)"/>
<path d="M410 880 V800 q60 -40 120 0 V880 Z" fill="#a89a88" stroke="#2b1d12" stroke-width="2"/>
<path d="M430 880 V820 q40 -26 80 0 V880 Z" fill="#2a1408"/>
<path class="flame" d="M446 878 q8 -44 22 -54 q-2 26 14 32 q2 -18 -4 -28 q26 24 16 50 z" fill="#ff8a2a"/>
<path class="flame b" d="M458 878 q4 -26 12 -32 q0 18 12 32 z" fill="#ffe08a"/>
<rect x="440" y="874" width="60" height="8" rx="4" fill="#4a2410"/>
<circle class="smoke" style="transform-origin:470px 790px" cx="470" cy="790" r="8" fill="#9a9088"/><circle class="smoke" style="animation-delay:-2.5s;transform-origin:476px 790px" cx="476" cy="790" r="7" fill="#9a9088"/>
<g transform="translate(600 790)"><path d="M8 90 q-4 1 -7 3.5 h9 z M32 90 q4 1 7 3.5 h-9 z" fill="#2b1d12"/><path d="M9 26 C14 22 26 22 31 26 C34 44 36 66 39 88 Q20 93 1 88 C4 66 6 44 9 26 Z" fill="#9a7442" stroke="#2b1d12" stroke-width="1.4"/><path d="M15 34 C13 56 11 72 10 88 M21 31 C22 54 21 74 21 90 M27 36 C29 58 30 74 31 88" stroke="#6e5028" stroke-width="1.6" fill="none"/><path d="M2 87.5 Q20 92.5 38 87.5" stroke="#d4a43a" stroke-width="3" fill="none"/><path d="M9 48 Q20 51.5 31 48" stroke="#d4a43a" stroke-width="2.4" fill="none"/><path d="M14 25 q6 4 12 0" stroke="#d4a43a" stroke-width="2" fill="none"/><path d="M12 40 h16 l3.5 48 h-23 z" fill="#f4e8cc" stroke="#2b1d12" stroke-width=".9"/><path d="M15 50 v34 M24 50 v34" stroke="#d8c8a4" stroke-width="1"/><path d="M11 32 C8 40 8 48 10 56" stroke="#2b1d12" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M11 32 C8 40 8 48 10 56" stroke="#9a7442" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="12" rx="9" ry="10.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M15 10.5 q2 -1.6 4 0 M21 10.5 q2 -1.6 4 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="17" cy="12" r="1.1" fill="#2b1d12"/><circle cx="23" cy="12" r="1.1" fill="#2b1d12"/><path d="M20 13 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><path d="M17.6 18.5 q2.4 1.6 4.8 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="14.5" cy="16" r="2" fill="#e07a6a" opacity=".55"/><circle cx="25.5" cy="16" r="2" fill="#e07a6a" opacity=".55"/><path d="M10.5 10 q9.5 -14 19 0 v5 q-2 -6 -9.5 -6 q-7.5 0 -9.5 6 z" fill="#f6ecd4" stroke="#2b1d12" stroke-width="1"/><g class="pour"><path d="M28 32 C34 34 40 40 44 48" stroke="#2b1d12" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M28 32 C34 34 40 40 44 48" stroke="#9a7442" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="45.5" cy="50" r="3.2" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><path d="M40 46 h15 v19 q-7.5 6 -15 0 z" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1.4"/><path d="M55 50 q8 -4 6 9" stroke="#8e9aa8" stroke-width="2.5" fill="none"/><path d="M40 50 h15" stroke="#b8c2cc" stroke-width="1"/></g><path class="drip" d="M62 70 q-2 8 0 14" stroke="#e8b84a" stroke-width="3" fill="none"/></g>
<rect x="700" y="842" width="230" height="10" fill="#6b4a2a" stroke="#2b1d12" stroke-width="1.5"/><path d="M712 852 v32 M918 852 v32" stroke="#4a2f1a" stroke-width="6"/>
<g transform="translate(700 786)"><path d="M8 90 q-4 1 -7 3.5 h9 z M32 90 q4 1 7 3.5 h-9 z" fill="#2b1d12"/><path d="M9 26 C14 22 26 22 31 26 C34 44 36 66 39 88 Q20 93 1 88 C4 66 6 44 9 26 Z" fill="#1f3a7a" stroke="#2b1d12" stroke-width="1.4"/><path d="M15 34 C13 56 11 72 10 88 M21 31 C22 54 21 74 21 90 M27 36 C29 58 30 74 31 88" stroke="#122a5a" stroke-width="1.6" fill="none"/><path d="M2 87.5 Q20 92.5 38 87.5" stroke="#d4a43a" stroke-width="3" fill="none"/><path d="M9 48 Q20 51.5 31 48" stroke="#d4a43a" stroke-width="2.4" fill="none"/><path d="M14 25 q6 4 12 0" stroke="#d4a43a" stroke-width="2" fill="none"/><path d="M11 32 C8 40 8 48 10 56" stroke="#2b1d12" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M11 32 C8 40 8 48 10 56" stroke="#1f3a7a" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="13" rx="9" ry="10.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M15 11.5 q2 -1.6 4 0 M21 11.5 q2 -1.6 4 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="17" cy="13" r="1.1" fill="#2b1d12"/><circle cx="23" cy="13" r="1.1" fill="#2b1d12"/><path d="M20 14 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><path d="M17.6 19.5 q2.4 1.6 4.8 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="14.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><circle cx="25.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><path d="M30 7 q12 4 9 24" stroke="#a8322a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M8.5 10 q11.5 -16 23 0 q2 4 -2 6 h-19 q-4 -2 -2 -6 z" fill="#a8322a" stroke="#2b1d12" stroke-width="1"/><g class="sip"><path d="M28 32 C34 34 40 40 44 48" stroke="#2b1d12" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M28 32 C34 34 40 40 44 48" stroke="#1f3a7a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="45.5" cy="50" r="3.2" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><rect x="46" y="44" width="12" height="14" rx="1.5" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1"/><path d="M48 47 v9 M52 47 v9" stroke="#b8c2cc" stroke-width="1"/><rect x="45" y="41" width="14" height="4.5" rx="2" fill="#f6ead0"/></g></g>
<g transform="translate(880 786)"><path d="M8 90 q-4 1 -7 3.5 h9 z M32 90 q4 1 7 3.5 h-9 z" fill="#2b1d12"/><path d="M9 26 C14 22 26 22 31 26 C34 44 36 66 39 88 Q20 93 1 88 C4 66 6 44 9 26 Z" fill="#4f7a3a" stroke="#2b1d12" stroke-width="1.4"/><path d="M15 34 C13 56 11 72 10 88 M21 31 C22 54 21 74 21 90 M27 36 C29 58 30 74 31 88" stroke="#2f5222" stroke-width="1.6" fill="none"/><path d="M2 87.5 Q20 92.5 38 87.5" stroke="#d4a43a" stroke-width="3" fill="none"/><path d="M9 48 Q20 51.5 31 48" stroke="#d4a43a" stroke-width="2.4" fill="none"/><path d="M14 25 q6 4 12 0" stroke="#d4a43a" stroke-width="2" fill="none"/><path d="M29 32 C32 40 32 48 30 56" stroke="#2b1d12" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M29 32 C32 40 32 48 30 56" stroke="#4f7a3a" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="13" rx="9" ry="10.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M15 11.5 q2 -1.6 4 0 M21 11.5 q2 -1.6 4 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="17" cy="13" r="1.1" fill="#2b1d12"/><circle cx="23" cy="13" r="1.1" fill="#2b1d12"/><path d="M20 14 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><path d="M17.6 19.5 q2.4 1.6 4.8 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="14.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><circle cx="25.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><path d="M11 12 q-2 -6 2 -10 M29 12 q2 -6 -2 -10" stroke="#7a4a22" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 17 q8 15 16 0 q-1 8 -8 9 q-7 -1 -8 -9 z" fill="#7a4a22" stroke="#2b1d12" stroke-width=".8"/><g class="sip b"><path d="M12 32 C6 34 0 40 -4 48" stroke="#2b1d12" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M12 32 C6 34 0 40 -4 48" stroke="#4f7a3a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-5.5" cy="50" r="3.2" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><rect x="-22" y="44" width="12" height="14" rx="1.5" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1"/><path d="M-20 47 v9 M-16 47 v9" stroke="#b8c2cc" stroke-width="1"/><rect x="-23" y="41" width="14" height="4.5" rx="2" fill="#f6ead0"/></g></g>
<g transform="translate(1010 830)"><ellipse cx="30" cy="30" rx="30" ry="40" fill="#8a5a32" stroke="#2b1d12" stroke-width="2"/><path d="M0 18 h60 M0 42 h60" stroke="#2b1d12" stroke-width="3"/><circle cx="30" cy="30" r="5" fill="#2b1d12"/></g>
<path d="M1110 790 h60" stroke="#2b1d12" stroke-width="4"/>
<g class="sign"><path d="M1120 790 v8 M1160 790 v8" stroke="#2b1d12" stroke-width="2"/><rect x="1116" y="798" width="48" height="40" fill="#f1e2bf" stroke="#2b1d12" stroke-width="2"/><path d="M1128 830 q-2 -18 12 -26 q14 8 12 26 z" fill="#ff9a2a"/><path d="M1136 830 q0 -10 4 -14 q4 4 4 14 z" fill="#ffe08a"/></g>
<g transform="translate(540 896)"><path class="tail" d="M2 26 q-16 -4 -18 -20" stroke="#2a2220" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M0 30 q4 -26 30 -26 q14 0 20 6 v20 z" fill="#2a2220"/><g class="cathead"><path d="M44 10 q10 -6 16 4 l4 -12 l2 14 q4 10 -6 16 h-16 z" fill="#2a2220"/><circle cx="58" cy="16" r="2.2" fill="#d9c24a"/></g></g>
</g></g>
<rect x="370" y="660" width="860" height="184" rx="8" fill="#f3e6c8" opacity=".55"/>
</g>
<g class="mouse"><g transform="translate(446 650)"><g class="body"><path d="M32 12 q16 4 20 -8" stroke="#2b1d12" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="10" rx="16" ry="9" fill="#8a7a6a" stroke="#2b1d12" stroke-width="1.5"/><circle cx="2" cy="4" r="5" fill="#a89888" stroke="#2b1d12" stroke-width="1.5"/><circle cx="-2" cy="9" r="1.5" fill="#2b1d12"/></g></g></g></svg>`
const SCENE_NIGHT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"><style>
  @keyframes flick { 0%,100% { transform: scale(1,1) } 20% { transform: scale(.92,1.14) } 45% { transform: scale(1.06,.9) } 70% { transform: scale(.96,1.1) } }
  .flame { transform-origin: 468px 878px; animation: flick 1.1s ease-in-out infinite }
  .flame.b { animation-duration: 1.5s; animation-delay: -.4s }
  @keyframes glow { 0%,100% { opacity: .35 } 50% { opacity: .7 } }
  .glow { animation: glow 2.3s ease-in-out infinite }
  @keyframes glint { 0%,80%,100% { opacity: .5 } 88% { opacity: 1 } }
  .glint { animation: glint 6s ease-in-out infinite }
  @keyframes sheen { 0%,70% { transform: translateX(-260px) } 100% { transform: translateX(260px) } }
  .sheen { animation: sheen 7s ease-in-out infinite }
  @keyframes sip { 0%,55%,100% { transform: rotate(0deg) } 65%,85% { transform: rotate(-55deg) } }
  .sip { transform-origin: 30px 40px; animation: sip 7s ease-in-out infinite }
  .sip.b { animation-delay: -3.2s; transform-origin: 10px 40px; animation-name: sip2 }
  @keyframes sip2 { 0%,55%,100% { transform: rotate(0deg) } 65%,85% { transform: rotate(55deg) } }
  @keyframes pour { 0%,40%,100% { transform: rotate(0deg) } 50%,75% { transform: rotate(-35deg) } }
  .pour { transform-origin: 30px 40px; animation: pour 9s ease-in-out infinite }
  @keyframes drip { 0%,52% { opacity: 0 } 56%,72% { opacity: 1 } 76%,100% { opacity: 0 } }
  .drip { animation: drip 9s linear infinite }
  @keyframes swing { 0%,100% { transform: rotate(-5deg) } 50% { transform: rotate(5deg) } }
  .sign { transform-origin: 1140px 790px; animation: swing 4s ease-in-out infinite }
  @keyframes tail { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(28deg) } }
  .tail { transform-origin: 2px 26px; animation: tail 1.6s ease-in-out infinite }
  @keyframes look { 0%,30%,100% { transform: translateY(0) } 40%,60% { transform: translateY(-5px) } }
  .cathead { animation: look 12s ease-in-out infinite }
  @keyframes scurry { 0%,8% { transform: translateX(0) } 30% { transform: translateX(400px) } 34%,46% { transform: translateX(400px) } 70% { transform: translateX(660px) } 70.1%,100% { transform: translateX(800px); opacity: 0 } }
  .mouse { animation: scurry 12s linear infinite }
  @keyframes feet { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }
  .mouse .body { animation: feet .18s linear infinite }
  @keyframes hop { 0%,18% { transform: translate(0,0) } 22% { transform: translate(8px,-30px) } 26%,48% { transform: translate(16px,70px) } 52% { transform: translate(4px,40px) } 56%,78% { transform: translate(-6px,170px) } 84% { transform: translate(10px,80px) } 90%,100% { transform: translate(0,0) } }
  .bird { animation: hop 14s ease-in-out infinite }
  @keyframes peck { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(18deg) } }
  .bird .head { transform-origin: 32px -4px; animation: peck 1.4s ease-in-out infinite }
  @keyframes leaf { 0%,100% { transform: rotate(-6deg) } 50% { transform: rotate(6deg) } }
  .leaf { animation: leaf 3.5s ease-in-out infinite }
  @keyframes creep { 0% { transform: translateX(0) } 50% { transform: translateX(-46px) } 100% { transform: translateX(0) } }
  .snail { animation: creep 40s ease-in-out infinite }
  @keyframes eyes { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-12deg) } }
  .stalks { transform-origin: 112px 70px; animation: eyes 2.4s ease-in-out infinite }
  @keyframes lance { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-3deg) } }
  .knight { transform-origin: 50px 190px; animation: lance 3s ease-in-out infinite }
  @keyframes ears { 0%,86%,100% { transform: rotate(0deg) } 90% { transform: rotate(-16deg) } 94% { transform: rotate(6deg) } }
  .ears { transform-origin: 196px 196px; animation: ears 5s ease-in-out infinite }
  @keyframes wtail { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(-10deg) } }
  .wtail { transform-origin: 196px 830px; animation: wtail 4s ease-in-out infinite }
  @keyframes blink { 0%,92%,100% { transform: scaleY(1) } 95% { transform: scaleY(.1) } }
  .blink { animation: blink 6s linear infinite }
  .blink.l { transform-origin: 1418px 214px } .blink.r { transform-origin: 1442px 214px }
  @keyframes zz { 0% { transform: translate(0,0); opacity: 0 } 25% { opacity: .9 } 100% { transform: translate(26px,-60px); opacity: 0 } }
  .zz { animation: zz 4s ease-out infinite; opacity: 0 }
  @keyframes berry { 0%,100% { opacity: 1 } 50% { opacity: .55 } }
  .berry { animation: berry 3s ease-in-out infinite }
  @keyframes nod { 0%,100% { transform: rotate(0deg) } 50% { transform: rotate(6deg) } }
  .nod { transform-origin: 62px 56px; animation: nod 4s ease-in-out infinite }
  @keyframes smoke { 0% { transform: translate(0,0) scale(.6); opacity: 0 } 20% { opacity: .5 } 100% { transform: translate(14px,-70px) scale(1.6); opacity: 0 } }
  .smoke { animation: smoke 5s ease-out infinite; opacity: 0 }
</style>
<defs>
<radialGradient id="parch" cx=".5" cy=".45" r=".75"><stop offset="0" stop-color="#463624"/><stop offset=".7" stop-color="#33271a"/><stop offset="1" stop-color="#1f170e"/></radialGradient>
<radialGradient id="stain" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e0a050" stop-opacity=".10"/><stop offset="1" stop-color="#e0a050" stop-opacity="0"/></radialGradient>
<radialGradient id="candle" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffc870" stop-opacity=".22"/><stop offset="1" stop-color="#ffc870" stop-opacity="0"/></radialGradient>
<linearGradient id="gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d27a"/><stop offset=".5" stop-color="#d4a43a"/><stop offset="1" stop-color="#8a6418"/></linearGradient>
<linearGradient id="sheenG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<radialGradient id="gemR" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9a8a"/><stop offset=".45" stop-color="#a8322a"/><stop offset="1" stop-color="#6e1d18"/></radialGradient>
<radialGradient id="gemB" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#9ab8ff"/><stop offset=".45" stop-color="#2b55b0"/><stop offset="1" stop-color="#142857"/></radialGradient>
<radialGradient id="fireGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb04a" stop-opacity=".8"/><stop offset="1" stop-color="#ffb04a" stop-opacity="0"/></radialGradient>
<pattern id="diaper" width="28" height="28" patternUnits="userSpaceOnUse"><rect width="28" height="28" fill="#1f3a7a"/><path d="M0 0 L14 14 L0 28 M28 0 L14 14 L28 28" stroke="#d4a43a" stroke-width="1.2" fill="none"/><path d="M14 0 L28 14 L14 28 L0 14 Z" fill="#a8322a"/><circle cx="14" cy="14" r="2" fill="#f3d27a"/><circle cx="0" cy="0" r="1.6" fill="#f3d27a"/><circle cx="28" cy="28" r="1.6" fill="#f3d27a"/></pattern>
<pattern id="tiles" width="40" height="20" patternUnits="userSpaceOnUse"><rect width="40" height="20" fill="#b8865a"/><path d="M0 0 H40 M0 10 H40 M0 20 H40 M10 0 V10 M30 10 V20" stroke="#7a5236" stroke-width="1.5"/><rect x="11" y="1" width="18" height="8" fill="#c99a6a"/></pattern>
<clipPath id="mini"><rect x="378" y="668" width="844" height="168" rx="6"/></clipPath>
<clipPath id="cap"><rect x="372" y="112" width="126" height="126"/></clipPath>
</defs>
<rect width="1600" height="1000" fill="url(#parch)"/><ellipse cx="240" cy="180" rx="260" ry="182" fill="url(#stain)"/><ellipse cx="1320" cy="260" rx="300" ry="210" fill="url(#stain)"/><ellipse cx="700" cy="520" rx="360" ry="251.99999999999997" fill="url(#stain)"/><ellipse cx="1100" cy="820" rx="280" ry="196" fill="url(#stain)"/><ellipse cx="300" cy="760" rx="240" ry="168" fill="url(#stain)"/><ellipse cx="960" cy="120" rx="200" ry="140" fill="url(#stain)"/>
<ellipse class="glow" cx="780" cy="420" rx="620" ry="420" fill="url(#candle)"/><ellipse class="glow" style="animation-delay:-1s" cx="560" cy="760" rx="300" ry="200" fill="url(#fireGlow)" opacity=".35"/>
<rect x="296" y="26" width="976" height="948" fill="none" stroke="url(#gold)" stroke-width="6"/>
<path fill-rule="evenodd" d="M300 30 H1268 V970 H300 Z M342 72 H1226 V928 H342 Z" fill="#1f3a7a"/>
<rect x="342" y="72" width="884" height="856" fill="none" stroke="#a8322a" stroke-width="3"/>
<rect x="348" y="78" width="872" height="844" fill="none" stroke="url(#gold)" stroke-width="1.5"/>
<ellipse cx="356.5" cy="59.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 356.5 59.8)"/>
<circle cx="356.5" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="417.6" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 417.6 38.2)"/>
<circle cx="417.6" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="478.7" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 478.7 59.8)"/>
<circle cx="478.7" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="539.7" cy="38.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 539.7 38.2)"/>
<circle cx="539.7" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="600.8" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 600.8 59.8)"/>
<circle cx="600.8" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="661.9" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 661.9 38.2)"/>
<circle cx="661.9" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="722.9" cy="59.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 722.9 59.8)"/>
<circle cx="722.9" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="784.0" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 784.0 38.2)"/>
<circle cx="784.0" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="845.1" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 845.1 59.8)"/>
<circle cx="845.1" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="906.1" cy="38.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 906.1 38.2)"/>
<circle cx="906.1" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="967.2" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 967.2 59.8)"/>
<circle cx="967.2" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1028.3" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1028.3 38.2)"/>
<circle cx="1028.3" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1089.3" cy="59.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 1089.3 59.8)"/>
<circle cx="1089.3" cy="38.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1150.4" cy="38.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1150.4 38.2)"/>
<circle cx="1150.4" cy="59.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1211.5" cy="59.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 1211.5 59.8)"/>
<circle cx="1211.5" cy="38.2" r="2.6" fill="#f6ead0"/>
<path d="M326 49 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0" fill="none" stroke="#d4a43a" stroke-width="3"/>
<ellipse cx="356.5" cy="961.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 356.5 961.8)"/>
<circle cx="356.5" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="417.6" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 417.6 940.2)"/>
<circle cx="417.6" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="478.7" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 478.7 961.8)"/>
<circle cx="478.7" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="539.7" cy="940.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 539.7 940.2)"/>
<circle cx="539.7" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="600.8" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 600.8 961.8)"/>
<circle cx="600.8" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="661.9" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 661.9 940.2)"/>
<circle cx="661.9" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="722.9" cy="961.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 722.9 961.8)"/>
<circle cx="722.9" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="784.0" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 784.0 940.2)"/>
<circle cx="784.0" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="845.1" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 845.1 961.8)"/>
<circle cx="845.1" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="906.1" cy="940.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(-35 906.1 940.2)"/>
<circle cx="906.1" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="967.2" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 967.2 961.8)"/>
<circle cx="967.2" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1028.3" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1028.3 940.2)"/>
<circle cx="1028.3" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1089.3" cy="961.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(35 1089.3 961.8)"/>
<circle cx="1089.3" cy="940.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1150.4" cy="940.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(-35 1150.4 940.2)"/>
<circle cx="1150.4" cy="961.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1211.5" cy="961.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(35 1211.5 961.8)"/>
<circle cx="1211.5" cy="940.2" r="2.6" fill="#f6ead0"/>
<path d="M326 951 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0 q30.533333333333335 -12 61.06666666666667 0 q30.533333333333335 12 61.06666666666667 0" fill="none" stroke="#d4a43a" stroke-width="3"/>
<ellipse cx="329.8" cy="85.6" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 329.8 85.6)"/>
<circle cx="308.2" cy="85.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="144.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 144.8)"/>
<circle cx="329.8" cy="144.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="204.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 204.0)"/>
<circle cx="308.2" cy="204.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="263.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 308.2 263.2)"/>
<circle cx="329.8" cy="263.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="322.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 322.4)"/>
<circle cx="308.2" cy="322.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="381.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 381.6)"/>
<circle cx="329.8" cy="381.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="440.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 329.8 440.8)"/>
<circle cx="308.2" cy="440.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="500.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 500.0)"/>
<circle cx="329.8" cy="500.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="559.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 559.2)"/>
<circle cx="308.2" cy="559.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="618.4" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 308.2 618.4)"/>
<circle cx="329.8" cy="618.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="677.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 677.6)"/>
<circle cx="308.2" cy="677.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="736.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 736.8)"/>
<circle cx="329.8" cy="736.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="796.0" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 329.8 796.0)"/>
<circle cx="308.2" cy="796.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="308.2" cy="855.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 308.2 855.2)"/>
<circle cx="329.8" cy="855.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="329.8" cy="914.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 329.8 914.4)"/>
<circle cx="308.2" cy="914.4" r="2.6" fill="#f6ead0"/>
<path d="M319 56 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2" fill="none" stroke="#d4a43a" stroke-width="3"/>
<ellipse cx="1259.8" cy="85.6" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 1259.8 85.6)"/>
<circle cx="1238.2" cy="85.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="144.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 144.8)"/>
<circle cx="1259.8" cy="144.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="204.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 204.0)"/>
<circle cx="1238.2" cy="204.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="263.2" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 1238.2 263.2)"/>
<circle cx="1259.8" cy="263.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="322.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 322.4)"/>
<circle cx="1238.2" cy="322.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="381.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 381.6)"/>
<circle cx="1259.8" cy="381.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="440.8" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 1259.8 440.8)"/>
<circle cx="1238.2" cy="440.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="500.0" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 500.0)"/>
<circle cx="1259.8" cy="500.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="559.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 559.2)"/>
<circle cx="1238.2" cy="559.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="618.4" rx="9" ry="4.5" fill="#a8322a" transform="rotate(55 1238.2 618.4)"/>
<circle cx="1259.8" cy="618.4" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="677.6" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 677.6)"/>
<circle cx="1238.2" cy="677.6" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="736.8" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 736.8)"/>
<circle cx="1259.8" cy="736.8" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="796.0" rx="9" ry="4.5" fill="#a8322a" transform="rotate(125 1259.8 796.0)"/>
<circle cx="1238.2" cy="796.0" r="2.6" fill="#f6ead0"/>
<ellipse cx="1238.2" cy="855.2" rx="9" ry="4.5" fill="#78a258" transform="rotate(55 1238.2 855.2)"/>
<circle cx="1259.8" cy="855.2" r="2.6" fill="#f6ead0"/>
<ellipse cx="1259.8" cy="914.4" rx="9" ry="4.5" fill="#78a258" transform="rotate(125 1259.8 914.4)"/>
<circle cx="1238.2" cy="914.4" r="2.6" fill="#f6ead0"/>
<path d="M1249 56 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2 q-12 29.6 0 59.2 q12 29.6 0 59.2" fill="none" stroke="#d4a43a" stroke-width="3"/>
<g><rect x="300" y="30" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 321 51)"/><circle cx="321" cy="51" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-0s" cx="316.45" cy="46.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="1226" y="30" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1247 51)"/><circle cx="1247" cy="51" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-1.7s" cx="1242.45" cy="46.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="300" y="928" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 321 949)"/><circle cx="321" cy="949" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-3.4s" cx="316.45" cy="944.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="1226" y="928" width="42" height="42" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1247 949)"/><circle cx="1247" cy="949" r="13" fill="url(#gemR)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-5.1s" cx="1242.45" cy="944.45" r="3.6400000000000006" fill="#fff"/></g>
<g><rect x="522" y="33" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 540 51)"/><circle cx="540" cy="51" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-0.7999999999999998s" cx="536.5" cy="47.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="766" y="33" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 784 51)"/><circle cx="784" cy="51" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-2.5s" cx="780.5" cy="47.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="1010" y="33" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1028 51)"/><circle cx="1028" cy="51" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-4.199999999999999s" cx="1024.5" cy="47.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="522" y="931" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 540 949)"/><circle cx="540" cy="949" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-5.9s" cx="536.5" cy="945.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="1010" y="931" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1028 949)"/><circle cx="1028" cy="949" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-1.5999999999999996s" cx="1024.5" cy="945.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="303" y="482" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 321 500)"/><circle cx="321" cy="500" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-3.299999999999999s" cx="317.5" cy="496.5" r="2.8000000000000003" fill="#fff"/></g>
<g><rect x="1229" y="482" width="36" height="36" rx="5" fill="url(#gold)" stroke="#8a6418" stroke-width="2" transform="rotate(45 1247 500)"/><circle cx="1247" cy="500" r="10" fill="url(#gemB)" stroke="#8a6418" stroke-width="2"/><circle class="glint" style="animation-delay:-5s" cx="1243.5" cy="496.5" r="2.8000000000000003" fill="#fff"/></g>
<g transform="translate(372 112) scale(2.1)">
    <path d="M1.2 1.6 58.6 1 59 58.7 1 58.9Z" fill="#7a1e14"/>
    <path d="M3.4 3.6 56.5 3.2 56.8 56.6 3.1 56.9Z" fill="#e0b954"/>
    <path d="M5.6 5.8 54.4 5.5 54.5 54.4 5.4 54.6Z" fill="#23386a"/>
    <g fill="none" stroke="#e9c766" stroke-width="1.3" stroke-linecap="round">
    <path d="M8 52C11 44 7 37 13 31S12 18 9 14C13 15 15 11 13 8"/>
    <path d="M13 31c4 1 6-2 4-5s-5 0-3 2"/>
    <path d="M52 8C49 16 53 23 47 29S48 42 51 46C47 45 45 49 47 52"/>
    <path d="M47 29c-4-1-6 2-4 5s5 0 3-2"/>
    <path d="M10 9c4-2 9 0 12-3"/>
    <path d="M50 51c-4 2-9 0-12 3"/>
    <path d="M22 52c3-3 7-2 9-5"/>
    <path d="M38 8c-3 3-7 2-9 5"/></g>
    <g fill="#5d8a3a" stroke="#2c4a1c" stroke-width=".5">
    <path d="M9 14c-4-2-5-6-3-8 3 1 4 5 3 8z"/>
    <path d="M13 31c-4 0-6-3-5-6 3 0 5 3 5 6z"/>
    <path d="M8 52c-3-3-2-7 1-8 1 3 1 6-1 8z"/>
    <path d="M51 46c4 2 5 6 3 8-3-1-4-5-3-8z"/>
    <path d="M47 29c4 0 6 3 5 6-3 0-5-3-5-6z"/>
    <path d="M52 8c3 3 2 7-1 8-1-3-1-6 1-8z"/>
    <path d="M22 6c2-3 6-3 7-1-2 2-5 2-7 1z"/>
    <path d="M38 54c-2 3-6 3-7 1 2-2 5-2 7-1z"/></g>
    <g fill="#c0392b">
    <circle cx="17" cy="44" r="1.4"/>
    <circle cx="43" cy="16" r="1.4"/>
    <circle cx="30" cy="50" r="1.1"/>
    <circle cx="30" cy="10" r="1.1"/></g>
    <g fill="#f6ecd0">
    <circle cx="15" cy="20" r=".8"/>
    <circle cx="45" cy="40" r=".8"/>
    <circle cx="20" cy="9" r=".7"/>
    <circle cx="40" cy="51" r=".7"/>
    <circle cx="11" cy="40" r=".7"/>
    <circle cx="49" cy="20" r=".7"/></g>
    <path d="M43.47 16.60L43.47 16.60L39.81 20.86Q36.46 18.54 33.26 18.09L33.26 18.09Q33.07 19.93 33.00 22.30L33.00 22.30L41.88 22.30L41.88 27.37L33.11 27.37Q33.17 29.82 33.60 33.06L33.60 33.06L28.66 34.87Q32.72 38.52 39.96 38.52L39.96 38.52Q40.78 38.52 41.64 38.47L41.64 38.47L36.93 44.83Q27.80 43.85 22.89 38.39Q17.99 32.93 17.99 22.30L17.99 22.30L34.66 12.52Q37.69 14.61 43.47 16.60ZM27.01 33.10L27.01 33.10L28.60 32.57Q27.95 27.86 27.95 24.42Q27.95 20.99 28.06 18.92L28.06 18.92Q26.77 19.57 25.97 20.43Q25.16 21.29 24.81 22.09Q24.45 22.90 24.45 24.37Q24.45 25.84 24.50 26.59L24.50 26.59Q24.65 29.99 27.01 33.10Z" fill="#f8ecc6" stroke="#7a1e14" stroke-width="2.6" stroke-linejoin="round" paint-order="stroke"/>
  </g>
<g clip-path="url(#cap)"><rect class="sheen" x="300" y="80" width="90" height="200" fill="url(#sheenG)" transform="rotate(0)"/></g>
<path transform="translate(520 170) scale(.92)" d="M0.9-27.4L0.9-27.4Q7.5-31.1 13.6-34.5L13.6-34.5Q18.7-32.2 23.4-31.1L23.4-31.1L17.2-26.8Q15.7-27.1 14.5-27.7Q13.2-28.3 12.3-28.6Q11.4-28.8 10.6-28.8Q9.9-28.8 9.3-28.1Q8.8-27.4 8.8-26.8Q8.8-26.1 8.8-25.9L8.8-25.9L8.8-19.8L17.0-24.9Q22.5-20.0 27.2-13.5L27.2-13.5Q25.3-8.0 22.8-2.9Q20.3 2.2 16.4 6.5L16.4 6.5Q14.7 8.4 13.2 8.4L13.2 8.4Q12.2 8.4 11.5 7.8Q10.8 7.2 10.2 6.7Q9.6 6.2 9.0 5.6L9.0 5.6Q15.3 4.1 17.8-0.7L17.8-0.7Q19.5-4.0 19.5-7.2L19.5-7.2Q19.5-8.7 19.0-10.6Q18.6-12.4 16.2-16.3L16.2-16.3Q14.6-18.7 12.6-18.7L12.6-18.7Q11.3-18.7 9.9-17.9L9.9-17.9Q9.5-17.6 8.8-17.1L8.8-17.1L8.7-10.4Q8.7-9.5 9.2-9.2Q9.7-8.9 10.5-8.6Q11.3-8.4 12.5-7.9Q13.8-7.5 15.7-7.5L15.7-7.5L10.7-0.7Q4.8-2.0 0.6-4.2L0.6-4.2Q2.2-10.2 2.2-16.0Q2.2-21.9 0.9-27.4ZM39.3-0.7L39.3-0.7L28.6-5.0Q29.2-8.4 29.2-12.0Q29.2-15.7 28.5-19.6L28.5-19.6L36.2-24.2L36.2-24.3L36.3-24.2L36.3-24.2L45.0-18.0L35.9-8.4Q36.9-7.3 38.0-7.2Q39.1-7.1 39.8-7.1Q40.6-7.1 41.6-7.2Q42.6-7.2 44.0-7.3L44.0-7.3Q42.8-5.6 41.7-4.0Q40.5-2.3 39.3-0.7ZM35.6-18.2L35.6-18.2Q34.3-18.2 34.3-14.6L34.3-14.6Q34.3-12.6 35.0-10.6L35.0-10.6Q35.0-10.4 35.0-10.3L35.0-10.3L38.7-14.1Q39.0-14.5 39.0-14.9Q39.0-15.3 38.6-15.9Q38.3-16.6 37.8-17.0L37.8-17.0Q36.4-18.2 35.6-18.2ZM49.7-24.3L54.4-21.0L57.3-23.9Q61.8-20.8 63.4-17.6L63.4-17.6L59.8-12.8Q59.2-14.6 58.1-15.9Q57.1-17.3 54.7-18.7L54.7-18.7L53.9-17.7L53.5-10.0Q53.4-8.8 55.0-7.6Q56.5-6.3 57.4-6.0L57.4-6.0L53.7-0.7L46.7-6.1Q48.0-7.6 48.0-9.2L48.0-9.2L48.0-17.8Q47.9-18.9 46.3-20.0L46.3-20.0L49.7-24.3ZM75.4-0.7L75.4-0.7L64.6-5.0Q65.2-8.4 65.2-12.0Q65.2-15.7 64.5-19.6L64.5-19.6L72.3-24.2L72.3-24.3L72.3-24.2L72.3-24.2L81.1-18.0L72.0-8.4Q72.9-7.3 74.0-7.2Q75.2-7.1 75.9-7.1Q76.6-7.1 77.6-7.2Q78.6-7.2 80.1-7.3L80.1-7.3Q78.9-5.6 77.7-4.0Q76.5-2.3 75.4-0.7ZM71.7-18.2L71.7-18.2Q70.3-18.2 70.3-14.6L70.3-14.6Q70.3-12.6 71.0-10.6L71.0-10.6Q71.0-10.4 71.1-10.3L71.1-10.3L74.7-14.1Q75.1-14.5 75.1-14.9Q75.1-15.3 74.7-15.9Q74.3-16.6 73.9-17.0L73.9-17.0Q72.5-18.2 71.7-18.2ZM93.5-29.1L93.5-29.1L93.7-30.1Q98.2-31.7 103.3-34.5L103.3-34.5L104.8-33.6Q101.6-31.7 101.5-26.4L101.5-26.4L101.5-21.8L105.3-24.7Q107.0-24.0 108.4-21.9L108.4-21.9Q111.3-17.7 111.8-13.0L111.8-13.0Q111.9-12.4 111.9-11.5Q111.9-10.6 111.4-10.0L111.4-10.0L104.0-0.3L94.3-5.1Q94.9-6.3 95.4-7.7Q95.9-9.1 95.9-10.7L95.9-10.7L95.7-26.3Q95.7-27.9 93.5-29.1ZM101.5-19.1L101.5-19.1L101.5-9.4Q101.7-8.2 103.0-7.6Q104.3-7.0 104.8-7.0Q105.3-7.0 105.4-7.1L105.4-7.1Q107.4-7.5 107.4-9.6L107.4-9.6Q107.4-10.1 107.3-10.6L107.3-10.6Q106.5-14.4 105.0-16.4Q103.6-18.3 101.5-19.1ZM124.1-0.7L124.1-0.7L113.4-5.0Q114.0-8.4 114.0-12.0Q114.0-15.7 113.3-19.6L113.3-19.6L121.0-24.2L121.0-24.3L121.1-24.2L121.1-24.2L129.8-18.0L120.8-8.4Q121.7-7.3 122.8-7.2Q123.9-7.1 124.6-7.1Q125.4-7.1 126.4-7.2Q127.4-7.2 128.8-7.3L128.8-7.3Q127.6-5.6 126.5-4.0Q125.3-2.3 124.1-0.7ZM120.4-18.2L120.4-18.2Q119.1-18.2 119.1-14.6L119.1-14.6Q119.1-12.6 119.8-10.6L119.8-10.6Q119.8-10.4 119.9-10.3L119.9-10.3L123.5-14.1Q123.8-14.5 123.8-14.9Q123.8-15.3 123.5-15.9Q123.1-16.6 122.7-17.0L122.7-17.0Q121.2-18.2 120.4-18.2ZM131.8-17.0L131.8-17.0L140.6-24.2L150.0-19.5Q148.2-18.0 148.2-16.1L148.2-16.1L148.2-8.6Q148.1-7.9 149.5-5.6Q150.8-3.3 151.5-2.7L151.5-2.7L142.6 7.4Q137.4 6.3 131.0 5.8L131.0 5.8L136.8-1.5Q133.9-2.7 131.8-4.5L131.8-4.5Q132.6-5.5 132.8-7.6L132.8-7.6L132.7-14.4Q132.8-15.9 131.8-17.0ZM144.7 2.1L146.0 0.3Q143.4-2.6 143.2-6.9L143.2-6.9L137.1 1.0Q140.6 1.0 144.7 2.1L144.7 2.1ZM140.1-5.7L143.1-9.5L143.0-16.9L139.0-18.8Q137.7-16.8 137.7-15.3L137.7-15.3L137.7-9.8Q137.7-8.1 138.2-7.5Q138.7-6.8 139.1-6.4Q139.5-6.0 140.1-5.7L140.1-5.7ZM152.7-20.0L152.7-20.0L156.1-24.3L161.2-21.9Q160.9-21.0 160.6-20.1Q160.3-19.2 160.3-18.3L160.3-18.3L159.9-9.2Q159.9-9.1 159.9-9.0L159.9-9.0Q159.9-7.9 160.6-7.2Q161.3-6.5 162.2-6.2L162.2-6.2L157.7-0.7L152.9-4.5Q154.2-6.1 154.2-7.6L154.2-7.6L154.4-17.8Q154.4-18.9 152.7-20.0ZM161.9-30.7L153.4-24.5L155.2-33.3L161.9-30.7ZM167.0-24.3L171.7-21.0L174.3-24.3L181.5-19.1L180.8-16.4L180.5-9.2Q180.5-9.1 180.5-9.1L180.5-9.1Q180.5-8.0 181.2-7.2Q181.9-6.5 182.7-6.2L182.7-6.2L178.3-0.7Q176.6-2.0 175.7-3.0Q174.8-4.0 174.8-7.2L174.8-7.2Q174.8-7.4 174.8-7.6L174.8-7.6L175.0-15.9Q175.0-16.9 172.1-19.1L172.1-19.1L171.2-17.7L170.8-9.2Q170.8-9.1 170.8-9.1L170.8-9.1Q170.8-8.0 171.4-7.2Q172.1-6.5 173.0-6.2L173.0-6.2L168.5-0.7L163.8-4.5Q165.0-6.1 165.0-7.6L165.0-7.6L165.2-17.8Q165.2-18.9 163.6-20.0L163.6-20.0L167.0-24.3ZM187.8-24.3L192.6-21.0L195.2-24.3L202.4-19.1L201.7-16.4L201.4-9.2Q201.4-9.1 201.4-9.1L201.4-9.1Q201.4-8.0 202.1-7.2Q202.8-6.5 203.6-6.2L203.6-6.2L199.1-0.7Q197.5-2.0 196.6-3.0Q195.7-4.0 195.7-7.2L195.7-7.2Q195.7-7.4 195.7-7.6L195.7-7.6L195.8-15.9Q195.8-16.9 193.0-19.1L193.0-19.1L192.1-17.7L191.6-9.2Q191.6-9.1 191.6-9.1L191.6-9.1Q191.6-8.0 192.3-7.2Q193.0-6.5 193.9-6.2L193.9-6.2L189.4-0.7L184.6-4.5Q185.9-6.1 185.9-7.6L185.9-7.6L186.1-17.8Q186.1-18.9 184.4-20.0L184.4-20.0L187.8-24.3ZM216.1-0.7L216.1-0.7L205.3-5.0Q205.9-8.4 205.9-12.0Q205.9-15.7 205.2-19.6L205.2-19.6L213.0-24.2L213.0-24.3L213.0-24.2L213.0-24.2L221.8-18.0L212.7-8.4Q213.6-7.3 214.7-7.2Q215.8-7.1 216.6-7.1Q217.3-7.1 218.3-7.2Q219.3-7.2 220.7-7.3L220.7-7.3Q219.6-5.6 218.4-4.0Q217.2-2.3 216.1-0.7ZM212.3-18.2L212.3-18.2Q211.0-18.2 211.0-14.6L211.0-14.6Q211.0-12.6 211.7-10.6L211.7-10.6Q211.7-10.4 211.8-10.3L211.8-10.3L215.4-14.1Q215.8-14.5 215.8-14.9Q215.8-15.3 215.4-15.9Q215.0-16.6 214.6-17.0L214.6-17.0Q213.2-18.2 212.3-18.2ZM234.2-6.2L234.2-6.2L229.2-0.7Q227.6-2.0 225.9-3.2Q224.3-4.5 222.6-5.8L222.6-5.8Q225.1-7.9 225.1-10.3L225.1-10.3L225.2-19.7L223.3-19.7L223.3-21.4Q226.3-25.8 231.0-32.8L231.0-32.8L232.1-32.6Q231.6-30.1 231.2-28.6Q230.8-27.0 230.7-24.6L230.7-24.6L234.7-24.6L234.7-19.8L230.7-19.8L230.6-10.2Q230.6-8.5 230.9-8.3Q231.2-8.1 234.2-6.2ZM247.3-5.8L247.3-5.8Q243.4-1.5 242.3-0.3L242.3-0.3Q240.6-1.6 239.0-2.9Q237.3-4.1 235.7-5.4L235.7-5.4Q237.2-6.7 237.7-7.8Q238.2-9.0 238.2-10.0L238.2-10.0L238.3-23.6Q238.3-25.0 238.2-27.0Q238.1-29.1 237.2-30.5L237.2-30.5L244.6-34.5Q244.0-31.8 243.9-28.9Q243.8-26.0 243.8-23L243.8-23L243.8-20.9L248.2-24.3Q254.4-18.3 254.4-10.7L254.4-10.7Q254.4-2.3 247.9 7.7L247.9 7.7L244.6 6.6Q249.6 1.1 249.6-6.0L249.6-6.0Q249.6-13.6 243.8-18.7L243.8-18.7L243.7-9.8Q243.7-8.1 244.0-7.9Q244.3-7.7 247.3-5.8ZM278.5-6.2L278.5-6.2L273.5-0.7Q271.9-2.0 270.2-3.2Q268.5-4.5 266.9-5.8L266.9-5.8Q269.4-7.9 269.4-10.3L269.4-10.3L269.5-19.7L267.6-19.7L267.6-21.4Q270.6-25.8 275.3-32.8L275.3-32.8L276.4-32.6Q275.9-30.1 275.5-28.6Q275.1-27.0 275.0-24.6L275.0-24.6L279.0-24.6L279.0-19.8L275.0-19.8L274.9-10.2Q274.9-8.5 275.2-8.3Q275.5-8.1 278.5-6.2ZM291.6-5.8L291.6-5.8Q287.7-1.5 286.6-0.3L286.6-0.3Q284.9-1.6 283.3-2.9Q281.6-4.1 280.0-5.4L280.0-5.4Q281.5-6.7 282.0-7.8Q282.5-9.0 282.5-10.0L282.5-10.0L282.6-23.6Q282.6-25.0 282.5-27.0Q282.4-29.1 281.5-30.5L281.5-30.5L288.9-34.5Q288.3-31.8 288.2-28.9Q288.1-26.0 288.1-23L288.1-23L288.1-20.9L292.5-24.3Q298.7-18.3 298.7-10.7L298.7-10.7Q298.7-2.3 292.2 7.7L292.2 7.7L288.8 6.6Q293.9 1.1 293.9-6.0L293.9-6.0Q293.9-13.6 288.1-18.7L288.1-18.7L288.0-9.8Q288.0-8.1 288.3-7.9Q288.6-7.7 291.6-5.8ZM311.2-0.7L311.2-0.7L300.5-5.0Q301.1-8.4 301.1-12.0Q301.1-15.7 300.4-19.6L300.4-19.6L308.1-24.2L308.1-24.3L308.2-24.2L308.2-24.2L316.9-18.0L307.8-8.4Q308.8-7.3 309.9-7.2Q311.0-7.1 311.7-7.1Q312.5-7.1 313.5-7.2Q314.5-7.2 315.9-7.3L315.9-7.3Q314.7-5.6 313.6-4.0Q312.4-2.3 311.2-0.7ZM307.5-18.2L307.5-18.2Q306.2-18.2 306.2-14.6L306.2-14.6Q306.2-12.6 306.9-10.6L306.9-10.6Q306.9-10.4 307.0-10.3L307.0-10.3L310.6-14.1Q310.9-14.5 310.9-14.9Q310.9-15.3 310.6-15.9Q310.2-16.6 309.8-17.0L309.8-17.0Q308.3-18.2 307.5-18.2ZM329.2-16.4L329.2-16.4Q333.4-22.1 340.1-28.3L340.1-28.3Q339.0-29.2 337.7-29.2L337.7-29.2Q336.0-29.2 330.3-26.8L330.3-26.8L335.7-35.1Q342.3-34.4 347.9-34.4Q353.5-34.4 358.6-35.1L358.6-35.1Q356.1-29.3 355.2-27.0L355.2-27.0Q352.7-28.1 350.0-28.7L350.0-28.7L350.2-10.2Q346.2-9.8 342.6-7.3L342.6-7.3Q345.5-5.0 349.5-5.0Q353.6-5.0 358.3-7.4L358.3-7.4Q358.2-5.9 358.2-4.4L358.2-4.4Q345.8 1.3 339.1-2.6Q332.3-6.4 329.2-16.4ZM342.3-25.9L342.3-25.9Q338.9-22.7 338.2-19.2L338.2-19.2Q338.0-18.0 338.0-16.3Q338.0-14.6 338.9-12.5Q339.7-10.4 341.1-8.9L341.1-8.9Q342.7-10.5 342.8-13.8L342.8-13.8Q342.9-20.0 342.9-22.2Q342.9-24.4 342.3-25.9ZM357.8-17.0L357.8-17.0L366.5-24.2L376.5-19.5Q374.7-18.0 374.7-16.1L374.7-16.1L374.6-8.6Q374.6-7.9 375.4-6.9Q376.2-6.0 376.9-5.4L376.9-5.4L372.4-0.7L368.9-4.3Q367.6-3.3 366.4-2.4Q365.1-1.6 364.1-0.7L364.1-0.7Q360.7-1.9 357.8-4.5L357.8-4.5Q358.6-5.6 358.7-7.6L358.7-7.6L358.7-14.4Q358.7-14.5 358.7-14.6L358.7-14.6Q358.7-15.9 357.8-17.0ZM369.0-16.9L365.5-18.8Q364.2-16.8 364.2-15.3L364.2-15.3L364.2-9.8Q364.2-8.1 364.8-7.4L364.8-7.4Q365.3-6.6 365.7-6.1Q366.2-5.5 367.1-5.2L367.1-5.2L369.0-6.5L369.0-16.9ZM397.0-9.8L389.5-0.3Q381.8-3.3 379.1-4.5L379.1-4.5Q379.9-6.0 380.3-6.9Q380.7-7.7 380.8-10.3L380.8-10.3L380.8-14.9Q380.8-16.7 379.3-17.7Q377.8-18.8 377.3-19.2L377.3-19.2L382.3-24.3L386.6-20.4L389.8-24.3Q391.5-23.6 393.2-21.7L393.2-21.7Q397.0-17.6 397.7-13.2L397.7-13.2Q397.8-12.7 397.8-12.2L397.8-12.2Q397.8-10.7 397.0-9.8L397.0-9.8ZM386.6-15.8L386.5-8.3Q389.6-6.9 390.7-6.9L390.7-6.9Q390.9-6.9 391-6.9L391-6.9Q392.9-7.4 392.9-9.4L392.9-9.4Q392.9-9.9 392.8-10.5L392.8-10.5Q392.3-13.3 390.8-15.2Q389.3-17.1 387.7-18.1L387.7-18.1Q386.7-17.2 386.6-15.8L386.6-15.8ZM410.4-0.7L410.4-0.7L399.6-5.0Q400.3-8.4 400.3-12.0Q400.3-15.7 399.6-19.6L399.6-19.6L407.3-24.2L407.3-24.3L407.4-24.2L407.4-24.2L416.1-18.0L407.0-8.4Q407.9-7.3 409.1-7.2Q410.2-7.1 410.9-7.1Q411.6-7.1 412.6-7.2Q413.6-7.2 415.1-7.3L415.1-7.3Q413.9-5.6 412.7-4.0Q411.6-2.3 410.4-0.7ZM406.7-18.2L406.7-18.2Q405.4-18.2 405.4-14.6L405.4-14.6Q405.4-12.6 406.0-10.6L406.0-10.6Q406.0-10.4 406.1-10.3L406.1-10.3L409.7-14.1Q410.1-14.5 410.1-14.9Q410.1-15.3 409.7-15.9Q409.3-16.6 408.9-17.0L408.9-17.0Q407.5-18.2 406.7-18.2ZM420.8-24.3L425.4-21.0L428.4-23.9Q432.9-20.8 434.5-17.6L434.5-17.6L430.9-12.8Q430.3-14.6 429.2-15.9Q428.2-17.3 425.7-18.7L425.7-18.7L425.0-17.7L424.6-10.0Q424.5-8.8 426.1-7.6Q427.6-6.3 428.5-6.0L428.5-6.0L424.7-0.7L417.8-6.1Q419.0-7.6 419.1-9.2L419.1-9.2L419.0-17.8Q419.0-18.9 417.4-20.0L417.4-20.0L420.8-24.3ZM439.1-24.3L443.9-21.0L446.5-24.3L453.6-19.1L453.0-16.4L452.7-9.2Q452.7-9.1 452.7-9.1L452.7-9.1Q452.7-8.0 453.4-7.2Q454.0-6.5 454.9-6.2L454.9-6.2L450.4-0.7Q448.7-2.0 447.8-3.0Q447.0-4.0 447.0-7.2L447.0-7.2Q447.0-7.4 447.0-7.6L447.0-7.6L447.1-15.9Q447.1-16.9 444.2-19.1L444.2-19.1L443.3-17.7L442.9-9.2Q442.9-9.1 442.9-9.1L442.9-9.1Q442.9-8.0 443.6-7.2Q444.3-6.5 445.1-6.2L445.1-6.2L440.6-0.7L435.9-4.5Q437.2-6.1 437.2-7.6L437.2-7.6L437.4-17.8Q437.4-18.9 435.7-20.0L435.7-20.0L439.1-24.3ZM468.7-18.0L468.7-18.0Q473.9-21.5 477.4-24.3L477.4-24.3Q479.1-23.6 480.8-21.7L480.8-21.7Q484.6-17.6 485.3-13.2L485.3-13.2Q485.4-12.7 485.4-12.2L485.4-12.2Q485.4-10.7 484.6-9.8L484.6-9.8L477.1-0.3L467.5-5.1Q469.1-8.2 469.1-10.5L469.1-10.5L469.0-15.8Q468.9-17.4 468.7-18.0ZM474.7-18.8L474.7-18.8L474.6-9.2Q474.8-8.1 476.2-7.5Q477.5-6.9 478.0-6.9Q478.4-6.9 478.6-6.9L478.6-6.9Q480.6-7.4 480.6-9.4L480.6-9.4Q480.6-9.9 480.4-10.5L480.4-10.5Q479.7-14.2 478.2-16.1Q476.8-18.0 474.7-18.8ZM499.4-27.0L499.4-27.0Q497.8-28.0 495.5-28.3L495.5-28.3Q495.1-27.7 494.3-26.5L494.3-26.5Q494.7-25.6 494.9-24.3L494.9-24.3L498.6-24.3L498.6-18.6L495.3-18.6Q495.3-16.5 495.2-14.3Q495.1-12.2 495.1-10.3L495.1-10.3Q495.0-6.0 488.9 8.9L488.9 8.9Q488.1 8.0 487.1 7.8L487.1 7.8Q488.6 2.2 488.9-4.1Q489.2-10.5 489.2-14.7Q489.2-18.9 489.1-22.3L489.1-22.3Q489.1-24.1 487.3-25.5L487.3-25.5Q489.2-27.6 490.9-29.6Q492.5-31.6 494.4-33.6L494.4-33.6Q496.5-33.4 498.8-32.9Q501.2-32.4 503.5-32.0L503.5-32.0Q502.5-30.7 501.5-29.5Q500.5-28.2 499.4-27.0ZM537.2-30.2L537.2-30.2L533.4-25.8Q529.9-28.2 526.5-28.7L526.5-28.7Q526.3-26.7 526.2-24.3L526.2-24.3L535.5-24.3L535.5-19.0L526.3-19.0Q526.4-16.4 526.9-13.0L526.9-13.0L521.7-11.1Q525.9-7.3 533.5-7.3L533.5-7.3Q534.4-7.3 535.3-7.3L535.3-7.3L530.3-0.7Q520.8-1.7 515.7-7.4Q510.5-13.1 510.5-24.3L510.5-24.3L528.0-34.5Q531.1-32.3 537.2-30.2ZM520.0-13.0L520.0-13.0L521.6-13.5Q521.0-18.4 521.0-22.0Q521.0-25.6 521.1-27.8L521.1-27.8Q519.7-27.1 518.9-26.2Q518.0-25.3 517.7-24.5Q517.3-23.6 517.3-22.1Q517.3-20.6 517.3-19.8L517.3-19.8Q517.5-16.2 520.0-13.0ZM546.5-20.9L546.5-20.9L549.1-24.3L554.9-20.0L558.3-24.3L565.5-19.1L564.8-16.4L564.5-9.2Q564.5-9.1 564.5-9.0L564.5-9.0Q564.5-7.9 565.2-7.2Q565.8-6.5 566.7-6.2L566.7-6.2L562.2-0.7Q560.5-2.0 559.6-3.0Q558.8-4.0 558.8-7.2L558.8-7.2Q558.8-7.4 558.8-7.6L558.8-7.6L558.9-15.9Q558.9-16.8 556.5-18.9L556.5-18.9L555.6-17.3L555.3-9.2Q555.3-9.1 555.3-9.1L555.3-9.1Q555.3-8.0 555.9-7.2Q556.6-6.5 557.5-6.2L557.5-6.2L553.0-0.7L548.2-4.5Q549.5-6.0 549.5-7.6L549.5-7.6L549.7-15.9Q549.7-16.9 547.0-19.1L547.0-19.1L545.7-17.5L545.5-9.2Q545.5-8.0 546.2-7.3Q546.9-6.5 547.7-6.2L547.7-6.2L543.2-0.7L538.5-4.5Q539.8-6.1 539.8-7.6L539.8-7.6L540.0-17.8Q540.0-18.9 538.3-20.0L538.3-20.0L541.7-24.3L546.5-20.9ZM568.3-29.1L568.3-29.1L568.5-30.1Q573.0-31.7 578.2-34.5L578.2-34.5L579.6-33.6Q576.4-31.7 576.4-26.4L576.4-26.4L576.3-21.8L580.1-24.7Q581.8-24.0 583.2-21.9L583.2-21.9Q586.2-17.7 586.7-13.0L586.7-13.0Q586.7-12.4 586.7-11.5Q586.7-10.6 586.2-10.0L586.2-10.0L578.8-0.3L569.2-5.1Q569.7-6.3 570.2-7.7Q570.7-9.1 570.7-10.7L570.7-10.7L570.5-26.3Q570.5-27.9 568.3-29.1ZM576.3-19.1L576.3-19.1L576.3-9.4Q576.5-8.2 577.8-7.6Q579.2-7.0 579.6-7.0Q580.1-7.0 580.3-7.1L580.3-7.1Q582.2-7.5 582.2-9.6L582.2-9.6Q582.2-10.1 582.1-10.6L582.1-10.6Q581.3-14.4 579.9-16.4Q578.4-18.3 576.3-19.1ZM599.0-0.7L599.0-0.7L588.2-5.0Q588.8-8.4 588.8-12.0Q588.8-15.7 588.1-19.6L588.1-19.6L595.9-24.2L595.9-24.3L595.9-24.2L595.9-24.2L604.7-18.0L595.6-8.4Q596.5-7.3 597.6-7.2Q598.7-7.1 599.5-7.1Q600.2-7.1 601.2-7.2Q602.2-7.2 603.7-7.3L603.7-7.3Q602.5-5.6 601.3-4.0Q600.1-2.3 599.0-0.7ZM595.2-18.2L595.2-18.2Q593.9-18.2 593.9-14.6L593.9-14.6Q593.9-12.6 594.6-10.6L594.6-10.6Q594.6-10.4 594.7-10.3L594.7-10.3L598.3-14.1Q598.7-14.5 598.7-14.9Q598.7-15.3 598.3-15.9Q597.9-16.6 597.5-17.0L597.5-17.0Q596.1-18.2 595.2-18.2ZM609.3-24.3L614.0-21.0L616.9-23.9Q621.4-20.8 623.0-17.6L623.0-17.6L619.4-12.8Q618.8-14.6 617.8-15.9Q616.7-17.3 614.3-18.7L614.3-18.7L613.6-17.7L613.1-10.0Q613.1-8.8 614.6-7.6Q616.2-6.3 617.0-6.0L617.0-6.0L613.3-0.7L606.3-6.1Q607.6-7.6 607.6-9.2L607.6-9.2L607.6-17.8Q607.5-18.9 605.9-20.0L605.9-20.0L609.3-24.3ZM635.4-5.8L635.4-5.8Q631.5-1.5 630.4-0.3L630.4-0.3Q628.7-1.6 627.1-2.9Q625.4-4.1 623.8-5.4L623.8-5.4Q625.3-6.7 625.8-7.8Q626.3-9.0 626.3-10.0L626.3-10.0L626.4-23.6Q626.4-25.0 626.3-27.0Q626.2-29.1 625.3-30.5L625.3-30.5L632.7-34.5Q632.1-31.8 632.0-28.9Q631.9-26.0 631.9-23L631.9-23L631.9-20.9L636.3-24.3Q642.5-18.3 642.5-10.7L642.5-10.7Q642.5-2.3 636.0 7.7L636.0 7.7L632.7 6.6Q637.7 1.1 637.7-6.0L637.7-6.0Q637.7-13.6 631.9-18.7L631.9-18.7L631.8-9.8Q631.8-8.1 632.1-7.9Q632.4-7.7 635.4-5.8ZM645.2-18.0L645.2-18.0Q650.4-21.5 653.9-24.3L653.9-24.3Q655.6-23.6 657.3-21.7L657.3-21.7Q661.1-17.6 661.8-13.2L661.8-13.2Q661.9-12.7 661.9-12.2L661.9-12.2Q661.9-10.7 661.1-9.8L661.1-9.8L653.6-0.3L644.0-5.1Q645.5-8.2 645.5-10.5L645.5-10.5L645.5-15.8Q645.4-17.4 645.2-18.0ZM651.2-18.8L651.2-18.8L651.1-9.2Q651.3-8.1 652.7-7.5Q654.0-6.9 654.5-6.9Q654.9-6.9 655.1-6.9L655.1-6.9Q657.0-7.4 657.0-9.4L657.0-9.4Q657.0-9.9 656.9-10.5L656.9-10.5Q656.2-14.2 654.7-16.1Q653.3-18.0 651.2-18.8ZM674.8-5.8L674.8-5.8Q671.0-1.5 669.9-0.3L669.9-0.3Q668.2-1.6 666.5-2.9Q664.9-4.1 663.2-5.4L663.2-5.4Q664.8-6.7 665.2-7.8Q665.7-9.0 665.7-10.0L665.7-10.0L665.9-23.6Q665.9-25.0 665.7-27.0Q665.6-29.1 664.7-30.5L664.7-30.5L672.1-34.5Q671.5-31.8 671.4-28.9Q671.3-26.0 671.3-23L671.3-23L671.2-9.8Q671.2-8.1 671.6-7.9Q671.9-7.7 674.8-5.8ZM687.3-6.2L687.3-6.2L682.3-0.7Q680.6-2.0 679.0-3.2Q677.3-4.5 675.7-5.8L675.7-5.8Q678.1-7.9 678.2-10.3L678.2-10.3L678.3-19.7L676.3-19.7L676.3-21.4Q679.4-25.8 684.0-32.8L684.0-32.8L685.2-32.6Q684.7-30.1 684.3-28.6Q683.9-27.0 683.8-24.6L683.8-24.6L687.8-24.6L687.8-19.8L683.7-19.8L683.7-10.2Q683.7-8.5 684.0-8.3Q684.3-8.1 687.3-6.2Z" fill="#ead9b4"/>
<text x="522" y="202" font-family="'Palatino Linotype',Palatino,Georgia,serif" font-size="17" font-style="italic" fill="#e88a6a" letter-spacing="1">wherein the ale is warm, the fire is warmer, and the cat is in charge</text>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 119px"><ellipse cx="208.1" cy="119" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 119)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="157.8" cy="111" r="7" fill="#a8322a"/><circle cx="157.8" cy="111" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 173px"><ellipse cx="143.9" cy="173" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 173)"/></g>
<circle cx="191.6" cy="179" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 227px"><ellipse cx="208.1" cy="227" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 198.1 227)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="157.8" cy="219" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="219" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:176px 281px"><ellipse cx="143.9" cy="281" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 281)"/></g>
<circle cx="191.6" cy="287" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 335px"><ellipse cx="208.1" cy="335" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 335)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="157.8" cy="327" r="7" fill="#a8322a"/><circle cx="157.8" cy="327" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 389px"><ellipse cx="143.9" cy="389" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 153.9 389)"/></g>
<circle cx="191.6" cy="395" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 443px"><ellipse cx="208.1" cy="443" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 443)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="157.8" cy="435" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="435" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:176px 497px"><ellipse cx="143.9" cy="497" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 497)"/></g>
<circle cx="191.6" cy="503" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 551px"><ellipse cx="208.1" cy="551" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 198.1 551)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="157.8" cy="543" r="7" fill="#a8322a"/><circle cx="157.8" cy="543" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 605px"><ellipse cx="143.9" cy="605" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 605)"/></g>
<circle cx="191.6" cy="611" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 659px"><ellipse cx="208.1" cy="659" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 659)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="157.8" cy="651" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="651" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:176px 713px"><ellipse cx="143.9" cy="713" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 153.9 713)"/></g>
<circle cx="191.6" cy="719" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:176px 767px"><ellipse cx="208.1" cy="767" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 198.1 767)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="157.8" cy="759" r="7" fill="#a8322a"/><circle cx="157.8" cy="759" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:176px 821px"><ellipse cx="143.9" cy="821" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 153.9 821)"/></g>
<circle cx="191.6" cy="827" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:176px 875px"><ellipse cx="208.1" cy="875" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 198.1 875)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="157.8" cy="867" r="7" fill="#1f3a7a"/><circle cx="157.8" cy="867" r="2.6" fill="#f3d27a"/></g>
<path d="M176 92 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54" fill="none" stroke="#d4a43a" stroke-width="4"/>
<path d="M176 92 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54" fill="none" stroke="#f3d27a" stroke-width="1.2" transform="translate(-1.5 -1)"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 119px"><ellipse cx="1397.9" cy="119" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 119)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="1448.2" cy="111" r="7" fill="#a8322a"/><circle cx="1448.2" cy="111" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 173px"><ellipse cx="1462.1" cy="173" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 173)"/></g>
<circle cx="1414.4" cy="179" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 227px"><ellipse cx="1397.9" cy="227" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 1407.9 227)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="1448.2" cy="219" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="219" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:1430px 281px"><ellipse cx="1462.1" cy="281" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 281)"/></g>
<circle cx="1414.4" cy="287" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 335px"><ellipse cx="1397.9" cy="335" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 335)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="1448.2" cy="327" r="7" fill="#a8322a"/><circle cx="1448.2" cy="327" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 389px"><ellipse cx="1462.1" cy="389" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 1452.1 389)"/></g>
<circle cx="1414.4" cy="395" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 443px"><ellipse cx="1397.9" cy="443" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 443)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="1448.2" cy="435" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="435" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:1430px 497px"><ellipse cx="1462.1" cy="497" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 497)"/></g>
<circle cx="1414.4" cy="503" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 551px"><ellipse cx="1397.9" cy="551" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 1407.9 551)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="1448.2" cy="543" r="7" fill="#a8322a"/><circle cx="1448.2" cy="543" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 605px"><ellipse cx="1462.1" cy="605" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 605)"/></g>
<circle cx="1414.4" cy="611" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 659px"><ellipse cx="1397.9" cy="659" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 659)"/></g>
<g class="berry" style="animation-delay:-1s"><circle cx="1448.2" cy="651" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="651" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-3s;transform-origin:1430px 713px"><ellipse cx="1462.1" cy="713" rx="15" ry="6.5" fill="#78a258" transform="rotate(-25 1452.1 713)"/></g>
<circle cx="1414.4" cy="719" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-0s;transform-origin:1430px 767px"><ellipse cx="1397.9" cy="767" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(25 1407.9 767)"/></g>
<g class="berry" style="animation-delay:-0s"><circle cx="1448.2" cy="759" r="7" fill="#a8322a"/><circle cx="1448.2" cy="759" r="2.6" fill="#f3d27a"/></g>
<g class="leaf" style="animation-delay:-1s;transform-origin:1430px 821px"><ellipse cx="1462.1" cy="821" rx="15" ry="6.5" fill="#4f7a3a" transform="rotate(-25 1452.1 821)"/></g>
<circle cx="1414.4" cy="827" r="3" fill="#d4a43a"/>
<g class="leaf" style="animation-delay:-2s;transform-origin:1430px 875px"><ellipse cx="1397.9" cy="875" rx="15" ry="6.5" fill="#78a258" transform="rotate(25 1407.9 875)"/></g>
<g class="berry" style="animation-delay:-2s"><circle cx="1448.2" cy="867" r="7" fill="#1f3a7a"/><circle cx="1448.2" cy="867" r="2.6" fill="#f3d27a"/></g>
<path d="M1430 92 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54" fill="none" stroke="#d4a43a" stroke-width="4"/>
<path d="M1430 92 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54 q26 27 0 54 q-26 27 0 54" fill="none" stroke="#f3d27a" stroke-width="1.2" transform="translate(-1.5 -1)"/>
<g transform="translate(120 160)"><ellipse cx="60" cy="58" rx="40" ry="24" fill="#b08a62" stroke="#2b1d12" stroke-width="2"/><circle cx="92" cy="40" r="16" fill="#b08a62" stroke="#2b1d12" stroke-width="2"/><circle cx="98" cy="38" r="2.4" fill="#2b1d12"/><circle cx="24" cy="54" r="8" fill="#f1e2bf" stroke="#2b1d12" stroke-width="1.5"/><path d="M50 80 l-6 10 M78 80 l4 10" stroke="#2b1d12" stroke-width="3"/></g>
<g class="ears"><path d="M206 196 q-6 -46 6 -50 q10 4 0 50 z M214 196 q8 -42 22 -40 q6 8 -12 42 z" fill="#b08a62" stroke="#2b1d12" stroke-width="2"/></g>
<g transform="translate(96 740)"><path d="M40 100 q-30 -40 10 -70 q30 -20 60 0 q20 14 10 40 q-10 24 -40 30 z" fill="#4f7a3a" stroke="#2b1d12" stroke-width="2"/><path d="M60 30 q-10 -30 10 -46 l20 6 l-8 6 l12 8 l-14 4 q-2 14 -10 22" fill="#4f7a3a" stroke="#2b1d12" stroke-width="2"/><circle cx="80" cy="-8" r="2.5" fill="#a8322a"/><path d="M50 40 q-40 -20 -30 -60 q20 20 40 30 z" fill="#a8322a" stroke="#2b1d12" stroke-width="1.5" opacity=".9"/><path d="M60 70 h30 M58 82 h28" stroke="#d4a43a" stroke-width="2"/></g>
<g class="wtail"><path d="M196 830 q40 10 50 -20 q6 -20 -10 -30 l14 -4 l-4 14" fill="none" stroke="#2b1d12" stroke-width="7" stroke-linecap="round"/><path d="M196 830 q40 10 50 -20 q6 -20 -10 -30" fill="none" stroke="#4f7a3a" stroke-width="4" stroke-linecap="round"/></g>
<g transform="translate(1392 176)"><path d="M10 80 q-14 -40 6 -66 q14 -16 28 0 q20 26 6 66 z" fill="#8a6a48" stroke="#2b1d12" stroke-width="2"/><path d="M14 10 l-8 -14 l14 8 M46 10 l8 -14 l-14 8" fill="#8a6a48" stroke="#2b1d12" stroke-width="2"/><circle cx="26" cy="38" r="11" fill="#f1e2bf" stroke="#2b1d12" stroke-width="1.5"/><circle cx="50" cy="38" r="11" fill="#f1e2bf" stroke="#2b1d12" stroke-width="1.5"/><path d="M34 46 l4 8 l4 -8 z" fill="#d4a43a"/><path d="M20 62 q18 10 36 0 M22 70 q16 8 32 0" stroke="#5a4028" stroke-width="2" fill="none"/><path d="M4 84 h56" stroke="#6b4a2a" stroke-width="6"/></g>
<ellipse class="blink l" cx="1418" cy="214" rx="5" ry="5" fill="#2b1d12"/><ellipse class="blink r" cx="1442" cy="214" rx="5" ry="5" fill="#2b1d12"/>
<g transform="translate(1350 760)"><path d="M10 120 C12 80 30 52 60 46 C90 52 108 80 110 120 Z" fill="#6b4a32" stroke="#2b1d12" stroke-width="2"/><path d="M34 120 C36 96 42 78 50 66 M60 120 V70 M86 120 C84 96 78 78 70 66" stroke="#4a3020" stroke-width="2.2" fill="none"/><path d="M34 92 Q60 100 86 92" stroke="#c9a46a" stroke-width="3.4" fill="none"/><path d="M58 96 l-4 18 M62 96 l3 18" stroke="#c9a46a" stroke-width="2.4"/><path d="M40 56 C46 46 74 46 80 56 C76 66 44 66 40 56 Z" fill="#4a3020" stroke="#2b1d12" stroke-width="1.4"/><path d="M46 90 q14 8 28 0" stroke="#2b1d12" stroke-width="7" stroke-linecap="round" fill="none"/><path d="M46 90 q14 8 28 0" stroke="#6b4a32" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="60" cy="95" r="4.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><g class="nod"><ellipse cx="62" cy="38" rx="15" ry="17" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M57 38 q2 1.6 4 0 M63 38 q2 1.6 4 0" stroke="#2b1d12" stroke-width="1.1" fill="none"/><path d="M62 39 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><ellipse cx="62" cy="45" rx="1.8" ry="2.2" fill="#2b1d12"/><circle cx="56.5" cy="42" r="2" fill="#e07a6a" opacity=".55"/><circle cx="67.5" cy="42" r="2" fill="#e07a6a" opacity=".55"/><path d="M47 32 C48 18 76 18 77 32" stroke="#6b3b1c" stroke-width="5" fill="none"/><ellipse cx="62" cy="24" rx="9" ry="4" fill="#f0c8a0"/></g><rect x="104" y="96" width="22" height="26" rx="3" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1.5"/><rect x="103" y="91" width="24" height="7" rx="3.5" fill="#f6ead0"/><path d="M126 102 q10 0 10 8 q0 8 -10 8" fill="none" stroke="#8e9aa8" stroke-width="4"/></g>
<text class="zz" x="1440" y="772" font-family="Georgia,serif" font-size="26" font-style="italic" fill="#1f3a7a">z</text><text class="zz" style="animation-delay:-2s" x="1452" y="772" font-family="Georgia,serif" font-size="20" font-style="italic" fill="#1f3a7a">z</text>
<g transform="translate(36 0)"><path d="M360 260 C390 320 330 380 360 440 S390 560 350 620" fill="none" stroke="#d4a43a" stroke-width="3"/>
<g class="leaf" style="animation-delay:-1s;transform-origin:370px 300px"><ellipse cx="382" cy="300" rx="14" ry="6" fill="#4f7a3a" transform="rotate(30 370 300)"/></g>
<g class="leaf" style="animation-delay:-2s;transform-origin:342px 380px"><ellipse cx="354" cy="380" rx="14" ry="6" fill="#4f7a3a" transform="rotate(-150 342 380)"/></g>
<g class="leaf" style="animation-delay:-0s;transform-origin:376px 470px"><ellipse cx="388" cy="470" rx="14" ry="6" fill="#4f7a3a" transform="rotate(30 376 470)"/></g>
<g class="leaf" style="animation-delay:-0s;transform-origin:346px 560px"><ellipse cx="358" cy="560" rx="14" ry="6" fill="#4f7a3a" transform="rotate(-150 346 560)"/></g>
<circle cx="356" cy="340" r="7" fill="#a8322a"/><circle cx="356" cy="340" r="3" fill="#f3d27a"/>
<circle cx="380" cy="430" r="7" fill="#a8322a"/><circle cx="380" cy="430" r="3" fill="#f3d27a"/>
<circle cx="352" cy="520" r="7" fill="#a8322a"/><circle cx="352" cy="520" r="3" fill="#f3d27a"/>
<circle cx="368" cy="600" r="7" fill="#a8322a"/><circle cx="368" cy="600" r="3" fill="#f3d27a"/>
</g>
<g class="bird"><g transform="translate(408 286)"><path d="M0 0 q14 -18 34 -10 q10 4 22 -2 q-6 12 -18 14 q-14 14 -34 8 z" fill="#1f3a7a"/><path d="M6 0 q-10 4 -16 -4" stroke="#1f3a7a" stroke-width="4" fill="none"/><g class="head"><circle cx="38" cy="-8" r="8" fill="#1f3a7a"/><circle cx="41" cy="-10" r="2" fill="#fff"/><path d="M45 -10 l11 -1 l-9 6 z" fill="#d4a43a"/></g><path d="M18 10 v8 M26 10 v8" stroke="#8a6418" stroke-width="2"/></g></g>
<g transform="translate(760 440)"><g class="knight"><path d="M40 150 l-7 38 M60 150 l6 38" stroke="#2b1d12" stroke-width="8" stroke-linecap="round"/><path d="M40 150 l-7 38 M60 150 l6 38" stroke="#9aa6b2" stroke-width="5.4" stroke-linecap="round" stroke-dasharray="2 2"/><path d="M26 190 h12 l-2 -5 h-8 z M60 190 h14 l-4 -5 h-8 z" fill="#2b1d12"/><path d="M34 92 C30 110 28 134 24 156 Q50 162 78 156 C74 134 72 110 68 92 Z" fill="#f4ecd8" stroke="#2b1d12" stroke-width="1.6"/><path d="M51 98 V150 M36 118 H66" stroke="#a8322a" stroke-width="7"/><path d="M40 104 C38 124 36 140 33 154 M62 104 C64 124 66 140 69 154" stroke="#d8ccb0" stroke-width="1.4" fill="none"/><path d="M36 52 h32 v34 q-16 7 -32 0 z" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1.8"/><path d="M36 66 h32" stroke="#2b1d12" stroke-width="3.2"/><path d="M52 52 v34" stroke="#b8c2cc" stroke-width="1.4"/><circle cx="44" cy="76" r="1.2" fill="#2b1d12"/><circle cx="49" cy="78" r="1.2" fill="#2b1d12"/><circle cx="56" cy="78" r="1.2" fill="#2b1d12"/><circle cx="61" cy="76" r="1.2" fill="#2b1d12"/><path d="M36 52 h32 l-3 -5 h-26 z" fill="#d4a43a" stroke="#2b1d12" stroke-width="1"/><path d="M52 47 q-10 -30 16 -36 q-10 12 -6 36 z" fill="#a8322a" stroke="#2b1d12" stroke-width="1"/><path d="M14 96 l170 34" stroke="#6b4a2a" stroke-width="6" stroke-linecap="round"/><path d="M178 125 l20 8 l-21 5 z" fill="#c8ccd2" stroke="#2b1d12" stroke-width="1"/><path d="M150 119 l24 -2 l-10 8 l12 6 l-26 -1 z" fill="#a8322a" stroke="#2b1d12" stroke-width=".8"/><path d="M18 98 h28 v22 q0 18 -14 28 q-14 -10 -14 -28 z" fill="#1f3a7a" stroke="#d4a43a" stroke-width="2.2"/><path d="M20 112 l12 8 l12 -8 M21 124 l11 8 l11 -8" stroke="#d4a43a" stroke-width="2.6" fill="none"/></g></g>
<g class="snail"><g transform="translate(952 506)"><path d="M-6 88 q70 10 120 -4 q10 -10 4 -18 q-30 10 -120 8 z" fill="#d8b47a" stroke="#2b1d12" stroke-width="2"/><g class="stalks"><path d="M112 70 l10 -30 M118 72 l20 -24" stroke="#2b1d12" stroke-width="2"/><circle cx="122" cy="40" r="4" fill="#2b1d12"/><circle cx="138" cy="48" r="4" fill="#2b1d12"/></g><circle cx="50" cy="44" r="40" fill="#c98a4a" stroke="#2b1d12" stroke-width="2.5"/><path d="M50 44 m-5 0 a5 5 0 1 1 10 0 a12 12 0 1 1 -22 0 a19 19 0 1 1 36 0 a26 26 0 1 1 -50 0" fill="none" stroke="#7a4a1e" stroke-width="4"/><path d="M100 66 q5 4 9 0" stroke="#2b1d12" stroke-width="2" fill="none"/></g></g>
<g transform="translate(784 752) scale(.92) translate(-800 -752)">
<rect x="370" y="660" width="860" height="184" rx="8" fill="url(#gold)" stroke="#8a6418" stroke-width="2"/>
<g clip-path="url(#mini)"><g transform="translate(0 -102)">
<rect x="378" y="770" width="844" height="170" fill="url(#diaper)"/>
<polygon points="378,940 1222,940 1222,880 378,880" fill="url(#tiles)"/>
<circle class="glow" cx="470" cy="850" r="130" fill="url(#fireGlow)"/>
<path d="M410 880 V800 q60 -40 120 0 V880 Z" fill="#a89a88" stroke="#2b1d12" stroke-width="2"/>
<path d="M430 880 V820 q40 -26 80 0 V880 Z" fill="#2a1408"/>
<path class="flame" d="M446 878 q8 -44 22 -54 q-2 26 14 32 q2 -18 -4 -28 q26 24 16 50 z" fill="#ff8a2a"/>
<path class="flame b" d="M458 878 q4 -26 12 -32 q0 18 12 32 z" fill="#ffe08a"/>
<rect x="440" y="874" width="60" height="8" rx="4" fill="#4a2410"/>
<circle class="smoke" style="transform-origin:470px 790px" cx="470" cy="790" r="8" fill="#9a9088"/><circle class="smoke" style="animation-delay:-2.5s;transform-origin:476px 790px" cx="476" cy="790" r="7" fill="#9a9088"/>
<g transform="translate(600 790)"><path d="M8 90 q-4 1 -7 3.5 h9 z M32 90 q4 1 7 3.5 h-9 z" fill="#2b1d12"/><path d="M9 26 C14 22 26 22 31 26 C34 44 36 66 39 88 Q20 93 1 88 C4 66 6 44 9 26 Z" fill="#9a7442" stroke="#2b1d12" stroke-width="1.4"/><path d="M15 34 C13 56 11 72 10 88 M21 31 C22 54 21 74 21 90 M27 36 C29 58 30 74 31 88" stroke="#6e5028" stroke-width="1.6" fill="none"/><path d="M2 87.5 Q20 92.5 38 87.5" stroke="#d4a43a" stroke-width="3" fill="none"/><path d="M9 48 Q20 51.5 31 48" stroke="#d4a43a" stroke-width="2.4" fill="none"/><path d="M14 25 q6 4 12 0" stroke="#d4a43a" stroke-width="2" fill="none"/><path d="M12 40 h16 l3.5 48 h-23 z" fill="#f4e8cc" stroke="#2b1d12" stroke-width=".9"/><path d="M15 50 v34 M24 50 v34" stroke="#d8c8a4" stroke-width="1"/><path d="M11 32 C8 40 8 48 10 56" stroke="#2b1d12" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M11 32 C8 40 8 48 10 56" stroke="#9a7442" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="12" rx="9" ry="10.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M15 10.5 q2 -1.6 4 0 M21 10.5 q2 -1.6 4 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="17" cy="12" r="1.1" fill="#2b1d12"/><circle cx="23" cy="12" r="1.1" fill="#2b1d12"/><path d="M20 13 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><path d="M17.6 18.5 q2.4 1.6 4.8 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="14.5" cy="16" r="2" fill="#e07a6a" opacity=".55"/><circle cx="25.5" cy="16" r="2" fill="#e07a6a" opacity=".55"/><path d="M10.5 10 q9.5 -14 19 0 v5 q-2 -6 -9.5 -6 q-7.5 0 -9.5 6 z" fill="#f6ecd4" stroke="#2b1d12" stroke-width="1"/><g class="pour"><path d="M28 32 C34 34 40 40 44 48" stroke="#2b1d12" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M28 32 C34 34 40 40 44 48" stroke="#9a7442" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="45.5" cy="50" r="3.2" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><path d="M40 46 h15 v19 q-7.5 6 -15 0 z" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1.4"/><path d="M55 50 q8 -4 6 9" stroke="#8e9aa8" stroke-width="2.5" fill="none"/><path d="M40 50 h15" stroke="#b8c2cc" stroke-width="1"/></g><path class="drip" d="M62 70 q-2 8 0 14" stroke="#e8b84a" stroke-width="3" fill="none"/></g>
<rect x="700" y="842" width="230" height="10" fill="#6b4a2a" stroke="#2b1d12" stroke-width="1.5"/><path d="M712 852 v32 M918 852 v32" stroke="#4a2f1a" stroke-width="6"/>
<g transform="translate(700 786)"><path d="M8 90 q-4 1 -7 3.5 h9 z M32 90 q4 1 7 3.5 h-9 z" fill="#2b1d12"/><path d="M9 26 C14 22 26 22 31 26 C34 44 36 66 39 88 Q20 93 1 88 C4 66 6 44 9 26 Z" fill="#1f3a7a" stroke="#2b1d12" stroke-width="1.4"/><path d="M15 34 C13 56 11 72 10 88 M21 31 C22 54 21 74 21 90 M27 36 C29 58 30 74 31 88" stroke="#122a5a" stroke-width="1.6" fill="none"/><path d="M2 87.5 Q20 92.5 38 87.5" stroke="#d4a43a" stroke-width="3" fill="none"/><path d="M9 48 Q20 51.5 31 48" stroke="#d4a43a" stroke-width="2.4" fill="none"/><path d="M14 25 q6 4 12 0" stroke="#d4a43a" stroke-width="2" fill="none"/><path d="M11 32 C8 40 8 48 10 56" stroke="#2b1d12" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M11 32 C8 40 8 48 10 56" stroke="#1f3a7a" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="13" rx="9" ry="10.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M15 11.5 q2 -1.6 4 0 M21 11.5 q2 -1.6 4 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="17" cy="13" r="1.1" fill="#2b1d12"/><circle cx="23" cy="13" r="1.1" fill="#2b1d12"/><path d="M20 14 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><path d="M17.6 19.5 q2.4 1.6 4.8 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="14.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><circle cx="25.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><path d="M30 7 q12 4 9 24" stroke="#a8322a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M8.5 10 q11.5 -16 23 0 q2 4 -2 6 h-19 q-4 -2 -2 -6 z" fill="#a8322a" stroke="#2b1d12" stroke-width="1"/><g class="sip"><path d="M28 32 C34 34 40 40 44 48" stroke="#2b1d12" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M28 32 C34 34 40 40 44 48" stroke="#1f3a7a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="45.5" cy="50" r="3.2" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><rect x="46" y="44" width="12" height="14" rx="1.5" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1"/><path d="M48 47 v9 M52 47 v9" stroke="#b8c2cc" stroke-width="1"/><rect x="45" y="41" width="14" height="4.5" rx="2" fill="#f6ead0"/></g></g>
<g transform="translate(880 786)"><path d="M8 90 q-4 1 -7 3.5 h9 z M32 90 q4 1 7 3.5 h-9 z" fill="#2b1d12"/><path d="M9 26 C14 22 26 22 31 26 C34 44 36 66 39 88 Q20 93 1 88 C4 66 6 44 9 26 Z" fill="#4f7a3a" stroke="#2b1d12" stroke-width="1.4"/><path d="M15 34 C13 56 11 72 10 88 M21 31 C22 54 21 74 21 90 M27 36 C29 58 30 74 31 88" stroke="#2f5222" stroke-width="1.6" fill="none"/><path d="M2 87.5 Q20 92.5 38 87.5" stroke="#d4a43a" stroke-width="3" fill="none"/><path d="M9 48 Q20 51.5 31 48" stroke="#d4a43a" stroke-width="2.4" fill="none"/><path d="M14 25 q6 4 12 0" stroke="#d4a43a" stroke-width="2" fill="none"/><path d="M29 32 C32 40 32 48 30 56" stroke="#2b1d12" stroke-width="7.4" fill="none" stroke-linecap="round"/><path d="M29 32 C32 40 32 48 30 56" stroke="#4f7a3a" stroke-width="5" fill="none" stroke-linecap="round"/><ellipse cx="20" cy="13" rx="9" ry="10.5" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1.2"/><path d="M15 11.5 q2 -1.6 4 0 M21 11.5 q2 -1.6 4 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="17" cy="13" r="1.1" fill="#2b1d12"/><circle cx="23" cy="13" r="1.1" fill="#2b1d12"/><path d="M20 14 l-1.6 4.2 h2.4" stroke="#2b1d12" stroke-width=".9" fill="none"/><path d="M17.6 19.5 q2.4 1.6 4.8 0" stroke="#2b1d12" stroke-width="1" fill="none"/><circle cx="14.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><circle cx="25.5" cy="17" r="2" fill="#e07a6a" opacity=".55"/><path d="M11 12 q-2 -6 2 -10 M29 12 q2 -6 -2 -10" stroke="#7a4a22" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M12 17 q8 15 16 0 q-1 8 -8 9 q-7 -1 -8 -9 z" fill="#7a4a22" stroke="#2b1d12" stroke-width=".8"/><g class="sip b"><path d="M12 32 C6 34 0 40 -4 48" stroke="#2b1d12" stroke-width="8.4" fill="none" stroke-linecap="round"/><path d="M12 32 C6 34 0 40 -4 48" stroke="#4f7a3a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="-5.5" cy="50" r="3.2" fill="#f0c8a0" stroke="#2b1d12" stroke-width="1"/><rect x="-22" y="44" width="12" height="14" rx="1.5" fill="#8e9aa8" stroke="#2b1d12" stroke-width="1"/><path d="M-20 47 v9 M-16 47 v9" stroke="#b8c2cc" stroke-width="1"/><rect x="-23" y="41" width="14" height="4.5" rx="2" fill="#f6ead0"/></g></g>
<g transform="translate(1010 830)"><ellipse cx="30" cy="30" rx="30" ry="40" fill="#8a5a32" stroke="#2b1d12" stroke-width="2"/><path d="M0 18 h60 M0 42 h60" stroke="#2b1d12" stroke-width="3"/><circle cx="30" cy="30" r="5" fill="#2b1d12"/></g>
<path d="M1110 790 h60" stroke="#2b1d12" stroke-width="4"/>
<g class="sign"><path d="M1120 790 v8 M1160 790 v8" stroke="#2b1d12" stroke-width="2"/><rect x="1116" y="798" width="48" height="40" fill="#f1e2bf" stroke="#2b1d12" stroke-width="2"/><path d="M1128 830 q-2 -18 12 -26 q14 8 12 26 z" fill="#ff9a2a"/><path d="M1136 830 q0 -10 4 -14 q4 4 4 14 z" fill="#ffe08a"/></g>
<g transform="translate(540 896)"><path class="tail" d="M2 26 q-16 -4 -18 -20" stroke="#2a2220" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M0 30 q4 -26 30 -26 q14 0 20 6 v20 z" fill="#2a2220"/><g class="cathead"><path d="M44 10 q10 -6 16 4 l4 -12 l2 14 q4 10 -6 16 h-16 z" fill="#2a2220"/><circle cx="58" cy="16" r="2.2" fill="#d9c24a"/></g></g>
</g></g>
<rect x="370" y="660" width="860" height="184" rx="8" fill="#2a1f14" opacity=".35"/>
</g>
<g class="mouse"><g transform="translate(446 650)"><g class="body"><path d="M32 12 q16 4 20 -8" stroke="#2b1d12" stroke-width="1.5" fill="none"/><ellipse cx="16" cy="10" rx="16" ry="9" fill="#8a7a6a" stroke="#2b1d12" stroke-width="1.5"/><circle cx="2" cy="4" r="5" fill="#a89888" stroke="#2b1d12" stroke-width="1.5"/><circle cx="-2" cy="9" r="1.5" fill="#2b1d12"/></g></g></g></svg>`

// How often the app has asked for the picture, and on what, so /tavern can say.
const asked: string[] = []

const LOOK_DAY: ThemeSetArgs = {
  colors: DAY.theme,
  backdrop: { scene: 'emberholt-chronicle', glass: { blur: 1, tint: '#f3e6c8', opacity: 0.45 } },
}
const LOOK_NIGHT: ThemeSetArgs = {
  colors: NIGHT.theme,
  backdrop: { scene: 'emberholt-chronicle-night', glass: { blur: 1, tint: '#2a2016', opacity: 0.45 } },
}

// Puts the page up, by day or by candlelight (remembered across sessions; candlelight unless day was chosen),
// and says in one line whether the app is drawing it.
async function apply($: EngineInterface, choose?: string): Promise<string> {
  if (choose === 'day' || choose === 'night') await $.store.set('mode', choose)
  const day = (await $.store.get('mode')) === 'day'
  const unpainted = (day ? DAY : NIGHT).problems.find(line => line.startsWith("Desktop won't paint"))
  const set = await $.theme.set(day ? LOOK_DAY : LOOK_NIGHT)
  if (unpainted !== undefined) {
    return 'Tavern theme: colours refused: ' + unpainted
  }
  return set.isDrawn
    ? 'Tavern theme: on, ' + (day ? 'by day' : 'by candlelight') + ' (/tavern day or /tavern night to switch). The app has asked for the picture ' + asked.length + ' times.'
    : 'Tavern theme: not drawn: ' + set.reason
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({ name: 'tavern', description: 'The Emberholt chronicle page: /tavern day or /tavern night to switch, or alone to put it up again' })
    const said = await apply($)
    $.ui.toast(said)
    return next(e)
  })

  on('command.run', { command: 'tavern' }, async ($, e) => {
    return { text: await apply($, e.args.trim().toLowerCase()) }
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    asked.push(e.surface + ', scene ' + e.props.scene)
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || !e.props.scene.startsWith('emberholt-chronicle')) {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={e.props.scene === 'emberholt-chronicle-night' ? SCENE_NIGHT : SCENE_DAY} alt="A page of the Emberholt chronicle: a tavern miniature with a flickering hearth and folk at their ale, a cat watching a mouse run along the frame, a bird hopping on a vine, a knight jousting a snail, and creatures in the margins" isInteractive />
  })
}
