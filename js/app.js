/**
 * Created by Deisi on 08/09/16.
 */
var url = "http://vps101.tjuna.com:1982/api/products",
    products = [];

ajax(url, 'GET', null, function (feedback) {
    $.each(feedback.length ? feedback : [], function (i, obj) {
        var product = new Product(i, obj);
        products.push(product);
        product.render('.products');
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('#search').on('input', function(e) {
        var input = $(this).val().toLowerCase(),
            body = $('body');

        body.addClass("loading");
        $('product').show();

        $.each(products, function (i, product) {
            if (product.data.name.toLowerCase().indexOf(input) == -1) $('#product' + product.id).hide();
        });

        setTimeout(function() {
            body.removeClass("loading");
        }, 500);
    });

    hamburger();
});

$(".menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    hamburger();
});

function hamburger() {
    if ($("#wrapper").hasClass('toggled')) $('.hamburger-menu').hide();
    else $('.hamburger-menu').show();
}