var connection = new autobahn.Connection({url: 'wss://ws.syrow.com:443/ws', realm: 'default'});

var app = angular.module('myApp', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/index.html');

    $stateProvider
        .state('state-1', {
            url: '/general',
            templateUrl: '/static/ngTemplates/general.html',
            controller: "myCtrl"
        });
});



app.controller("myCtrl", function ($scope) {


    
    $scope.channels = [
        {name:"general" , pk : 1334 , lastUpdate : "" , notificationCount : 2 },
        {name:"buisness" , pk : 2345 , lastUpdate  : "" , notificationCount :3},
        {name:"main" , pk : 2345 , lastUpdate  : "" , notificationCount :3},
        {name:"new" , pk : 2345 , lastUpdate  : "" , notificationCount :3},
    ];
    $scope.dMsg = [
        {name:"Slackbot" ,type:"bot ", pk :1222 , lastUpdate :" ", notificationCount :2},
        {name:"Prateek" ,type:"user", pk :1222 , lastUpdate :" ", notificationCount :3},
        {name:"User2" ,type:"user", pk :1222 , lastUpdate :" ", notificationCount :5}
        ];

    $scope.apps = [
    {name:"Approval-Bot", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3},
    {name:"Asana", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3},
    {name:"Google Drive", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3},
    { name:"hello_World", id:1234 , type:"app" , lastUpdate:" " , notificationCount:3}
    ];

    $scope.mainChat = " ";
    $scope.channel = function () {
        $scope.mainChat = "#Channel";
    };
    $scope.dirMsg = function () {
        $scope.mainChat = "#Messages";
    };
    $scope.application = function () {
        $scope.mainChat = "#Applications";
    };
    $scope.user = function(){
        $scope.mainChat = "#Prudhvi"
    }

    
    $scope.chAdd =[];

    $scope.addChannel = function(){
        $scope.invisible = true;
        if($scope.channelAdd !=null){
          $scope.chAdd.push({
              channelName: $scope.channelAdd
          });
          $scope.channelAdd =null;
        }
    }


    $scope.model = { message: "" };
    $scope.clickMe = function(outgoingMsg){
        // $scope.mglist.push({
        //     message: outgoingMsg ,
        //     image2 : "assets/img/img-2.jpg",
        //     mainName1: "Prateek" ,
        //     mainName2 : "Prudhvi" ,
        //     image1 : "assets/img/img-1.jpg",
        // });

        if (connection.session) {
           connection.session.publish("com.myapp.mytopic2", [outgoingMsg]);
           console.log("event published!");
           $scope.model.message= " " ;
        } else {
           console.log("cannot publish: no session");
        }
    };

    $scope.model = {message: " "};
    $scope.CurrentDate = new Date();

    $scope.mglist = [
        {"pk" : 1 , message : "Hi there" , created : "12-01-2022T2312:312:32" , type : null , attachment : null , from : 1 , to : 2 , image : "assets/img/img-1.jpg" ,mainName1 : "Prateek"},
        {"pk" : 1 , message : null , created : "12-01-2022T2312:312:32" , type : "image" , attachment : "assets/img/img-2.jpg" , from : 2 , to : 1 ,image : "assets/img/img-1.jpg" ,mainName1 : "Prateek" },
        {"pk" : 1 , message : "Hi there" , created : "12-01-2022T2312:312:32" , type : "mp4" , attachment : "assets/video/video1.mp4" , from : 1 , to : 2 , image : "assets/img/img-1.jpg",mainName1 : "Prateek"},
        {"pk" : 1 , message : " " , created : "12-01-2022T2312:312:32" , type : "youtube" , attachment : "https://www.youtube.com/embed/tgbNymZ7vqY" , from : 1 , to : 2 , image : "assets/img/img-1.jpg",mainName1 : "Prateek"},
        {"pk" : 1 , message : null , created : "12-01-2022T2312:312:32" , type : "audio" , attachment : "assets/audio/audio.mp3" , from : 1 , to : 2 , image : "assets/img/img-1.jpg",mainName1 : "Prateek"},
        {"pk" : 1 , message : " " , created : "12-01-2022T2312:312:32" , type : "docs" , attachment : "assets/pdf/KRLMOckDesignPrototype.pdf" , from : 1 , to : 2 , image : "assets/img/img-1.jpg",mainName1 : "Prateek"},
    ];

   
});




// messaging app controller 


// "onopen" handler will fire when WAMP session has been established ..
connection.onopen = function (session) {

   console.log("session established!");

   // our event handler we will subscribe on our topic
   //
   function onevent1(args, kwargs) {
      console.log("got event:", args, kwargs);
      var scope = angular.element(document.getElementById('Receiver')).scope();
      scope.$apply(function() {
          scope.showMe(args[0]);
      });
   }

   // subscribe to receive events on a topic ..
   //
   session.subscribe('com.myapp.mytopic2', onevent1).then(
      function (subscription) {
         console.log("ok, subscribed with ID " + subscription.id);
      },
      function (error) {
         console.log(error);
      }
   );
};


// "onclose" handler will fire when connection was lost ..
connection.onclose = function (reason, details) {
   console.log("connection lost", reason);
}


// initiate opening of WAMP connection ..
connection.open();






