import fileOpen from './file-open';

function getUserMedia() {
    return navigator.getUserMedia;
}

export default ({
    btnOkText, 
    btnCancelText, 
    selectDeviceText, 
    videoWidth, 
    videoHeight,
    forceFile=false,
    preferedDevice,
    deviceConstraints,
    facingMode,
    cameraNameFormatter,
    cameraSwitchIcon='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDQ4MCA0ODAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDQ4MCA0ODA7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiPgo8Zz4KCTxnPgoJCTxnPgoJCQk8cGF0aCBkPSJNNDQwLDExNnYtMTZjMC00LjQxOC0zLjU4Mi04LTgtOGgtNDhjLTQuNDE4LDAtOCwzLjU4Mi04LDh2MTZoLTE5LjM1MkwzMzYuMTYsODAuMTYgICAgIGMtNy4xMzItMTIuNDUyLTIwLjM3OC0yMC4xNDItMzQuNzI4LTIwLjE2SDE3OC41NjhjLTE0LjM1LDAuMDE4LTI3LjU5Niw3LjcwOC0zNC43MjgsMjAuMTZMMTIzLjM1MiwxMTZIMTIwVjkyICAgICBjMC00LjQxOC0zLjU4Mi04LTgtOEg0OGMtNC40MTgsMC04LDMuNTgyLTgsOHYyNGMtMjIuMDgsMC4wMjYtMzkuOTc0LDE3LjkyLTQwLDQwdjIyNGMwLjAyNiwyMi4wOCwxNy45MiwzOS45NzQsNDAsNDBoNDAwICAgICBjMjIuMDgtMC4wMjYsMzkuOTc0LTE3LjkyLDQwLTQwVjE1NkM0NzkuOTc0LDEzMy45Miw0NjIuMDgsMTE2LjAyNiw0NDAsMTE2eiBNMzkyLDEwOGgzMnY4aC0zMlYxMDh6IE01NiwxMDBoNDh2MTZINTZWMTAweiAgICAgIE00NjQsMzgwYzAsMTMuMjU1LTEwLjc0NSwyNC0yNCwyNEg0MGMtMTMuMjU1LDAtMjQtMTAuNzQ1LTI0LTI0VjE1NmMwLTEzLjI1NSwxMC43NDUtMjQsMjQtMjRoODggICAgIGMyLjg2NCwwLjAwNiw1LjUxMi0xLjUyLDYuOTQ0LTRsMjIuNzg0LTM5Ljg3MmM0LjI3NS03LjQ4MSwxMi4yMjMtMTIuMTA3LDIwLjg0LTEyLjEyOGgxMjIuODY0ICAgICBjOC41OTYsMC4wMjksMTYuNTI0LDQuNjQsMjAuOCwxMi4wOTZMMzQ1LjA1NiwxMjhjMS40MzIsMi40OCw0LjA4LDQuMDA2LDYuOTQ0LDRoODhjMTMuMjU1LDAsMjQsMTAuNzQ1LDI0LDI0VjM4MHoiIGZpbGw9IiMwMDAwMDAiLz4KCQkJPHBhdGggZD0iTTM0Ny41MzIsMjg0LjUwNGMtMC4wMDctMC4wMDMtMC4wMTMtMC4wMDUtMC4wMi0wLjAwOGMtNC4xMjctMS41NzctOC43NSwwLjQ5LTEwLjMyOCw0LjYxNiAgICAgYy0yMC41NjksNTMuNjI4LTgwLjcxOCw4MC40MjgtMTM0LjM0Niw1OS44NTljLTM2LjA3NC0xMy44MzYtNjEuNTA0LTQ2LjUzLTY2LjAzOC04NC44OTlsMTkuNTI4LDE5LjUyOCAgICAgYzMuMDcsMy4xNzgsOC4xMzQsMy4yNjYsMTEuMzEyLDAuMTk2YzMuMTc4LTMuMDcsMy4yNjYtOC4xMzQsMC4xOTYtMTEuMzEyYy0wLjA2NC0wLjA2Ny0wLjEzLTAuMTMyLTAuMTk2LTAuMTk2bC0zMy45NDQtMzMuOTQ0ICAgICBjLTMuMTI0LTMuMTIzLTguMTg4LTMuMTIzLTExLjMxMiwwTDg4LjQsMjcyLjI4OGMtMy4wNywzLjE3OC0yLjk4Miw4LjI0MiwwLjE5NiwxMS4zMTJjMy4xLDIuOTk1LDguMDE2LDIuOTk1LDExLjExNiwwICAgICBsMjAuOC0yMC44YzUuOTgzLDY2LjAwNCw2NC4zMzksMTE0LjY2LDEzMC4zNDMsMTA4LjY3N2M0NS42MDItNC4xMzMsODQuODc2LTMzLjg1NywxMDEuMjQxLTc2LjYyMiAgICAgQzM1My42OTQsMjkwLjczNywzNTEuNjUxLDI4Ni4xMDIsMzQ3LjUzMiwyODQuNTA0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCQk8cGF0aCBkPSJNMzgwLjQ4NCwyMjAuMjA0Yy0wLjA2NywwLjA2NC0wLjEzMiwwLjEzLTAuMTk2LDAuMTk2bC0yMC44LDIwLjhjLTUuOTctNjYuMDA1LTY0LjMxNy0xMTQuNjcyLTEzMC4zMjItMTA4LjcwMiAgICAgYy00NS43OTQsNC4xNDItODUuMTk1LDM0LjA4OC0xMDEuNDQ2LDc3LjEwMmMtMS41NjIsNC4xMzMsMC41MjMsOC43NSw0LjY1NiwxMC4zMTJjNC4xMzMsMS41NjIsOC43NS0wLjUyMywxMC4zMTItNC42NTYgICAgIGMyMC4zNDEtNTMuNzE1LDgwLjM3NS04MC43NzEsMTM0LjA5LTYwLjQzMWMzNi4zMSwxMy43NSw2MS45MzgsNDYuNTgxLDY2LjQ2Miw4NS4xNDNMMzIzLjcxMiwyMjAuNCAgICAgYy0zLjA2OS0zLjE3OC04LjEzNC0zLjI2Ni0xMS4zMTItMC4xOTZjLTMuMTc4LDMuMDY5LTMuMjY2LDguMTM0LTAuMTk2LDExLjMxMmMwLjA2NCwwLjA2NywwLjEzLDAuMTMyLDAuMTk2LDAuMTk2ICAgICBsMzMuOTQ0LDMzLjk0NGMzLjEyNCwzLjEyMyw4LjE4OCwzLjEyMywxMS4zMTIsMGwzMy45NDQtMzMuOTQ0YzMuMTc4LTMuMDY5LDMuMjY2LTguMTM0LDAuMTk2LTExLjMxMiAgICAgQzM4OC43MjcsMjE3LjIyMiwzODMuNjYyLDIxNy4xMzQsMzgwLjQ4NCwyMjAuMjA0eiIgZmlsbD0iIzAwMDAwMCIvPgoJCTwvZz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K'
}) => new Promise((resolve, reject) => {
    let stream = {};
    let selectedCamera = 0;
    let loadedDevices;
    
    const userMedia = getUserMedia(deviceConstraints);
    if (forceFile || (! userMedia)) {
        return fileOpen().then(resolve);
    }

    const el = document.createElement('div');
    const video = document.createElement('video');     
    const elBottom = document.createElement('div');
    const snapshotBtn = document.createElement('button');
    const cancelBtn = document.createElement('button');
    const cameraSwitchBtn = document.createElement('img');    
    cameraSwitchBtn.src = cameraSwitchIcon;  
    cameraSwitchBtn.classList.add('camera-switch-icon');

    const fail = err => {
        el.parentElement.removeChild(el);
        reject(err);
    };

    navigator.mediaDevices.enumerateDevices().then(devices => {        
        el.appendChild(cameraSwitchBtn);
        cameraSwitchBtn.alt = selectDeviceText;
        loadedDevices = devices.filter(d => {
            return (d.kind || '').indexOf('video') !== -1;
        }).map((d, i) => ({
            id: d.deviceId,
            name: cameraNameFormatter ? cameraNameFormatter(d, i) : (d.label || 'Video input'),
            originalName: d.label || ''
        }));
        
        loadedDevices.forEach((d, index) => {            
            if (preferedDevice) {
                if (d.originalName.indexOf(preferedDevice) !== -1) {
                    selectedCamera = index;
                }
            } else if (index === 0) {
                selectedCamera = index;
            }
        });  

        let constraints;

        if (loadedDevices[selectedCamera]) {
            constraints = {
                video: {
                    deviceId: {
                        exact: loadedDevices[selectedCamera].id
                    }
                }            
            };
        }

        if (! loadedDevices.length) {
            cameraSwitchBtn.style.display = 'none';
            return;
        }

        cameraSwitchBtn.addEventListener('click', () => {
            selectedCamera++;
            if (selectedCamera > (loadedDevices.length-1)) {
                selectedCamera = 0;
            }
            stream.getTracks().forEach(t => t.stop());
            let videoConstraints = {
                deviceId: {exact: loadedDevices[selectedCamera].id}
            };
            if (videoWidth) {
                videoConstraints.width = {min: videoWidth};
            }
            startRecording({video: videoConstraints});
        });
        
        startRecording(constraints);
    }).catch(err => fail(err));
    
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
        constraint.video = constraint.video || {};

        if (videoWidth) {
            constraint.video.width = {min: videoWidth};
        }

        if (videoHeight) {
            constraint.video.height = {min: videoHeight};
        }

        const cb = localMediaStream => {
            stream = localMediaStream;
            video.autoplay = true;
            el.appendChild(video);
            if ('srcObject' in video) {
                video.srcObject = localMediaStream;
                video.setAttribute('playsinline', '');
                video.play();
            } else {
                video.src = window.URL.createObjectURL(localMediaStream);
            }            
        };

        try {      
            // Newest
            navigator.mediaDevices.getUserMedia({
                video: facingMode ? {facingMode} : constraint.video,                
            }).then(cb).catch(err => fail(err));
        } catch (e) {
            // Legacy
            navigator.getUserMedia(constraint, cb, err => fail(err));
        }        
    };
});