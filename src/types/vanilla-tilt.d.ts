interface VanillaTiltSettings {
  reverse?: boolean;
  max?: number;
  startX?: number;
  startY?: number;
  perspective?: number;
  easing?: string;
  scale?: number;
  speed?: number;
  transition?: boolean;
  axis?: string | null;
  glare?: boolean;
  'max-glare'?: number;
  'glare-prerender'?: boolean;
  'full-page-listening'?: boolean;
  'mouse-event-element'?: string | object | null;
  reset?: boolean;
  gyroscope?: boolean;
  gyroscopeMinAngleX?: number;
  gyroscopeMaxAngleX?: number;
  gyroscopeMinAngleY?: number;
  gyroscopeMaxAngleY?: number;
  gyroscopeSamples?: number;
}

interface VanillaTilt {
  init: (elements: NodeListOf<Element> | Element[], settings?: VanillaTiltSettings) => void;
}

interface Window {
  VanillaTilt: VanillaTilt;
}
