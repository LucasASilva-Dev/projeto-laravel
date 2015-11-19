/**
 * Created by Lucas on 28/10/2015.
 */
var app = angular.module('app',[
    'ngRoute','angular-oauth2','app.controllers','app.services','app.filters','app.directives',
    'ui.bootstrap.typeahead','ui.bootstrap.tpls','ui.bootstrap.modal',
    'ui.bootstrap.datepicker','ngFileUpload','http-auth-interceptor', 'angularUtils.directives.dirPagination',
    'ui.bootstrap.dropdown','pusher-angular'
]);

angular.module('app.controllers',['ngMessages','angular-oauth2']);
angular.module('app.filters',[]);
angular.module('app.directives',[]);
angular.module('app.services',['ngResource']);

app.provider('appConfig', function () {
  var config = {
      baseUrl: 'http://localhost:8000',
      pusherKey: '90dc3185b30ded26ad5e',
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
                  if(dataJson.hasOwnProperty('data') && Object.keys(dataJson).length == 1 ){
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
        $httpProvider.interceptors.splice(0,1);
        $httpProvider.interceptors.splice(0,1);
        $httpProvider.interceptors.push('oauthFixInterceptor');

        $httpProvider.defaults.transformResponse = appConfigProvider.config.utils.transformResponse;


    $routeProvider

        .when('/', {
            templateUrl: 'build/views/home.html',
            controller: 'HomeController',
            title: 'Dashboard'
        })
        .when('/home', {
            templateUrl: 'build/views/home.html',
            controller: 'HomeController',
            title: 'Dashboard'
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
        .when('/clients/dashboard', {
            templateUrl: 'build/views/client/dashboard.html',
            controller: 'ClientDashboardController',
            title: 'Clients'
        })
        .when('/clients', {
            templateUrl: 'build/views/client/list.html',
            controller: 'ClientListController',
            title: 'Clients'
        })
        .when('/client/new', {
            templateUrl: 'build/views/client/new.html',
            controller: 'ClientNewController',
            title: 'Clients'
        })
        .when('/client/:id/edit', {
            templateUrl: 'build/views/client/edit.html',
            controller: 'ClientEditController',
            title: 'Clients'
        })
        .when('/client/:id/remove', {
            templateUrl: 'build/views/client/remove.html',
            controller: 'ClientRemoveController',
            title: 'Clients'
        })

        //Rotas de Projects
        .when('/projects/dashboard', {
            templateUrl: 'build/views/project/dashboard.html',
            controller: 'ProjectDashboardController',
            title: 'Project'
        })
        .when('/projects', {
            templateUrl: 'build/views/project/list.html',
            controller: 'ProjectListController',
            title: 'Projects'
        })
        .when('/project/new/', {
            templateUrl: 'build/views/project/new.html',
            controller: 'ProjectNewController',
            title: 'Projects'
        })
        .when('/project/:id/edit', {
            templateUrl: 'build/views/project/edit.html',
            controller: 'ProjectEditController',
            title: 'Projects'
        })
        .when('/project/:id/remove', {
            templateUrl: 'build/views/project/remove.html',
            controller: 'ProjectRemoveController',
            title: 'Projects'
        })

        //Rotas de ProjectsNotes
        .when('/project/:id/notes', {
            templateUrl: 'build/views/project-note/list.html',
            controller: 'ProjectNoteListController',
            title: 'Project Notes'
        })
        .when('/project/:id/note/:idNote/show', {
            templateUrl: 'build/views/project-note/show.html',
            controller: 'ProjectNoteShowController',
            title: 'Project Notes'
        })
        .when('/project/:id/note/new/', {
            templateUrl: 'build/views/project-note/new.html',
            controller: 'ProjectNoteNewController',
            title: 'Project Notes'
        })
        .when('/project/:id/note/:idNote/edit', {
            templateUrl: 'build/views/project-note/edit.html',
            controller: 'ProjectNoteEditController',
            title: 'Project Notes'
        })
        .when('/project/:id/note/:idNote/remove', {
            templateUrl: 'build/views/project-note/remove.html',
            controller: 'ProjectNoteRemoveController',
            title: 'Project Notes'
        })
        
        //Rotas de ProjectsFiles
        .when('/project/:id/files', {
            templateUrl: 'build/views/project-file/list.html',
            controller: 'ProjectFileListController',
            title: 'Project Files'
        })
        .when('/project/:id/file/:idFile/show', {
            templateUrl: 'build/views/project-file/show.html',
            controller: 'ProjectFileShowController',
            title: 'Project Files'
        })
        .when('/project/:id/file/new/', {
            templateUrl: 'build/views/project-file/new.html',
            controller: 'ProjectFileNewController',
            title: 'Project Files'
        })
        .when('/project/:id/file/:idFile/edit', {
            templateUrl: 'build/views/project-file/edit.html',
            controller: 'ProjectFileEditController',
            title: 'Project Files'
        })
        .when('/project/:id/file/:idFile/remove', {
            templateUrl: 'build/views/project-file/remove.html',
            controller: 'ProjectFileRemoveController',
            title: 'Project Files'
        })

        //Rotas de ProjectsTask
        .when('/project/:id/tasks', {
            templateUrl: 'build/views/project-task/list.html',
            controller: 'ProjectTaskListController',
            title: 'Project Tasks'
        })
        .when('/project/:id/task/new/', {
            templateUrl: 'build/views/project-task/new.html',
            controller: 'ProjectTaskNewController',
            title: 'Project Tasks'
        })
        .when('/project/:id/task/:idTask/edit', {
            templateUrl: 'build/views/project-task/edit.html',
            controller: 'ProjectTaskEditController',
            title: 'Project Tasks'
        })
        .when('/project/:id/task/:idTask/remove', {
            templateUrl: 'build/views/project-task/remove.html',
            controller: 'ProjectTaskRemoveController',
            title: 'Project Tasks'
        })

        //Rotas de ProjectsMember
        .when('/project/:id/members', {
            templateUrl: 'build/views/project-member/list.html',
            controller: 'ProjectMemberListController',
            title: 'Project Members'
        })
        .when('/project/:id/member/:idProjectMember/remove', {
            templateUrl: 'build/views/project-member/remove.html',
            controller: 'ProjectMemberRemoveController',
            title: 'Project Members'
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

app.run(['$rootScope', '$location', '$http', '$modal', '$cookies', '$pusher', 'httpBuffer', 'OAuth', 'appConfig',
    function($rootScope, $location, http, $modal, $cookies, $pusher, httpBuffer, OAuth, appConfig) {

    $rootScope.$on('pusher-build', function (event, data) {
        if(data.next.$$route.originalPath != '/login'){
            if(OAuth.isAuthenticated()){
                if(!window.client){
                    window.client = new Pusher(appConfig.pusherKey);
                    var pusher = $pusher(window.client);

                    var channel = pusher.subscribe('user.'+$cookies.getObject('user').id);
                    channel.bind('CodeProject\\Events\\TaskWasIncluded',
                    function(data) {
                        console.log(data);
                    });
                }
            }
        }
    });

    $rootScope.$on('pusher-destroy', function (event, data) {
        if(data.next.$$route.originalPath == '/login'){
            if(window.client){
                window.client.disconnect();
                window.client = null;
            }
        }
    });

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if(next.$$route.originalPath != '/login'){
            if(!OAuth.isAuthenticated()){
                $location.path('login');
            }
        }

        $rootScope.$emit('pusher-build',{next: next});
        $rootScope.$emit('pusher-destroy',{next: next});
    });

    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
       $rootScope.pageTitle = current.$$route.title;
    });

    $rootScope.$on('oauth:error', function(event, data) {
        // Ignore `invalid_grant` error - should be catched on `LoginController`.
        if ('invalid_grant' === data.rejection.data.error) {
            return;
        }

        // Refresh token when a `access_denied` error occurs.
        if ('access_denied' === data.rejection.data.error) {
            httpBuffer.append(data.rejection.config, data.deferred);
            if(!$rootScope.loginModalOpened) {

                var modalInstance = $modal.open({
                    templateUrl: 'build/views/templates/loginModal.html',
                    controller: 'LoginModalController'
                });
                $rootScope.loginModalOpened = true;
            }
            return;
        }

        // Redirect to `/login` with the `error_reason`.
        return $location.path('login');
    });
}]);