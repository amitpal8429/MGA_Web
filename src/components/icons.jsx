const common = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function IconMentor(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  );
}

export function IconFlex(props) {
  return (
    <svg {...common} {...props}>
      <rect x="3" y="5" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 18v3" />
    </svg>
  );
}

export function IconCertificate(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="9" r="5.2" />
      <path d="M9 13.5 8 21l4-2 4 2-1-7.5" />
    </svg>
  );
}

export function IconCompass(props) {
  return (
    <svg {...common} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15 9-2 6-4-2 2-6 4 2Z" />
    </svg>
  );
}

export function IconSupport(props) {
  return (
    <svg {...common} {...props}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.4" />
      <rect x="17" y="13" width="4" height="6" rx="1.4" />
    </svg>
  );
}

export function IconCurriculum(props) {
  return (
    <svg {...common} {...props}>
      <path d="M4 5.5C6 4.5 9 4 12 5.5c3-1.5 6-1 8 0v13c-2-1-5-1.5-8 0-3-1.5-6-1-8 0Z" />
      <path d="M12 5.5v13" />
    </svg>
  );
}

export function IconQuote(props) {
  return (
    <svg {...common} viewBox="0 0 24 24" width={30} height={30} {...props}>
      <path d="M7.5 6C5 6.6 3.3 8.9 3.3 11.6c0 2.2 1.5 3.7 3.4 3.7 1.7 0 3-1.3 3-3 0-1.6-1.2-2.8-2.7-2.9.3-1.2 1.4-2.3 2.9-2.7L7.5 6Zm9 0c-2.5.6-4.2 2.9-4.2 5.6 0 2.2 1.5 3.7 3.4 3.7 1.7 0 3-1.3 3-3 0-1.6-1.2-2.8-2.7-2.9.3-1.2 1.4-2.3 2.9-2.7L16.5 6Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconChevronDown(props) {
  return (
    <svg {...common} width={20} height={20} {...props}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
