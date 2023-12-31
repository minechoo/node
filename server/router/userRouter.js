const express = require('express');
const router = express.Router();
const { User } = require('../model/userSchema');
const { Counter } = require('../model/counterSchema');

router.post('/join', (req, res) => {
	const temp = req.body;

	Counter.findOne({ name: 'counter' })
		.exec()
		.then((doc) => {
			temp.userNum = doc.userNum;

			const userData = new User(temp);
			userData.save().then(() => {
				Counter.updateOne({ name: 'counter' }, { $inc: { userNum: 1 } })
					.exec()
					.then(() => {
						res.json({ success: true });
					})
					.catch((err) => res.json({ success: false, err: err }));
			});
		});
});

module.exports = router;
