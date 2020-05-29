// Creare una index + delete sulla tabella paganti.
// Mostrare tutte le informazioni interessanti dell'entita' e dare la
// possibilita' all'utente di elminare un pagante dalla tabella e quindi
// dal front-end

// funzione che recupera la lista dei paganti dal DB
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

// funzione che stampa i paganti
function printPaganti(paganti) {
  var source = $("#pagante-template").html();
  var template = Handlebars.compile(source);

  for (var pagante of paganti) {
    var html = template(pagante);
    $('#container').append(html);
  }
}

// funzione che cancella un pagante in pagina e dal DB
function deletePagante() {
  var pagante = $(this).parents('.pagante');
  var id = pagante.data('id');
  var conferma = confirm("Sei sicuro di voler cancellare l'elemento?");

  if(conferma) {
    $.ajax({
      url: 'deletePagante.php',
      method: 'POST',
      data: {
        id: id
      },
      success: function() {
        pagante.remove();
      },
      error: function() {
        console.error('errore')
      }
    });
  }
}

function init() {
  // recupero e stampo i paganti in pagina
  getPaganti();

  // al click sul cestino cancello l'elemento
  $('#container').on('click', 'i.fa-trash', deletePagante);
}

$(document).ready(init);
