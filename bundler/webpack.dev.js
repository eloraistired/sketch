const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const portFinderSync = require('portfinder-sync')
const { networkInterfaces } = require('os')
const path = require('path')
const chokidar = require('chokidar')

const infoColor = (_message) => {
    return `\u001b[1m\u001b[34m${_message}\u001b[39m\u001b[22m`
}

const interfaces = networkInterfaces()
const addresses = []
for (const k in interfaces) {
    for (const k2 in interfaces[k]) {
        const address = interfaces[k][k2]
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address)
        }
    }
}

module.exports = merge(
    commonConfiguration, {
        mode: 'development',
        devServer: {
            host: addresses[0],
            port: portFinderSync.getPort(8080),
            static: {
                directory: './dist',
                watch: true
            },
            onBeforeSetupMiddleware: (server) => {
                chokidar.watch([path.resolve(__dirname, '.././app'), path.resolve(__dirname, '.././express/app')]).on('all', function () {
                    for (const ws of server.webSocketServer.clients) {
                        ws.send('{"type": "static-changed"}')
                    }
                })
            },
            devMiddleware: {
                writeToDisk: true
            },
            open: false,
            https: false,
            client: {
                overlay: true,
                logging: 'log'
            },
            onListening: function (servers) {
                const port = servers.server.address().port
                const https = servers.server.address().https ? 's' : ''

                const domain1 = `http${https}://${addresses[0]}:${port}`
                const domain2 = `http${https}://${addresses[1]}:${port}`
                const domain3 = `http${https}://localhost:${port}`

                console.log(`Project running at:\n  - ${infoColor(domain1)}\n  - ${infoColor(domain2)}\n - ${infoColor(domain3)}`)
            }
        }
    }
)
