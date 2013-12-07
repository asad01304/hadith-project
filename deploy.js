var _  = require('underscore'),
    fs = require('fs');

var UglifyJS = require("uglify-js");


var root    = 'public/javascripts/modules/';
var modules = ['Hadith'];

var FILE_ENCODING = 'utf-8', EOL = '\n';

_.each(modules, function(module){

    var moduleRoot = root + module,
        file = moduleRoot + '/module.json';

    fs.readFile(file, FILE_ENCODING, function (err, data) {

        if (err) return console.log('Error: ' + err);

        var package   = JSON.parse(data);

        var Templates = getTemplates(package.templates, '/templates', moduleRoot);

        var stacks = ['models', 'views', 'routers'];
        var files  = [];
        _.each(stacks, function(stack){

            if(!package[stack]) return true;

            files = files.concat(getFilePath(
                package[stack], moduleRoot + '/' + stack + '/'));

        });

        files.push(moduleRoot + '/module.js');

        var out = files.map(function(file){
            return fs.readFileSync(file, FILE_ENCODING);
        });

        var templates = getFilePath(package.templates, moduleRoot + '/templates');

        fs.writeFile(moduleRoot + '/module.map.js',

            "(function (){" + EOL +

                EOL + "var Templates = " + JSON.stringify(Templates) + EOL +
                EOL + out.join(EOL) + EOL +
            "})();",

        FILE_ENCODING);

    });

});

function getFilePath(files, path){

    var temp = _.map(files, function(file){
        return path + file;
    });

    return temp;
}

function getTemplates(files, container, moduleRoot){

    var Template = {};

    _.each(files, function(file){

        var path = moduleRoot + '/' + container + '/' + file;
        var name = file.replace(/\..*/,'');

        var html = fs.readFileSync(path, FILE_ENCODING);
        var html = prepareTemplate(html);

        Template[name] = html;
    });

    return Template;

}

function prepareTemplate (html){

    var ESCAPE_STRING   = /\s{2,}/g ,
        ESCAPE_CARRIAGE = /(\r)|(\n)|(\r\n)/g ;

    return html.replace(ESCAPE_STRING,' ').replace(ESCAPE_CARRIAGE,'');
}
