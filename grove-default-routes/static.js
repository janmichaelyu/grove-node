'use strict';

const provider = (function() {
  const express = require('express');
  const path = require('path');
  const fs = require('fs');
  const four0four = require('../grove-node-server-utils/404')();

  const provide = function(config) {
    if (!config.staticUIDirectory) {
      throw new Error(
        'defaultStaticRoute configuration must include a staticUIDirectory'
      );
    }

    const router = express.Router();

    const staticUIPath = path.resolve(config.staticUIDirectory);
    if (fs.existsSync(staticUIPath + '/index.html')) {
      router.use(express.static(staticUIPath));
      router.get('/*', (req, res) =>
        res.sendFile(staticUIPath + '/index.html')
      );
      // For requests not matching any of the above, return a 404.
      router.use('', four0four.docNotFound);
    } else {
      console.warn(
        'There is no index.html located at the GROVE_UI_BUILD_PATH: ' +
          staticUIPath +
          '. This middle-tier will not try to serve static UI assets.'
      );
    }

    return router;
  };

  return provide;
})();

module.exports = provider;
