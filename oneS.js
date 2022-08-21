(function (factory) {
  window.oneS = factory();
})(function () {
  function returnValueFunc(value) {
    return function () {
      return value;
    };
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

  function mergeObj() {
    var resultObj = {};
    var arg = arguments;
    forLength(arg, function (i) {
      var mergedObj = arg[i];
      forKeys(mergedObj, function (key) {
        resultObj[key] = mergedObj[key];
      });
    });
    return resultObj;
  }

  function hasClass(target, htmlClass) {
    var classList = Object.values(target.classList);
    return classList.indexOf(htmlClass) > -1;
  }

  function addClass(target, htmlClass) {
    target.classList.add(htmlClass);
  }

  function removeClass(target, htmlClass) {
    target.classList.remove(htmlClass);
  }

  function addEventOn(targetQuery, obj = {}) {
    var option = {
      target: document.querySelector(targetQuery),
      event: "click",
      onIf: function () {
        return !hasClass(this.target, "on");
      },
      offIf: function () {
        return hasClass(this.target, "on");
      },
      onEvent: returnValueFunc(false),
      offEvent: returnValueFunc(false),
    };

    option = mergeObj(option, obj);

    option.target.addEventListener(option.event, function (e) {
      console.log(option.onIf(e));
      if (option.onIf(e)) {
        addClass(option.target, "on");
        option.onEvent(e);
      } else if (option.offIf(e)) {
        removeClass(option.target, "on");
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

  var allExports = {
    addEventOn: addEventOn,
    returnValueFunc: returnValueFunc,
    Media: Media,
  };

  return allExports;
});
