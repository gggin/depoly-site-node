/**
 * Created by gggin on 16-3-13.
 */
var AV = require('avoscloud-sdk');
var output = require('debug')('app:log');
var uuid = require('uuid');
var fs = require('fs');
AV.initialize('dYohV1tzIynA1UN5fkR8je4A-gzGzoHsz', 'VzM4HqCN2mu2L6TDP1QXIgxX');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Username ?', function (username) {
    rl.question('Password ?', function (password) {
        if (username === '' && password ===''){
        }
        AV.User.logIn(username, password).then(function () {
            AV.Query.doCloudQuery('select * from CornServer').then(
                function (data) {
                    var re = data.results;
                    output(re);
                    if (re.length > 0) {
                        var config = re[0].get('config');
                        config.NAME = uuid();
                        output(config);
                        fs.writeFileSync('../site-node/config.json', JSON.stringify(config), 'utf8');
                    }
                },
                function (err) {
                    output(err);
                }
            )
        }, function (err) {
            output(err);
        });
        rl.close();
    })
});
