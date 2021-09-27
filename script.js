(function(_, r, e, t, a, i, l) {
    _['retailCRMObject'] = a;
    _[a] = _[a] || function() {
        (_[a].q = _[a].q || []).push(arguments)
    };
    _[a].l = 1 * new Date();
    l = r.getElementsByTagName(e)[0];
    i = r.createElement(e);
    i.async = !0;
    i.src = t;
    l.parentNode.insertBefore(i, l)
})(window, document, 'script', 'https://collector.retailcrm.pro/w.js', '_rc');

_rc('create', 'RC-19355918153-106');
_rc('send', 'pageView');

$(function() {
    let timer = 10000;
    if (getCookie('promocode_modal')) {
        timer = 5000;
    } else {
        setCookie('promocode_modal', 'yes', 30)
    }

    $('#btn-modal-open').on('click', function(e) {
        $('#modal').fadeIn({ duration: 250 }).css('display', 'flex');
        clearInterval(openModal);
    })

    const openModal = setTimeout(() => {
        $('#modal').fadeIn({ duration: 250 }).css('display', 'flex');
    }, timer)

    $('#modal').on('click', function(e) {
        if ($('#modal').has(e.target).length === 0) {
            $('#modal').fadeOut({ duration: 100 });
        }
    })

    $('#modal_send').submit(function(e) {

        if ($(this).find('input[name=phone]').val() === '') {
            alert('Введите номер телефона.');
            return false;
        }

        e.preventDefault()
        _rc('send', 'order', {
            'phone': $(this).find('input[name=phone]').val(),
            'name': 'Неизвестный контакт',
            'orderMethod': 'promocode',
            'callback': function(success, response) {
                if (success) {
                    $('#modal_send').html("<h2 class='modal_title'>Промокод отправлен</h2>").css('height', '120px')
                } else {
                    $('#modal_send').html("<h2 class='modal_title'>Извините, произошла ошибка</h2>").css('height', '120px')
                }
                setTimeout(() => {
                    $('#modal').fadeOut({ duration: 100 })
                }, 2000)
            }
        });

        return false;
    })
    $(function() {
        $('#modal-phone').mask("+7 (999) 999 99 99")
    })
})

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}