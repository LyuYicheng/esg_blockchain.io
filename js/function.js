//頁面載入完成後，讓目前所在網頁的導覽列底色變動
window.onload = function () {
    var currentUrl = window.location.href;
    if (currentUrl.includes("index_v3.html")) {
        document.getElementById("index3").style.color = "blueviolet";
    } else if (currentUrl.includes("introduction_v2.html")) {
        document.getElementById("intro2").style.color = "blueviolet";
    } else if (currentUrl.includes("ConvertCC_v2.html")) {
        document.getElementById("Convert2").style.color = "blueviolet";
    } else if (currentUrl.includes("transferETH_v2.html")) {
        document.getElementById("transETH2").style.color = "blueviolet";
    } else if (currentUrl.includes("transferCC_v2.html")) {
        document.getElementById("transCC2").style.color = "blueviolet";
    } else
        console.log("error");
}

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
        document.getElementById("account").innerText = accounts[0];
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
        document.getElementById("account").innerText = accounts[0];
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
        document.getElementById("account").innerText = accounts[0];
        
        // 讓要求CC按鈕能點擊
        document.getElementById('transferTokens').disabled = false;
        const Account = "0x78b41c0621c76c6b9961777b55d68dae0f2dd2f7"
        if (accounts[0] == Account) {
            // 讓授權帳號按鈕能點擊
            document.getElementById('approveTokens').disabled = false;
        }     
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
    document.getElementById("balance").innerText = balanceInEther + " ETH";
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
// 使用合約 發送代幣
async function runContract_1() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // 使用MetaMask提供的Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // 調用已發布之合約
    let contract = new ethers.Contract(contractAddressCC, contractAbiCC, provider.getSigner());
    // 使用合約之函數()
    let result = await contract.totalSupply(); 
    document.getElementById("contract_1").innerText = "Contract: " + result;
}

async function runContract_2() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddressCC, contractAbiCC, provider.getSigner());
    let amount = 3.2e+21;
    let tx = await contract.mint(amount);
    await tx.wait();
    let totalSupply = await contract.totalSupply();
    document.getElementById("contract_2").innerText = totalSupply;
}

async function runContract_3() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddressCC, contractAbiCC, provider.getSigner());
    try {
        let spender = "0x1F2D4253Bae3C3eF00c38C80d8130Ce65CF6D815";
        let amount = 1000;
        let result = await contract.approve(spender, amount);

        console.log("Transaction Hash:", result.hash);
        console.log("Transaction Receipt:", await result.wait());

        alert("sccess");
    } catch (error) {
        console.error("Error:", error);
        alert("error");
    }
}

async function approveTokens() {
    if (typeof window.ethereum === "undefined") {
        alert("Please install a wallet first!");
        return;
    }
    //0x1F2D4253Bae3C3eF00c38C80d8130Ce65CF6D815
    const inputElement = document.getElementsByTagName('input');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddressCC, contractAbiCC, provider.getSigner());
    const GetCC = inputElement[1].value;
    const GetCCA = inputElement[2].value;
    const amountToApprove = ethers.utils.parseEther(GetCC);
    let approveTx = await contract.approve(GetCCA, amountToApprove);
    await approveTx.wait();
}

async function transferTokens() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const inputElement = document.getElementsByTagName('input');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(contractAddressCC, contractAbiCC, provider.getSigner());
    const GetCC = inputElement[1].value;
    const amountToApprove = ethers.utils.parseEther(GetCC);

    const allowance = await contract.allowance("0x78b41C0621c76c6B9961777B55D68dAE0f2DD2f7", accounts[0]);

    if (allowance < GetCC) {
        alert("allowance not enough")
    }
    else {
        let transferFromTx = await contract.transferFrom("0x78b41C0621c76c6B9961777B55D68dAE0f2DD2f7", accounts[0], amountToApprove);
        await transferFromTx.wait();
    }    
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
    document.getElementById("CCgetToken").innerText = thisCC + " CC";
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
    document.getElementById("YourTransportation").innerHTML = "\u4F60\u9078\u64C7\u7684\u4EA4\u901A\u5DE5\u5177\u662F: " + selectedText;
    switch (selectedValue) {
        case "0": //腳踏車
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u6703\u5F97\u5230: " + sum + " CC";
            break;
        case "1": //公車
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u6703\u5F97\u5230: " + sum + " CC";
            break;
        case "2": //火車
            sum = inputValue * 0.005;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u6703\u5F97\u5230: " + sum + " CC";
            break;
        case "3": //機車
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u9700\u652F\u4ED8: " + sum + " CC";
            break;
        case "4": //汽車
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u9700\u652F\u4ED8: " + sum + " CC";
            break;
        default:
            alert("\u8ACB\u9078\u64C7\u4EA4\u901A\u5DE5\u5177\u6216\u586B\u5BEB\u516C\u91CC\u6578");
            break;
    }
}
