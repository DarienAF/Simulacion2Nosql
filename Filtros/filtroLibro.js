function bookFilter() {
    var bookFilter = document.getElementById('bookFilter').checked;
    var ul = document.getElementById('bookList');
    var li = ul.getElementsByTagName('li');

    for (var i = 0; i < li.length; i++) {
        var bookItem = li[i];
        var bookStatus = bookItem.getAttribute('data-available') === 'true'; 

        
        var matchesBook = bookFilter ? bookStatus === true : true;

        if (matchesBook) {
            bookItem.style.display = "";
        } else {
            bookItem.style.display = "none";
        }
    }
}