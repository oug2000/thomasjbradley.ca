;(function () {
  var navProf = document.getElementById('nav-prof')
    , navDev = document.getElementById('nav-dev')
    , navWrite = document.getElementById('nav-write')

  function navScroller (e, elem) {
    var hash = (elem ? elem : this).getAttribute('href').replace(/\/?#/, '')
      , speed = (elem ? elem : this).getAttribute('data-scrollspeed') || 200

    if (e && e.preventDefault)
      e.preventDefault()

    animatedScrollTo(document.getElementById(hash), speed, function () {
      window.location.hash = '#' + hash
    })

    return false
  }

  if (document.getElementById(navProf.getAttribute('href').replace(/\/#/, '')))
    bind('click', navProf, navScroller)

  if (document.getElementById(navDev.getAttribute('href').replace(/\/#/, '')))
    bind('click', navDev, navScroller)

  if (document.getElementById(navWrite.getAttribute('href').replace(/\/#/, '')))
    bind('click', navWrite, navScroller)
}())
