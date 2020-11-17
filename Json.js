/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Leo yo',
		portrait: 'http://img.61ef.cn/news/201409/28/2014092805595807.jpg'
	},
	msg: '提示'
}


/* 首页轮播图 */
const carouselList = [{
		src: "/static/images/banner1.png",
		background: "#38358f",
	},
	{
		src: "/static/temp/banner2.jpg",
		background: "#38358f",
	},
	{
		src: "/static/temp/banner4.jpg",
		background: "#38358f",
	}
]



const grids = [{
		src: "/static/images/STELLAR.png",
		background: "rgb(46, 54, 142)",
		name: "Stellar",
		count: "120W",
		circulation: "120W",
		holdAddress: "20W",
		address: "0x81823***128d",
		owner: "0x81823***128d"
	},{
		src: "/static/images/LITECOIN.png",
		background: "rgb(46, 54, 142)",
		name: "Litecoin",
		count: "120W",
		circulation: "120W",
		holdAddress: "20W",
		address: "0x81823***128d",
		owner: "0x81823***128d"
	},{
		src: "/static/images/USDT.png",
		background: "rgb(46, 54, 142)",
		name: "Tether",
		count: "120W",
		circulation: "120W",
		holdAddress: "20W",
		address: "0x81823***128d",
		owner: "0x81823***128d"
	},{
		src: "/static/images/XRP.png",
		background: "rgb(46, 54, 142)",
		name: "XPR",
		count: "120W",
		circulation: "120W",
		holdAddress: "20W",
		address: "0x81823***128d",
		owner: "0x81823***128d"
	}
]

const boxIcon = {
	changeSrc: "/static/images/Change.png",
	listSrc: "/static/images/List.png",
	favoriteSrc: "/static/images/Favorite.png",
	favoriteBlueSrc: "/static/images/star.png",
	copySrc: "/static/images/Copy-black.png",
	copyWhiteSrc: "/static/images/Copy.png",
	searchSrc: "/static/images/Search.png",
	searchGraySrc: "/static/images/search-gray.png",
	backSrc: "/static/images/back.png",
	back2Src: "/static/images/back2.png"
}

export default {
	carouselList,
	boxIcon,
	userInfo,
	grids
}
