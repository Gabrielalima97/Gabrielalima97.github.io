// habilitar dados offline
db.enablePersistence()
    .catch(function(err) {
        if (err.code == 'failed-precondition') {
            // provavelmente multiplas abas abertas ao mesmo tempo
            console.log('Persistencia de dados falhou');
        } else if (err.code == 'unimplemented') {
            // browser nao suporta
            console.log('Persistencia nao disponivel');
        }
    });

// real-time listener que verifica as mudanças que ocorrem
db.collection('artistas').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
            desenhaCard(change.doc.data(), change.doc.id);
        }
        if (change.type === 'removed') {
            // remover da pagina tambem
        }
    });
});

// adicionar nova sobremesa
const form = document.querySelector('form');
form.addEventListener('submit', evt => {
    evt.preventDefault();

    const artistas = {
        nome: form.artistasNome.value,
        descricao: form.artistasDescricao.value,
        endereco_imagem: form.artistasArquivo.value
    };

    db.collection('artistas').add(artistas)
        .catch(err => console.log(err));

    //reseta o formulario
    form.artistasNome.value = '';
    form.artistasDescricao.value = '';
    form.artistasArquivo.value = '';

});
