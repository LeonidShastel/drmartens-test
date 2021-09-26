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
    $('#modal_send').submit(function(e) {

        if ($(this).find('input[name=phone]').val() === '') {
            alert('Введите номер телефона.');
            return false;
        }

        e.preventDefault()
        _rc('send', 'order', {
            'phone': $(this).find('input[name=phone]').val(),
            'orderMethod': 'promocode',
            'callback': function(success, response) {
                if (success) {
                    alert('Спасибо, ваша заявка принята! Её номер: ' + response.id);
                } else {
                    alert('К сожалению, не удалось отправить заявку.');
                }
            }
        });

        return false;
    })
    $(function() {
        $('#modal-phone').mask("+7 (999) 99 99 99")
    })
})