$('document').ready(function () {
    console.info('succes');
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating = false; //flag to prevent quick multi-click glitches

    $('#progressbar li').click(function () {
        var active_index = $('li.active').index(); // getting the active li
        var goto_index = $(this).index(); // getting the li on which user clicked

        var active_form = $('fieldset').eq(active_index);
        var goto_form = $('fieldset').eq(goto_index);
        var i = 1; // factor of time interval
        var cpy_index = active_index;

        if (goto_index > active_index) {
            while (goto_index > active_index) {
                active_index++;

                setTimeout(() => {
                    nextElem(active_form.find('.action-button')); // animate to next form
                    cpy_index++;
                    active_form = $('fieldset').eq(cpy_index); // getting next form (if required)
                }, i * 500);

                i++;
            }
        } else if (goto_index < active_index) {
            while (goto_index < active_index) {
                active_index--;

                setTimeout(() => {
                    previous(active_form.find('.action-button')); // animate to previous form
                    cpy_index--;
                    active_form = $('fieldset').eq(cpy_index); // getting previous form
                }, i * 500);

                i++;
            }
        }
    });

    $(".next").click(function () {
        nextElem(this);
    });

    // Made a separate function for multiple use
    function nextElem(elem) {
        if (animating) return false;
        animating = true;

        current_fs = $(elem).parent();
        next_fs = $(elem).parent().next();

        //activate next step on progressbar using the index of next_fs
        $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the next fieldset
        next_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale current_fs down to 80%
                scale = 1 - (1 - now) * 0.2;
                //2. bring next_fs from the right(50%)
                left = (now * 50) + "%";
                //3. increase opacity of next_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'transform': 'scale(' + scale + ')'
                });
                next_fs.css({
                    'left': left,
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }

    $(".previous").click(function () {
        previous(this);
    });

    // Made a separate function for multiple use
    function previous(elem) {
        if (animating) return false;
        animating = true;

        current_fs = $(elem).parent();
        previous_fs = $(elem).parent().prev();

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(previous_fs)).addClass("active");
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({
            opacity: 0
        }, {
            step: function (now, mx) {
                //as the opacity of current_fs reduces to 0 - stored in "now"
                //1. scale previous_fs from 80% to 100%
                scale = 0.8 + (1 - now) * 0.2;
                //2. take current_fs to the right(50%) - from 0%
                left = ((1 - now) * 50) + "%";
                //3. increase opacity of previous_fs to 1 as it moves in
                opacity = 1 - now;
                current_fs.css({
                    'left': left
                });
                previous_fs.css({
                    'transform': 'scale(' + scale + ')',
                    'opacity': opacity
                });
            },
            duration: 800,
            complete: function () {
                current_fs.hide();
                animating = false;
            },
            //this comes from the custom easing plugin
            easing: 'easeInOutBack'
        });
    }
});