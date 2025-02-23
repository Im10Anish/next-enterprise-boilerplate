// Import necessary testing libraries
import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';
import 'whatwg-fetch';

// Mock Next.js components and hooks
jest.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: {},
    asPath: '',
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn(),
    beforePopState: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
    isFallback: false,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt: string; width?: number; height?: number }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt} />;
  },
}));

// Mock next/head
jest.mock('next/head', () => {
  const Head = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  Head.displayName = 'MockedHead';
  return {
    __esModule: true,
    default: Head,
  };
});

// Mock matchMedia if running in a Node environment
if (typeof window !== 'undefined') {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    };
}

// TextEncoder/TextDecoder polyfills for Node environments
global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// Set up Intersection Observer mock (needed for some React components)
global.IntersectionObserver = class IntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
  constructor() {}
  disconnect() {
    return null;
  }
  observe() {
    return null;
  }
  takeRecords() {
    return [];
  }
  unobserve() {
    return null;
  }
};

// Mock localStorage and sessionStorage when running in Node
if (typeof window !== 'undefined') {
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });

  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    writable: true,
  });
}

// Reset all mocks before each test
beforeEach(() => {
  jest.clearAllMocks();
});

// Configure custom Jest matchers
expect.extend({
  // Add any custom matchers here if needed
});
