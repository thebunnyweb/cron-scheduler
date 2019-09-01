(function(){
    var genericFucntions = {}

    var UIModule = function(){
        var el = document.querySelector('.links button');
        var changeViewRender = function(){
            document.body.className = document.body.className === 'light' ? 'dark' : 'light';     
        }
        el.addEventListener('click', changeViewRender)
    }

    UIModule.apply(genericFucntions, [])
    
})();