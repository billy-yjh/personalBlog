//随机标签名
var randomTags = new Vue({
  el: '#radom_tags',
  data: {
    tags: []
  },
  computed: {
    randomColor: function () {
      return function () {
        var red = Math.floor(Math.random() * 255) + 50;
        var green = Math.floor(Math.random() * 255) + 50;
        var blue = Math.floor(Math.random() * 255) + 50;
        return 'rgba(' + red + ',' + green + ',' + blue + ')';
      }
    },
    randomSize: function () {
      return function () {
        var size = Math.random() * 18 + 12 + 'px';
        return size;
      }
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: '/queryRandomTags'
    }).then(function (resp) {
      var result = [];
      for (var i = 0; i < resp.data.data.length; i++) {
        result.push({
          text: resp.data.data[i].tag,
          link: "/?tag=" + resp.data.data[i].tag
        })
      }
      randomTags.tags = result;
    }).catch(function (resp) {
      console.log('请求失败')
    })
  }
})

//最近热门
var newHot = new Vue({
  el: '#new_hot',
  data: {
    titleList: [{
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }, {
      title: '这是一个链接',
      link: 'http://www.baidu.com'
    }]
  },
  computed: {

  },
  created: function () {
    axios({
      method: 'get',
      url: "/queryHotBlog"
    }).then(function (resp) {
      var result = [];
      for (var i = 0; i < resp.data.data.length; i++) {
        var temp = [];
        temp.title = resp.data.data[i].title;
        temp.link = "/blog_detail.html?bid=" + resp.data.data[i].id;
        result.push(temp);
      }
      newHot.titleList = result;
    }).catch(function (resp) {
      console.log('请求错误')
    })
  }
})

// 最新评论
var newComment = new Vue({
  el: '#new_comment',
  data: {
    commentList: [{
      name: '这里是用户名',
      date: '2018-10-10',
      comment: '哈叫啥的哈接收到卡的空间暗红色的'
    }, {
      name: '这里是用户名',
      date: '2018-10-10',
      comment: '哈叫啥的哈接收到卡的空间暗红色的'
    }, {
      name: '这里是用户名',
      date: '2018-10-10',
      comment: '哈叫啥的哈接收到卡的空间暗红色的'
    }]
  },
  computed: {

  },
  created: function () {
    axios({
      method: 'get',
      url: "/queryNewComments"
    }).then(function (resp) {
      var result = [];
      for (var i = 0; i < resp.data.data.length; i++) {
        var temp = [];
        temp.name = resp.data.data[i].user_name;
        temp.date = resp.data.data[i].ctime;
        temp.comment = resp.data.data[i].comments;
        result.push(temp);
      }
      newComment.commentList = result;
    }).catch(function (resp) {
      console.log('请求错误')
    })

  }
})

//友情链接
var friendLink = new Vue({
  el: '#friendLink',
  data: {
    linkList: [{
      name: 'adjkaskdjhaj',
      link: 'http://www.baidu.com'
    }, {
      name: 'adjkaskdjhaj',
      link: 'http://www.baidu.com'
    }, {
      name: 'adjkaskdjhaj',
      link: 'http://www.baidu.com'
    }, {
      name: 'adjkaskdjhaj',
      link: 'http://www.baidu.com'
    }, {
      name: 'adjkaskdjhaj',
      link: 'http://www.baidu.com'
    }, {
      name: 'adjkaskdjhaj',
      link: 'http://www.baidu.com'
    }]
  },
  computed: {

  },
  created: function () {

  }
})

var searchBar = new Vue({
  el: "#search_bar",
  data: {
  },
  methods: {
    getValue: function () {
      var val = document.getElementById("ipt_detail").value
      window.location.href = window.location.href + '?title=' + val
    }
  },
  created: function () {
  }
})