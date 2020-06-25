define({ "api": [
  {
    "type": "post",
    "url": "/users/addsys",
    "title": "注册",
    "description": "<p>增加系统用户</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/addsys1"
      }
    ],
    "version": "1.0.0",
    "name": "addsys",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名称</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "userno",
            "description": "<p>用户id</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\" : \"true\",\n    \"data\" :\"{\n       \"userno\":\"1\",\n      }\"\n    \"msg\":\"注册成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "services/sysuserServices.js",
    "groupTitle": "系统用户"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "登录",
    "description": "<p>用户登录</p>",
    "name": "login",
    "group": "系统用户",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "userno",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>用户密码 密文</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "icon_url",
            "description": "<p>用户头像地址</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>用户身份验证令牌</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "optiontime",
            "description": "<p>最后操作时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\" : \"true\",\n    \"data\" : \"{\n       \"userno\":\"1\",\n       \"username\":\"admin\"\n       \"password\":\"098f6bcd4621d373cade4e832627b4f6\",\n       \"icon_url\":\"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png\"\n       \"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIwOThmNmJjZDQ2MjFkMzczY2FkZTRlODMyNjI3YjRmNiIsImlhdCI6MTU5MzA0OTI1MiwiZXhwIjoxNTkzMTM1NjUyfQ.5hPc1m7p85R5noOBWqzEObwAg1tY-bCGDXabhmkfUSA\"\n       \"optiontime\":\"2020-06-25T01:40:52.000Z\"\n    }\"\n    \"msg\":\"登陆成功\"\n}",
          "type": "json"
        }
      ]
    },
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/login"
      }
    ],
    "version": "1.0.0",
    "filename": "services/sysuserServices.js",
    "groupTitle": "系统用户"
  },
  {
    "type": "post",
    "url": "/users/querysys",
    "title": "查询",
    "description": "<p>获取系统用户</p>",
    "sampleRequest": [
      {
        "url": "http://localhost:3000/users/querysys"
      }
    ],
    "version": "1.0.0",
    "name": "sysuser",
    "group": "系统用户",
    "permission": [
      {
        "name": "token"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>用户的登录令牌</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "userno",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": true,
            "field": "username",
            "description": "<p>用户名</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "number",
            "optional": false,
            "field": "userno",
            "description": "<p>用户id</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "icon_url",
            "description": "<p>用户头像地址</p>"
          },
          {
            "group": "Success 200",
            "type": "string",
            "optional": false,
            "field": "optiontime",
            "description": "<p>最后操作时间</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\" : \"true\",\n    \"data\" :\"[{\n       \"userno\":\"1\",\n       \"username\":\"admin\"\n       \"icon_url\":\"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png\"\n       \"optiontime\":\"2020-06-25T01:40:52.000Z\"\n      }]\"\n    \"msg\":\"查询成功\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "services/sysuserServices.js",
    "groupTitle": "系统用户"
  }
] });
