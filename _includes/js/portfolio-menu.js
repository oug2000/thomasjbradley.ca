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

  window.onscroll = function () {
    var theLink = null
      , elem = null
      , hash = ''
      , scrollTop = getScrollTop()

    if (scrollTop >= originalTop) {
      portMenu.setAttribute('data-state', 'menu-fixed')
    } else {
      portMenu.removeAttribute('data-state')
    }

    if (firstScrollEvent) {
      firstScrollEvent = false
      hash = window.location.hash

      if (hash) {
        window.scrollTo(0, getOffset(document.getElementById(hash.replace(/[#_]/g, ''))).top)
      }
    }

    for (i = totalLinks - 1; i >= 0; i--) {
      theLink = menuLinks[i]
      elem = document.getElementById(theLink.getAttribute('href').replace(/#/, ''))
      hash = theLink.getAttribute('href')

      if (getScrollTop() >= getOffset(elem).top - 100) {
        for (j = 0; j < totalLis; j++) {
          removeClass(menuLis[j], 'current')
        }

        addClass(theLink.parentNode, 'current')

        if (!firstScrollEvent && window.location.hash.replace(/[#_]/g, '') != hash.replace(/[#_]/g, '')) {
          // Add underscore to hashes to stop browser from scrolling
          // Also makes animated scrollto smoother
          window.location.hash = '_' + hash.replace(/#/, '')
        }

        return
      }
    }
  }
}())

