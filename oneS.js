(function (factory) {
  $.fn = $.extend($.fn, factory());
})(function () {
  function returnValueFunc(value) {
    return function () {
      return value;
    };
  }

  function find(obj, predicate) {
    for (var i = 0; i < obj.length; i++) {
      if (predicate(obj[i])) return obj[i];
    }
  }

  function findIndex(obj, predicate) {
    for (var i = 0; i < obj.length; i++) {
      if (predicate(obj[i])) return i;
    }
  }

  function forKeys(obj, iterator) {
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
      iterator(key);
    });
  }

  function forLength(obj, iterator) {
    for (var i = 0; i < obj.length; i++) {
      iterator(i);
    }
  }

  function addEventOn(obj = {}) {
    var option = {
      target: this,
      event: "click",
      onIf: function () {
        return !this.target.hasClass("on");
      },
      offIf: function () {
        return this.target.hasClass("on");
      },
      onEvent: returnValueFunc(false),
      offEvent: returnValueFunc(false),
    };

    option = $.extend(option, obj);

    this.on(option.event, function (e) {
      if (option.onIf(e)) {
        $(this).addClass("on");
        option.onEvent(e);
      } else if (option.offIf(e)) {
        $(this).removeClass("on");
        option.offEvent(e);
      }
    });
  }

  function Media(
    option = {
      mobile: 640,
      tablet: 1220,
      desktop: Infinity,
    }
  ) {
    this.mediaQuery = option;
    this.isMedia = function (mediaQuery) {
      return this.currentMedia() === mediaQuery;
    };
    this.currentMedia = function () {
      var mediaQuery = this.mediaQuery;
      var resultArr = [];
      forKeys(mediaQuery, function (key) {
        if (window.innerWidth < mediaQuery[key]) resultArr.push(key);
      });
      return resultArr[0];
    };
  }

  function tab(obj) {
    obj.contents = $(obj.contents);
    var option = {
      contents: null,
    };

    option = $.extend(option, obj);

    $(this)
      .children()
      .on("click", function (e) {
        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        option.contents.children().removeClass("on");
        option.contents.children().eq($(this).index()).addClass("on");
      });
  }

  var allExports = {
    addEventOn: addEventOn,
    returnValueFunc: returnValueFunc,
    Media: Media,
    tab: tab,
  };

  return allExports;
});
