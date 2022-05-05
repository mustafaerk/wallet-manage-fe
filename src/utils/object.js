import _ from "lodash";

export const objectToArray = (list) => {
    let bb = [];
    list.forEach((elem) => bb.push(Object.values(elem)));
    return bb;
}

export const moneyTableCols = [
    { title: "id" },
    { title: "Name" },
    { title: "Category" },
    { title: "Date" },
    { title: "Price" },
    { title: "Place" }];

export const tableColRef = [{
    "targets": [0],
    "visible": false,
    "searchable": false
}]

export const dataCovertToChart = (list) => {
    const groups = _.groupBy(list, "categoryName");
    let values = Object.keys(groups).map((key) => {
        const totalPrice = groups[key].reduce(
            (previousValue, currentValue) =>
                previousValue + parseInt(currentValue.price),
            0
        );
        return [key, totalPrice, false];
    });

    return values;
}

export const dataCovertToBar = (list) => {
    const groups = _.groupBy(list, "date");

    const totalPrice = Object.keys(groups).map((key) => {
        let income = { name: "income", data: [], key };
        let outgoing = { name: "outgoing", data: [], key };
        groups[key].forEach((elem) => {
            if (elem.type == 1) {
                income.data.push(elem.price);
            } else {
                outgoing.data.push(elem.price);
            }
        });
        outgoing.data = outgoing.data.reduce(
            (previousValue, currentValue) => previousValue + parseInt(currentValue),
            0
        );
        income.data = income.data.reduce(
            (previousValue, currentValue) => previousValue + parseInt(currentValue),
            0
        );
        return { income, outgoing };
    });
    const outgoingData = {
        name: "outgoing",
        data: totalPrice
            .map((price) => price.outgoing)
            .flatMap((outgoing) => {
                return outgoing.data;
            })
    };
    const incomeData = {
        name: "income",
        data: totalPrice
            .map((price) => price.income)
            .flatMap((outgoing) => {
                return outgoing.data;
            })
    };
    const dates = Object.keys(groups).map((key) => key);

    return { outgoingData, incomeData, dates };
}