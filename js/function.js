
// 連接錢包(ETH)
async function connectWalletETH() {
    if (typeof window.ethereum === "undefined") {
        alert ("plz install wallet first!");
        return;
    }
    // 獲取MetaMask的帳戶地址
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // 獲取簽名
    //let signer = provider.getSigner(accounts[0]);

    // 有連到帳戶則顯示
    if (accounts.length > 0) {
        // 顯示連接帳戶名稱
        document.getElementById("account").innerText = "Your Account: " + accounts[0];
        // 讓ETH轉帳按鈕能點擊
        document.getElementById('transferEthButton').disabled = false;
    }
}

// 連接錢包(CC)
async function connectWalletCC() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 獲取MetaMask的帳戶地址
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // 有連到帳戶則顯示
    if (accounts.length > 0) {
        // 顯示連接帳戶名稱
        document.getElementById("account").innerText = "Your Account: " + accounts[0];
        // 讓CC轉帳按鈕能點擊
        document.getElementById('transferCCButton').disabled = false;
    }
}

// 連接錢包(Convert)
async function connectWalletCV() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 獲取MetaMask的帳戶地址
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // 獲取簽名
    //let signer = provider.getSigner(accounts[0]);

    // 有連到帳戶則顯示
    if (accounts.length > 0) {
        // 顯示連接帳戶名稱
        document.getElementById("account").innerText = "Your Account: " + accounts[0];
        // 讓CC轉帳按鈕能點擊
        document.getElementById('transferCVButton').disabled = false;
    }
}

// 顯示錢包ETH金額
async function showMoney() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    } 
    // 獲取MetaMask的帳戶地址
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // 使用MetaMask提供的Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // 使用地址查詢以太幣餘額
    const balance = await provider.getBalance(accounts[0]);
    // 將wei轉換為ether並格式化顯示
    const balanceInEther = ethers.utils.formatEther(balance);
    document.getElementById("balance").innerText = "Your Money: " + balanceInEther + " ETH";
}

// 使用合約
async function runContract() {
    if (typeof window.ethereum === "undefined") {
        alert ("plz install wallet first!");
        return;
    }
    // 使用MetaMask提供的Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // 調用已發布之合約
    let contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
    // 使用合約之函數( greet() )
    let result = await contract.greet();
    document.getElementById("contract").innerText = "Contract: " + result;
}

// ETH轉帳
async function transferEthButton() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 使用MetaMask提供的Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const inputElement = document.getElementsByTagName('input');
    // 獲取接收者的地址
    const TransAcc = inputElement[0].value;
    // 獲取要轉的乙太幣數量
    const TransAccNum = inputElement[1].value;
    // 將wei轉換為ether
    const amount = ethers.utils.parseEther(TransAccNum);
    // 獲取簽名
    const signer = provider.getSigner();
    const transaction = {
        to: TransAcc,
        value: amount,
    };
    try {
        // 等待交易發送
        const txResponse = await signer.sendTransaction(transaction);
        // 獲取交易hash
        console.log('Transhash:', txResponse.hash);
        // 等待交易確認
        const receipt = await txResponse.wait();
        // 獲取交易區塊
        console.log('Transblock:', receipt.blockNumber);
        document.getElementById("transferETH").innerText = "success";
    } catch (error) {
        document.getElementById("transferETH").innerText = "error";
    }
}

//顯示CC名稱
async function getTokenName() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 使用MetaMask提供的Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(contractAddressCC, contractAbiCC, provider);
    const name = await tokenContract.name();
    document.getElementById("CCbalance").innerText = "ERC-20 Name: " + name;
}

// 顯示CC金額
async function getTokenBalance() {

    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 使用MetaMask提供的Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // 獲取MetaMask的帳戶地址
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const tokenContract = new ethers.Contract(contractAddressCC, contractAbiCC, provider);
    // 獲取CC的balance
    const balance = await tokenContract.balanceOf(accounts[0]);
    const thisCC = ethers.utils.formatUnits(balance, 18);
    document.getElementById("CCgetToken").innerText = "ERC-20 CC: " + thisCC + "CC";
}

// CC轉帳
async function transferCCButton() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 使用MetaMask提供的Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const inputElement = document.getElementsByTagName('input');
    // 獲取接收者的地址
    const CCTransAcc = inputElement[0].value;
    // 獲取要轉的碳權數量
    const CCTransAccNum = inputElement[1].value;
    // 將wei轉換為ether
    const amountToSend = ethers.utils.parseUnits(CCTransAccNum, 18);
    // 獲取簽名
    const signer = provider.getSigner();
    // 連接ERC20合約
    const tokenContract = new ethers.Contract(contractAddressCC, ['function transfer(address to, uint256 value)'], signer);
    try {
        // 發送ERC20代幣
        const txResponse = await tokenContract.transfer(CCTransAcc, amountToSend); 
        // 獲取交易hash
        console.log('Transhash:', txResponse.hash);
        // 等待交易確認
        const receipt = await txResponse.wait();
        // 獲取交易區塊
        console.log('Transblock:', receipt.blockNumber);
        document.getElementById("transferCC").innerText = "success";
    } catch (error) {
        document.getElementById("transferCC").innerText = "error";
    }
}

//KM-CC換算
async function TransKM() {
    //獲取select元素(交通工具)
    var select = document.getElementById("Transportation");
    //獲取select索引
    var selectedIndex = select.selectedIndex;
    //獲取select之value
    var selectedValue = select.options[selectedIndex].value;
    //獲取select之text
    var selectedText = select.options[selectedIndex].text;
    //獲取input元素(交通工具)
    var inputElement = document.getElementById("TransKM");
    // 獲取input之value
    var inputValue = inputElement.value;

    document.getElementById("YourTransportation").innerHTML = "Your choice of transportation: " + selectedText;
    switch (selectedValue) {
        case "0": //腳踏車
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "You will get: " + sum + " CC";
            break;
        case "1": //公車
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "You will get: " + sum + " CC";
            break;
        case "2": //火車
            sum = inputValue * 0.005;
            document.getElementById("MustpayCC").innerHTML = "You will get: " + sum + " CC";
            break;
        case "3": //機車
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "You have to pay: " + sum + " CC";
            break;
        case "4": //汽車
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "You have to pay: " + sum + " CC";
            break;
        default:
            document.getElementById("MustpayCC").innerHTML = "error";
    }
    
}


function select() {
    var selected = document.getElementById("tool_type").value;
    console.log(selected);
}
