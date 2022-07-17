(function (factory) {
  $.extend($.fn, factory());
})(function () {
  function returnValueFunc(value) {
    return function () {
      return value;
    };
  }

  function addEventOn(obj) {
    var option = {
      target: $(this),
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

    $.extend(option, obj);

    $(this).on(option.event, function (e) {
      if (option.onIf(e)) {
        option.target.addClass("on");
        option.onEvent();
      } else if (option.offIf(e)) {
        option.target.removeClass("on");
        option.offEvent();
      }
    });
  }

  var allExports = {
    addEventOn: addEventOn,
    returnValueFunc: returnValueFunc,
  };

  return allExports;
});
