//獲取Button元素
const startCameraButton = document.getElementById('startCamera');

//獲取video元素
const cameraView = document.getElementById('cameraView');

//在按鈕點擊時請求相機權限(transferETH)
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
                // 分割結果
                const codeArr = code.data.split(',');
                // 取出前2個元素 
                const [Acc, AccNum] = codeArr.slice(0, 2);
                // 取出前2個元素
                const [Transportation, TransKM] = codeArr.slice(0, 2);
                const element = document.getElementById('QRresult');
                //通過location對象的href屬性獲取當前頁面的URL
                const currentUrl = location.href;
                //若是transferETH就把QRcode內容填入對應表格
                if (currentUrl.indexOf('transferETH') > -1) {
                    if (element) {
                        //找到要填寫的<input>
                        const AccInput = document.getElementById('TransAcc');
                        const AccNumInput = document.getElementById('TransAccNum');
                        //填寫結果
                        AccInput.value = Acc;
                        AccNumInput.value = AccNum;
                        //顯示結果到網頁
                        //element.textContent = 'Acc: ' + Acc + ' AccNum: ' + AccNum;
                    }
                } else if (currentUrl.includes('transferCC')) {
                    if (element) {
                        //找到要填寫的<input>
                        const AccInput = document.getElementById('CCTransAcc');
                        const AccNumInput = document.getElementById('CCTransAccNum');
                        //填寫結果
                        AccInput.value = Acc;
                        AccNumInput.value = AccNum;
                        //顯示結果到網頁
                        //element.textContent = 'Acc: ' + Acc + ' AccNum: ' + AccNum;
                    }
                } else if (currentUrl.includes('ConvertCC')) {
                    //找到要填寫的<select>
                    const TransSelect = document.getElementById('Transportation');
                    const TransKMSelect = document.getElementById('TransKM');
                    //填寫結果
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
                    //顯示結果到網頁
                    //element.textContent = 'Transportation: ' + Trans + ' TransKM: ' + TransKM;
                }

            }, 1000);
        };
    } catch (error) {
        console.error('error:', error);
    }
});


//停止相機
function stopCamera() {
    const cameraStream = cameraView.srcObject;
    if (cameraStream) {
        const tracks = cameraStream.getTracks();
        tracks.forEach(track => track.stop());
    }
    cameraView.srcObject = null;
}



