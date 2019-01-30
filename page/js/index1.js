//每日一句
var everyDay = new Vue({
  el: '#every_day',
  data: {
    content: 'asdadadadafgrewfed'
  },
  computed: {
    getContent: function () {
      return this.content;
    }
  },
  created: function () {
    //请求数据 给content赋值
    axios({
      method: 'get',
      url: '/queryEveryDay'
    }).then(function (resp) {
      everyDay.content = resp.data.data[0].content
      // console.log(resp.data.data[0].content);
    }).catch(function (resp) {
      console.log('请求失败')
    })
  }
})

//文章展示
var articleList = new Vue({
  el: '#article_list',
  data: {
    page: 1,
    count: 100,
    pageSize: 5,
    pageNumList: [],
    articleList: [{
      title: '排序算法',
      content: '计算机领域的都多少掌握一点算法知识，其中排序算法是《数据结构与算法》中最基本的算法之一。排序算法可以分为内部排序和外部排序，内部排序是数据记录在内存中进行排序，而外部排序是因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。常见的内部排序算法有：插入排序、希尔排序、选择排序、冒泡排序、归并排序、快速排序、堆排序、基数排序等。',
      date: '2017-05-08',
      views: '101',
      tags: 'test1 text2',
      id: '1',
      link: ''
    }, {
      title: '排序算法',
      content: '计算机领域的都多少掌握一点算法知识，其中排序算法是《数据结构与算法》中最基本的算法之一。排序算法可以分为内部排序和外部排序，内部排序是数据记录在内存中进行排序，而外部排序是因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。常见的内部排序算法有：插入排序、希尔排序、选择排序、冒泡排序、归并排序、快速排序、堆排序、基数排序等。',
      date: '2017-05-08',
      views: '101',
      tags: 'test1 text2',
      id: '2',
      link: ''
    }, {
      title: '排序算法',
      content: '计算机领域的都多少掌握一点算法知识，其中排序算法是《数据结构与算法》中最基本的算法之一。排序算法可以分为内部排序和外部排序，内部排序是数据记录在内存中进行排序，而外部排序是因排序的数据很大，一次不能容纳全部的排序记录，在排序过程中需要访问外存。常见的内部排序算法有：插入排序、希尔排序、选择排序、冒泡排序、归并排序、快速排序、堆排序、基数排序等。',
      date: '2017-05-08',
      views: '101',
      tags: 'test1 text2',
      id: '3',
      link: ''
    }]
  },
  computed: {
    jumpTo: function () {
      return function (page) {
        this.getPage(page, this.pageSize)
      }
    },
    getPage: function () {
      return function (page, pageSize) {
        var searchUrlParams = location.search.indexOf("?") > -1 ? location.search.split("?")[1].split("&") : "";
        var tag = "";
        for (var i = 0; i < searchUrlParams.length; i++) {
          if (searchUrlParams[i].split("=")[0] == 'tag') {
            try {
              tag = searchUrlParams[i].split("=")[1];
            } catch (e) {
              // console.log(e)
            }
          }
        }
        
        if (tag == "") { //不是查询情况
          axios({
            method: 'get',
            url: '/queryBlogByPage?page=' + (page - 1) + "&pageSize=" + pageSize
          }).then(function (resp) {
            var result = resp.data.data
            var list = [];
            for (var i = 0; i < result.length; i++) {
              var temp = [];
              temp.title = result[i].title;
              temp.content = result[i].content;
              temp.date = result[i].ctime;
              temp.views = result[i].views;
              temp.tags = result[i].tags;
              temp.id = result[i].id;
              temp.link = "/blog_detail.html?bid=" + result[i].id;
              list.push(temp)
            }
            //由于this 在这里无法使用 所以直接使用articleList 来代替this
            articleList.articleList = list
            articleList.page = page
          }).catch(function (resp) {
            console.log('请求错误')
          })

          axios({
            method: 'get',
            url: '/queryBlogCount'
          }).then(function (resp) {
            // console.log(resp)
            articleList.count = resp.data.data[0].count
            articleList.generatePageTool;
          })
        } else {
          axios({
            method: 'get',
            url: '/queryByTag?page=' + (page - 1) + "&pageSize=" + pageSize + "&tag=" + tag
          }).then(function (resp) {
            var result = resp.data.data
            var list = [];
            for (var i = 0; i < result.length; i++) {
              var temp = [];
              temp.title = result[i].title;
              temp.content = result[i].content;
              temp.date = result[i].ctime;
              temp.views = result[i].views;
              temp.tags = result[i].tags;
              temp.id = result[i].id;
              temp.link = "/blog_detail.html?bid=" + result[i].id;
              list.push(temp)
            }
            //由于this 在这里无法使用 所以直接使用articleList 来代替this
            articleList.articleList = list
            articleList.page = page
          }).catch(function (resp) {
            console.log('请求错误')
          })

          axios({
            method: 'get',
            url: '/queryByTagCount?tag=' + tag
          }).then(function (resp) {
            // console.log(resp)
            articleList.count = resp.data.data[0].count
            articleList.generatePageTool;
          })
        }
      }
    },
    generatePageTool: function () {
      var nowPage = this.page;
      var pageSize = this.pageSize;
      var totalCount = this.count;
      var result = [];
      result.push({
        text: "<<",
        page: 1
      })
      if (nowPage > 2) {
        result.push({
          text: nowPage - 2,
          page: nowPage - 2
        })
      }
      if (nowPage > 1) {
        result.push({
          text: nowPage - 1,
          page: nowPage - 1
        })
      }
      result.push({
        text: nowPage,
        page: nowPage
      })
      if (nowPage + 1 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({
          text: nowPage + 1,
          page: nowPage + 1
        })
      }
      if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
        result.push({
          text: nowPage + 2,
          page: nowPage + 2
        })
      }
      //                               最大页数
      result.push({
        text: ">>",
        page: parseInt((totalCount + pageSize - 1) / pageSize)
      })
      this.pageNumList = result;
      return result;
    }
  },
  created: function () {
    this.getPage(this.page, this.pageSize);
  }
})