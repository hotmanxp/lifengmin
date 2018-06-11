function LiftEffect(json) {
  var $liContainer = $(json.controlSelector)
  var $array = [];
  $('img[title^=data_]').each(function(idx, item){
    $array.push([$(item).offset().top, $(item).attr('title')])
  })


  function initIcon(iconList) {
    $liContainer.html(iconList.reduce(function (acc, item) {
      return acc + '<li>' + item[1].split('_')[1] + '</li>'
    }, ''))
  }

  initIcon($array)

  function Selected(index) {
    $liContainer.children().eq(index).addClass(json.activeClassName).siblings().removeClass(json.activeClassName);
  }


  $(window).on("scroll", Check);

  function Check() {

    var wst = $(window).scrollTop();

    var key = 0;
    var flag = true;
    for (var i = 0; i < $array.length; i++) {
      key++;
      if (flag) {

        if (wst >= $array[$array.length - key][0] - 300) {
          var index = $array.length - key;
          flag = false;
        } else {
          flag = true;
        }

      }
    }
    Selected(index);
  }

  $liContainer.children().on("click", function () {
    $(window).off("scroll");
    var index = $(this).index();
    Selected(index);

    var flag = true;
    for (var i = 0; i < $array.length; i++) {

      if (flag) {

        if (index == i) {
          $("html,body").stop().animate({
            "scrollTop": $array[i][0] - 10
          }, 500, function () {
            $(window).on("scroll", Check);
          });
          flag = false;
        } else {
          flag = true;
        }

      }
    }

  });

  Check()



}



