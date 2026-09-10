module.exports.createHistory = function(request, response) {
 const quantity = request.query.data === undefined ? 1 : Number(request.query.data);
 if (!Number.isInteger(quantity) || quantity < 1 || quantity > 12) return response.status(400).send('Choose between 1 and 12 demo tickets');
 response.render('paymentsummary.html', { paymentData: {
  price1: 90, seatNo: quantity, name: 'Demo cinema', Date1: new Date(), movie: 'Demo screening', tax1: 2
 }});
};
