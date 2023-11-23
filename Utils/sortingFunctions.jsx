import React from 'react';

export function SortingByNameFunction(arr) {

    return arr?.sort(function (a, b) {
        if (a?.name < b?.name) {
            return -1;
        }
        if (a?.name > b?.name) {
            return 1;
        }
        return 0;
    })
}

export function SortingByOrderFunction(arr) {
    return arr?.sort(function (a, b) {
        return a?.order - b?.order
    })
}
