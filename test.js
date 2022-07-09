function hasOwn(target, property) {
    return Object.prototype.hasOwnProperty.call(target, property);
}
function flattenData(value) {
    if (Array.isArray(value)) {
        return value.map(function (item) { return flattenData(item); });
    }
    if (typeof value === "object" && value !== null) {
        if (hasOwn(value, "data")) {
            return flattenData(value.data);
        }
        return Object.fromEntries(Object.entries(value).map(function (_a) {
            var key = _a[0], value = _a[1];
            return [key, flattenData(value)];
        }));
    }
    return value;
}
var foosResponse = {
    data: [
        {
            data: {
                foo: {
                    data: {
                        bar: true
                    }
                }
            }
        },
    ]
};
var flattened = flattenData(foosResponse);
console.log(flattened);
