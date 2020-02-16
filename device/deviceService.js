const log = require('../common/log');

const deviceRepository = require('./deviceRepository');

function save(device) {

    log.info('save device: ', device);

    if (!device.isValid()) {
        return;
    }

    deviceRepository.isExist([device.make, device.model], isExist => {
        log.info('isExist: ' + isExist);
        if (!isExist) {
            deviceRepository.save(device);
        }
    })
}

module.exports = {
    save
}