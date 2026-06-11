/* Per-industry product mockups rendered as inline SVG inside a browser frame.
   Self-contained (no external images) so they render identically everywhere. */

const A = "var(--accent)";
const FG = "var(--muted-foreground)";
const SF = "var(--surface-2)";

function Frame({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <svg viewBox="0 0 480 280" className="w-full h-auto rounded-xl border border-border bg-surface" role="img" aria-label={title}>
      {/* browser chrome */}
      <rect x="0" y="0" width="480" height="28" fill={SF} />
      <circle cx="16" cy="14" r="4" fill="#f87171" opacity="0.7" />
      <circle cx="30" cy="14" r="4" fill="#fbbf24" opacity="0.7" />
      <circle cx="44" cy="14" r="4" fill="#4ade80" opacity="0.7" />
      <rect x="120" y="7" width="240" height="14" rx="7" fill="var(--muted)" />
      <text x="240" y="17" textAnchor="middle" fontSize="8" fill={FG} fontFamily="monospace">{title}</text>
      {children}
    </svg>
  );
}

function BarChart({ x, y, values }: { x: number; y: number; values: number[] }) {
  return (
    <g>
      {values.map((v, i) => (
        <rect key={i} x={x + i * 22} y={y - v} width="14" height={v} rx="2" fill={A} opacity={0.35 + (i / values.length) * 0.6} />
      ))}
    </g>
  );
}

function Rows({ x, y, n, w }: { x: number; y: number; n: number; w: number }) {
  return (
    <g>
      {Array.from({ length: n }).map((_, i) => (
        <g key={i}>
          <rect x={x} y={y + i * 22} width={w} height="14" rx="4" fill="var(--muted)" />
          <circle cx={x + 8} cy={y + i * 22 + 7} r="3.5" fill={A} opacity={i % 3 === 0 ? 1 : 0.3} />
        </g>
      ))}
    </g>
  );
}

const visuals: Record<string, React.ReactNode> = {
  "cross-border": (
    <Frame title="fulfillment-agent.app">
      {/* email → extraction → PO pipeline */}
      <rect x="20" y="48" width="130" height="190" rx="8" fill={SF} />
      <text x="32" y="68" fontSize="9" fill={FG} fontFamily="monospace">INBOX · 47</text>
      <Rows x={32} y={80} n={6} w={106} />
      <path d="M158 140 L196 140" stroke={A} strokeWidth="2" markerEnd="url(#arr)" />
      <defs><marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6" fill="none" stroke={A} strokeWidth="1.5"/></marker></defs>
      <rect x="200" y="90" width="120" height="100" rx="8" fill={SF} stroke={A} strokeOpacity="0.4" />
      <text x="212" y="110" fontSize="9" fill={A} fontFamily="monospace">AI EXTRACT</text>
      <rect x="212" y="120" width="96" height="8" rx="3" fill="var(--muted)" />
      <rect x="212" y="134" width="76" height="8" rx="3" fill="var(--muted)" />
      <rect x="212" y="148" width="86" height="8" rx="3" fill="var(--muted)" />
      <rect x="212" y="166" width="50" height="14" rx="7" fill={A} />
      <text x="237" y="176" textAnchor="middle" fontSize="8" fill="var(--accent-foreground)" fontFamily="monospace">98.7%</text>
      <path d="M328 140 L366 140" stroke={A} strokeWidth="2" markerEnd="url(#arr)" />
      <rect x="370" y="60" width="90" height="160" rx="8" fill={SF} />
      <text x="382" y="80" fontSize="9" fill={FG} fontFamily="monospace">PO QUEUE</text>
      <Rows x={382} y={92} n={5} w={66} />
      <text x="382" y="232" fontSize="8" fill={A} fontFamily="monospace">90s / order</text>
    </Frame>
  ),
  saas: (
    <Frame title="billing.dashboard">
      <text x="24" y="62" fontSize="10" fill={FG} fontFamily="monospace">MRR RECONCILED</text>
      <text x="24" y="86" fontSize="22" fill="var(--foreground)" fontWeight="500">$284,610</text>
      <text x="150" y="86" fontSize="10" fill={A} fontFamily="monospace">▲ 12.4%</text>
      <BarChart x={24} y={210} values={[40, 55, 48, 70, 64, 86, 92, 105, 98, 120]} />
      <polyline points="24,180 70,168 116,172 162,150 208,156 244,130" fill="none" stroke={A} strokeWidth="2" opacity="0.9" />
      <rect x="290" y="48" width="170" height="190" rx="8" fill={SF} />
      <text x="302" y="68" fontSize="9" fill={FG} fontFamily="monospace">EVENTS · 30M/mo</text>
      <Rows x={302} y={80} n={6} w={146} />
      <text x="302" y="226" fontSize="8" fill={A} fontFamily="monospace">0 disputes · Q1–Q2</text>
    </Frame>
  ),
  "internal-tools": (
    <Frame title="ops-console.internal">
      <rect x="20" y="44" width="90" height="200" rx="8" fill={SF} />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x="30" y={56 + i * 26} width="70" height="14" rx="4" fill={i === 1 ? A : "var(--muted)"} opacity={i === 1 ? 0.9 : 1} />
      ))}
      <rect x="122" y="44" width="338" height="200" rx="8" fill={SF} />
      <text x="136" y="66" fontSize="9" fill={FG} fontFamily="monospace">SHIPMENTS · LIVE</text>
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <rect x="136" y={78 + i * 26} width="200" height="14" rx="4" fill="var(--muted)" />
          <rect x="348" y={78 + i * 26} width="50" height="14" rx="7" fill={A} opacity={0.2 + (i % 3) * 0.3} />
          <text x="373" y={88 + i * 26} textAnchor="middle" fontSize="7" fill="var(--foreground)" fontFamily="monospace">
            {["OK", "PACK", "SHIP"][i % 3]}
          </text>
        </g>
      ))}
      <text x="136" y="238" fontSize="8" fill={A} fontFamily="monospace">11 spreadsheets → 1 console</text>
    </Frame>
  ),
  "ai-agent": (
    <Frame title="support-agent.chat">
      <rect x="24" y="48" width="280" height="36" rx="10" fill={SF} />
      <text x="36" y="70" fontSize="9" fill={FG}>How do I rotate API keys for staging?</text>
      <rect x="120" y="96" width="336" height="84" rx="10" fill={SF} stroke={A} strokeOpacity="0.4" />
      <text x="134" y="116" fontSize="9" fill="var(--foreground)">Go to Settings → API → Rotate. Staging keys expire</text>
      <text x="134" y="130" fontSize="9" fill="var(--foreground)">after 90 days automatically.</text>
      <rect x="134" y="142" width="120" height="14" rx="7" fill={A} opacity="0.15" />
      <text x="142" y="152" fontSize="8" fill={A} fontFamily="monospace">📄 docs/api/keys §3.2</text>
      <rect x="262" y="142" width="100" height="14" rx="7" fill={A} opacity="0.15" />
      <text x="270" y="152" fontSize="8" fill={A} fontFamily="monospace">confidence 0.94</text>
      <rect x="24" y="196" width="200" height="36" rx="10" fill={SF} />
      <text x="36" y="218" fontSize="9" fill={FG}>And for production?</text>
      <rect x="24" y="244" width="432" height="2" rx="1" fill={A} opacity="0.5" />
      <text x="24" y="266" fontSize="8" fill={A} fontFamily="monospace">70% auto-resolved · 11s median response</text>
    </Frame>
  ),
  ecommerce: (
    <Frame title="storefront.shop">
      {Array.from({ length: 3 }).map((_, i) => (
        <g key={i}>
          <rect x={24 + i * 148} y="48" width="136" height="120" rx="10" fill={SF} />
          <rect x={36 + i * 148} y="60" width="112" height="64" rx="6" fill="var(--muted)" />
          <circle cx={92 + i * 148} cy="92" r="18" fill={A} opacity={0.25 + i * 0.2} />
          <rect x={36 + i * 148} y="132" width="80" height="8" rx="3" fill="var(--muted)" />
          <rect x={36 + i * 148} y="146" width="44" height="10" rx="4" fill={A} opacity="0.8" />
        </g>
      ))}
      <rect x="24" y="186" width="432" height="56" rx="10" fill={SF} />
      <text x="40" y="208" fontSize="9" fill={FG} fontFamily="monospace">LCP</text>
      <text x="40" y="228" fontSize="16" fill={A} fontWeight="500">1.1s</text>
      <text x="130" y="208" fontSize="9" fill={FG} fontFamily="monospace">CONVERSION</text>
      <text x="130" y="228" fontSize="16" fill={A} fontWeight="500">+23%</text>
      <text x="260" y="208" fontSize="9" fill={FG} fontFamily="monospace">CAMPAIGNS/QTR</text>
      <text x="260" y="228" fontSize="16" fill={A} fontWeight="500">5×</text>
      <polyline points="370,230 390,222 410,226 430,210 446,200" fill="none" stroke={A} strokeWidth="2" />
    </Frame>
  ),
  content: (
    <Frame title="editorial-pipeline.app">
      {["DRAFT", "REVIEW", "SCHEDULED"].map((label, i) => (
        <g key={label}>
          <rect x={24 + i * 148} y="48" width="136" height="196" rx="10" fill={SF} />
          <text x={36 + i * 148} y="68" fontSize="8" fill={i === 2 ? A : FG} fontFamily="monospace">{label}</text>
          {Array.from({ length: 3 }).map((_, j) => (
            <g key={j}>
              <rect x={36 + i * 148} y={78 + j * 50} width="112" height="40" rx="6" fill="var(--muted)" stroke={i === 1 && j === 0 ? A : "none"} strokeOpacity="0.5" />
              <rect x={44 + i * 148} y={86 + j * 50} width="80" height="6" rx="2" fill={SF} />
              <rect x={44 + i * 148} y={97 + j * 50} width="56" height="6" rx="2" fill={SF} />
              <circle cx={136 + i * 148} cy={108 + j * 50} r="4" fill={A} opacity={0.3 + j * 0.3} />
            </g>
          ))}
        </g>
      ))}
      <text x="24" y="262" fontSize="8" fill={A} fontFamily="monospace">20 articles/week · 2-person team · +240% impressions</text>
    </Frame>
  ),
};

export function CaseVisual({ industry }: { industry: string }) {
  return <div className="overflow-hidden rounded-xl">{visuals[industry] ?? visuals.saas}</div>;
}
