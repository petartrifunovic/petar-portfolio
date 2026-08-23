export type ThemeMode = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

const listeners = new Set<() => void>();

export const getTheme = (): ThemeMode =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

export const getServerTheme = (): ThemeMode => 'light';

export const subscribeTheme = (listener: () => void) => {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY) return;

    document.documentElement.classList.toggle('dark', event.newValue === 'dark');
    listener();
  };

  listeners.add(listener);
  window.addEventListener('storage', onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
};

export const setTheme = (mode: ThemeMode) => {
  document.documentElement.classList.toggle('dark', mode === 'dark');

  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode);
  } catch {
  }

  listeners.forEach((listener) => listener());
};
