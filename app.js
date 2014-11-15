/*
 * app.js
 * Copyright (C) 2014 armaklan <lionel.zuber@armaklan.org>
 *
 * Distributed under terms of the MIT license.
 */
var config = require('./config.js');
var prompt = require('prompt');
var Trello = require("node-trello");
var t = new Trello(config.key, config.token);

var promptProperties = [{
    name: 'boardIndex',
    validator: /^\d+$/
}];

var getBoardsCard = function(board) {
    t.get('1/boards/' + board.id + '/lists?cards=open', function(err, data) {
        if(err) throw err;
        data.forEach(function(column) {
            console.log(column.name);
            column.cards.forEach(function(card) {
                var result = [];
                result.push('   ');
                result.push(card.idShort);
                result.push(' - ');
                result.push(card.name);
                result.push(' (');
                result.push(card.dateLastActivity);
                result.push(') [');
                card.labels.forEach(function(label) {
                    result.push(label.name + ',');
                });
                result.push('] ');
                //result.push(card.url);
                console.log(result.join(''));
            });
        });
    });
};

t.get('1/members/me?boards=open', function(err, data) {
    var boards = [];
    data.boards.forEach(function(board) {
        console.log(boards.length + " - " + board.name);
        boards.push(board);
    });
    console.log("Quel tableau de bord voulez-vous extraire ? ");
    prompt.start();
    prompt.get(promptProperties, function(err, result){
        getBoardsCard(boards[result.boardIndex]);
    });
});


