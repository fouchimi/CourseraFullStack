'use strict';

angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
        
        $scope.tab = 1;
        $scope.filtText = '';
        $scope.showDetails = false;
        
        $scope.dishes= menuFactory.getDishes();
        
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
    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
    var channels = [{value:"tel", label:"Tel."},            {value:"Email",label:"Email"}];
    
    $scope.channels = channels;
    $scope.invalidChannelSelection = false;
}])
    .controller('FeedbackController', ['$scope', function($scope){
        $scope.sendFeedback = function() {
            console.log($scope.feedback);
            if ($scope.feedback.agree && ($scope.feedback.mychannel === "")&& !$scope.feedback.mychannel) {
                $scope.invalidChannelSelection = true;
                console.log('incorrect');
            }
            else {
                $scope.invalidChannelSelection = false;
                $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                $scope.feedback.mychannel="";

                $scope.feedbackForm.$setPristine();
                console.log($scope.feedback);
            }
     };
                                    
}])
    .controller('DishDetailController', ['$scope','$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        
        $scope.key = "";
        $scope.propertyName = "";
        var dish = menuFactory.getDish(parseInt($stateParams.id, 10));
        $scope.dish = dish;
            
    }])

    .controller('DishCommentController', ['$scope', function($scope) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
            $scope.userComment = {author: "", rating: 5, comment: "", date: ""};
            
            $scope.submitComment = function () {
                //Step 2: This is how you record the date
                $scope.userComment.date = new Date().toISOString();
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.userComment);
                if ($scope.userComment.author === "" || $scope.userComment.comment === "") {
                    console.log('incorrect');
                }
                else {
                    $scope.userComment = {author: "", rating: 5, comment: ""};
                    $scope.commentForm.$setPristine();
                    console.log($scope.userComment);
                }
            };
            
            $scope.filter = function(){
                $scope.propertyName = $scope.key;
                console.log($scope.key);
        };
    }])
    
    .controller('IndexController', ['$scope', '$stateParams','menuFactory','corporateFactory', function($scope, $stateParams, menuFactory, corporateFactory){
        var featureDish = menuFactory.getDish(0);
        $scope.featureDish = featureDish;
        
        var promotion = menuFactory.getPromotion(0);
        $scope.promotion = promotion;
        
        var leader = corporateFactory.getLeader(3);
        $scope.leader = leader;
        
        
    }])
    
    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory){
        var leaders = corporateFactory.getLeaders();
        $scope.leaders = leaders;
    }])
    

;
