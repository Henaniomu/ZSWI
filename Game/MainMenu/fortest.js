document.addEventListener('DOMContentLoaded', function() {
    const warnIcon = document.querySelector('img[name="warn"]');
    const tooltip = document.getElementById('tooltip');
    const closeButton = document.getElementById('close');

    warnIcon.addEventListener('click', function() {
        tooltip.style.display = 'block'; // Показываем подсказку
    });

    closeButton.addEventListener('click', function() {
        tooltip.style.display = 'none'; // Скрываем подсказку при клике на кнопку закрытия
    });
});
