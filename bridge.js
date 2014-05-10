window.addEventListener('message', function (e) {
    if (e.origin != window.location.origin)
        return;
    if (e.data) {
        eval('(' + e.data +')()');
    }
}, false);
console.log('Bridged.');