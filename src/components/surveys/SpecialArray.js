export const SpecialArray = function () {
    var keys = Object.create(null),
        objs = [];

    this.push = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                keys[key] = true;
            }
        };

        objs.push(obj);
        return this;
    };

    this.toArray = function () {
        objs.forEach(function (current) {
            for (var key in keys) {
                if (current[key] === undefined) {
                    current[key] = 0;
                }
            }
        });
        return objs;
    };
};