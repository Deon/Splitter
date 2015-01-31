angular.module("Splitter", ['ui.bootstrap'])
.controller("MainController", ['$scope', function($scope){

    //Person object - has a name and money.
    var Person = function (name){
        this.name = name;
        this.money = 0.00;
    }

    //GroceryItem object - has a cost and excludePeople
    var GroceryItem = function(name, cost){
        this.name = name;
        this.cost = cost;
        this.people = new Array ($scope.roommates.length);
        //Assume everyone wants the new items that are added.
        for (var i = 0; i < $scope.roommates.length; i++){
            this.people[i] = false;
        }
    }

    $scope.roommates = [];
    $scope.food = [];
    $scope.newName;
    $scope.newFood;

    $scope.addPerson = function(){
        if ($scope.roommates.length < 7 && $scope.newName){
            $scope.roommates.push(new Person($scope.newName));
            $scope.newName = "";
        }

        //Make the new array, copying values from previous array.
        for (var item = 0; item < $scope.food.length; item++){
            var newArray = new Array ($scope.roommates.length);
            for (var person = 0; person < $scope.roommates.length; person++){
                newArray[person] = $scope.food[item].people[person];
            }
            newArray[$scope.roommates.length-1] = false;
            $scope.food[item].people = newArray;
        }

        $scope.calculateMoney();
    };

    $scope.removePerson = function(index){
        if ($scope.roommates){
            $scope.roommates = $scope.roommates.slice(0, index).concat($scope.roommates.slice(index+1));
            for (var item = 0; item < $scope.food.length; item++){
                $scope.food[item].people = $scope.food[item].people.slice(0, index).concat($scope.food[item].people.slice(index+1));
            }
        }
        $scope.calculateMoney();
    };

    $scope.addFood = function(){
        if ($scope.newFood && $scope.newFood.name && $scope.newFood.cost > 0){
            $scope.food.push(new GroceryItem ($scope.newFood.name, $scope.newFood.cost));
            $scope.newFood = null;
        }
        $scope.calculateMoney();
    };

    $scope.removeFood = function(index){
        if ($scope.food){
            $scope.food = $scope.food.slice(0, index).concat($scope.food.slice(index+1));
        }
        $scope.calculateMoney();
    };

    $scope.calculateMoney = function(){
        console.log($scope.food);
        for (var person = 0; person < $scope.roommates.length; person++){
            $scope.roommates[person].money = 0;
        }

        for (var item = 0; item < $scope.food.length; item++){
            var numPeoplePaying = 0;
            var costPerPerson = 0;

            for (var person = 0; person < $scope.roommates.length; person++){
                if ($scope.food[item].people[person] === false){
                    numPeoplePaying++;
                }
            }

            costPerPerson = $scope.food[item].cost/numPeoplePaying;
            console.log(costPerPerson);

            for (var person = 0; person < $scope.roommates.length; person++){
                if ($scope.food[item].people[person]=== false){
                    $scope.roommates[person].money += costPerPerson;
                }
            }
        }
    };
}]);
