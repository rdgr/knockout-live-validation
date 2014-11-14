
$(document).ready(function() {

    var pwIndicatorClasses = ["GREY","GREEN"];

    $('.PanelSecurity div.InputPassword:eq(0) input').live("focus", function() {
        pwTest($(this).val());
        $('.PasswordSecurityAdvice').slideUp(200);
        $('.securityTips').slideDown(400);
    })
    .live("blur", function() {
        $('.securityTips').slideUp(400);
        var pwlength = $(this).val().length;
        $('.PasswordSecurityAdvice .number').text(Math.max(8 - pwlength, 0));
        if(pwlength < 8 && pwlength > 0) {
            $('.PasswordSecurityAdvice').slideDown(200);
            if($(window).scrollTop() > $('.PasswordSecurityAdvice').offset().top) {
                $('html,body').animate({ scrollTop: $('.PasswordSecurityAdvice').offset().top - 5 },500);
            }
        }
    })
    .live("keyup", function(k) {
        if(k.keyCode < 13 || k.keyCode > 45) {
            pwTest($(this).val());
        }
    });

    function pwTest(pwtext) {
        var pwlength = pwtext.length;
        $('.PasswordSecurityAdvice .number').text(Math.max(8 - pwlength, 0));
        // The + character converts a boolean value to an integer value. +true = 1, +false = 0.
        $('.pwLength div').attr("class", pwIndicatorClasses[+(pwlength > 7)]);
        $('.pwCaseMix div').attr("class", pwIndicatorClasses[+(pwtext.match(/[a-z]/) != null && pwtext.match(/[A-Z]/) != null)]);
        $('.pwCharMix div').attr("class", pwIndicatorClasses[+(pwtext.match(/[a-zA-Z]/) != null && pwtext.match(/\d/) != null)]);
        $('.pwSpecialChars div').attr("class", pwIndicatorClasses[+(pwtext.match(/[@!§$%&\/\(\)=\*\+#\-_.:,;]/) != null)]);
    }


});
