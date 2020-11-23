const Promise = require('../../lib/es6-promise.min.js')

const remoteServerPath = "http://localhost:9090/";


function dealReponseCode(res, callback) {
	let jdata = res.data
	
	alert(jdata.message || '服务器请求出错', function () {
								  
		if (592 == jdata.code) {
			login()
		}
										
		if (591 == jdata.code) {
			login()
		}
								
		if( 581 == jdata.code) {
			login()
		}
		
		//回调函数
		if(callback) {
			callback()
		}							
	  
	})
}

function login(obj) {
  
  // 获取用户信息
  uni.getSetting({
    success: res => {
      
      if (res.authSetting['scope.userInfo']) {
        
        uni.getUserInfo({
          withCredentials: false,
          success: res => {
			showLoading('登录中...')
            
			
            var option = res.userInfo

            return new Promise(function (resolve, reject) {

              uni.login({
                timeout: 6000,
                success: res => {
                  option.code = res.code
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  requestGet(remoteServerPath + 'api/wechat/login.do', option).then(function (res) {
                    var data = res.data;

                    if (data.success) {

                      getApp().globalData.loginUserInfo = data.result
                      getApp().globalData.header.Cookie = 'JSESSIONID=' + data.attributes["session_key"];

                      if (getApp().userInfoReadyCallback) {
                        getApp().userInfoReadyCallback(getApp().globalData.loginUserInfo)
                      }

                      //回调函数
                      if (obj && obj.callback) {
                        obj.callback()
                      }

                    } else {
                      alert("服务器临时更新中，请稍后再登录")
                    }

                    hideLoading()
					showToast("登录成功")
                    
                  }).catch(function (res) {
                    hideLoading();
                    alert("服务器临时更新中，请稍后再登录")
                  })



                },
                fail: res => {
                  console.log("code获取失败")
                }
              })

              
            })
          }
        })

      }else {
        hideLoading()
      }
    },
    fail: res => {
      console.log(res)
    }
  })

}

function validationLogin(obj) {
	var app = getApp()
	
	return new Promise(function (resolve, reject) {
	      // 获取登录信息
	      var loginUserInfo = app.globalData.loginUserInfo
		  
	      var header = app.globalData.header
		  
	      if (header.Cookie) {
	        //校验session
	        validationSession(loginUserInfo, obj);

	        
	      } else {
	        //登录
	        return new Promise(function () {
	          login(obj)
	        })
	        
	
	      }
		  
	
	    })
}

function validationSession(loginUserInfo, obj) {

	var app = getApp()
	
    requestGet(app.globalData.remoteServerPath + 'api/wechat/validation.do', {} ).then(function(res) {
      var data = res.data
      //session过期的话，重新登录
      
      if (!data.success) {
        login()
       
      } else {
        if (app.userInfoReadyCallback) {
          app.userInfoReadyCallback(loginUserInfo)
        } 

        //回调函数
        if (obj && obj.callback) {
          obj.callback()
        }

      }


    }).catch(function(res) {
      
      login()
      
    })

  }

function containString(answer, ask) {
		
	let result = false;

	if (null != answer && null != ask && "" != answer && "" != ask) {
	  if (ask.indexOf(answer) != -1) {
		result = true;
	  }
	}

	return result;

}
function equalString(str1, str2) {

	let result = false;

	if(null != str1 && null != str2 && "" != str1 && "" != str2) {
	  if(str1 === str2) {
		result = true;
	  }
	}

	return result;

}
function equalNumber(num1, num2) {
	let result = false;

	if (null != num1 && null != num2 && !isNaN(num1) && !isNaN(num2)) {
	  if (num1 === num2) {
		result = true;
	  }
	}

	return result;
}
function showLoading(title) {
	uni.showLoading({
		title:title,
		mask:true
	})
}
function hideLoading() {
	uni.hideLoading()
}
function setTitle(title) {
	uni.setNavigationBarTitle({
		title:title
	})
}
function alert(title, successFun) {
	uni.showModal({
		content:title,
		showCancel: false,
		success: function(res) {
			if(res.confirm) {
				if(successFun){
					successFun()
				}
			}
		}
	})
}
function confirm(title, confirmText, cancelText, successFun, failFun ) {
	
	uni.showModal({
	  content: title,
	  confirmText: confirmText,
	  cancelText: cancelText,
	  showCancel: true,
	  success: function (res) {
		if (res.confirm) {
		  successFun()
		}else {
		  failFun()
		}
	  },
	  fail: function (res) {
	  }
	});
}

function showToast(title, callback, duration) {

	uni.showToast({
		title: title,
		icon: 'success',
		duration: 1000,
		success: function() {
			if(callback) {
				var timeoutID = setTimeout(function() {
					callback()
					clearTimeout(timeoutID)
				}, duration);
				
			}
		}
	})
}

function showVideoAz() {
	// #ifdef MP-WEIXIN
	// 在页面中定义激励视频广告
	let videoAd = null
	
	// 在页面onLoad回调事件中创建激励视频广告实例
	if (wx.createRewardedVideoAd) {
	  videoAd = wx.createRewardedVideoAd({
	    adUnitId: 'adunit-eaf3a9a64caf1518'
	  })
	  videoAd.onLoad(() => {})
	  videoAd.onError((err) => {})
	  videoAd.onClose((res) => {})
	}
	
	// 用户触发广告后，显示激励视频广告
	if (videoAd) {
	  videoAd.show().catch(() => {
	    // 失败重试
	    videoAd.load()
	      .then(() => videoAd.show())
	      .catch(err => {
	        console.log('激励视频 广告显示失败')
	      })
	  })
	}
	// #endif
}


//Get 请求
function requestGet(url, data) {
  return request(url, 'GET', data)
}

//Post 请求
function requestPost(url, data) {
  return request(url, 'POST', data)
}


//http请求
function request(url, method, data = {}) {
  
  //wx.showNavigationBarLoading()
  uni.showNavigationBarLoading()
  
  return new Promise(function(resolve, reject) {
    uni.request({
      url: url,
      data: data,
      header: getApp().globalData.header,
      method: method.toUpperCase(),
      success: function(res) {
        //如果会话超时，则重新登录
        
        if (res && "session timeout" == res.state) {
          login()
        }

        uni.hideNavigationBarLoading()
        resolve(res)
      },
      fail: function(res) {
		uni.hideNavigationBarLoading()
		reject(res)
      }
    })

  })
}

function getServerPath() {
  return remoteServerPath;
}

module.exports = {
  Promise, 
  get: requestGet, 
  post: requestPost, 
  request, getServerPath, 
  login,
  validationLogin,
  alert,
  showToast,
  confirm,
  setTitle,
  showLoading,
  hideLoading,
  equalNumber,
  equalString,
  containString,
  showVideoAz,
  dealReponseCode
}