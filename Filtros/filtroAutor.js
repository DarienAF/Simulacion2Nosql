function AuthorFilter(){
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    var ul = document.getElementById('autorList');
    var li = ul.getElementsByTagName('li');


    for( var i =0; i< li.length; i++){
        var autorItem = li[i];
        var autorName= autorItem.getAttribute('data-name');

        var matchesName = autorName && autorName.toLowerCase().indexOf(filter) > -1;

        if (matchesName) {
            autorItem.style.display = ""; 
        } else {
            autorItem.style.display = "none"; 
        }
        
    }
}