const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema');
const { Counter } = require('../model/counterSchema');
//create//글저장
//글 저장 작업흐름
//Counter 모델에서부터 글번호 가져옴 -> body.parser로 제목, 본문 가져와서 글 번호를 추가하여 모델 인스턴스 저장
//저장이 완료되면 카운터 모델에 있는 글번호 증가
router.post('/create', (req, res) => {
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			const PostModel = new Post({
				title: req.body.title,
				content: req.body.content,
				communityNum: doc.communityNum,
			});

			PostModel.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
					.then(() => {
						res.json({ sucess: true });
					})
					.catch(() => res.json({ success: false }));
			});
		});
});

//read//목록 출력 라우터
router.get('/read', (req, res) => {
	Post.find()
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true, communityList: doc });
		})
		.catch((err) => {
			console.log(err);
			res.json({ success: false });
		});
});

//상세페이지 출력 라우터
router.post('/detail', (req, res) => {
	Post.findOne({ communityNum: req.body.id })
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});

module.exports = router;
