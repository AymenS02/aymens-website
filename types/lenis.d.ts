type LenisInstance = {
  scrollTo: (
    target: HTMLElement | number | string,
    options?: {
      duration?: number;
      immediate?: boolean;
      force?: boolean;
    }
  ) => void;
  start: () => void;
  stop: () => void;
};