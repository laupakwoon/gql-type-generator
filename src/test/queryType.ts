export type TListAreaParams = {
  queryKey: string;
  idPar: number;
};

export type TListAreaRes = {
  /** 地区对象 */
  listArea: {
    /** 地区id */
    idArea: number;
    /** 编码 */
    cd: string;
    /** 名称 */
    na: string;
    /** 描述 */
    des: string;
    /** 上级id */
    idPar: number;
    /** 路径 */
    treePath: string;
    /** 层级 */
    treeLevel: number;
    /** 是否是叶子节点 */
    fgLeaf: boolean;
    /** 激活状态:1-启用,2-停用,3-删除 */
    euActiveStatus: number;
    /** 创建人id */
    syIdUserCreate: number;
    /** 创建人名称 */
    syNaUserCreate: string;
    /** 创建时间 */
    syDtCreate: string;
    /** 修改人id */
    syIdUserUpdate: number;
    /** 修改人名称 */
    syNaUserUpdate: string;
    /** 修改时间 */
    syDtUpdate: string;
    /** 多版本并发控制标识 */
    syMvcc: number;
  }[];
};

export type TListDeploymentPositionParams = {
  queryKey: string;
  ids: number[];
};

export type TListDeploymentPositionRes = {
  /** 部署点表对象 */
  listDeploymentPosition: {
    /** 部署点ID */
    idDeploymentPosition: number;
    /** 租户id */
    idTent: number;
    /** 机构id */
    idOrg: number;
    /** 创建人id */
    syIdUserCreate: number;
    /** 创建人名称 */
    syNaUserCreate: string;
    /** 创建时间 */
    syDtCreate: string;
    /** 创建人id */
    syIdUserUpdate: number;
    /** 更新人名称 */
    syNaUserUpdate: string;
    /** 更新时间 */
    syDtUpdate: string;
    /** 版本号 */
    syMvcc: number;
    /** 产品名称 */
    productName: string;
    /** 当前部署版本号 */
    releaseVersion: string;
    /** 当前版本部署日期 */
    releaseDate: string;
    /** 负责客户部门 */
    department: string;
    /** 负责客户人员 */
    employee: string;
    /** 客户名称 */
    customerName: string;
    /** 客户所在省份 */
    idProv: number;
    /** 客户所在省份（名称） */
    naProv: string;
    /** 客户所在城市 */
    idCity: number;
    /** 客户所在城市（名称） */
    naCity: string;
    /** 客户所在县/区 */
    idArea: number;
    /** 客户所在县/区（名称） */
    naArea: string;
    /** 客户所在地址 */
    address: string;
    /** 客户联系人 */
    contactName: string;
    /** 客户联系电话 */
    contactPhone: string;
    /** 客户具体坐标 */
    coordinate: string;
    /** 备注 */
    remark: string;
  }[];
};

export type TCreateDeploymentPositionParams = {
  /** 创建部署点表入参 */
  deploymentPosition: {
    /** 产品名称 */
    productName: string;
    /** 当前部署版本号 */
    releaseVersion: string;
    /** 当前版本部署日期 */
    releaseDate: string;
    /** 负责客户部门 */
    department: string;
    /** 负责客户人员 */
    employee: string;
    /** 客户名称 */
    customerName: string;
    /** 客户所在省份 */
    idProv: number;
    /** 客户所在城市 */
    idCity: number;
    /** 客户所在县/区 */
    idArea: number;
    /** 客户所在地址 */
    address: string;
    /** 客户联系人 */
    contactName: string;
    /** 客户联系电话 */
    contactPhone: string;
    /** 客户具体坐标 */
    coordinate: string;
    /** 备注 */
    remark: string;
  };
};

export type TCreateDeploymentPositionRes = {
  createDeploymentPosition: number;
};

export type TUpdateDeploymentPositionParams = {
  idDeploymentPosition: number;
  syMvcc: number;
  /** 更新部署点表入参 */
  deploymentPosition: {
    /** 产品名称 */
    productName: string;
    /** 当前部署版本号 */
    releaseVersion: string;
    /** 当前版本部署日期 */
    releaseDate: string;
    /** 负责客户部门 */
    department: string;
    /** 负责客户人员 */
    employee: string;
    /** 客户名称 */
    customerName: string;
    /** 客户所在省份 */
    idProv: number;
    /** 客户所在城市 */
    idCity: number;
    /** 客户所在县/区 */
    idArea: number;
    /** 客户所在地址 */
    address: string;
    /** 客户联系人 */
    contactName: string;
    /** 客户联系电话 */
    contactPhone: string;
    /** 客户具体坐标 */
    coordinate: string;
    /** 备注 */
    remark: string;
  };
};

export type TUpdateDeploymentPositionRes = {
  updateDeploymentPosition: number;
};

export type TGetDeploymentPositionParams = {
  idDeploymentPosition: number;
};

export type TGetDeploymentPositionRes = {
  /** 部署点表对象 */
  getDeploymentPosition: {
    /** 部署点ID */
    idDeploymentPosition: number;
    /** 租户id */
    idTent: number;
    /** 机构id */
    idOrg: number;
    /** 创建人id */
    syIdUserCreate: number;
    /** 创建人名称 */
    syNaUserCreate: string;
    /** 创建时间 */
    syDtCreate: string;
    /** 创建人id */
    syIdUserUpdate: number;
    /** 更新人名称 */
    syNaUserUpdate: string;
    /** 更新时间 */
    syDtUpdate: string;
    /** 版本号 */
    syMvcc: number;
    /** 产品名称 */
    productName: string;
    /** 当前部署版本号 */
    releaseVersion: string;
    /** 当前版本部署日期 */
    releaseDate: string;
    /** 负责客户部门 */
    department: string;
    /** 负责客户人员 */
    employee: string;
    /** 客户名称 */
    customerName: string;
    /** 客户所在省份 */
    idProv: number;
    /** 客户所在省份（名称） */
    naProv: string;
    /** 客户所在城市 */
    idCity: number;
    /** 客户所在城市（名称） */
    naCity: string;
    /** 客户所在县/区 */
    idArea: number;
    /** 客户所在县/区（名称） */
    naArea: string;
    /** 客户所在地址 */
    address: string;
    /** 客户联系人 */
    contactName: string;
    /** 客户联系电话 */
    contactPhone: string;
    /** 客户具体坐标 */
    coordinate: string;
    /** 备注 */
    remark: string;
  };
};

export type TGetPositionSummaryRes = {
  /** 部署点汇总 */
  getPositionSummary: {
    /** 总数 */
    totalCount: number;
    /** 分组 */
    summaryGroup: {
      /** 产品名称 */
      productName: string;
      /** 总数 */
      positionCount: number;
    }[];
  };
};

export type TDeleteDeploymentPositionParams = {
  idDeploymentPosition: number;
};

export type TDeleteDeploymentPositionRes = {
  deleteDeploymentPosition: boolean;
};
