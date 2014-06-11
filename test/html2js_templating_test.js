'use strict';

var grunt = require('grunt');

exports.html2js_templating = {
    setUp: function (done) {
        done();
    },
    default_options: function (test) {

        test.expect(1);

        var actual = grunt.file.read('tmp/default_options');
        var expected = grunt.file.read('test/expected/default_options');
        test.equal(actual, expected, 'should describe what the default behavior is.');

        test.done();
    },
    custom_options: function (test) {

        test.expect(1);

        var actual = grunt.file.read('tmp/custom_options');
        var expected = grunt.file.read('test/expected/custom_options');
        test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

        test.done();
    },
    custom_path_options: function (test) {

        test.expect(1);

        var actual = grunt.file.read('tmp/custom_path_options');
        var expected = grunt.file.read('test/expected/custom_path_options');
        test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

        test.done();
    },
};
