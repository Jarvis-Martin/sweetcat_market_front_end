let url;
switch (process.env.NODE_ENV) {
  case "production": { 
    url = "http://localhost:9000"
    break
  }
  case "development": { 
    url = "http://localhost:9000"
    break
  }
  default: {
    url = "http://localhost:9000"
    break
  }
}
const API_VERSION = '/api/v1'
export const IMGBASEPATH = (url);
export const BASEURL = (url + API_VERSION);
// -----------内容管理
export const CMS_BASEURL = (BASEURL + '/app');
// 轮播图
export const CMS_CAROUSEL_BASEURL = (CMS_BASEURL + '/carousel');
// 活动
export const CMS_ACTIVITY_BASEURL = (CMS_BASEURL + '/activity_list');
// 活动详情
export const CMS_ACTIVITY_DETAIL_BASEURL = (CMS_ACTIVITY_BASEURL + '/activity');
// 反馈
export const FEEDBACK_BASEURL = (BASEURL + '/feedback');
// 发表反馈
export const FEEDBACK_UPLOAD_BASEURL = (FEEDBACK_BASEURL + '/upload');


// -----------用户
export const USER_BASEURL = (BASEURL + '/user');

// 获取验证码
export const USER_CAPTCHA = (USER_BASEURL + '/captcha');
// 验证验证码
export const VERIFY_CAPTCHA = (USER_BASEURL + '/captcha/verification');
// 注册
export const USER_REGISTER = (USER_BASEURL + '/register');
// 注册验证码
export const USER_REGISTER_CAPTCHA = (USER_REGISTER + '/captcha');

// 登录（手机号登录 / 密码登录）区别只在于提交的参数
export const USER_LOGIN = (USER_BASEURL + '/login');
// 登录验证码
export const USER_LOGIN_CAPTCHA = (USER_LOGIN + '/captcha');



// 用户详情
export const USER_BASE_INFO = (USER_BASEURL);


// 关系上下文
export const RELATIONSHIP_BASEURL = (BASEURL + '/relationship');


// 文件上传
export const FILEUPLOAD_BASEURL = (BASEURL + '/file');



// -----------商品
export const GOOD_BASEURL = (BASEURL + '/commodity');
// 新品上市
export const GOOD_NEW_BASEURL = (GOOD_BASEURL + '/new_commodities');
// 一周严选上市
export const GOOD_EXQISIT_BASEURL = (GOOD_BASEURL + '/new_commodities');
// 商品详情
export const GOOD_Detail_BASEURL = (GOOD_BASEURL + '/good_detail');
