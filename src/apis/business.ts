import xhr from '@/request';

/**
 * 获取用户列表
 */
export const getUserList = (params: any) =>
  xhr({
    url: '/api/org/user/list',
    params,
    method: 'get'
  });

/**
 * 删除用户
 */
export const deleteUserRecord = (data: any) =>
  xhr({
    url: '/api/org/user/record',
    data,
    method: 'delete'
  });

/**
 * 更新用户信息
 */
export const updateUserDetail = (data: any) =>
  xhr({
    url: '/api/org/user/detail',
    data,
    method: 'put'
  });

/**
 * 创建用户信息
 */
export const createUserForm = (data: any) =>
  xhr({
    url: '/api/org/user/form',
    data
  });

export const getUserInfo = (data: any) =>
  xhr({
    url: '/api/post/list',
    data
  });

/******************** 新增部分 ***********************/

/**
 * 获取字典分组，字典类别，字典明细所有数据
 */
export const fetchDict = () =>
  xhr({
    url: '/api/v1/dict/all',
    method: 'get'
  });

/**
 * 获取字典详情列表分页数据
 * @param data 字典分类数据
 * @param params 分页数据
 * @returns 字典详情列表
 */
export const fetchDictDetails = (data: any, params: any) =>
  xhr({
    url: `/api/v1/dict/detail/${data.cateId}`,
    method: 'get',
    params
  });

/**
 * 创建字典明细
 * @param data 字典明细数据
 */
export const createDictDetail = (data: any) =>
  xhr({
    url: '/api/v1/dict-detail',
    data
  });

/**
 * 更新字典明细数据
 * @param id 字典明细编号
 * @param data 待更新的数据
 */
export const updateDictDetail = (data: any) =>
  xhr({
    url: `/api/v1/dict-detail/${data.id}`,
    method: 'put',
    data
  });

/**
 * 获取指定字典明细数据
 * @param id 字典明细编号
 */
export const fetchDictDetail = (id: string) =>
  xhr({
    url: `/api/v1/dict-detail/${id}`,
    method: 'get'
  });

/**
 * 删除指定字典明细数据
 * @param id 字典明细编号
 */
export const destroyDictDetail = (id: string) =>
  xhr({
    url: `/api/v1/dict-detail/${id}`,
    method: 'delete'
  });

/**
 * 获取指定字典分类数据
 * @param id 字典分类编号
 */
export const fetchDictCate = (id: string) =>
  xhr({
    url: `/api/v1/dict-cate/${id}`,
    method: 'get'
  });

/**
 * 更新字典分类信息
 * @param data 字典分类数据
 */
export const updateDictCate = (data: any) =>
  xhr({
    url: `/api/v1/dict-cate/${data.id}`,
    method: 'put',
    data
  });

/**
 * 创建字典明细
 * @param data 字典明细数据
 */
export const createDictCate = (data: any) =>
  xhr({
    url: '/api/v1/dict-cate',
    data
  });

/**
 * 删除指定字典分类条目
 * @param id 字典分类编号
 */
export const destroyDictCate = (id: string) =>
  xhr({
    url: `/api/v1/dict-cate/${id}`,
    method: 'delete'
  });

/**
 * 获取字典分组信息
 * @param id 字典分组编号
 */
export const fetchDictGroup = (id: string) =>
  xhr({
    url: `/api/v1/dict-group/${id}`,
    method: 'get'
  });

/**
 * 创建字典分组条目
 * @param data 分组信息
 */
export const createDictGroup = (data: any) =>
  xhr({
    url: '/api/v1/dict-group',
    data
  });

/**
 * 创建字典分组条目
 * @param data 分组信息
 */
export const updateDictGroup = (data: any) =>
  xhr({
    url: `/api/v1/dict-group/${data.id}`,
    data,
    method: 'put'
  });

/**
 * 批量删除字典明细
 * @param data 字典明细编号集合
 */
export const destroiesDictDetails = (data: any) =>
  xhr({
    url: '/api/v1/dict-detail/batch',
    data
  });

/**
 * 删除字典分组条目
 * @param id 字典分组编号
 */
export const destroyDictGroup = (id: string) =>
  xhr({
    url: `/api/v1/dict-group/${id}`,
    method: 'delete'
  });
