'use strict';

var context = require.context('./', true, /-test\.(js|jsx)$/);
context.keys().forEach(context);
