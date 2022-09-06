(function (factory) {
  window.oneS = factory();
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

  function multipleRemoveClass(obj, className) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].classList.remove(className);
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

  function addEventOn(selector, obj = {}) {
    var option = {
      target: document.querySelector(selector),
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

  function tab(
    selector,
    obj = {
      target: null,
    }
  ) {
    var option = {
      tab: document.querySelector(selector),
      contents: document.querySelector(obj.target),
    };
    option = mergeObj(option, obj);

    option.tab.addEventListener("click", function (e) {
      var tabList = option.tab.children;
      var currentTab = find(e.path, function (item) {
        return item.tagName === "LI";
      });
      var currnetTabIndex = findIndex(tabList, function (item) {
        return item === currentTab;
      });
      var contentsList = option.contents.children;
      var currentContents = contentsList[currnetTabIndex];
      multipleRemoveClass(tabList, "on");
      multipleRemoveClass(contentsList, "on");
      currentTab.classList.add("on");
      currentContents.classList.add("on");
      var eventObj = {
        tabList: tabList,
        currentTab: currentTab,
        currnetTabIndex: currnetTabIndex,
        contentsList: contentsList,
        currentContents: currentContents,
      };
      option.onEvent(eventObj);
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
