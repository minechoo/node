/*
table 형식의 DB (SQL 표준문법을 통해 데이터 입출력)(Oracle, MySQL, MsSQL, MriaDB)
JSON 형식의 NoSQL DB (SQL 표준 문법이 아닌 자스구문으로 데이터 입출력)(MongoDB)
Model : DB에 저장되는 데이터 객체
Schema : 데이터 베이스에 저장될 자료형식이나 키값을 강제하는 시스템적인 틀
*/
const mongoose = require('mongoose');
//게시근 객체가 저장될 스키마구조 생성
const postShema = new mongoose.Schema(
	{
		title: String,
		content: String,
		communityNum: Number,
		writer: {
			ref: 'User',
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ collection: 'Posts', timestamps: true }
);
//게시글 스키마구조가 적용된 모델생성자를 만든뒤 export
const Post = mongoose.model('Post', postShema);
module.exports = { Post };
