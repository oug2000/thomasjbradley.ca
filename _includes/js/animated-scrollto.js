var animatedScrollTo = (function () {
  var scrollAnim
    , currentScrollTop = -1
    , speed = 1000 / 60 // fps

  function scrollBrowser (elem, time, callback) {
    var elemOffsetTop = getOffset(elem).top
      , scrollUp = elemOffsetTop < getScrollTop()
      , scrollDistance = scrollUp ? getScrollTop() - elemOffsetTop : elemOffsetTop - getScrollTop()
      , scrollDiff = scrollDistance / (time / speed)

    currentScrollTop = -1

    scrollAnim = setInterval(function () {
      var newScrollTop = scrollUp ? getScrollTop() - scrollDiff : getScrollTop() + scrollDiff
        , reachedPos = scrollUp ? newScrollTop <= elemOffsetTop : newScrollTop >= elemOffsetTop

      if (!reachedPos && newScrollTop != currentScrollTop) {
        window.scrollTo(0, newScrollTop)
        currentScrollTop = newScrollTop
      } else {
        clearInterval(scrollAnim)
        window.scrollTo(0, elemOffsetTop)
        callback && callback()
      }
    }, speed)
  }

  return scrollBrowser
}())
