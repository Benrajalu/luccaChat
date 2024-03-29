var chatApp = angular.module('chatApp', ['ngSanitize', 'angularMoment']);

// Define the `ChatController` controller on the `phonecatApp` module
chatApp.controller('ChatController', [
  '$scope',
  '$http',
  '$timeout',
  function($scope, $http, $timeout) {
    // Déclaration des 2 users
    var USER = {
      img: '9428.png',
      name: 'Jane Doe'
    };

    var OPERATOR = {
      img: '9359.png',
      name: 'Tomothy Webb'
    };

    // La liste des messages
    $scope.messages = new Array();
    // Flag pour l'empty screen
    $scope.emptyArray = true;
    // L'objet qui indique quel utilisateur est en train de taper.
    $scope.messageInput = null;
    // Le contenu de l'input
    $scope.currentMessage = '';

    /**
     * Ajout d'un nouveau message
     */
    $scope.sendMessage = function() {
      if ($scope.currentMessage.length > 0) {
        addUserMessage($scope.currentMessage + '', true);

        // On néttoie et on simule la conversation
        $scope.currentMessage = '';
        $scope.messageInput = null;

        // Simulation d'un délais de réponse aléatoire, plus naturel
        function generateDelay() {
          var delay = Math.floor(Math.random() * 1000) + 500;
          return delay;
        }

        // Simulation de l'indicateur de frappe "opérateur"
        // Pas nécéssaire dans le cas de l'utilisateur...qui sait ce qui se passe
        $scope.messageInput = {
          author: OPERATOR.name
        };

        $timeout(function fakeAnswer() {
          var messageLength = Math.floor(Math.random() * 2) + 1;
          $http({
            method: 'GET',
            url:
              'https://baconipsum.com/api/?type=all-meat&sentences=' +
              messageLength +
              '&start-with-lorem=1'
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
     * Simule un premier message opérateur pour lancer la conversation
     */
    $timeout(function fakeAnswer() {
      $scope.messageInput = {
        author: OPERATOR.name
      };

      $timeout(function startConversation() {
        $scope.messageInput = null;
        addUserMessage('Hello! Can I help you with anything?', false);
      }, 300);
    }, 1500);

    /**
     * Fonction utilitaire pour l'ajout d'un message
     */
    function addUserMessage(message, me) {
      $scope.messages.push({
        author: me ? USER.name : OPERATOR.name,
        time: new Date(),
        message: message,
        img: './assets/' + (me ? USER.img : OPERATOR.img),
        me: me
      });
      $scope.emptyArray = false;
      $timeout(function autoScroll() {
        var logContainer = document.getElementById('log');
        logContainer.scrollTop = logContainer.scrollHeight;
      }, 50); // Delay is needed to wait for DOM update, then it scrolls to last message
    }
  }
]);
