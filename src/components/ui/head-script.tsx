'use client'

import Script from 'next/script'

export default function HeadScript() {
  return (
    <>
      <Script 
        src="/scripts/vanilla-tilt.js" 
        strategy="lazyOnload"
        onLoad={() => {
          // @ts-ignore
          if (typeof window.VanillaTilt !== 'undefined') {
            // @ts-ignore
            window.VanillaTilt.init(document.querySelectorAll('.tilt-card'), {
              max: 25,
              speed: 400,
              glare: true,
              'max-glare': 1,
            });
          }
        }}
      />
    </>
  )
}
