let _canvas = null

export function registerBackgroundCanvas(canvas) {
  _canvas = canvas
}

export function getBackgroundCanvas() {
  return _canvas
}
