;(function () {
  var portMenu = document.getElementById('portfolio-menu')
    , originalTop = 0
    , menuLinks = false
    , totalLinks = 0
    , menuLis = false
    , totalLis = 0
    , i = 0
    , j = 0

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

      bind('click', theLink, function (e) {
        if (e && e.preventDefault)
          e.preventDefault()

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
    if (getScrollTop() >= originalTop) {
      portMenu.setAttribute('data-state', 'menu-fixed')
    } else {
      portMenu.removeAttribute('data-state')
    }

    for (i = 0; i < totalLinks; i++) {
      ;(function () {
        var theLink = menuLinks[i]
          , elem = document.getElementById(theLink.getAttribute('href').replace(/#/, ''))

        if (getScrollTop() >= getOffset(elem).top - 100) {
          for (j = 0; j < totalLis; j++) {
            removeClass(menuLis[j], 'current')
          }

          addClass(theLink.parentNode, 'current')
        }
      }())
    }
  }
}())
