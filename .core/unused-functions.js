/**
 * Кидает 1dN
 * @param N
 * @returns {number}
 */
function diceroll(N) {
    return Math.floor( Math.random() * N + 1);
}

/**
 * Отладочная функция: выводит в консоль информацию о среде запуска скрипта
 */
function where() {
    if (typeof(process) != 'undefined') {
        console.log(process.release.name + ' ' + process.versions.node);
    };
    if (typeof(navigator) != 'undefined') {
        console.log(navigator.userAgent);
    }
}

/**
 * Получить N-ый элемент хэша.
 * @param arr
 * @param n
 * @returns {*}
 * НЕ ИСПОЛЬЗУЕТСЯ
 */
function getNthArrayElement(arr, n)
{
    for (var i in arr) {
        if (!arr.hasOwnProperty(i)) continue
        else return arr[i];
    }
}
