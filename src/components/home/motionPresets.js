export const EASE_OUT = [0.22, 1, 0.36, 1];

export const viewportOnce = {
  once: true,
  amount: 0.12,
  margin: '0px 0px -48px 0px',
};

export function getStaggerContainer(reduceMotion, stagger = 0.12) {
  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
      },
    };
  }

  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.08,
      },
    },
  };
}

export function getFadeUpItem(reduceMotion, y = 28) {
  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration: 0.3 },
      },
    };
  }

  return {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE_OUT },
    },
  };
}

export function getSectionHeaderMotion(reduceMotion) {
  if (reduceMotion) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.3 } },
    };
  }

  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: EASE_OUT },
    },
  };
}
