import { Resvg } from '@resvg/resvg-js'
import satori, { type SatoriOptions } from 'satori'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '@/routes/resource.og'

// Load the font from the "public" directory
const fontSans = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/static/fonts/Inter-Bold.otf`)).then((res) =>
    res.arrayBuffer(),
  )

export async function createOGImage(title: string, requestUrl: string) {
  const fontSansData = await fontSans(requestUrl)
  const options: SatoriOptions = {
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
    fonts: [
      {
        name: 'Inter',
        data: fontSansData,
        style: 'normal',
      },
    ],
  }

  // Design the image and generate an SVG with "satori"
  const svg = await satori(
    <div
      style={{
        width: options.width,
        height: options.height,
        background: 'hsl(223.81 0% 9%)',
        color: 'white',
        fontFamily: 'Inter',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Layer */}
      <div
        style={{
          backgroundImage: `url(${requestUrl}/static/images/grid.svg)`,
          backgroundSize: 'cover',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          opacity: 0.05,
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          filter: 'invert(1)',
          zIndex: -1,
        }}
      ></div>

      {/* Foreground Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          fontSize: 88,
        }}
      >
        {title}
      </div>
    </div>,
    options,
  )

  // Convert the SVG to PNG with "resvg"
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}
