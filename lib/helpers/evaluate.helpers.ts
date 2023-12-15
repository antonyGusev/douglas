const elementCoordinates = (el: HTMLElement): {x: number; y: number} => {
  const rectangl = el.getBoundingClientRect();

  return {x: rectangl.x, y: rectangl.y};
};

const elementBackgroundColor = (el: HTMLElement): string => window.getComputedStyle(el).backgroundColor;
const elementTextColor = (el: HTMLElement): string => window.getComputedStyle(el).color;
const elementCursor = (el: HTMLElement): string => window.getComputedStyle(el).cursor;
const elementTextDecorationColor = (el: HTMLElement): string => window.getComputedStyle(el).textDecorationColor;

const elementInheritedBackgroundColor = (el: HTMLElement): string => {
  function getInheritedBackgroundColor(el: HTMLElement): string {
    function getDefaultBackground() {
      const div = document.createElement('div');
      document.head.appendChild(div);
      const bg = window.getComputedStyle(div).backgroundColor;
      document.head.removeChild(div);
      return bg;
    }

    const defaultStyle = getDefaultBackground();
    const backgroundColor = window.getComputedStyle(el).backgroundColor;
    if (backgroundColor != defaultStyle) return backgroundColor;
    if (!el.parentElement) return defaultStyle;

    return getInheritedBackgroundColor(el.parentElement);
  }

  return getInheritedBackgroundColor(el);
};

export {
  elementCoordinates,
  elementBackgroundColor,
  elementTextColor,
  elementCursor,
  elementInheritedBackgroundColor,
  elementTextDecorationColor,
};
