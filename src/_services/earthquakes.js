export function searchQuakes(event) {
    const { name, value } = event.target;
    let address = value.replace(/ /g,'+');
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyBaIzYVIXY4sdU0AbVSAYnRX0slnlOnHI4';
    return new Promise((resolve, reject) => {
        return fetch(url)
            .then(response => {
                resolve({type: name, json: () => response.json()})
            })
    })

}