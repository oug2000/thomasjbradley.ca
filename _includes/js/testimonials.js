if (document.getElementsByClassName) {
  ;(function () {
    var testimonialGroups = document.getElementsByClassName('testimonials')
      , totalTestimonialGroups = testimonialGroups.length
      , i = 0
      , controls = document.getElementById('testimonial-controls-template').innerHTML

    for (i = 0; i < totalTestimonialGroups; i++) {
      ;(function () {
        var testimonials = testimonialGroups[i].getElementsByClassName('testimonial')
          , totalTestimonials = testimonials.length
          , tallestHeight = 0
          , tallestClone
          , tempClone
          , j = 0
          , current = 0
          , currentClass = 'testimonial-current'
          , swiper

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

        removeClass(testimonials[0], currentClass)
        shuffle(testimonials)
        addClass(testimonials[0], currentClass)

        for (j = 0; j < totalTestimonials; j++) {
          tempClone = testimonials[j].cloneNode(true)
          tempClone.style.position = 'absolute'
          tempClone.style.display = 'block'
          tempClone.style.width = testimonials[0].offsetWidth + 'px'
          tempClone.style.top = '999em'
          document.body.appendChild(tempClone)

          if (tempClone.offsetHeight > tallestHeight) {
            tallestHeight = tempClone.offsetHeight
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
          swiper = new Swiper(testimonialGroups[i], function (e) {
            if (e.direction == swiper.directions.left) {
              nextTestimonial()
            } else {
              prevTestimonial()
            }
          })
        }
      }())
    }
  }())
}
