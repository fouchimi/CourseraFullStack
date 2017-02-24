'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        $scope.showMenu = true;
        $scope.message = "Loading ...";
        
        menuFactory.getDishes().query(
            function(response){
                $scope.dishes = response;
                $scope.showMenu = true;
            },function(response){
                $scope.message = "Error: " + response.status + " " + 
                    response.statusText;
            });
        
        $scope.select =  function(setTab){
            $scope.tab = setTab;
            if(setTab === 2){
                $scope.filtText = "appetizer";
            }else if(setTab === 3){
                $scope.filtText = "mains";
            }else if(setTab === 4){
                $scope.filtText = "dessert";
            }else {
                $scope.filtText = "";
            }
        };
            
        $scope.isSelected = function(checkTab){
            return ($scope.tab === checkTab);
        };
        
        $scope.toggleDetails = function(){
            $scope.showDetails = !$scope.showDetails;
        };
   }])

.controller('ContactController', ['$scope', function($scope){
    $scope.feedback = {id:"", mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
    
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}])
    .controller('FeedbackController', ['$scope', 'feedbackFactory', function($scope, feedbackFactory){
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                feedbackFactory.getFeebacks().save($scope.feedback);
                $scope.invalidChannelSelection = false;
                $scope.feedback = {id: "", mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
                
            }
     };
                                    
}])
    .controller('DishDetailController', ['$scope','$stateParams', 'menuFactory', 
                                         function($scope, $stateParams, menuFactory) {
        
        $scope.key = "";
        $scope.propertyName = "";
        $scope.dish = {};
        $scope.showDish = true;
        $scope.message= "Loading ...";
        
        menuFactory.getDishes().get({id:parseInt($stateParams.id, 10)}).$promise.then(function(response){
            $scope.dish = response;
            $scope.showDish = true;
        },function(response){
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
            
    }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.userComment = {author: "", rating: 5, comment: "", date: ""};
            
            $scope.submitComment = function () {
                
                $scope.userComment.date = new Date().toISOString();
                $scope.dish.comments.push($scope.userComment);
                
                menuFactory.getDishes().update({id:$scope.dish.id}, $scope.dish);
                
                $scope.userComment = {author: "", rating: 5, comment: ""};
                $scope.commentForm.$setPristine();
                console.log($scope.userComment);
            };
            
            $scope.filter = function(){
                $scope.propertyName = $scope.key;
        };
    }])
    
    .controller('IndexController', ['$scope', '$stateParams','menuFactory','corporateFactory', 
                                    function($scope, $stateParams, menuFactory, corporateFactory){
        $scope.showDish = true;
        $scope.message="Loading ...";
        
        menuFactory.getDishes().get({id:0}).$promise.then(function(response){
            $scope.featureDish = response;
            $scope.showDish = true;
        }, function(response){
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        
        menuFactory.getPromotion().get({id:0}).$promise.then(function(response){
            $scope.promotion = response;
            $scope.showDish = true;
        }, function(response){
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        
        corporateFactory.getLeaders().get({id:3}).$promise.then(function(response){
            $scope.leader = response;
            $scope.showDish = true;
        }, function(response){
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
        
    }])
    
    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
        $scope.showLeader = true;
        $scope.message="Loading ...";
        
        corporateFactory.getLeaders().query(function(response){
            $scope.leaders = response;
            $scope.showLeader = true;
        }, function(response){
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });
}]);
