// Creare una index + delete sulla tabella paganti.
// Mostrare tutte le informazioni interessanti dell'entita' e dare la
// possibilita' all'utente di elminare un pagante dalla tabella e quindi
// dal front-end
function printPaganti(paganti) {
  var source = $("#pagante-template").html();
  var template = Handlebars.compile(source);

  for (var pagante of paganti) {
    var html = template(pagante);
    $('#container').append(html);
  }
}

function getPaganti() {
  $.ajax({
    url: 'getPaganti.php',
    method: 'GET',
    success: function(data) {
      printPaganti(data);
    },
    error: function(err) {
      console.error(err);
    }
  });
}

function init() {
  getPaganti();
}

$(document).ready(init);
