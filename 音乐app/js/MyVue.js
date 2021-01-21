/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

  2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址
    
  3.歌曲详情封面信息获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)
    
  4.热门评论获取(包括用户头像和名称)
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论
    
    
  5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
*/

var app = new Vue({
	el:"#player",		
	data:{
	// 查询关键字
    query: "",
    
    // 歌曲数组
    musicList: [],
    
    // 歌曲地址
    musicUrl: "",
    
    // 歌曲封面
    musicCover: "",
    
    // 歌曲评论
    hotComments: [],
    
    // 动画播放状态
    isPlaying: false,
    
    // 遮罩层的显示状态
    isShow: false,
    // mv地址
    mvUrl: ""
	},
	
	
	 methods:{
	 	ac1(){
	 		var then = this;
	 		axios.get("https://autumnfish.cn/search?keywords="+this.query)//获取音乐列表
	 		.then(function(response){
	 			//console.log(response.data.result.songs);
	 			then.musicList = response.data.result.songs;
	 		},function(err){
	 			
	 		})
	 	},
	 	
	 	ac2(id){
	 		var then = this;
	 		this.$refs.audio.play()//锁定音乐播放的播放的元素
	 		axios.get("https://autumnfish.cn/song/url?id="+id)//获取歌曲点击播放
	 		.then(function(response){
	 			//console.log(response.data.data[0].url);
	 			then.musicUrl = response.data.data[0].url;
	 		},function(err){})

	 		axios.get("https://autumnfish.cn/song/detail?ids="+id)//获取音乐封面
	 		.then(function(response){
	 			//console.log(response.data.songs[0].al.picUrl)
	 			then.musicCover = response.data.songs[0].al.picUrl;
	 		},function(err){})
	 	
			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id)//获取评论内容
	 		.then(function(response){
	 			//console.log(response.data.hotComments[0].user.avatarUrl)//用户头像
	 			//console.log(response.data.hotComments[3].user.nickname) //用户名称
	 			//console.log(response.data.hotComments[0].content)       //评论内容
	 			then.hotComments = response.data.hotComments;
	 		},function(err){}) 		
	 		
	 	},
	 	
	 	bofang(){   //播放
	 		//console.log("hh")
	 		this.isPlaying = true;
	 	},
	 	zhanting(){  //暂停
	 		//console.log("hh")
	 		this.isPlaying = false;
	 	},
	 	
	 	mv(mvid){
	 		var then = this;
	 		this.$refs.audio.pause()//锁定音乐播放的暂停元素
	 		axios.get("https://autumnfish.cn/mv/url?id="+mvid)//获取mv视频地址
	 		.then(function(response){
	 			//console.log(response.data.data.url)
	 			then.mvUrl = response.data.data.url;//视频地址获取到了装入data中
	 			then.isShow = true;
	 			
	 		},function(err){})

	 	},
	 	
	 	mv2(){
	 		this.isShow = false;	 		
	 		//this.$refs.video.pause()
	 	}
	
	
	
	
	
	
	
	
	
	 	
	 }
		
})
