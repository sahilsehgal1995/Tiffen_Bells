angular.module('starter.controllers', ['ionic.contrib.ui.cards'])

.controller('AppCtrl',['$scope', '$ionicSwipeCardDelegate', '$ionicSideMenuDelegate', 'Loader', '$rootScope', function($scope, $ionicSwipeCardDelegate, $ionicSideMenuDelegate, Loader, $rootScope) {
  $ionicSideMenuDelegate.canDragContent(false);
  $scope.AddToCart = function(index)
  {
    Loader.toggleLoadingWithMessage('Added To Cart',1000);
    $rootScope.cartItems = $rootScope.cartItems+1;
  };
  $rootScope.cartItems=0;
  var cardTypes = [
  { vender: 'Rajesh Caters',
    rating: 3.5,
    verified:'Yes',
    title: 'Dal Makhani, Mix Veg, 4 Chapati, Fried Rice, Salad, Dahi', 
    image: 'img/pic.png',
    price: 60
  },
  { vender: 'Sharma Tiffin Services',
    rating: 3.5, 
    verified:'Yes',
    title: 'Rajama, Chilli Paneer, 2 Chapati, Fried Rice, Salad, Dahi', 
    image: 'img/pic2.png',
    price: 80
  },
  {
    vender: 'Verma Cookers', 
    rating: 3.5, 
    verified:'Yes', 
    title: 'Butter Chicken, 4 Chapati, Fried Rice, Salad, Dahi',
    price: 90,
    image: 'img/pic3.png' 
  },
  { vender: 'Chahaun Tiffin wala',
    rating: 3.5, 
    verified:'Yes', 
    title: 'Moong ki Dal, Aloo Shimla Mirch, 4 Chapati, Fried Rice, Salad, Dahi',
    price: 65,
    image: 'img/pic4.png'
  }
    ];
  $scope.isAuthenticated=false;
  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
  Loader.toggleLoadingWithMessage('Swipe Down to view More Meals.',2000);
  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  $scope.addCard();
}])

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipeableCard($scope);
    card.swipe();
  };
})

.controller('Vendors',[ '$state', '$scope', function($state, $scope) {
  console.log('Vendors');
  $scope.viewVendor = function(index)
  {
   $state.go('app.vendorproducts', {
       vendor:JSON.stringify($scope.vendors[index])
     }); 
  };
  $scope.vendors=[
    {
      name:'Kejriwal Tiffin Services',
      verified:'Yes',
      summary: 'Provide Lunch, Dinner in both Veg and No-Veg. Special Items Kadhai Paneer, Shahi Paneer, Butter Chicken, Malabhari Parantha',
      image: 'img/vendor.jpg',
      likes:20,
      comments:10
    },
    {
      name:'Desi Sarkar Services',
      verified:'No',
      summary: 'Provide Lunch, Dinner in both Veg and No-Veg. Special Items Shahi Paneer, Kadhai Paneer, Butter Chicken, Malabhari Parantha',
      image: 'img/vendor.jpg',
      likes:10,
      comments:8
    },
    {
      name:'Loka Tiffin Services',
      verified:'Yes',
      summary: 'Provide Lunch, Dinner in both Veg and No-Veg. Special Items Kadhai Paneer, Shahi Paneer, Butter Chicken, Malabhari Parantha',
      image: 'img/vendor.jpg',
      likes:20,
      comments:10
    }
  ];
}])

.controller('VendorProduct',[ 'Loader', '$stateParams', '$scope', '$rootScope', function(Loader, $stateParams, $scope, $rootScope) {
  console.log('VendorsProduct');
  var vendor=JSON.parse($stateParams.vendor);
  console.log(vendor.name);
  $scope.vendorName =vendor.name;
  $scope.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  $scope.AddToCart = function(index)
  {
    $rootScope.cartItems = $rootScope.cartItems +1;
    Loader.toggleLoadingWithMessage($scope.products[index].name + ' Added to Cart',2000);
  };
  $scope.products=[
    {
      name:'Butter Chicken',
      time:'Lunch',
      summary: 'Butter Chicken. Lacha Parrantha. Salad. Whisky',
      image: 'img/pic.png',
      type: 'NonVeg',
      price: 50,
      likes:20,
      comments:10
    },
    {
      name:'Masala Paneer',
      time:'Dinner',
      summary: 'Masala Paneer. Lacha Parrantha. Salad. Whisky',
      image: 'img/pic2.png',
      type: 'Veg',
      price: 50,
      likes:20,
      comments:10
    },
    {
      name:'Kahi Pakoda',
      time:'Lunch',
      summary: 'Butter Chicken. Lacha Parrantha. Salad. Whisky',
      image: 'img/pic3.png',
      price: 50,
      type: 'Veg',
      likes:20,
      comments:10
    }
  ];
  
}])

.controller('LoginSignup', function($scope, $ionicPopup) {
   
  $scope.openSignup = function(){
      var confirmPopup = $ionicPopup.confirm({
	  title: '<b>Enter Details</b>',
	  templateUrl: 'signup.html',
	  buttons: [
	    { text: 'No, Later' ,
	      type: 'button-assertive',
	      onTap: function(e) {
		console.log('no');
	      }
	    },
	    {
	      text: '<b>Yes, offcourse</b>',
	      type: 'button-balanced',
	      onTap: function(e) {
		console.log('yes');
	      }
	    }
	]
	});
    
  };
})


.controller('Advancebooking', [ '$scope', '$ionicPopup', 'Loader', '$rootScope', function($scope, $ionicPopup, Loader, $rootScope) {
   $scope.days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
   $scope.cardSwiped = function(index) {
    $scope.addCard();
  };
  var cardTypes = [
    { vender: 'Rajesh Caters',
      rating: 3.5,
      verified:'Yes',
      title: 'Dal Makhani, Mix Veg, 4 Chapati, Fried Rice, Salad, Dahi', 
      image: 'img/pic.png',
      price: 60
    },
    { vender: 'Sharma Tiffin Services',
      rating: 3.5, 
      verified:'Yes',
      title: 'Rajama, Chilli Paneer, 2 Chapati, Fried Rice, Salad, Dahi', 
      image: 'img/pic2.png',
      price: 80
    },
    {
      vender: 'Verma Cookers', 
      rating: 3.5, 
      verified:'Yes', 
      title: 'Butter Chicken, 4 Chapati, Fried Rice, Salad, Dahi',
      price: 90,
      image: 'img/pic3.png' 
    },
    { vender: 'Chahaun Tiffin wala',
      rating: 3.5, 
      verified:'Yes', 
      title: 'Moong ki Dal, Aloo Shimla Mirch, 4 Chapati, Fried Rice, Salad, Dahi',
      price: 65,
      image: 'img/pic4.png'
    }
      ];
    $scope.AddToCart = function(index)
    {
      Loader.toggleLoadingWithMessage('Added to cart',1000);
      $rootScope.cartItems = $rootScope.cartItems +1;
    };
      $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);
  Loader.toggleLoadingWithMessage('Swipe Down to view More Meals.',2000);
  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  };
  $scope.addCard();
  
}])

.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})
;
