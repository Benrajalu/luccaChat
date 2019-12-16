var chatApp = angular.module("chatApp", ["ngSanitize"]);

// Define the `ChatController` controller on the `phonecatApp` module
chatApp.controller("ChatController", [
  "$scope",
  "$http",
  "$timeout",
  function($scope, $http, $timeout) {
    // Déclaration des 2 users
    var USER = {
      imgLong: "./assets/_MG_9428.png",
      img: "9428.png",
      name: "Jane Doe"
    };

    var OPERATOR = {
      imgLong: "./assets/_MG_9359.png",
      img: "9359.png",
      name: "Tomothy Webb"
    };

    // La liste des messages
    $scope.messages = new Array();
    // Flag pour l'empty screen
    $scope.emptyArray = true;
    // L'objet qui indique quel utilisateur est en train de taper.
    $scope.messageInput = null;
    // Le contenu de l'input
    $scope.currentMessage = "";

    /**
     * Ajout d'un nouveau message
     */
    $scope.sendMessage = function() {
      if ($scope.currentMessage.length > 0) {
        addUserMessage($scope.currentMessage + "", true);

        // On néttoie et on simule la conversation
        $scope.currentMessage = "";
        $scope.messageInput = null;

        // Simulation d'un délais de réponse aléatoire, plus naturel
        function generateDelay() {
          const delay = Math.floor(Math.random() * 1000) + 500;
          console.log(delay + "ms");
          return delay;
        }

        // Simulation de l'indicateur de frappe "opérateur"
        // Pas nécéssaire dans le cas de l'utilisateur...qui sait ce qui se passe
        $scope.messageInput = {
          author: OPERATOR.name,
          img: OPERATOR.imgLong
        };

        $timeout(function fakeAnswer() {
          $http({
            method: "GET",
            url:
              "https://baconipsum.com/api/?type=all-meat&sentences=1&start-with-lorem=1"
          }).then(
            function callBackFakeMessage(response) {
              $scope.messageInput = null;
              addUserMessage(response.data[0], false);
            },
            function callBackError() {
              $scope.messageInput = null;
            }
          );
        }, generateDelay());
      }
    };

    /**
     * Fonction utilitaire pour l'ajout d'un message
     */
    function addUserMessage(message, me) {
      $scope.messages.push({
        author: me ? USER.name : OPERATOR.name,
        time: new Date(),
        message: message,
        img: "./assets/_MG_" + (me ? USER.img : OPERATOR.img),
        me: me
      });
      $scope.emptyArray = false;
    }
  }
]);
