function onStart(server, options) {
    // Do nothing
}

function onRequest(req, res, options, preventDefault) {
    var path = req.url;

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Set content encoding depending on compression
    if (path.endsWith('.br')) {
        res.setHeader('Content-Encoding', 'br');
    } else if (path.endsWith('.gz')) {
        res.setHeader('Content-Encoding', 'gzip');
    }

    // Explicitly set content type. Files can have wrong content type if build uses compression.
    if (path.includes('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
    } else if (path.includes('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
    } else if (path.includes('.json')) {
        res.setHeader('Content-Type', 'application/json');
    } else if (
      path.includes('.data') ||
      path.includes('.bundle') ||
      path.endsWith('.unityweb')
    ) {
        res.setHeader('Content-Type', 'application/octet-stream');
    }
}

module.exports = { onStart, onRequest };
