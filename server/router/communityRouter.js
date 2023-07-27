const express = require('express');
const router = express.Router();
const { Post } = require('../model/postSchema');
const { Counter } = require('../model/counterSchema');
const { User } = require('../model/userSchema');
//create//글저장
//글 저장 작업흐름
//Counter 모델에서부터 글번호 가져옴 -> body.parser로 제목, 본문 가져와서 글 번호를 추가하여 모델 인스턴스 저장
//저장이 완료되면 카운터 모델에 있는 글번호 증가
router.post('/create', (req, res) => {
	const temp = req.body;
	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.communityNum = doc.communityNum;
			//temp = {title, content, uid, communityNum}

			//2-User컬렉션에서 현재로그인 사용자의 uid값으로 해당 유저정보 다큐먼트 찾고
			//해당 다큐먼트의 objectId값을 writer속성에 추가
			User.findOne({ uid: temp.uid })
				.exec()
				.then((doc) => {
					temp.writer = doc._id;
					//temp = {titel, content, uid, communityNum, writer}

					//3-해당 post모델의 writer 프로퍼티안에는 작성자정보의 다큐먼트가 참조된
					//참조된 모델객체를 저장하고 저장이 성공하면 카운터 컬랙션의 communtiyNum 값 증가
					const PostModel = new Post(temp);
					PostModel.save().then(() => {
						Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
							.exec()
							.then(() => {
								res.json({ success: true });
							})
							.catch((err) => res.json({ success: false, err: err }));
					});
				});
			// const PostModel = new Post({
			// 	title: req.body.title,
			// 	content: req.body.content,
			// 	communityNum: doc.communityNum,
			// });

			// PostModel.save().then(() => {
			// 	Counter.updateOne({ name: 'counter' }, { $inc: { communityNum: 1 } })
			// 		.exec()
			// 		.then(() => {
			// 			res.json({ sucess: true });
			// 		})
			// 		.catch(() => res.json({ success: false }));
			// });
		});
});

//read//목록 출력 라우터
router.get('/read', (req, res) => {
	Post.find()
		.populate('writer')
		.sort({ createdAt: -1 })
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
		.populate('writer')
		.exec()
		.then((doc) => res.json({ success: true, detail: doc }))
		.catch((err) => res.json({ success: false, err: err }));
});

//글 수정요청 라우터
router.post('/edit', (req, res) => {
	const temp = {
		title: req.body.title,
		content: req.body.content,
	};
	Post.updateOne({ communityNum: req.body.id }, { $set: temp })
		.exec()
		.then((doc) => {
			console.log(doc);
			res.json({ success: true });
		})
		.catch((err) => res.json({ success: false }));
});

//글 삭제요청 라우터
router.post('/delete', (req, res) => {
	Post.deleteOne({ communityNum: req.body.id })
		.exec()
		.then(() => {
			res.json({ success: true });
		})
		.catch(() => res.json({ success: false }));
});

module.exports = router;
