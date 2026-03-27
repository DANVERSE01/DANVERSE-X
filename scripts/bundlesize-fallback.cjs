const Module = require("node:module")
const zlib = require("node:zlib")

const originalLoad = Module._load

const iltorbFallback = {
  compress(input, options) {
    const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input)
    return Promise.resolve(zlib.brotliCompressSync(buffer, options))
  },
  compressSync(input, options) {
    const buffer = Buffer.isBuffer(input) ? input : Buffer.from(input)
    return zlib.brotliCompressSync(buffer, options)
  },
  compressStream(options) {
    return zlib.createBrotliCompress(options)
  },
}

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === "iltorb") {
    return iltorbFallback
  }

  return originalLoad.call(this, request, parent, isMain)
}
