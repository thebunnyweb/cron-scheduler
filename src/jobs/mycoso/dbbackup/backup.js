(function () {

    var main = function (data) {
        console.log('I m the main', data)
    }

    if (process.argv.length > 2) {
        let parameters = process.argv.slice(2);
        let data = {}
        parameters.forEach(function (item) {
            if (item.split("=").length > 1) {
                let pars = item.split("=")
                data = { ...data, [pars[0]]: pars[1] }
            }
        });
        main(data);
    }



})()