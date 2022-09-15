(function (factory) {
  $.extend($.fn, factory());
  window.Media = factory().Media;
})(function () {
  function returnValue(value) {
    return function () {
      return value;
    };
  }

  function find(obj, predicate) {
    for (var i = 0; i < obj.length; i++) {
      if (predicate(obj[i])) return obj[i];
    }
  }

  function isType(value, type) {
    return typeof value === type;
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
      onEvent: returnValue(false),
      offEvent: returnValue(false),
    };

    $.extend(option, obj);

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
    var option = {
      tab: $(this),
      changeEvent: returnValue(false),
    };
    isType(obj, "string")
      ? (option.contents = $(obj))
      : (obj.contents = $(obj.contents));

    $.extend(option, obj);

    (function () {
      var prevTabObj = {
        prevTab: $(),
        prevContents: $(),
        prevIndex: 0,
      };
      option.tab.children().on("click", function (e) {
        var tabObj = {
          currentTab: $(this),
          currentContents: option.contents.children().eq($(this).index()),
          currentIndex: $(this).index(),
        };
        $.extend(tabObj, prevTabObj);

        $(this).siblings().removeClass("on");
        $(this).addClass("on");
        tabObj.currentContents.siblings().removeClass("on");
        tabObj.currentContents.addClass("on");

        $.extend(e, { tab: tabObj });
        option.changeEvent(e);
        prevTabObj = {
          prevTab: tabObj.currentTab,
          prevContents: tabObj.currentContents,
          prevIndex: tabObj.currentIndex,
        };
      });
    })();
  }

  var allExports = {
    addEventOn: addEventOn,
    returnValue: returnValue,
    Media: Media,
    tab: tab,
  };

  return allExports;
});
