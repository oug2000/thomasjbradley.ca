function navScroller (e) {
  var hash = this.getAttribute('href').replace(/\/#/, '')

  e.preventDefault()

  animatedScrollTo(document.getElementById(hash), this.getAttribute('data-scrollspeed'), function () {
    window.location.hash = '#' + hash
  })
}

function getOffsetLeft (elem) {
  var offset = elem.offsetLeft
    , parent = elem.offsetParent

  while (parent.tagName != 'BODY') {
    offset += parent.offsetLeft
    parent = parent.offsetParent
  }

  return offset
}

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

;(function () {
  var testimonialGroups = document.getElementsByClassName('testimonials')
    , totalTestimonialGroups = testimonialGroups.length
    , i = 0
    , controls = document.getElementById('testimonial-controls-template').innerHTML

  document.getElementsByClassName('top')[0].addEventListener('click', function (e) {
    var self = this
      , rocket = document.getElementsByClassName('rocketeer')[0]
      , rocketClass = ' rocketeer-go'

    e.preventDefault()

    rocket.style.left = getOffsetLeft(this) + 'px'
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

  for (i = 0; i < totalTestimonialGroups; i++) {
    ;(function () {
      var testimonials = testimonialGroups[i].getElementsByClassName('testimonial')
      , totalTestimonials = testimonials.length
      , tallestClone = {offsetHeight: 0}
      , tempClone = null
      , j = 0
      , current = 0

      if (totalTestimonials <= 1) return

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
          testimonials[j].style.opacity = 0
          testimonials[j].setAttribute('aria-hidden', true)
        }
      }

      testimonialGroups[i].appendChild(tallestClone)
      testimonialGroups[i].className += ' testimonials-go'
      tallestClone.style.position = 'relative'
      tallestClone.style.width = 'auto'
      tallestClone.style.top = 'auto'
      tallestClone.setAttribute('aria-hidden', true)
      tallestClone.className += ' testimonial-spacer'
      testimonialGroups[i].innerHTML += controls

      testimonialGroups[i].getElementsByClassName('next')[0].addEventListener('click', function () {
        var next = (current + 1 > totalTestimonials - 1) ? 0 : current + 1

        testimonials[next].style.opacity = 1
        testimonials[next].setAttribute('aria-hidden', false)
        testimonials[current].style.opacity = 0
        testimonials[current].setAttribute('aria-hidden', true)
        current = next
      })

      testimonialGroups[i].getElementsByClassName('prev')[0].addEventListener('click', function () {
        var prev = (current - 1 < 0) ? totalTestimonials - 1 : current - 1

        testimonials[prev].style.opacity = 1
        testimonials[next].setAttribute('aria-hidden', false)
        testimonials[current].style.opacity = 0
        testimonials[current].setAttribute('aria-hidden', true)
        current = prev
      })
    }())
  }
}())
