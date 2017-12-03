/**
 * Created by Andriy on 10.03.2015.
 */
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    //Налаштування збірки Grunt
    var config = {
        //Інформацію про проект з файлу package.json
        pkg: grunt.file.readJSON('package.json'),

        //Конфігурація для модуля browserify (перетворює require(..) в код
        browserify:     {
            //Загальні налаштування (grunt-browserify)
            options:      {

                //brfs замість fs.readFileSync вставляє вміст файлу
                transform:  [ require('brfs') ],
                browserifyOptions: {
                    //Папка з корнем джерельних кодів javascript
                    basedir: "Frontend/src/js/"
                }
            },

            //Збірка з назвою піца
            pizza: {
                src:        'Frontend/src/main.js',
                dest:       'Frontend/www/assets/js/main.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: !true,
                    yuicompress: !true//,
                    //optimization: 2
                },
                files: {
                    "Frontend/www/assets/css/mainPage.css": "Frontend/www/assets/less/mainPage.less"
                }
            }
        }
    };

    //Налаштування відстежування змін в проекті
    var watchDebug = {
        options: {
            'no-beep': true
        },
        //Назва завдання будь-яка
        scripts: {
            //На зміни в яких файлах реагувати
            files: ['Frontend/src/**/*.js', 'Frontend/**/*.ejs'],
            //Які завдання виконувати під час зміни в файлах
            tasks: ['browserify:pizza']
        }
    };


    //Ініціалузвати Grunt
    config.watch = watchDebug;
    grunt.initConfig(config);

    //Сказати які модулі необхідно виокристовувати
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //Список завданнь по замовчування
    grunt.registerTask('default',
        [
            'browserify:pizza',
            'less'
            //Інші завдання які необхідно виконати
        ]
    );

};