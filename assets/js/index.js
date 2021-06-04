


$("#add_user").submit(function (event) {
    alert("New User data was inserted successfullly!")
})

$("#update_user").submit(function (event) {
    event.preventDefault();

    var nonindex_array = $(this).serializeArray();
    // console.log(nonindex_array)
    var data = {}
    $.map(nonindex_array, function(n,i) {
        data[n['name']] = n['value']
    })

    var request = {
        "url" : `https://crudappaldimegantaraarifin.herokuapp.com/api/users/${data.id}`,
        "method" : "PUT",
        "data"  : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Sucessfully!")
    })
})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")
        var request = {
            "url" : `https://crudappaldimegantaraarifin.herokuapp.com/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this data?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Sucessfully!")
            })
        }
    })
}

