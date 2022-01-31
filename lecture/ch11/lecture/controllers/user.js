const User = require("../models/user");

exports.addFollowing = async (req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });

        if (user) {
            await user.addFollowings([parseInt(req.params.id, 10)]);   // 생성쿼리. 모델에 설정한 as에 따라 메소드 정해짐
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}