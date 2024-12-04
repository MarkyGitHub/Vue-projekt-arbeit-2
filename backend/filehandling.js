'use strict';

import settings from './settings.js';
import fs from 'fs';

const fileHandling = {
    loadContents() {
        // Dateien Laden als Promise, damit wir beim Aufruf der Folgefunktionen
        // sicher sind, dass der Ladevorgeng abgeschlossen ist
        return new Promise(resolve => {
            fs.readFile(
                settings.pathContents,
                (err, data) => {
                    if (!err) {
                        settings.contents = JSON.parse(data.toString());
                    }
                    resolve();
                }
            )
        })
    },

    saveContents() {
        fs.writeFile(
            settings.pathContents,
            JSON.stringify(settings.contents),
            err => {
                if(err)console.warn(err);                
            }
        )
    }
}

export default fileHandling;