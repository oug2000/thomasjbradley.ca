---
---

function navScroller (e) {
  var hash = this.getAttribute('href').replace(/\/#/, '')

  e.preventDefault()

  animatedScrollTo(document.getElementById(hash), this.getAttribute('data-scrollspeed'), function () {
    window.location.hash = '#' + hash
  })
}

function getOffset (elem) {
  var offset = {left : elem.offsetLeft, top : elem.offsetTop}
    , parent = elem.offsetParent

  while (parent.tagName != 'BODY') {
    offset.left += parent.offsetLeft
    offset.top += parent.offsetTop
    parent = parent.offsetParent
  }

  return offset
}

function addClass (elem, newClass) {
  elem.className += ' ' + newClass
}

function removeClass (elem, newClass) {
  elem.className = elem.className.replace(newClass, '').replace(/\s+/, ' ').replace(/\s+$/, '').replace(/^\s+/, '')
}

var Swiper = (function () {
  var threshold = {x : 10, y : 50}
    , directions = {left : 'left', right : 'right'}
    , returnObject = {target : elem, direction : directions.left}
    , callback
    , elem
    , originalCoord = {x : 0, y : 0}
    , finalCoord = {x : 0, y : 0}
    , changeX = 0
    , goingVertical = 0
    , callbackTimeout

  function touchStartHandler (e) {
    originalCoord.x = e.targetTouches[0].pageX
    originalCoord.y = e.targetTouches[0].pageY

    finalCoord.x = originalCoord.x
    finalCoord.y = originalCoord.y

    goingVertical = 0
    clearTimeout(callbackTimeout)
  }

  function touchMoveHandler (e) {
    finalCoord.x = e.targetTouches[0].pageX
    finalCoord.y = e.targetTouches[0].pageY

    if (goingVertical === 0) {
      goingVertical = false

      if (Math.abs(finalCoord.y - originalCoord.y) > Math.abs(finalCoord.x - originalCoord.x))
        goingVertical = true
    }

    if (goingVertical === false)
      e.preventDefault()
  }

  function touchEndHandler (e) {
    changeX = originalCoord.x - finalCoord.x
    clearTimeout(callbackTimeout)

    if (goingVertical === false) {
      if (Math.abs(changeX) > Math.abs(threshold.x)) {
        // Timeout stops the callback being fired if the tablet catches a scroll first
        // Stops weird paused transitions, they will then be triggered after scroll
        returnObject.direction = directions.left
        callbackTimeout = setTimeout(function () { callback(returnObject) }, 10)
      } else {
        returnObject.direction = directions.right
        callbackTimeout = setTimeout(function () { callback(returnObject) }, 10)
      }
    }

    goingVertical = 0
  }

  function addSwipeListener(el, cb) {
    callback = cb
    elem = el

    elem.addEventListener('touchstart', touchStartHandler, false)
    elem.addEventListener('touchmove', touchMoveHandler, false)
    elem.addEventListener('touchend', touchEndHandler, false)
  }

  function removeSwipeListener(el) {
    callback = null
    elem = null

    el.removeEventListener('touchstart', touchStartHandler)
    el.removeEventListener('touchmove', touchMoveHandler)
    el.removeEventListener('touchend', touchEndHandler)
  }

  return {
    on : addSwipeListener
    , swipe : addSwipeListener
    , off : removeSwipeListener
    , noSwiping : removeSwipeListener
    , directions : directions
  }
}())

var animatedScrollTo = (function () {
  var scrollAnim
    , currentScrollTop = -1
    , speed = 1000 / 60 // fps

  function getScrollTop () {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
  }

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

;(function () {
  var testimonialGroups = document.getElementsByClassName('testimonials')
    , totalTestimonialGroups = testimonialGroups.length
    , i = 0
    , controls = document.getElementById('testimonial-controls-template').innerHTML
    , rocket = document.getElementsByClassName('rocketeer')[0]
    , scrollUpTimer
    , navProf = document.getElementsByClassName('nav-prof')[0]
    , navDev = document.getElementsByClassName('nav-dev')[0]
    , navWrite = document.getElementsByClassName('nav-write')[0]

  document.getElementsByClassName('top')[0].addEventListener('click', function (e) {
    var self = this
      , rocketClass = 'rocketeer-go'

    function animEndHandler () {
      clearTimeout(scrollUpTimer)
      removeClass(rocket, rocketClass)
      window.location.hash = self.getAttribute('href')
    }

    e.preventDefault()
    rocket.style.left = getOffset(this).left + 'px'
    addClass(rocket, rocketClass)
    scrollUpTimer = setTimeout(animEndHandler, 500)
    animatedScrollTo(document.getElementById('top'), 500)
  }, false)

  if (document.getElementById(navProf.getAttribute('href').replace(/\/#/, '')))
    navProf.addEventListener('click', navScroller, false)

  if (document.getElementById(navDev.getAttribute('href').replace(/\/#/, '')))
    navDev.addEventListener('click', navScroller, false)

  if (document.getElementById(navWrite.getAttribute('href').replace(/\/#/, '')))
    navWrite.addEventListener('click', navScroller, false)

  for (i = 0; i < totalTestimonialGroups; i++) {
    ;(function () {
      var testimonials = testimonialGroups[i].getElementsByClassName('testimonial')
        , totalTestimonials = testimonials.length
        , tallestClone = {offsetHeight: 0}
        , tempClone
        , j = 0
        , current = 0
        , currentClass = 'testimonial-current'

      if (totalTestimonials <= 1) return

      function nextTestimonial () {
        var next = (current + 1 > totalTestimonials - 1) ? 0 : current + 1

        addClass(testimonials[next], currentClass)
        testimonials[next].setAttribute('aria-hidden', false)
        removeClass(testimonials[current], currentClass)
        testimonials[current].setAttribute('aria-hidden', true)
        current = next
      }

      function prevTestimonial () {
        var prev = (current - 1 < 0) ? totalTestimonials - 1 : current - 1

        addClass(testimonials[prev], currentClass)
        testimonials[prev].setAttribute('aria-hidden', false)
        removeClass(testimonials[current], currentClass)
        testimonials[current].setAttribute('aria-hidden', true)
        current = prev
      }

      for (j = 0; j < totalTestimonials; j++) {
        tempClone = testimonials[j].cloneNode(true)
        tempClone.style.position = 'absolute'
        tempClone.style.display = 'block'
        tempClone.style.width = testimonials[0].offsetWidth + 'px'
        tempClone.style.top = '999em'
        document.body.appendChild(tempClone)

        if (tempClone.offsetHeight > tallestClone.offsetHeight) {
          tallestClone = tempClone
        }

        testimonials[j].style.display = 'block'
        document.body.removeChild(tempClone)

        if (j > 0) {
          testimonials[j].style.opacity = ''
          testimonials[j].setAttribute('aria-hidden', true)
        }
      }

      testimonialGroups[i].getElementsByClassName('testimonials-list')[0].appendChild(tallestClone)
      addClass(testimonialGroups[i], 'testimonials-go')
      tallestClone.style.position = 'relative'
      tallestClone.style.width = 'auto'
      tallestClone.style.top = 'auto'
      tallestClone.setAttribute('aria-hidden', true)
      addClass(tallestClone, 'testimonial-spacer')
      testimonialGroups[i].innerHTML += controls

      testimonialGroups[i].getElementsByClassName('next')[0].addEventListener('click', nextTestimonial, false)
      testimonialGroups[i].getElementsByClassName('prev')[0].addEventListener('click', prevTestimonial, false)

      if (Modernizr.touch) {
        Swiper.swipe(testimonialGroups[i], function (e) {
          if (e.direction == Swiper.directions.left) {
            nextTestimonial()
          } else {
            prevTestimonial()
          }
        })
      }
    }())
  }
}())
