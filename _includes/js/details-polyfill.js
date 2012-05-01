if (!Modernizr.details && 'querySelector' in document) {
  ;(function () {
    var detailElems = document.getElementsByTagName('details')
      , totalDetails = detailElems.length
      , i = 0
      , tempInsides
      , detailInsides = []
      , totalInsides = 0
      , j = 0
      , summaryElems = document.getElementsByTagName('summary')
      , totalSummary = summaryElems.length
      , k = 0

    function toggleDetails (index) {
      var detailElem = summaryElems[index].parentNode

      if (detailElem.hasAttribute('open')) {
        detailElem.removeAttribute('open')
        detailInsides[index].setAttribute('hidden', true)
      } else {
        detailElem.setAttribute('open', true)
        detailInsides[index].removeAttribute('hidden')
      }
    }

    if (totalDetails > 0) {
      for (i = 0; i < totalDetails; i++) {
        tempInsides = detailElems[i].getElementsByTagName('div')
        totalInsides = tempInsides.length

        for (j = 0; j < totalInsides; j++) {
          if (hasClass(tempInsides[j], 'details-inside')) {
            detailInsides[i] = tempInsides[j]
            detailInsides[i].setAttribute('hidden', true)
          }
        }
      }

      for (k = 0; k < totalSummary; k++) {
        ;(function () {
          var index = k

          bind('click', summaryElems[k], function (ev) {
            toggleDetails(index)
            this.blur()
          })

          bind('keydown', summaryElems[k], function (ev) {
            if (ev.keyCode == 32 || ev.keyCode == 13) {
              if (ev.preventDefault)
                ev.preventDefault()

              toggleDetails(index)

              return false
            }
          })
        }())
      }
    }
  }())
}
