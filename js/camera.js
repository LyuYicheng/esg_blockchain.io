//獲取按鈕元素
const startCameraTransETHButton = document.getElementById('startCameraTransETH');
//獲取按鈕元素(未改動 transferCC convertCC) 利用判斷網址來判斷用哪個函式


const startCameraTransCCButton = document.getElementById('startCameraTransCC');
//const startCameraButton2 = document.getElementById('startCamera2');

//獲取video元素
const cameraView = document.getElementById('cameraView');

//在按鈕點擊時請求相機權限(transferETH)
startCameraTransETHButton.addEventListener('click', async () => {
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
                const element = document.getElementById('QRresult');

                if (element) {
                    //找到要填寫的<input>
                    const AccInput = document.getElementById('TransAcc');
                    const AccNumInput = document.getElementById('TransAccNum');
                    //填寫結果
                    AccInput.value = Acc;
                    AccNumInput.value = AccNum;
                    //顯示結果到網頁
                    element.textContent = 'Acc: ' + Acc + ' AccNum: ' + AccNum; 
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



