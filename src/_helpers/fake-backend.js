import { axios } from 'axios';
    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    if ('admin' === params.username && 'admin123'=== params.password) {
                        // if login details are valid return user details and fake jwt token
                        let responseJson = {
                            id: 1,
                            username: 'admin',
                            firstName: 'Administrador',
                            lastName: 'Supremo',
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, json: () => responseJson });
                    } else {
                        // else return error
                        reject('Usuario o contraseña incorrecta');
                    }

                    return;
                }

                if (url.endsWith('/users/add/service') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    let addressOne = params.addressOne.replace(/ /g,'+');
                    let addressTwo = params.addressTwo.replace(/ /g,'+');

                    let proxyUrl = 'https://cors-anywhere.herokuapp.com/';
                    let url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + addressOne +
                        '&destinations=' + addressTwo + '&mode=car&language=es&key=AIzaSyBaIzYVIXY4sdU0AbVSAYnRX0slnlOnHI4';

                    return fetch(proxyUrl + url)
                        .then(response => {
                            if (!response.ok) {
                                reject(response.statusText);
                            }
                            resolve({ ok: true, json: () => response.json() });
                        });
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}