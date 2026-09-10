module.exports.savePop = function(request, response) {
 const seats = String(request.body.seat || '');
 if (!/^[A-Z0-9, -]{1,80}$/i.test(seats)) return response.status(400).send('Choose valid demo seats');
 return response.redirect('/select.html/?seats=' + encodeURIComponent(seats));
};
module.exports.nothing = function(_request, response) { response.render('pop'); };
