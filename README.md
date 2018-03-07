# Input to select image
Using browser javascript to create a user image selection input using webrtc to capture photo. 
If browser dont supports webrtc, a file dialog will be trigger.


```
selectImage({
    btnOkText: 'OK', 
    btnCancelText: 'Cancel',
    selectDeviceText: 'Select device'
}).then(function(image) {
    var img = new Image();
    img.src = image;
    document.getElementById('target').appendChild(img);
});
```
