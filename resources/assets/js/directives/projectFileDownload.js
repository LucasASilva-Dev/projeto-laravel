/**
 * Created by Lucas on 06/11/2015.
 */
angular.module('app.directives')
    .directive('projectFileDownload',
    ['$window', 'appConfig', 'ProjectFile', '$timeout', function($window, appConfig,  ProjectFile, $timeout){
        return {
            restrict: 'E',
            templateUrl: appConfig.baseUrl + '/build/views/templates/projectFileDownload.html',
            link: function (scope, element, attr) {

                var anchor = element.children()[0];

                scope.$on('salvar-arquivo', function (event, data) {
                    $(anchor).removeClass('disabled');
                    $(anchor).text('Save File');
                    blobUtil.base64StringToBlob(data.file).then(function (blob) {
                        $(anchor).attr({
                            href: $window.URL.createObjectURL(blob, data.mime_type),
                            download: data.name
                        });
                    });


                    $timeout(function () {
                        scope.downloadFile = function(){};
                        $(anchor)[0].click();
                    });
                });

            },
            controller: ['$scope', '$element', '$attrs',
                function ($scope, $element, $attrs) {
                $scope.downloadFile = function () {

                    var anchor = $element.children()[0];
                    $(anchor).addClass('disabled');
                    $(anchor).text('Loading...');
                    ProjectFile.download({id: $attrs.idProject, idFile: $attrs.idFile}, function (data){
                        $scope.$emit('salvar-arquivo', data);
                    })
                };
            }]
        };
    }]);