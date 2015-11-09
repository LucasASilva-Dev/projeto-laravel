/**
 * Created by Lucas on 28/10/2015.
 */
var app = angular.module('app',[
    'ngRoute','angular-oauth2','app.controllers','app.services','app.filters','app.directives',
    'ui.bootstrap.typeahead','ui.bootstrap.tpls','ui.bootstrap.modal',
    'ui.bootstrap.datepicker','ngFileUpload','http-auth-interceptor'
]);

angular.module('app.controllers',['ngMessages','angular-oauth2']);
angular.module('app.filters',[]);
angular.module('app.directives',[]);
angular.module('app.services',['ngResource']);

app.provider('appConfig', function () {
  var config = {
      baseUrl: 'http://localhost:8000',
      project: {
          status: [
              {value: 1, label: 'Nao Iniciado'},
              {value: 2, label: 'Iniciado'},
              {value: 3, label: 'Concluido'}
          ]
      },
      projectTask: {
          status: [
              {value: 1, label: 'Incompleta'},
              {value: 2, label: 'Completa'}
          ]
      },
      urls: {
        projectFile: '/project/{{id}}/file/{{idFile}}'
      },
      utils: {
          transformResponse : function (data, headers) {
              var headersGetter = headers();
              if(headersGetter['content-type'] == 'application/json' ||
                  headersGetter['content-type'] == 'text/json'){
                  var dataJson = JSON.parse(data);

                  if(dataJson.hasOwnProperty('data')){
                      dataJson = dataJson.data;
                  }

                  return dataJson;
              }
              return data;
          }
      }
  };
    return {
        config: config,
        $get : function () {
            return config;
        }
    };
});

app.config([
    '$routeProvider', '$httpProvider', 'OAuthProvider', 'OAuthTokenProvider', 'appConfigProvider',
    function ($routeProvider, $httpProvider, OAuthProvider, OAuthTokenProvider, appConfigProvider) {

        //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        $httpProvider.interceptors.push('oauthFixInterceptor');

        $httpProvider.defaults.transformResponse = appConfigProvider.config.utils.transformResponse;


    $routeProvider

        .when('/home', {
            templateUrl: 'build/views/home.html',
            controller: 'HomeController'
        })
        .when('/login',{
            templateUrl: 'build/views/login.html',
            controller: 'LoginController'

        })

        .when('/logout', {
            resolve: {
                logout: ['$location','OAuthToken', function ($location,OAuthToken) {

                    OAuthToken.removeToken();
                    $location.path('/login');
                }]
            }
        })
        //Rotas de Clients
        .when('/clients', {
            templateUrl: 'build/views/client/list.html',
            controller: 'ClientListController'
        })
        .when('/client/new', {
            templateUrl: 'build/views/client/new.html',
            controller: 'ClientNewController'
        })
        .when('/client/:id/edit', {
            templateUrl: 'build/views/client/edit.html',
            controller: 'ClientEditController'
        })
        .when('/client/:id/remove', {
            templateUrl: 'build/views/client/remove.html',
            controller: 'ClientRemoveController'
        })

        //Rotas de Projects
        .when('/projects', {
            templateUrl: 'build/views/project/list.html',
            controller: 'ProjectListController'
        })
        .when('/project/new/', {
            templateUrl: 'build/views/project/new.html',
            controller: 'ProjectNewController'
        })
        .when('/project/:id/edit', {
            templateUrl: 'build/views/project/edit.html',
            controller: 'ProjectEditController'
        })
        .when('/project/:id/remove', {
            templateUrl: 'build/views/project/remove.html',
            controller: 'ProjectRemoveController'
        })

        //Rotas de ProjectsNotes
        .when('/project/:id/notes', {
            templateUrl: 'build/views/project-note/list.html',
            controller: 'ProjectNoteListController'
        })
        .when('/project/:id/note/:idNote/show', {
            templateUrl: 'build/views/project-note/show.html',
            controller: 'ProjectNoteShowController'
        })
        .when('/project/:id/note/new/', {
            templateUrl: 'build/views/project-note/new.html',
            controller: 'ProjectNoteNewController'
        })
        .when('/project/:id/note/:idNote/edit', {
            templateUrl: 'build/views/project-note/edit.html',
            controller: 'ProjectNoteEditController'
        })
        .when('/project/:id/note/:idNote/remove', {
            templateUrl: 'build/views/project-note/remove.html',
            controller: 'ProjectNoteRemoveController'
        })
        
        //Rotas de ProjectsFiles
        .when('/project/:id/files', {
            templateUrl: 'build/views/project-file/list.html',
            controller: 'ProjectFileListController'
        })
        .when('/project/:id/file/:idFile/show', {
            templateUrl: 'build/views/project-file/show.html',
            controller: 'ProjectFileShowController'
        })
        .when('/project/:id/file/new/', {
            templateUrl: 'build/views/project-file/new.html',
            controller: 'ProjectFileNewController'
        })
        .when('/project/:id/file/:idFile/edit', {
            templateUrl: 'build/views/project-file/edit.html',
            controller: 'ProjectFileEditController'
        })
        .when('/project/:id/file/:idFile/remove', {
            templateUrl: 'build/views/project-file/remove.html',
            controller: 'ProjectFileRemoveController'
        })

        //Rotas de ProjectsTask
        .when('/project/:id/tasks', {
            templateUrl: 'build/views/project-task/list.html',
            controller: 'ProjectTaskListController'
        })
        .when('/project/:id/task/new/', {
            templateUrl: 'build/views/project-task/new.html',
            controller: 'ProjectTaskNewController'
        })
        .when('/project/:id/task/:idTask/edit', {
            templateUrl: 'build/views/project-task/edit.html',
            controller: 'ProjectTaskEditController'
        })
        .when('/project/:id/task/:idTask/remove', {
            templateUrl: 'build/views/project-task/remove.html',
            controller: 'ProjectTaskRemoveController'
        })

        //Rotas de ProjectsMember
        .when('/project/:id/members', {
            templateUrl: 'build/views/project-member/list.html',
            controller: 'ProjectMemberListController'
        })
        .when('/project/:id/member/:idProjectMember/remove', {
            templateUrl: 'build/views/project-member/remove.html',
            controller: 'ProjectMemberRemoveController'
        });



        OAuthProvider.configure({
            baseUrl: appConfigProvider.config.baseUrl ,
            clientId: 'appclient1',
            clientSecret: 'secret', // optional
            grantPath: 'oauth/access_token'
        });

        OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
        });

}]);

app.run(['$rootScope', '$location', '$http', '$modal', 'httpBuffer', 'OAuth', function($rootScope, $location, http, $modal, httpBuffer, OAuth) {

    $rootScope.$on('$routeChangeStart', function (event,next,current) {
        if(next.$$route.originalPath != '/login'){
            if(!OAuth.isAuthenticated()){
                $location.path('login');
            }
        }
    });

    $rootScope.$on('oauth:error', function(event, data) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === data.rejection.data.error) {
            return;
        }

        // Refresh token when a `access_denied` error occurs.
        if ('access_denied' === data.rejection.data.error) {
            httpBuffer.append(data.rejection.config, data.deferred);
            if(!$routeScope.loginModalOpened) {

                var modalInstance = $modal.open({
                    templateUrl: 'build/views/templates/loginModal.html',
                    controller: 'LoginModalController'
                });
                $routeScope.loginModalOpened = true;
            }
        }

        // Redirect to `/login` with the `error_reason`.
        return $location.path('login');
    });
}]);