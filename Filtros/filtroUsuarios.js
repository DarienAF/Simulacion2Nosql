function userFilter(){
    var input = document.getElementById('searchInput');
    var filter = input.value.toLowerCase();
    var ul = document.getElementById('userList');
    var li = ul.getElementsByTagName('li');


    for( var i =0; i< li.length; i++){
        var userItem = li[i];
        var userName= userItem.getAttribute('data-name');

        var matchesName = userName && userName.toLowerCase().indexOf(filter) > -1;

        if (matchesName) {
            userItem.style.display = ""; 
        } else {
            userItem.style.display = "none"; 
        }
        
    }
}