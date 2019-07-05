const jwt = require('jsonwebtoken');
const router = require('express').Router();
const dal = require('./dal');
const authSchemas = require('./validationSchemas/index');

const schemaValidator = require('../middlewares/schemaValidator');
const validateRequest = schemaValidator(true, authSchemas);

router.post('/', async (req, res) => {
    try {
        console.log('reqbody', req.body);

        const { pno, endUserIp } = req.body;

        console.log('pno', pno);
        console.log('eui', endUserIp);

        const user = await dal.authenticate(pno, endUserIp);
        console.log('user', user);
        if (user && user.status === 200) {
            let token = jwt.sign({ pno: user.personalNumber }, process.env.AUTHSECRET, { expiresIn: '24h' }); // Signing the token
            res.json({
                sucess: true,
                err: null,
                token,
                user: {...user.data}
            });
        } else {
            console.log('auth failed');
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'auth failed',
                user: null
            });
        }
    } catch (err) {
        return err;
    }
});

router.get('/:id', validateRequest, async (_req, res) => {
    try {
            const { id } = req.params;

        const user = await dal.collect(id);

        return res.json(user);
    } catch (err) {
        res.json(err);
    }
});

module.exports = router;
