//������s����
const startCameraTransETHButton = document.getElementById('startCameraTransETH');
//������s����(����� transferCC convertCC) �Q�ΧP�_���}�ӧP�_�έ��Ө禡


const startCameraTransCCButton = document.getElementById('startCameraTransCC');
//const startCameraButton2 = document.getElementById('startCamera2');

//���video����
const cameraView = document.getElementById('cameraView');

//�b���s�I���ɽШD�۾��v��(transferETH)
startCameraTransETHButton.addEventListener('click', async () => {
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
                // ���ε��G
                const codeArr = code.data.split(',');
                // ���X�e2�Ӥ��� 
                const [Acc, AccNum] = codeArr.slice(0, 2);
                const element = document.getElementById('QRresult');

                if (element) {
                    //���n��g��<input>
                    const AccInput = document.getElementById('TransAcc');
                    const AccNumInput = document.getElementById('TransAccNum');
                    //��g���G
                    AccInput.value = Acc;
                    AccNumInput.value = AccNum;
                    //��ܵ��G�����
                    element.textContent = 'Acc: ' + Acc + ' AccNum: ' + AccNum; 
                }

            }, 1000);
        };
    } catch (error) {
        console.error('error:', error);
    }
});


//����۾�
function stopCamera() {
    const cameraStream = cameraView.srcObject;
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
    }
    cameraView.srcObject = null;
}



