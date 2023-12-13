//���Button����
const startCameraButton = document.getElementById('startCamera');

//���video����
const cameraView = document.getElementById('cameraView');

//�b���s�I���ɽШD�۾��v��(transferETH)
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
                // ���ε��G
                const codeArr = code.data.split(',');
                // ���X�e2�Ӥ��� 
                const [Acc, AccNum] = codeArr.slice(0, 2);
                // ���X�e2�Ӥ���
                const [Transportation, TransKM] = codeArr.slice(0, 2);
                const element = document.getElementById('QRresult');
                //�q�Llocation��H��href�ݩ������e������URL
                const currentUrl = location.href;
                //�Y�OtransferETH�N��QRcode���e��J�������
                if (currentUrl.indexOf('transferETH') > -1) {
                    if (element) {
                        //���n��g��<input>
                        const AccInput = document.getElementById('TransAcc');
                        const AccNumInput = document.getElementById('TransAccNum');
                        //��g���G
                        AccInput.value = Acc;
                        AccNumInput.value = AccNum;
                        //��ܵ��G�����
                        //element.textContent = 'Acc: ' + Acc + ' AccNum: ' + AccNum;
                    }
                } else if (currentUrl.includes('transferCC')) {
                    if (element) {
                        //���n��g��<input>
                        const AccInput = document.getElementById('CCTransAcc');
                        const AccNumInput = document.getElementById('CCTransAccNum');
                        //��g���G
                        AccInput.value = Acc;
                        AccNumInput.value = AccNum;
                        //��ܵ��G�����
                        //element.textContent = 'Acc: ' + Acc + ' AccNum: ' + AccNum;
                    }
                } else if (currentUrl.includes('ConvertCC')) {
                    //���n��g��<select>
                    const TransSelect = document.getElementById('Transportation');
                    const TransKMSelect = document.getElementById('TransKM');
                    //��g���G
                    TransSelect.value = Transportation;
                    TransKMSelect.value = TransKM;
                    Trans = ''
                    switch (Transportation) {
                        case '0':
                            Trans = 'bicycle'
                            break;
                        case '1':
                            Trans = 'bus'
                            break;
                        case '2':
                            Trans = 'train'
                            break;
                        case '3':
                            Trans = 'motorcycle'
                            break;
                        case '4':
                            Trans = 'car'
                            break;
                        default:
                    }
                    //��ܵ��G�����
                    //element.textContent = 'Transportation: ' + Trans + ' TransKM: ' + TransKM;
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



