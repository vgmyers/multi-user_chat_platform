(function(){
    'use strict';
    angular.module('MyApp')
            .controller('signalRChatRoomController', signalRChatRoomController);

    signalRChatRoomController.$inject = ['$scope', '$sessionStorage', '$timeout'];

    function signalRChatRoomController($scope, $sessionStorage, $timeout){
        const chat = $.connection.myHub;

        $("#isTypingContainer").hide();

        this.userLoggedIn = $sessionStorage.currentUser;
        if (this.userLoggedIn){
            this.signIn = true;
        }
        
        this.submit = () => {
            this.signIn = true;   

            $sessionStorage.currentUser = this.userName;
            this.userLoggedIn = $sessionStorage.currentUser;
        }
        this.logout = () => {
            this.userName = '';
            $sessionStorage.currentUser = this.userName;
            this.userLoggedIn = $sessionStorage.currentUser;
            this.signIn = false; 
        }
        
        this.conversation = [''];

        chat.client.addMessage = (name, message) => {
            const msg = {
                nameCaller: name,
                messageCaller: message
            }
            this.conversation.push(msg);
            $scope.$apply();
        }

        chat.client.sayWhoIsTyping = (name) => {
            this.typer = name;
            if (this.typer){
                $("#isTypingContainer").fadeIn();
            } else {
                $("#isTypingContainer").hide();
            }
            $scope.$apply();
        }

        this.send = () => {
            chat.server.send(
                this.userLoggedIn,
                this.message
            );
            this.message = '';
              
            chat.server.isTyping('');
        }

        this.typing = ($event) => {
            if ($event.which == 13){
                console.log('done');
            } else {
            chat.server.isTyping(
                this.userLoggedIn
            );
            chat.server.sayWhoIsTyping();

            }
            
            $timeout(function(){
                chat.server.isTyping('');
                chat.client.sayWhoIsTyping();
            }, 6000); //must wait whole 6 seconds for it to work again

            
        }

        $.connection.hub.start();


    }

}());