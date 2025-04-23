import { Easing } from 'react-native';

/**
 * Conjunto de funções de easing personalizadas para animações mais naturais
 */
export const customEasings = {
  // Easing suave para entrada
  softInOut: Easing.bezier(0.4, 0.0, 0.2, 1),
  // Easing com pequena bounce
  gentleBounce: Easing.bezier(0.34, 1.56, 0.64, 1),
  // Easing com aceleração suave
  accelerate: Easing.bezier(0.4, 0.0, 0.6, 1),
  // Easing com desaceleração suave
  decelerate: Easing.bezier(0.0, 0.0, 0.2, 1),
  // Easing com curva cinematográfica
  cinematic: Easing.bezier(0.32, 0.94, 0.60, 1),
}; 