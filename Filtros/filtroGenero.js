function genderFilter() {
    var genderFilter = document.getElementById('genderFilter').value;
    var ul = document.getElementById('genderList');
    var li = ul.getElementsByTagName('li');

    
    var isValidGenderFilter = !isNaN(parseInt(genderFilter, 10));

    for (var i = 0; i < li.length; i++) {
        var genderItem = li[i];
        var gender = parseInt(genderItem.getAttribute('data-gender'), 10);

        
        var matchesGender = isValidGenderFilter ? gender === parseInt(genderFilter, 10) : true;

        if (matchesGender) {
            genderItem.style.display = "";
        } else {
            genderItem.style.display = "none";
        }
    }
}
