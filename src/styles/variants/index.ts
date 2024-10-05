import { getCSSVariable } from '../utils';

export const breakpoints = {
  initial: '0',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const colors = {
  primary: getCSSVariable('--primary-color'),
  secondary: getCSSVariable('--secondary-color'),
};