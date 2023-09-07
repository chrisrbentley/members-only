import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index.pug', { user: req.user });
});

export default router;
