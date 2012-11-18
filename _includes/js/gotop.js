;(function () {
  var rocket = document.getElementById('rocketeer')
    , scrollUpTimer

  bind('click', document.getElementById('gotop'), function (ev) {
    var self = this
      , rocketClass = 'rocketeer-go'

    function animEndHandler () {
      clearTimeout(scrollUpTimer)
      removeClass(rocket, rocketClass)
      window.location.hash = self.getAttribute('href')
    }

    ev.preventDefault && ev.preventDefault()
    rocket.style.left = getOffset(this).left + 'px'
    addClass(rocket, rocketClass)
    scrollUpTimer = setTimeout(animEndHandler, 500)
    animatedScrollTo(document.getElementById('top'), 500)

    return false
  })
}())
