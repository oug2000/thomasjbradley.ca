/**
 * Shuffles the order of elements on the page
 * http://james.padolsey.com/javascript/shuffling-the-dom/
 */
function shuffle (elems) {
  allElems = (function () {
    var ret = [], l = elems.length
    while (l--) { ret[ret.length] = elems[l] }
    return ret
  })()

  var shuffled = (function () {
      var l = allElems.length, ret = []

      while (l--) {
        var random = Math.floor(Math.random() * allElems.length)
          , randEl = allElems[random].cloneNode(true)

        allElems.splice(random, 1)
        ret[ret.length] = randEl
      }

      return ret
    })()
    , l = elems.length

  while (l--) {
    elems[l].parentNode.insertBefore(shuffled[l], elems[l].nextSibling)
    elems[l].parentNode.removeChild(elems[l])
  }
}

function getOffset (elem) {
  var offset = {left : 0, top : 0}

  if (!elem)
    return offset

  do {
    offset.left += elem.offsetLeft
    offset.top += elem.offsetTop
  } while (elem = elem.offsetParent)

  return offset
}

function getScrollTop () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
}

function addClass (elem, newClass) {
  elem.className += ' ' + newClass
}

function removeClass (elem, newClass) {
  elem.className = elem.className.replace(newClass, '').replace(/\s+/, ' ').replace(/\s+$/, '').replace(/^\s+/, '')
}

function hasClass (elem, compareClass) {
  return elem.className.indexOf(compareClass) > -1
}

function bind (ev, elem, func) {
  if (elem.addEventListener) {
    elem.addEventListener(ev, func, false)
  } else {
    elem.attachEvent('on' + ev, func)
  }
}

function unbind (ev, elem, func) {
  if (elem.addEventListener) {
    elem.removeEventListener(ev, func)
  } else {
    elem.detachEvent('on' + ev, func)
  }
}
