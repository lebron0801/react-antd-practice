const storageConfig = {
  namespace: 'coho_'
};

const local = {
  /**
   * 存储缓存
   * @param key 存储键
   * @param value 存储值
   * @param expires 缓存有效时间，毫秒
   */
  set(key: string, value: any, expires?: number) {
    const params = { key, value, expires };

    if (expires) {
      const data = Object.assign(params, { startTime: new Date().getTime() });
      localStorage.setItem(storageConfig.namespace + key, JSON.stringify(data));
    } else {
      if (Object.prototype.toString.call(value) === '[object Object]') {
        value = JSON.stringify(value);
      }

      if (Object.prototype.toString.call(value) === '[object Array]') {
        value = JSON.stringify(value);
      }

      localStorage.setItem(storageConfig.namespace + key, value);
    }
  },
  /**
   * 取值
   * @param key 键
   * @returns 返回值
   */
  get(key: string) {
    let item: any = localStorage.getItem(storageConfig.namespace + key);
    // 先将拿到的试着进行json转为对象的形式
    try {
      item = JSON.parse(item);
    } catch (error) {
      // item = item;
    }

    // 如果有startTime的值，说明设置了失效时间
    if (item && item.startTime) {
      const date = new Date().getTime();
      // 如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        localStorage.removeItem(storageConfig.namespace + key);
        return null;
      } else {
        return item.value;
      }
    } else {
      return item;
    }
  },
  // 删除
  remove(key: string) {
    localStorage.removeItem(storageConfig.namespace + key);
  },
  // 清除全部
  clear() {
    localStorage.clear();
  }
};

const session = {
  set(key: string, value: any) {
    const data = {
      value: value
    };

    sessionStorage.setItem(storageConfig.namespace + key, JSON.stringify(data));
  },
  get(key: string) {
    const data = sessionStorage.getItem(storageConfig.namespace + key);
    if (!data || data === 'null') {
      return null;
    }

    return JSON.parse(data).value;
  },
  remove(key: string) {
    sessionStorage.removeItem(storageConfig.namespace + key);
  },
  clear() {
    sessionStorage.clear();
  }
};

export { local, session };
