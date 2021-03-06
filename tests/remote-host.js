"use strict";

var fs = require("fs");
var vows = require("vows");
var assert = require("assert");
var rsync = require("../lib/rsyncwrapper");

var srcFile = "single.txt";
var srcFilePath = "./tests/fixtures/"+srcFile;
var destHost = "user@example.com"
var destDir = "tmp/";
var copiedFile = destDir+srcFile;

exports.suite = vows.describe("Copy file to remote dest with host option test").addBatch({
    "Copying a single file to remote dest": {
        topic: function() {
            rsync({
                src: srcFilePath,
                dest: destDir,
                host: destHost,
                port: "1234",
                privateKey: "~/.ssh/aws.pem",
                noExec: true
            },this.callback);
        },
        "does not error": function (error,stdout,stderr) {
            assert.isNull(error);
        },
        "results in an rsync command that should work": function(error,stdout,stderr,cmd) {
            assert.equal(cmd, 'rsync ./tests/fixtures/single.txt user@example.com:tmp/ --rsh "ssh -p 1234 -i ~/.ssh/aws.pem"');
        }
    }
});
