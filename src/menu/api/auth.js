import gql from 'graphql-tag'

// 获取极验证验证码
export const newCaptcha = gql`
  mutation {
    newCaptcha {
      challenge
      success
      gt
      new_captcha
    }
  }
`

// 用户名登陆
export const newTokenByUserName = gql`
  mutation newTokenByUserName(
    $userName: String!
    $password: String!
    $challenge: String!
    $validate: String!
    $seccode: String!
    $serverNos: [String]
    $companyNos: [String]
  ) {
    newTokenByUserName(
      userName: $userName
      password: $password
      challenge: $challenge
      validate: $validate
      seccode: $seccode
      serverNos: $serverNos
      companyNos: $companyNos
    ) {
      token
    }
  }
`
// 验证用户名是否存在 return Boolean
export const existUserByUserName = gql`
query existUserByUserName($userName:String!){
  existUserByUserName(userName:$userName)
}`

// 发送手机验证码 return Boolean
export const newVerifyCodeByMobileNo = gql`
  mutation newVerifyCodeByMobileNo($mobileNo: String!) {
    newVerifyCodeByMobileNo(mobileNo: $mobileNo)
  }
`

// 验证手机验证码是否存在 return Boolean
export const existVerifyCodeByMobileNo = gql`
  query existVerifyCodeByMobileNo($mobileNo:String!,$verifyCode:String!){
    existVerifyCodeByMobileNo(mobileNo:$mobileNo, verifyCode:$verifyCode)
}`

// 手机号登陆登陆
export const newTokenByMobileNo = gql`
  mutation newTokenByMobileNo(
    $mobileNo: String!
    $verifyCode: String!
    $serverNos: [String]
    $companyNos: [String]
  ) {
    newTokenByMobileNo(
      mobileNo: $mobileNo
      verifyCode: $verifyCode
      serverNos: $serverNos
      companyNos: $companyNos
    ) {
      token
    }
  }
`
// 验证手机验证码是否存在 return Boolean
export const existUserByMobileNo = gql`
query existUserByMobileNo($mobileNo:String!){
  existUserByMobileNo(mobileNo:$mobileNo)
}`

// 手机号创建用户
export const newUserByMobileNo = gql`
  mutation newUserByMobileNo(
    $mobileNo: String!
    $verifyCode: String!
    $password: String
    $idCard: String
    $name: String
    $email: String
    $emailVerifyCode: String
  ) {
    newUserByMobileNo(
      userNewByMobileNo: {
        mobileNo: $mobileNo
        verifyCode: $verifyCode
        password: $password
        idCard: $idCard
        name: $name
        email: $email
        emailVerifyCode: $emailVerifyCode
      }
    ) {
      token
    }
  }
`

// 查询基本信息
export const userByMe = gql`
  query userByMe($token: String!) {
    userByMe(token: $token) {
      userName
      name
      idCard
      userId
      mobileNo
      email
      headpic
      lastLoginDate
      lastResetDate
      createTime
      updateTime
      status
      certifiedStatus
      isPwd
    }
  }
`

// 修改基本信息
export const editUserByMe = gql`
  mutation editUserByMe($token: String!, $userEditByMe: UserEditByMe!) {
    editUserByMe(token: $token, userEditByMe: $userEditByMe) {
      userName
      name
      idCard
      userId
      mobileNo
      email
      headpic
      lastLoginDate
      lastResetDate
      createTime
      updateTime
      status
    }
  }
`
// 用户与服务的关联关系分页
export const userServerByBo = gql`
query userServerByBo($token: String!, $pageNo: Int!, $pageSize: Int!) {
  userServerByBo(token: $token,  pageNo: $pageNo, pageSize: $pageSize) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      linkId
      user{
        userId
        idCard
        userName
        name
        mobileNo
      }
      server{
        serverNo
        serverName
        groupId
        groupName
      }
    }
  }
}`

// 用户与企业的关联关系查询
export const userCompanyByBo = gql`
query userCompanyByBo($token: String!, $pageNo: Int!, $pageSize: Int!) {
  userCompanyByBo(token: $token, pageNo: $pageNo, pageSize: $pageSize) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      linkId
      user {
        userId
        idCard
        userName
        name
        mobileNo
      }
      company {
        companyNo
        companyName
        groupId
        groupName
      }
    }
  }
}
`
// 认证服务运营管理员-新增用户与企业的关联关系
export const newUserCompanyByBo = gql`
mutation newUserCompanyByBo($token: String!, $userId: String!, $authorizeId: String!) {
  newUserCompanyByBo(token: $token, userId: $userId, authorizeId: $authorizeId) {
    linkId
    user {
      userId
      userName
    }
    company {
      authorizeId
      groupId
    }
  }
}
`

// 认证服务运营管理员-新增用户与服务的关联关系
export const newUserServerByBo = gql`
mutation newUserServerByBo($token: String!, $userId: String!, $authorizeId: String!) {
  newUserServerByBo(token: $token, userId: $userId, authorizeId: $authorizeId) {
    linkId
    user {
      userId
      userName
    }
    server {
      authorizeId
      groupId
    }
  }
}
`
// 认证服务运营管理员-删除用户与企业的关联关系 return boolean
export const delUserCompanyByBo = gql`
mutation delUserCompanyByBo($token:String!, $linkId:String!){
  delUserCompanyByBo(token:$token, linkId:$linkId)
}`

export const delUserServerByBo = gql`
mutation delUserServerByBo($token: String!, $linkId: String!) {
  delUserServerByBo(token: $token, linkId: $linkId)
}`

// 用户与企业的关联关系删除
export const delCompanyByTo = gql`
mutation delCompanyByTo($token:String!, $authorizeId:String!){
  delCompanyByTo(token:$token, authorizeId:$authorizeId)
}`

// 认证服务运营管理员-分页所有用户信息
export const userByBo = gql`
query userByBo($token: String!, $pageNo: Int!, $pageSize: Int!, $key: String) {
  userByBo(token: $token, pageNo: $pageNo, pageSize: $pageSize, key: $key) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      userId
      mobileNo
      userName
      email
      status
      createTime
      updateTime
      lastLoginDate
      lastResetDate
      name
      certifiedStatus
      headpic
    }
  }
}`

// 认证服务运营管理员-修改用户信息
export const editUserByBo = gql`
mutation editUserByBo($token:String!, $userEditByBo:UserEditByBo!){
  editUserByBo(token:$token, userEditByBo:$userEditByBo){
    userId
    mobileNo
    idCard
    userName
    email
    status
    createTime
    updateTime
    lastLoginDate
    lastResetDate
    name
    certifiedStatus
    headpic
  }
}`

// 认证服务管理员-新增用户时的信息
export const newUserByBo = gql`
mutation newUserByBo($token: String!, $userNewByAdmin: UserNewByAdmin!) {
  newUserByBo(token: $token, userNewByAdmin: $userNewByAdmin){
    userId
  }
}`

// 头像上传获取的oss地址
export const ossSts = gql`
mutation ossSts($token: String!, $path: [String!]!) {
  ossSts(token: $token, path: $path) {
    accessKeyId
    accessKeySecret
    stsToken
    expiration
  }
}`

// 查询基本信息
export const companyByToken = gql`
query companyByToken($token: String!) {
  companyByToken(token: $token) {
    companyNo
    companyName
  }
}`
// 查询接入企业信息
export const companyByTo = gql`
query companyByTo($token: String!, $pageNo: Int!, $pageSize: Int!, $key: String) {
  companyByTo(token: $token, pageNo: $pageNo, pageSize: $pageSize, key: $key) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      authorizeId
      companyNo
      companyName
      groupId
      groupName
      createTime
      updateTime
    }
  }
}`

// 用户授权选择
export const companyWithUserByBo = gql`
query companyWithUserByBo($token: String!, $userId: String!, $pageNo: Int!, $pageSize: Int!) {
  companyWithUserByBo(token: $token, userId: $userId, pageNo: $pageNo, pageSize: $pageSize) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      authorizeId
      companyNo
      companyName
      groupId
      groupName
      createTime
      updateTime
    }
  }
}`

export const newCompanyByTo = gql`
mutation newCompanyByTo($token: String!, $companyNo: String!, $companyName: String!, $groupId: String, $groupName: String) {
  newCompanyByTo(token: $token, companyNo: $companyNo, companyName: $companyName, groupId: $groupId, groupName: $groupName) {
    authorizeId
    companyNo
    companyName
    groupId
    groupName

  }
}`

export const serverByTo = gql`
query serverByTo($token: String!, $pageNo: Int!, $pageSize: Int!, $key: String) {
  serverByTo(token: $token, pageNo: $pageNo, pageSize: $pageSize, key: $key) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      authorizeId
      serverNo
      serverName
      groupId
      groupName
      createTime
      updateTime
    }
  }
}`

// 用户授权选择
export const serverWithUserByBo = gql`
query serverWithUserByBo($token: String!, $userId: String!, $pageNo: Int!, $pageSize: Int!) {
  serverWithUserByBo(token: $token, userId: $userId, pageNo: $pageNo, pageSize: $pageSize) {
    pageNo
    pageSize
    pageTotalRows
    pageTotalCount
    pageRows {
      authorizeId
      serverNo
      serverName
      groupId
      groupName
      createTime
      updateTime
    }
  }
}`

export const newServerByTo = gql`
mutation newServerByTo($token: String!, $serverNo: String!, $serverName: String!,$groupId: String,$groupName: String) {
  newServerByTo(token: $token, serverNo: $serverNo, serverName: $serverName,groupId: $groupId,groupName: $groupName) {
    authorizeId
    serverNo
    serverName
    groupId
    groupName
  }
}
`
export const delServerByTo = gql`
mutation delServerByTo($token: String!, $authorizeId: String!) {
  delServerByTo(token: $token, authorizeId: $authorizeId)
}`

// 企业名称或信用代码是否存在的接口
export const existCodeOrName = gql`
query existOrgCodeOrOrgName($orgCode: String, $orgName: String) {
  existOrgCodeOrOrgName(orgCode: $orgCode, orgName: $orgName)
}
`
