const express = require('express');

const emojis = require('./emojis');
const dapp = require('./dapp')
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

router.use('/emojis', emojis);
router.use('/dapp', dapp);

module.exports = router;
