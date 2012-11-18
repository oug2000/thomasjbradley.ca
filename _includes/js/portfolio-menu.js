;(function () {
  var portMenu = document.getElementById('portfolio-menu')
    , originalTop = 0
    , menuLinks = false
    , totalLinks = 0
    , menuLis = false
    , totalLis = 0
    , i = 0
    , j = 0
    , firstScrollEvent = true

  if (!portMenu)
    return

  originalTop = getOffset(portMenu).top
  menuLis = portMenu.getElementsByTagName('li')
  menuLinks = portMenu.getElementsByTagName('a')
  totalLis = menuLis.length
  totalLinks = menuLinks.length

  for (i = 0; i < totalLinks; i++) {
    ;(function () {
      var theLink = menuLinks[i]

      bind('click', theLink, function (ev) {
        ev.preventDefault && ev.preventDefault()

        for (j = 0; j < totalLis; j++) {
          removeClass(menuLis[j], 'current')
        }

        navScroller(false, theLink)
        addClass(theLink.parentNode, 'current')

        return false
      })
    }())
  }

  // Add underscore to hashes to stop browser from scrolling
  // Also makes animated scrollto smoother
  window.onscroll = function () {
    var theLink = null
      , elem = null
      , hash = ''
      , windowHash = window.location.hash.replace(/[#_]/g, '')
      , scrollTop = getScrollTop()

    if (scrollTop >= originalTop) {
      portMenu.setAttribute('data-state', 'menu-fixed')
    } else {
      portMenu.removeAttribute('data-state')
    }

    if (firstScrollEvent) {
      firstScrollEvent = false

      if (windowHash) {
        window.scrollTo(0, getOffset(document.getElementById(windowHash)).top)
      }
    }

    for (i = totalLinks - 1; i >= 0; i--) {
      theLink = menuLinks[i]
      hash = theLink.getAttribute('href').replace(/[#_]/g, '')
      elem = document.getElementById(hash)

      if (getScrollTop() >= getOffset(elem).top - 100) {
        if (hash != windowHash) {
          for (j = 0; j < totalLis; j++) {
            removeClass(menuLis[j], 'current')
          }

          addClass(theLink.parentNode, 'current')

          if (!firstScrollEvent && windowHash != hash) {
            window.location.hash = '_' + hash.replace(/#/, '')
          }
        }

        return
      }
    }
  }
}())

