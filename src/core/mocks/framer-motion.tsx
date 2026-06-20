import React from 'react';

// AnimatePresence just renders children
export const AnimatePresence = ({ children, ...props }: any) => {
  return <>{children}</>;
};

export const LayoutGroup = ({ children, ...props }: any) => {
  return <>{children}</>;
};

// motion proxy that returns standard components
const componentCache: Record<string, any> = {};

const createMotionComponent = (tagName: string) => {
  const Comp = React.forwardRef(({
    children,
    transition,
    animate,
    initial,
    exit,
    whileHover,
    whileTap,
    whileDrag,
    whileFocus,
    whileInView,
    viewport,
    variants,
    layout,
    layoutId,
    layoutDependency,
    onLayoutAnimationComplete,
    drag,
    dragConstraints,
    dragElastic,
    dragMomentum,
    dragTransition,
    dragPropagation,
    dragControls,
    dragListener,
    dragDirectionLock,
    onDrag,
    onDragStart,
    onDragEnd,
    onDirectionLock,
    onDragTransitionEnd,
    onAnimationStart,
    onAnimationComplete,
    onUpdate,
    custom,
    inherit,
    ...props
  }: any, ref: any) => {
    return React.createElement(tagName, { ...props, ref }, children);
  });
  Comp.displayName = `motion.${tagName}`;
  return Comp;
};

export const motion = new Proxy({} as any, {
  get(target, prop: string) {
    if (typeof prop !== 'string') return undefined;
    if (!componentCache[prop]) {
      componentCache[prop] = createMotionComponent(prop);
    }
    return componentCache[prop];
  }
});

// Mock hooks
export const useAnimation = () => ({
  start: async () => {},
  stop: () => {},
  set: () => {},
});
export const useMotionValue = (val: any) => ({
  get: () => val,
  set: () => {},
  onChange: () => () => {},
  on: () => () => {},
  clearListeners: () => {},
});
export const useTransform = (val: any, transformFnOrRange: any, outputRange?: any) => {
  return typeof transformFnOrRange === 'function' ? transformFnOrRange(val) : val;
};
export const useSpring = (val: any) => val;
export const useScroll = () => ({ scrollY: { get: () => 0 }, scrollYProgress: { get: () => 0 } });
export const usePresence = () => [true, null];
