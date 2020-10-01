export const assets = {
  NAME_FORM: createAsset("NAME_FORM", "nameform.html"),
} as const

type ASSETS = "NAME_FORM"

type Asset = {
  key: ASSETS
  src: () => string
}

function createAsset(key: ASSETS, filename: string): Asset {
  return {
    key,
    src: () => `${window.location.origin}/assets/${filename}`,
  }
}
