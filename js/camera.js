//������s����
const startCameraButton = document.getElementById('startCamera');

//���video����
const cameraView = document.getElementById('cameraView');

//QRcode���G
//const qrResult = document.getElementById('QRresult');

//�b���s�I���ɽШD�۾��v��
startCameraButton.addEventListener('click', async () => {
    try {
        //�ШD�Τ�۾�
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        //�N�۾��s����video����
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
                    //���QRcode���G
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

