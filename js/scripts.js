var animatedScrollTo = (function () {
  var scrollAnim = null
    , currentScrollTop = -1
    , fpms = 1000 / 60 // fps

  function getOffsetTop (elem) {
    var offset = elem.offsetTop
      , parent = elem.offsetParent

    while (parent.tagName != 'BODY') {
      offset += parent.offsetTop
      parent = parent.offsetParent
    }

    return offset
  }

  function getScrollTop () {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  }

  function scrollBrowser (elem, time, callback) {
    var elemOffsetTop = getOffsetTop(elem)
      , scrollUp = elemOffsetTop < getScrollTop()
      , scrollDistance = scrollUp ? getScrollTop() - elemOffsetTop : elemOffsetTop - getScrollTop()
      , scrollDiff = scrollDistance / (time / fpms)

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
    }, fpms)
  }

  return scrollBrowser
}())

function navScroller (e) {
  var hash = this.getAttribute('href').replace(/\/#/, '')

  e.preventDefault()

  animatedScrollTo(document.getElementById(hash), this.getAttribute('data-scrollspeed'), function () {
    window.location.hash = '#' + hash
  })
}

document.getElementsByClassName('top')[0].addEventListener('click', function (e) {
  var self = this
    , rocket = document.getElementsByClassName('rocketeer')[0]
    , rocketClass = ' rocketeer-go'

  e.preventDefault()

  rocket.className += rocketClass
  rocket.addEventListener('webkitAnimationEnd', function (e) {
    rocket.className = rocket.className.replace(rocketClass, '')
    window.location.hash = self.getAttribute('href')
  })

  animatedScrollTo(document.getElementById('top'), 500)
})

document.getElementsByClassName('nav-prof')[0].addEventListener('click', navScroller)
document.getElementsByClassName('nav-dev')[0].addEventListener('click', navScroller)
document.getElementsByClassName('nav-write')[0].addEventListener('click', navScroller)
