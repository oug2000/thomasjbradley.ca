if (document.getElementsByClassName) {
  ;(function (w, d) {
    var workGroups = d.getElementsByClassName('work-samples')
      , workGroupsTotal = workGroups.length
      , i = 0
      , controlsElem = d.getElementById('work-controls-template')
      , controls = controlsElem.innerHTML
      , btnTitle = controlsElem.getAttribute('data-title')

    for (i = 0; i < workGroupsTotal; i++) {
      ;(function () {
        var imgs = workGroups[i].getElementsByTagName('img')
          , imgsTotal = imgs.length
          , btn = null
          , clonedControls = null
          , j = 0
          , tmpCloneBtn = null

        workGroups[i].innerHTML += controls
        workGroups[i].setAttribute('data-visible-id', 0)
        btn = workGroups[i].getElementsByTagName('button')[0]
        btn.innerHTML = btnTitle + 1
        btn.setAttribute('title', btnTitle + 1)
        btn.setAttribute('data-id', 0)
        clonedControls = workGroups[i].getElementsByClassName('work-controls')[0]

        for (j = 1; j < imgsTotal; j++) {
          tmpCloneBtn = btn.cloneNode(false)
          tmpCloneBtn.innerHTML = btnTitle + (j + 1)
          tmpCloneBtn.setAttribute('title', btnTitle + (j + 1))
          tmpCloneBtn.setAttribute('data-id', j)
          clonedControls.appendChild(tmpCloneBtn)
        }

        btn.setAttribute('data-state', 'selected')

        workGroups[i].addEventListener('click', function (ev) {
          var id = 0
            , btns = ev.target.parentNode.getElementsByTagName('button')
            , btnsTotal = btns.length
            , k = 0
            , transitionTimeout = null

          function switchImage (id, btnCurrent) {
            imgs[id].setAttribute('data-state', 'incoming')

            for (k = 0; k < btnsTotal; k++) {
              btns[k].removeAttribute('data-state')
            }

            btnCurrent.setAttribute('data-state', 'selected')

            transitionTimeout = setTimeout(function () {
              clearTimeout(transitionTimeout)

              for (k = 0; k < imgsTotal; k++) {
                imgs[k].removeAttribute('data-state')
              }

              imgs[id].setAttribute('data-state', 'active')
              btnCurrent.parentNode.parentNode.setAttribute('data-visible-id', id)
            }, 100)
          }

          if (ev.target.tagName.toLowerCase() == 'button') {
            id = parseInt(ev.target.getAttribute('data-id'), 10)
            switchImage(id, ev.target)
          }

          if (ev.target.tagName.toLowerCase() == 'img') {
            id = parseInt(ev.target.parentNode.getAttribute('data-visible-id'), 10) + 1

            if (id > imgsTotal - 1)
              id = 0

            switchImage(id, btns[id])
          }
        }, false)
      }())
    }
  }(window, document))
}
