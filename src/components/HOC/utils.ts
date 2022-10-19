function getDisplayName(WrappedComponent: any) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const compose =
  (...func: any[]) =>
  (WrappedComponent: any) => {
    if (func.length === 0) {
      return WrappedComponent;
    }

    return func.reduceRight((res, cur) => cur(res), func.pop()(WrappedComponent));
  };

export { getDisplayName, compose };
