(function () {
  function forKeys(obj, iterator) {
    var keys = Object.keys(obj);
    keys.forEach(function (key) {
      iterator(key);
    });
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
  function returnValueFunc(value) {
    return function () {
      return value;
    };
  }

  function multipleRemoveClass(obj, className) {
    for (var i = 0; i < obj.length; i++) {
      obj[i].classList.remove(className);
    }
  }

  window.Afo = function (obj) {
    var thisAfo = this;
    var currentMediaFunc = function () {
      forKeys(
        obj.breakPoint,
        function (key) {
          if (window.innerWidth < obj.breakPoint[key])
            this.currentBreakPoint = key;
        }.bind(thisAfo)
      );
    };

    this.isMedia = function (breakPoint) {
      return currentMediaFunc() === breakPoint;
    };

    this.tab = function (selector, obj) {
      var option = {
        tab: document.querySelector(selector),
        tabs: document.querySelector(selector).children,
        content: document.querySelector(obj.content),
        contents: document.querySelector(obj.content).children,
        changeEvent: returnValueFunc(false),
      };
      option.tab.addEventListener("click", function (e) {
        var currentTab = find(e.path, function (item) {
          return item.tagName === "LI";
        });
        var currnetTabIndex = findIndex(option.tabs, function (item) {
          return item === currentTab;
        });
        var currentContents = option.contents[currnetTabIndex];
        multipleRemoveClass(option.tabs, "on");
        multipleRemoveClass(option.contents, "on");
        currentTab.classList.add("on");
        currentContents.classList.add("on");
        var eventObj = {
          tabs: option.tabs,
          contents: option.contents,
          currentTab: currentTab,
          currnetTabIndex: currnetTabIndex,
          contentsList: option.contents,
          currentContents: currentContents,
        };
        option.changeEvent(eventObj);
      });
    };

    window.addEventListener("resize", currentMediaFunc);
    window.addEventListener("load", currentMediaFunc);
  };
})();
