function loanFilter() {
    var loanFilter = document.getElementById('loanFilter').checked;
    var ul = document.getElementById('loanList');
    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var loanItem = li[i];
        var loanStatus = loanItem.getAttribute('data-loan'); 

        
        var matchesLoan = loanFilter ? loanStatus === 'Activo' : true;

        if (matchesLoan) {
            loanItem.style.display = "";
        } else {
            loanItem.style.display = "none";
        }
    }
}
