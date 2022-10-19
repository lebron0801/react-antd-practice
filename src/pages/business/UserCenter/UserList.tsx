import React from 'react';
import {
  Button,
  message,
  Table,
  Input,
  Row,
  Col,
  Collapse,
  Space,
  Tooltip,
  Switch,
  Divider,
  Popconfirm,
  Modal,
  Form,
  InputNumber,
  Empty
} from 'antd';
import '@/assets/less/business/UserList.less';
import {
  CaretRightOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import {
  fetchDict,
  fetchDictDetails,
  createDictDetail,
  updateDictDetail,
  fetchDictDetail,
  destroyDictDetail,
  fetchDictCate,
  updateDictCate,
  createDictCate,
  destroyDictCate,
  fetchDictGroup,
  createDictGroup,
  updateDictGroup,
  destroiesDictDetails,
  destroyDictGroup
} from '@/apis/business';
import classnames from 'classnames';
import { FormInstance } from 'antd/es/form';

type StateType = {
  cateList: Array<any>;
  // 当前字典分类
  currentCateId: '';
  // 字典列表数据
  dataSource: Array<any>;
  // 列表总条数
  total: number;
  // 分类弹出框信息
  cateInfo: any;
  // 分组弹出框信息
  groupInfo: any;
  // 字典弹出框信息
  dictInfo: any;
  // 选中的列表项
  selectedRowKeys: Array<any>;
};

const columns = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
    key: 'dictName'
  },
  {
    title: '字典值',
    dataIndex: 'dictValue',
    key: 'dictValue'
  },
  {
    title: '是否启用',
    dataIndex: 'enable',
    key: 'enable',
    render: (state: boolean, record: any) => (
      <Switch
        defaultChecked={state}
        onChange={async (checked: boolean) => {
          const res = await updateDictDetail({ ...record, enable: checked });

          if (res.error) {
            message.error(res.error);
          } else {
            message.success('更新成功');
          }
        }}
      />
    )
  },
  {
    title: '操作',
    key: 'action',
    width: '120px',
    render: (record: any) => (
      <>
        <a
          onClick={async () => {
            const res = await fetchDictDetail(record.id);

            currentIns.setState(
              {
                dictInfo: {
                  ...currentIns.state.dictInfo,
                  visible: true,
                  title: '编辑字典',
                  status: 'edit',
                  defaultData: res.data,
                  selectedDictId: res.data.id
                }
              },
              () => {
                currentIns.dictForm.current!.resetFields();
              }
            );
          }}
        >
          编辑
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="确定删除？"
          okText="是"
          cancelText="否"
          onConfirm={async () => {
            const res = await destroyDictDetail(record.id);

            if (res.code === 200) {
              message.success(res.msg);

              if (currentIns.state.currentCateId === currentIns.state.cateInfo.selectedCateId) {
                const list = await fetchDictDetails(
                  { cateId: currentIns.state.currentCateId },
                  { pageSize: 10, pageIndex: 1 }
                );

                if (list.code === 200) {
                  currentIns.setState({
                    dataSource: list.data.list,
                    total: list.data.pageData.total
                  });
                } else {
                  message.error(list.msg);
                }
              }
            } else {
              message.error(res.msg);
            }
          }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>
      </>
    )
  }
];

let currentIns: any = null;

class UserList extends React.Component<any, StateType> {
  constructor(props: any) {
    super(props);

    this.state = {
      currentCateId: '',
      cateList: [],
      dataSource: [],
      total: 0,
      cateInfo: {
        visible: false,
        defaultData: null,
        title: '新增分类',
        selectedCateId: '',
        status: 'add'
      },
      groupInfo: {
        visible: false,
        defaultData: null,
        title: '新增分组',
        selectedGroupId: '',
        status: 'add'
      },
      dictInfo: {
        visible: false,
        defaultData: null,
        title: '新增字典',
        selectedDictId: '',
        status: 'add'
      },
      selectedRowKeys: []
    };
  }

  // 字典分类表单实例
  dictCateForm: any = React.createRef<FormInstance>();

  // 字典分组表单实例
  dictGroupForm: any = React.createRef<FormInstance>();

  // 字典表单实例
  dictForm: any = React.createRef<FormInstance>();

  onSelectChange = (selectedRowKeys: Array<any>) => {
    this.setState({ selectedRowKeys });
  };

  async componentDidMount() {
    this.getAllDict();
    currentIns = this;
  }

  // 页面加载获取字典全量数据
  async getAllDict() {
    const res = await fetchDict();

    if (res.code === 200) {
      this.setState({ cateList: res.data });
    } else {
      message.error(res.msg);
    }
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };

    return (
      <div className="user-list-wrapper">
        <div className="wrapper-body">
          <div className="left">
            <div className="search">
              <Row>
                <Col flex="1">
                  <Input placeholder="请输入" suffix={<SearchOutlined />} />
                </Col>
                <Col flex="100px" style={{ textAlign: 'right' }}>
                  <Button
                    type="primary"
                    onClick={() => {
                      this.setState(
                        {
                          groupInfo: {
                            ...this.state.groupInfo,
                            visible: true,
                            title: '新增分组',
                            status: 'add'
                          }
                        },
                        () => {
                          this.dictGroupForm.current!.resetFields();
                        }
                      );
                    }}
                  >
                    新增分组
                  </Button>
                </Col>
              </Row>
            </div>
            <div className="list">
              {this.state.cateList.length === 0 && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
              <Collapse
                bordered={false}
                ghost
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="site-collapse-custom-collapse"
              >
                {this.state.cateList.map((item: any) => {
                  return (
                    <Collapse.Panel
                      header={
                        <>
                          <span>{item.groupName}</span>
                          <Space className="opt-icon">
                            <Tooltip title="新增字典分类">
                              <PlusOutlined
                                className="opt-icon-sub"
                                onClick={(e: any) => {
                                  e.stopPropagation();

                                  this.setState(
                                    {
                                      cateInfo: {
                                        ...this.state.cateInfo,
                                        visible: true,
                                        title: '新增分类',
                                        status: 'add'
                                      },
                                      groupInfo: {
                                        ...this.state.groupInfo,
                                        selectedGroupId: item.id
                                      }
                                    },
                                    () => {
                                      this.dictCateForm.current!.resetFields();
                                    }
                                  );
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="编辑分组">
                              <EditOutlined
                                className="opt-icon-sub"
                                onClick={async (e: any) => {
                                  e.stopPropagation();

                                  const res = await fetchDictGroup(item.id);

                                  if (res.code === 200) {
                                    this.setState(
                                      {
                                        groupInfo: {
                                          ...this.state.groupInfo,
                                          visible: true,
                                          title: '编辑分组',
                                          defaultData: res.data,
                                          selectedGroupId: item.id,
                                          status: 'edit'
                                        }
                                      },
                                      () => {
                                        this.dictGroupForm.current!.resetFields();
                                      }
                                    );
                                  }
                                }}
                              />
                            </Tooltip>
                            <Tooltip title="删除分组">
                              <DeleteOutlined
                                className="opt-icon-sub"
                                onClick={(e: any) => {
                                  e.stopPropagation();

                                  Modal.confirm({
                                    icon: <ExclamationCircleOutlined />,
                                    content: '删除此分组，会删除分组下的所有数据，确定删除？',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: async () => {
                                      const res = await destroyDictGroup(item.id);

                                      if (res.code === 200) {
                                        message.success(res.msg);
                                        this.getAllDict();

                                        if (item.id === this.state.groupInfo.selectedGroupId) {
                                          this.setState({
                                            dataSource: []
                                          });
                                        }
                                      } else {
                                        message.error(res.msg);
                                      }
                                    }
                                  });
                                }}
                              />
                            </Tooltip>
                          </Space>
                        </>
                      }
                      key={item.id}
                      className="site-collapse-custom-panel"
                    >
                      {item.dictCateLists.map((sub: any) => {
                        return (
                          <div
                            className={classnames('dict-cate', {
                              selected: sub.id === this.state.cateInfo.selectedCateId
                            })}
                            onClick={async () => {
                              if (this.state.cateInfo.selectedCateId === sub.id) return;

                              const res = await fetchDictDetails({ cateId: sub.id }, { pageSize: 10, pageIndex: 1 });

                              if (res.code === 200) {
                                this.setState({
                                  dataSource: res.data.list,
                                  total: res.data.pageData.total,
                                  cateInfo: {
                                    ...this.state.cateInfo,
                                    selectedCateId: sub.id
                                  },
                                  currentCateId: sub.id
                                });
                              } else {
                                message.error(res.msg);
                              }
                            }}
                            key={sub.id}
                          >
                            <span>{sub.cateName}</span>
                            <Space className="opt-icon">
                              <Tooltip title="新增字典">
                                <PlusOutlined
                                  className="opt-icon-sub"
                                  onClick={(e: any) => {
                                    e.stopPropagation();

                                    this.setState(
                                      {
                                        dictInfo: {
                                          ...this.state.dictInfo,
                                          visible: true,
                                          title: '新增字典',
                                          status: 'add'
                                        },
                                        cateInfo: {
                                          ...this.state.cateInfo,
                                          selectedCateId: sub.id
                                        },
                                        currentCateId: sub.id
                                      },
                                      () => {
                                        this.dictForm.current!.resetFields();
                                      }
                                    );
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="编辑字典分类">
                                <EditOutlined
                                  className="opt-icon-sub"
                                  onClick={async (e: any) => {
                                    e.stopPropagation();

                                    const res = await fetchDictCate(sub.id);

                                    if (res.code === 200) {
                                      this.setState(
                                        {
                                          cateInfo: {
                                            ...this.state.cateInfo,
                                            visible: true,
                                            title: '编辑分类',
                                            defaultData: res.data,
                                            selectedCateId: sub.id,
                                            status: 'edit'
                                          },
                                          groupInfo: {
                                            ...this.state.groupInfo,
                                            selectedGroupId: item.id
                                          }
                                        },
                                        () => {
                                          this.dictCateForm.current!.resetFields();
                                        }
                                      );
                                    }
                                  }}
                                />
                              </Tooltip>
                              <Tooltip title="删除字典分类">
                                <DeleteOutlined
                                  className="opt-icon-sub"
                                  onClick={(e: any) => {
                                    e.stopPropagation();

                                    Modal.confirm({
                                      icon: <ExclamationCircleOutlined />,
                                      content: '删除此分类，会删除分类下的字典，确定删除？',
                                      okText: '确认',
                                      cancelText: '取消',
                                      onOk: async () => {
                                        const res = await destroyDictCate(sub.id);

                                        if (res.code === 200) {
                                          message.success(res.msg);
                                          this.getAllDict();

                                          if (sub.id === this.state.cateInfo.selectedCateId) {
                                            this.setState({
                                              dataSource: []
                                            });
                                          }
                                        } else {
                                          message.error(res.msg);
                                        }
                                      }
                                    });
                                  }}
                                />
                              </Tooltip>
                            </Space>
                          </div>
                        );
                      })}
                    </Collapse.Panel>
                  );
                })}
              </Collapse>
            </div>
          </div>
          <div className="center"></div>
          <div className="right">
            <div style={{ padding: '10px' }}>
              <Row>
                <Col span={6}>
                  <Input placeholder="请输入" suffix={<SearchOutlined />} />
                </Col>
                <Col span={18} style={{ textAlign: 'right' }}>
                  <Space>
                    <Button
                      type="primary"
                      disabled={this.state.cateInfo.selectedCateId === ''}
                      onClick={() => {
                        this.setState(
                          {
                            dictInfo: {
                              ...this.state.dictInfo,
                              visible: true,
                              title: '新增字典',
                              status: 'add'
                            },
                            currentCateId: this.state.cateInfo.selectedCateId
                          },
                          () => {
                            this.dictForm.current!.resetFields();
                          }
                        );
                      }}
                    >
                      新增字典
                    </Button>
                    {selectedRowKeys.length > 0 && (
                      <Button
                        type="primary"
                        danger
                        onClick={async () => {
                          Modal.confirm({
                            icon: <ExclamationCircleOutlined />,
                            content: '确定删除？',
                            okText: '确认',
                            cancelText: '取消',
                            onOk: async () => {
                              const res = await destroiesDictDetails({
                                ids: selectedRowKeys
                              });

                              if (res.code === 200) {
                                message.success(res.msg);

                                if (this.state.currentCateId === this.state.cateInfo.selectedCateId) {
                                  const list = await fetchDictDetails(
                                    {
                                      cateId: this.state.currentCateId
                                    },
                                    { pageSize: 10, pageIndex: 1 }
                                  );

                                  if (list.code === 200) {
                                    this.setState({
                                      dataSource: list.data.list,
                                      total: list.data.pageData.total
                                    });
                                  } else {
                                    message.error(list.msg);
                                  }
                                }
                              } else {
                                message.error(res.msg);
                              }
                            }
                          });
                        }}
                      >
                        删除
                      </Button>
                    )}
                  </Space>
                </Col>
              </Row>
            </div>
            <div>
              <Table
                dataSource={this.state.dataSource}
                rowSelection={rowSelection}
                rowKey="id"
                size="small"
                pagination={{
                  position: ['bottomRight'],
                  total: this.state.total,
                  defaultCurrent: 1,
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  pageSizeOptions: ['10', '30', '50', '100'],
                  size: 'default',
                  showTotal: (total) => {
                    return `共 ${total} 条`;
                  },
                  onChange: async (page, pageSize) => {
                    const res = await fetchDictDetails(
                      { cateId: this.state.cateInfo.selectedCateId },
                      { pageSize: pageSize, pageIndex: page }
                    );

                    if (res.code === 200) {
                      this.setState({
                        dataSource: res.data.list,
                        total: res.data.pageData.total
                      });
                    } else {
                      message.error(res.msg);
                    }
                  }
                }}
                columns={columns}
              />
            </div>
          </div>
        </div>

        <Modal
          title={this.state.groupInfo.title}
          visible={this.state.groupInfo.visible}
          cancelText="取消"
          okText="确定"
          width={800}
          onOk={() => {
            this.dictGroupForm.current!.submit();
          }}
          onCancel={() => {
            this.setState({ groupInfo: { ...this.state.groupInfo, visible: false, defaultData: null } });
          }}
        >
          <Form
            name="group"
            ref={this.dictGroupForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={this.state.groupInfo.defaultData || { sort: 1, enable: true }}
            onFinish={async (values) => {
              let res: any = null;

              if (this.state.groupInfo.status === 'add') {
                res = await createDictGroup(values);
              } else {
                res = await updateDictGroup({
                  ...values,
                  id: this.state.groupInfo.selectedGroupId
                });
              }

              this.getAllDict();

              if (!res || res?.code === 200) {
                message.success(res.msg || '操作成功!');
                this.setState({
                  groupInfo: {
                    ...this.state.groupInfo,
                    visible: false,
                    defaultData: null
                  }
                });
              } else {
                message.error(res.msg);
              }
            }}
            onFinishFailed={(values) => {
              // console.log('错误', values);
            }}
            autoComplete="off"
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="分组名称"
                  name="groupName"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[
                    {
                      required: true,
                      message: '请输入分组名称!'
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="分组英文名称" name="groupEnName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="分组编码"
                  name="groupCode"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[{ required: true, message: '请输入分组编码!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="序号" name="sort">
                  <InputNumber min={0} max={10} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="是否启用" valuePropName="checked" name="enable">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="备注" name="remark">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>

        <Modal
          title={this.state.cateInfo.title}
          visible={this.state.cateInfo.visible}
          cancelText="取消"
          okText="确定"
          width={800}
          onOk={() => {
            this.dictCateForm.current!.submit();
          }}
          onCancel={() => {
            this.setState({ cateInfo: { ...this.state.cateInfo, visible: false, defaultData: null } });
          }}
        >
          <Form
            name="cate"
            ref={this.dictCateForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={this.state.cateInfo.defaultData || { sort: 1, enable: true }}
            onFinish={async (values) => {
              let res: any = null;

              if (this.state.cateInfo.status === 'add') {
                res = await createDictCate({
                  ...values,
                  groupId: this.state.groupInfo.selectedGroupId
                });
              } else {
                res = await updateDictCate({
                  ...values,
                  groupId: this.state.groupInfo.selectedGroupId,
                  id: this.state.cateInfo.selectedCateId
                });
              }

              this.getAllDict();

              if (!res || res?.code === 200) {
                message.success(res.msg || '操作成功!');
                this.setState({
                  cateInfo: {
                    ...this.state.cateInfo,
                    visible: false,
                    defaultData: null
                  }
                });
              } else {
                message.error(res.msg);
              }
            }}
            onFinishFailed={(values) => {
              // console.log('错误', values);
            }}
            autoComplete="off"
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="分类名称"
                  name="cateName"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[{ required: true, message: '请输入分类名称!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="分类英文名称" name="cateEnName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="分类编码"
                  name="cateCode"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[{ required: true, message: '请输入分类编码!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="序号" name="sort">
                  <InputNumber min={0} max={10} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="是否启用" valuePropName="checked" name="enable">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="备注" name="remark">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>

        <Modal
          title={this.state.dictInfo.title}
          visible={this.state.dictInfo.visible}
          cancelText="取消"
          okText="确定"
          width={800}
          onOk={() => {
            this.dictForm.current!.submit();
          }}
          onCancel={() => {
            this.setState({ dictInfo: { ...this.state.dictInfo, visible: false, defaultData: null } });
          }}
        >
          <Form
            name="dict"
            ref={this.dictForm}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={this.state.dictInfo.defaultData || { sort: 1, enable: true }}
            onFinish={async (values) => {
              let res: any = null;

              if (this.state.dictInfo.status === 'add') {
                res = await createDictDetail({
                  ...values,
                  cateId: this.state.currentCateId
                });
              } else {
                res = await updateDictDetail({
                  ...values,
                  cateId: this.state.currentCateId,
                  id: this.state.dictInfo.selectedDictId
                });
              }

              if (!res || res?.code === 200) {
                message.success(res.msg || '操作成功!');
                this.setState({
                  dictInfo: {
                    ...this.state.cateInfo,
                    visible: false,
                    defaultData: null
                  }
                });

                if (this.state.currentCateId === this.state.cateInfo.selectedCateId) {
                  const list = await fetchDictDetails(
                    { cateId: this.state.currentCateId },
                    { pageSize: 10, pageIndex: 1 }
                  );

                  if (list.code === 200) {
                    this.setState({
                      dataSource: list.data.list,
                      total: list.data.pageData.total
                    });
                  } else {
                    message.error(list.msg);
                  }
                }
              } else {
                message.error(res.msg || res.error);
              }
            }}
            onFinishFailed={(values) => {
              // console.log('错误', values);
            }}
            autoComplete="off"
          >
            <Row>
              <Col span={12}>
                <Form.Item
                  label="字典名称"
                  name="dictName"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[{ required: true, message: '请输入字典名称!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="字典英文名称" name="dictEnName">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item
                  label="字典值"
                  name="dictValue"
                  validateTrigger={['onBlur', 'onChange']}
                  rules={[{ required: true, message: '请输入分类编码!' }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="序号" name="sort">
                  <InputNumber min={0} max={10} style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Form.Item label="是否启用" valuePropName="checked" name="enable">
                  <Switch />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="备注" name="remark">
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default UserList;
