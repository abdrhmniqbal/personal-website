import { Resvg, initWasm } from '@resvg/resvg-wasm'
import RESVG_WASM from '@resvg/resvg-wasm/index_bg.wasm?url'
import satori, { init as initSatori, type SatoriOptions } from 'satori/wasm'
import initYoga from 'yoga-wasm-web'
import YOGA_WASM from 'yoga-wasm-web/dist/yoga.wasm?url'
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH } from '@/routes/resource.og'

const fontSans = (baseUrl: string) =>
  fetch(new URL(`${baseUrl}/static/fonts/Inter-Bold.otf`)).then((res) =>
    res.arrayBuffer(),
  )

const initialize = async () => {
  const { default: resvgwasm } = await import(
    /* @vite-ignore */ `${RESVG_WASM}?module`
  )
  const { default: yogawasm } = await import(
    /* @vite-ignore */ `${YOGA_WASM}?module`
  )
  try {
    const yoga = await initYoga(yogawasm)
    await initSatori(yoga)
    console.log('initialized yoga')
  } catch (err) {
    console.error(err)
  }

  // Init resvg wasm
  try {
    await initWasm(resvgwasm)
    console.log('initialized resvg')
  } catch (err) {
    console.error(err)
  }
}
export async function createOGImage(title: string, requestUrl: string) {
  await initialize()
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

  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  return pngData.asPng()
}
