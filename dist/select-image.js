var selectImage = (function () {
'use strict';

var fileOpen = () => new Promise((resolve, reject) => {
    const limit = 200000;
    const accept = 'image/x-png,image/gif,image/jpeg';
    const inputFile = document.createElement('input');
    
    inputFile.type = 'file';
    inputFile.style.position = 'absolute';
    inputFile.style.top = '-100px';
    document.body.appendChild(inputFile);
    inputFile.addEventListener('change', e => {
        const file = e.target.files[0];
        if (file.size > limit) {
            return reject('MAX_FILE_SIZE');
        }
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.readAsDataURL(file);
    });

    inputFile.accept = accept || '';
    inputFile.multiple = false;
    inputFile.click();
});

function getUserMedia() {
    return navigator.getUserMedia;
}

var index = ({btnOkText, btnCancelText, selectDeviceText, width, forceFile=false}) => 
                                                    new Promise((resolve, reject) => {
    let stream = {};
    
    const userMedia = getUserMedia();
    if (forceFile || (! userMedia)) {
        return fileOpen().then(resolve);
    }

    const el = document.createElement('div');
    const video = document.createElement('video');     
    const elBottom = document.createElement('div');
    const snapshotBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const cameraSelect = document.createElement('select');

    cameraSelect.className = 'camera-selection';
    navigator.mediaDevices.enumerateDevices().then(devices => {
        el.appendChild(cameraSelect);
        cameraSelect.innerHTML = `<option value="">${selectDeviceText}</option>`;
        devices.filter(d => d.kind === 'videoinput').map(d => ({
            id: d.deviceId,
            name: d.label || 'Video input'
        })).forEach(d => {
            let opt = document.createElement('option');
            opt.textContent = d.name;
            opt.value = d.id;
            cameraSelect.appendChild(opt);
        });        
    });
    
    snapshotBtn.textContent = btnOkText;
    cancelBtn.textContent = btnCancelText;
    
    cancelBtn.className = 'cancel-btn';
    snapshotBtn.className = 'ok-btn';
    elBottom.className = 'bottom-btns';
    elBottom.appendChild(snapshotBtn);
    elBottom.appendChild(cancelBtn);
    el.appendChild(elBottom);

    const stop = e => {
        stream.getTracks().forEach(t => t.stop());
        el.parentElement.removeChild(el);
    };

    cancelBtn.addEventListener('click', stop);

    snapshotBtn.addEventListener('click', e => {
        let canvas = document.createElement('canvas');
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        let base64 = canvas.toDataURL();                
        stop(e);
        resolve(base64);
    });

    el.classList.add('camera-fullscreen');
    document.body.appendChild(el);

    const startRecording = constraint => {
        constraint = constraint || {};
        constraint.video = constraint.video || true;

        navigator.getUserMedia(constraint, localMediaStream => {     
            stream = localMediaStream;   
            video.autoplay = true;
            el.appendChild(video);
            video.src = window.URL.createObjectURL(localMediaStream);
        }, () => {
            console.log('on fail');
        });
    };

    cameraSelect.addEventListener('change', e => {
        stream.getTracks().forEach(t => t.stop());
        let videoConstraints = {
            deviceId: {exact: cameraSelect.value}
        };
        if (width) {
            videoConstraints.width = width;
        }
        startRecording({video: videoConstraints});
    });

    startRecording();    
});

return index;

}());
