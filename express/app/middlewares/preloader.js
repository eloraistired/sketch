const handler = (req, res, next) => {
    console.log(req.xhr)
    switch(req.url) {

        case '/uwu':
            res.render('base', { title: 'butterscotch'})
            break
        default:
            next()
            break

    }
}
exports.handler = handler