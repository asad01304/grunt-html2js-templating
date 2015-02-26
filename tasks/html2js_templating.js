/*
 * grunt-html2js-templating
 * https://github.com/asad-rahman/grunt-plug
 *
 * Copyright (c) 2014 Asad Rahman
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    function prepareTemplate(html) {

        var ESCAPE_STRING = /\s{2,}/g ,
            ESCAPE_CARRIAGE = /(\r)|(\n)|(\r\n)/g;

        return html.replace(ESCAPE_STRING, ' ').replace(ESCAPE_CARRIAGE, '');
    }

    function getFullName(filepath, basePath){

        if(basePath){
            filepath = filepath.replace(basePath, "");
        }

        var name =  filepath
            .replace(/\.\./g, '')
            .replace(/\.html/i, "");


        name = name.replace(/\/(.)/g, function(match, group1) {
            return group1.charAt(0).toUpperCase();
        });

        name = name.replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });

        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    function getShortName(filepath){
        var name =  filepath.replace(/.*\//,'').replace(/\.html/i, "");
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    grunt.registerMultiTask('html2js_templating', 'converts html files to js template and merge them as template.js', function () {

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            shortNaming: true,
            pathRemove : ""
        });

        this.files.forEach(function (files) {

            var Templates = {};

            files.src.filter(function (filepath) {

                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }

                return true;

            }).map(function (filepath) {

                    var html = grunt.file.read(filepath);
                    html = prepareTemplate(html);

                    var name = options.shortNaming ?
                        getShortName(filepath) : getFullName(filepath, options.pathRemove);

                    Templates[name] = html;
                    return html;

                });

            // Write the destination file.
            grunt.file.write(files.dest, "var Templates = " + JSON.stringify(Templates));

            // Print a success message.
            grunt.log.writeln('File "' + files.dest + '" created.');
        });
    });

};


