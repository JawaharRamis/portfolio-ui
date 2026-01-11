import { onMounted, onUnmounted } from 'vue'

export default {
  mounted(el, binding) {
    // Set initial state
    el.classList.add('reveal-hidden')

    // Store the handler reference for cleanup
    el._revealHandler = () => revealElement(el, binding)

    // Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('reveal-visible')
            el.classList.remove('reveal-hidden')

            // Optional: unobserve after reveal if once: true
            if (binding.modifiers.once) {
              observer.unobserve(el)
            }
          } else if (!binding.modifiers.once && binding.value?.reset !== false) {
            // Reset when element scrolls out of view
            el.classList.remove('reveal-visible')
            el.classList.add('reveal-hidden')
          }
        })
      },
      {
        threshold: binding.value?.threshold || 0.1,
        rootMargin: binding.value?.rootMargin || '0px',
        root: binding.value?.root || null
      }
    )

    el._revealObserver = observer
    observer.observe(el)
  },
  unmounted(el) {
    // Clean up observer
    if (el._revealObserver) {
      el._revealObserver.disconnect()
      delete el._revealObserver
    }
    // Clean up handler reference
    delete el._revealHandler
  }
}

function revealElement(el, binding) {
  const rect = el.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // Check if element is in viewport
  const isVisible = rect.top < windowHeight * 0.85 && rect.bottom > 0

  if (isVisible) {
    el.classList.add('reveal-visible')
    el.classList.remove('reveal-hidden')
  }
}

// Re-export as a composable for more flexible usage
export const useScrollReveal = (options = {}) => {
  let observer = null
  const revealed = new Set()

  const initObserver = (elements) => {
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible')
              entry.target.classList.remove('reveal-hidden')
              revealed.add(entry.target)

              if (options.once) {
                observer.unobserve(entry.target)
              }
            } else if (!options.once && options.reset !== false) {
              entry.target.classList.remove('reveal-visible')
              entry.target.classList.add('reveal-hidden')
              revealed.delete(entry.target)
            }
          })
        },
        {
          threshold: options.threshold || 0.1,
          rootMargin: options.rootMargin || '0px'
        }
      )

      elements.forEach((el) => {
        if (el) observer.observe(el)
      })
    }
  }

  const cleanup = () => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    revealed.clear()
  }

  onUnmounted(cleanup)

  return {
    initObserver,
    cleanup,
    revealed
  }
}
