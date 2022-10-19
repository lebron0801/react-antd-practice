/**
 * 判断是否为对象
 * @param value 需要验证的值
 */
export function isObject(value: any) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 对象深度合并，不支持数组，遇到数组替换
 * @param args[0] 目标源对象
 * @returns object 返回新对象
 */
export function merge(...args: Array<Record<string, any>>): Record<string, any> {
  const target: any = args[0];
  for (let i = 1; i < args.length; i++) {
    const source: any = args[i] || {};
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        const value = source[key];
        if (isObject(value) && isObject(target[key])) {
          target[key] = merge(target[key], value);
        } else {
          target[key] = value;
        }
      }
    }
  }

  return target;
}
