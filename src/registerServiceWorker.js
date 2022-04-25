// Esto permite que la aplicación se cargue más rápido en las visitas posteriores a la producción y brinda capacidades fuera de línea.
// Sin embargo, también significa que los desarrolladores (y el usuario) solo verán las actualizaciones implementadas en la visita "N+1" a una página, ya que los recursos previamente almacenados en caché se actualizan en segundo plano.
// Para obtener más información sobre los beneficios de este modelo, lea https://goo.gl/KwvDNy.
// Este enlace también incluye instrucciones sobre cómo optar por no participar en este comportamiento.

import React from 'react';

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
        window.location.hostname === '[::1]' ||
        // 12.0..1/8 is considered localhost for IPv4.
        window.location.hostname.match(
            /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
        )
);

export default function register() {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
        //El constructor de URL está disponible en todos los navegadores que admiten SW
        const piblicUrl = new URL(process.env.PUBLIC_URL, window.location);
        if (piblicUrl.origin !== window.location.origin){
            //Nuestro trabajador de servicio no funcionará si PUBLIC_URL está en un origen diferente de donde se sirve nuestra página.
            //Esto podría suceder si se utiliza un CN para servir activos; ver https://github.com/facebookincubator/create-react-app/issues/2374
            return;
        }

        window.addEventListener('load', () => {
            const swUrl= `${process.env.PUBLIC_URL}/service_worker.js`;

            if (isLocalhost ) {
                
                navigator.serviceWorker.ready.then(() => {
                    console.log(
                        'This web app is being served cache-firts by a service ' + 'worker. To learn more, visit https://goo.gl/SC7cgQ'
                    );
                });
            } else {
                registerValidSW(swUrl);
            }
        });
    }
}

function registerValidSW(swUrl) {
    navigator.serviceWorker
        .register(swUrl)
        .then(registration => {
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller){
                            // En este punto, el contenido antiguo se habrá purgado y el contenido nuevo se habrá agregado a la memoria caché.
                            // Es el momento perfecto para mostrar "Nuevo contenido disponible; actualice". mensaje en su aplicación web.
                            console.log('New conten is available; please refresh.');
                        } else {
                            //En este punto, todo se ha almacenado previamente en caché, este es el momento perfecto para mostrar un "El contenido se almacena en caché para uso sin conexión." como mensaje.
                            console.log('Content is cached for offline use.');
                        }
                    }

                };
            };
        })
}