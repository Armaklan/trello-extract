/*
 * app.js
 * Copyright (C) 2014 armaklan <armaklan@dracoport>
 *
 * Distributed under terms of the MIT license.
 */
var config = require('./config.js');
var Trello = require("node-trello");
var t = new Trello(config.key, config.token);

// t.get("/1/members/me", function(err, data) {
//       if (err) throw err;
//         console.log(data);
// });

t.get('1/boards/545340c9b9648624872ab763/lists?cards=open', function(err, data) {
    if(err) throw err;
    data.forEach(function(column) {
        console.log(column.name);
        column.cards.forEach(function(card) {
            console.log('   ' + card.name);
        });
    });
});
