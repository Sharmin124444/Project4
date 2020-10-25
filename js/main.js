(function ($) {
        "use strict";
        //Start accordion js//
        $(document).ready(function () {

            $(".toggle-accordion").on("click", function () {
                var accordionId = $(this).attr("accordion-id"),
                    numPanelOpen = $(accordionId + ' .collapse.in').length;

                $(this).toggleClass("active");

                if (numPanelOpen == 0) {
                    openAllPanels(accordionId);
                } else {
                    closeAllPanels(accordionId);
                }
            })

            openAllPanels = function (aId) {
                console.log("setAllPanelOpen");
                $(aId + ' .panel-collapse:not(".in")').collapse('show');
            }
            closeAllPanels = function (aId) {
                console.log("setAllPanelclose");
                $(aId + ' .panel-collapse.in').collapse('hide');
            }

        });

    //End accordion js//

//map js



    // Start isotope//
    $(document).ready( function() {

        var itemSelector = '.grid-item';


        //Ascending order
        var responsiveIsotope = [
            [480, 4],
            [720, 6]
        ];

        var $container = $('#container,#custom-container');

        var itemsPerPageDefault = 10;
        var itemsPerPage = defineItemsPerPage();
        var itemsPerColumn = defineItemsPerColumn();
        var currentNumberPages = 1;
        var currentPage = 1;
        var currentFilter = '*';
        var filterAtribute = 'data-filter';
        var pageAtribute = 'data-page';
        var pagerClass = 'isotope-pager';


        console.log($container.width());
        console.log(itemsPerColumn);

        function isotop_init() {
            $container.isotope({
                itemSelector: itemSelector,
                resizable: false,
                masonry: {
                    // columnWidth: itemSelector,
                    columnWidth: ($container.width()/itemsPerColumn),
                    isFitWidth: true
                }
            });
        }
        isotop_init();

        function changeFilter(selector) {
            $container.isotope({
                filter: selector
            });
        }

        function goToPage(n) {
            currentPage = n;
            var selector = itemSelector;
            selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';
            selector += '['+pageAtribute+'="'+currentPage+'"]';

            changeFilter(selector);
        }

        function defineItemsPerPage() {
            var pages = itemsPerPageDefault;
            for( var i = 0; i < responsiveIsotope.length; i++ ) {
                if( $(window).width() <= responsiveIsotope[i][0] ) {
                    pages = responsiveIsotope[i][1];
                    break;
                }
            }
            return pages;
        }

        function defineItemsPerColumn() {
            var items = 5;

            for( var i = 0; i < responsiveIsotope.length; i++ ) {
                if( $(window).width() <= 480 ) {
                    items = 1;
                    break;
                }
                if( $(window).width() <= 767 ) {
                    items = 2;
                    break;
                }
                if( $(window).width() <= 991 ) {
                    items = 3;
                    break;
                }
                if( $(window).width() <= 1200 ) {
                    items = 4;
                    break;
                }
            }

            console.log($(itemSelector));
            console.log($container);

            $(itemSelector).css('width', $container.width()/items + 'px');

            return items;
        }

        function setPagination() {

            var SettingsPagesOnItems = function(){

                var itemsLength = $container.children(itemSelector).length;

                var pages = Math.ceil(itemsLength / itemsPerPage);
                var item = 1;
                var page = 1;
                var selector = itemSelector;
                selector += ( currentFilter != '*' ) ? '['+filterAtribute+'="'+currentFilter+'"]' : '';

                $container.children(selector).each(function(){
                    if( item > itemsPerPage ) {
                        page++;
                        item = 1;
                    }
                    $(this).attr(pageAtribute, page);
                    item++;
                });

                currentNumberPages = page;

            }();

            var CreatePagers = function() {

                var $isotopePager = ( $('.'+pagerClass).length == 0 ) ? $('<div class="'+pagerClass+'"></div>') : $('.'+pagerClass);

                $isotopePager.html('');

                for( var i = 0; i < currentNumberPages; i++ ) {
                    var $pager = $('<a href="javascript:void(0);" class="pager" '+pageAtribute+'="'+(i+1)+'"></a>');
                    $pager.html(i+1);

                    $pager.click(function(){
                        var page = $(this).eq(0).attr(pageAtribute);
                        goToPage(page);
                    });

                    $pager.appendTo($isotopePager);
                }

                $container.after($isotopePager);

            }();

        }

        setPagination();
        goToPage(1);

        //Adicionando Event de Click para as categorias
        $('.filters a').click(function(){
            var filter = $(this).attr(filterAtribute);
            currentFilter = filter;

            setPagination();
            goToPage(1);


        });

        //Evento Responsivo
        $(window).resize(function(){
            itemsPerPage = defineItemsPerPage();
            itemsPerColumn = defineItemsPerColumn();
            isotop_init();
            setPagination();
            goToPage(1);
        });


    });

    // End isotope//


// music js//





}(jQuery)); 