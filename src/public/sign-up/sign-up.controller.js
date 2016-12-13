(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var reg = this;

  reg.basePath = "http://nuccio.herokuapp.com";
  reg.message = "";
  reg.completed= false;

  reg.submit = function (cat) {
    reg.foundTmpValue = false;
    reg.foundTmpIndex = null;
    reg.responseHttp = [];
    reg.messageSN = "";

    var promise = MenuService.getMenuItems();
    promise.then(function(response){
      reg.responseHttp = response.menu_items;
        for(var i=0; i< response.menu_items.length; i++){
          var tmp = response.menu_items[i];
          if(tmp.short_name == cat){
            reg.foundTmpValue = true;
            reg.foundTmpIndex = i;
          }
        }
        console.log(reg.foundTmpValue);
        console.log(reg.responseHttp[reg.foundTmpIndex]);

        if(!reg.foundTmpValue){
          reg.messageSN = " No such menu number exists! ";
        }else{
          reg.message = " Your information has been saved! ";
          reg.completed = true;
          reg.result = reg.responseHttp[reg.foundTmpIndex];
        }

        return response;
    });

  };
}


})();
