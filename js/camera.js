//獲取按鈕元素
const startCameraButton = document.getElementById('startCamera');

//獲取video元素
const cameraView = document.getElementById('cameraView');

//QRcode結果
//const qrResult = document.getElementById('QRresult');

//在按鈕點擊時請求相機權限
startCameraButton.addEventListener('click', async () => {
    try {
        //請求用戶相機
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        //將相機連接到video元素
        cameraView.srcObject = stream;
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        cameraView.onplay = () => {
            canvas.width = cameraView.videoWidth;
            canvas.height = cameraView.videoHeight;
            setInterval(() => {
                context.drawImage(cameraView, 0, 0, cameraView.videoWidth, cameraView.videoHeight);
                const imageData = context.getImageData(0, 0, cameraView.videoWidth, cameraView.videoHeight);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                const element = document.getElementById('QRresult');
                if (element) {
                    //顯示QRcode結果
                    element.textContent = 'result: ' + code.data;
                }
            }, 1000);
        };
    } catch (error) {
        console.error('error:', error);
    }
});

function stopCamera() {
    const cameraStream = cameraView.srcObject;
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
    }
    cameraView.srcObject = null;
}

