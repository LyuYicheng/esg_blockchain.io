//�������J������A���ثe�Ҧb�����������C�����ܰ�
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

// �s�����](ETH)
async function connectWalletETH() {
    if (typeof window.ethereum === "undefined") {
        alert ("plz install wallet first!");
        return;
    }
    // ���MetaMask���b��a�}
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // ���ñ�W
    //let signer = provider.getSigner(accounts[0]);

    // ���s��b��h���
    if (accounts.length > 0) {
        
        // ��ܳs���b��W��
        document.getElementById("account").innerText = accounts[0];
        // ��ETH��b���s���I��
        document.getElementById('transferEthButton').disabled = false;
    }
}

// �s�����](CC)
async function connectWalletCC() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // ���MetaMask���b��a�}
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // ���s��b��h���
    if (accounts.length > 0) {
        // ��ܳs���b��W��
        document.getElementById("account").innerText = accounts[0];
        // ��CC��b���s���I��
        document.getElementById('transferCCButton').disabled = false;
    }
}

// �s�����](Convert)
async function connectWalletCV() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // ���MetaMask���b��a�}
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

    // ���ñ�W
    //let signer = provider.getSigner(accounts[0]);

    // ���s��b��h���
    if (accounts.length > 0) {
        // ��ܳs���b��W��
        document.getElementById("account").innerText = accounts[0];
        
        // ���n�DCC���s���I��
        document.getElementById('transferTokens').disabled = false;
        const Account = "0x78b41c0621c76c6b9961777b55d68dae0f2dd2f7"
        if (accounts[0] == Account) {
            // �����v�b�����s���I��
            document.getElementById('approveTokens').disabled = false;
        }     
    }
}

// ��ܿ��]ETH���B
async function showMoney() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // ���MetaMask���b��a�}
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    // �ϥ�MetaMask���Ѫ�Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // �ϥΦa�}�d�ߥH�ӹ��l�B
    const balance = await provider.getBalance(accounts[0]);
    // �Nwei�ഫ��ether�î榡�����
    const balanceInEther = ethers.utils.formatEther(balance);
    document.getElementById("balance").innerText = balanceInEther + " ETH";
}

// �ϥΦX��
async function runContract() {
    if (typeof window.ethereum === "undefined") {
        alert ("plz install wallet first!");
        return;
    }
    // �ϥ�MetaMask���Ѫ�Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // �եΤw�o�����X��
    let contract = new ethers.Contract(contractAddress, contractAbi, provider.getSigner());
    // �ϥΦX�������( greet() )
    let result = await contract.greet();
    document.getElementById("contract").innerText = "Contract: " + result;
}
// �ϥΦX�� �o�e�N��
async function runContract_1() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // �ϥ�MetaMask���Ѫ�Provider
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    // �եΤw�o�����X��
    let contract = new ethers.Contract(contractAddressCC, contractAbiCC, provider.getSigner());
    // �ϥΦX�������()
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

// ETH��b
async function transferEthButton() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // �ϥ�MetaMask���Ѫ�Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const inputElement = document.getElementsByTagName('input');
    // ��������̪��a�}
    const TransAcc = inputElement[0].value;
    // ����n�઺�A�ӹ��ƶq
    const TransAccNum = inputElement[1].value;
    // �Nwei�ഫ��ether
    const amount = ethers.utils.parseEther(TransAccNum);
    // ���ñ�W
    const signer = provider.getSigner();
    const transaction = {
        to: TransAcc,
        value: amount,
    };
    try {
        // ���ݥ���o�e
        const txResponse = await signer.sendTransaction(transaction);
        // ������hash
        console.log('Transhash:', txResponse.hash);
        // ���ݥ���T�{
        const receipt = await txResponse.wait();
        // �������϶�
        console.log('Transblock:', receipt.blockNumber);
        document.getElementById("transferETH").innerText = "success";
    } catch (error) {
        document.getElementById("transferETH").innerText = "error";
    }
}

//���CC�W��
async function getTokenName() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // �ϥ�MetaMask���Ѫ�Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokenContract = new ethers.Contract(contractAddressCC, contractAbiCC, provider);
    const name = await tokenContract.name();
    document.getElementById("CCbalance").innerText = "ERC-20 Name: " + name;
}

// ���CC���B
async function getTokenBalance() {

    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // �ϥ�MetaMask���Ѫ�Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // ���MetaMask���b��a�}
    let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const tokenContract = new ethers.Contract(contractAddressCC, contractAbiCC, provider);
    // ���CC��balance
    const balance = await tokenContract.balanceOf(accounts[0]);
    const thisCC = ethers.utils.formatUnits(balance, 18);
    document.getElementById("CCgetToken").innerText = thisCC + " CC";
}

// CC��b
async function transferCCButton() {
    if (typeof window.ethereum === "undefined") {
        alert("plz install wallet first!");
        return;
    }
    // �ϥ�MetaMask���Ѫ�Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const inputElement = document.getElementsByTagName('input');
    // ��������̪��a�}
    const CCTransAcc = inputElement[0].value;
    // ����n�઺���v�ƶq
    const CCTransAccNum = inputElement[1].value;
    // �Nwei�ഫ��ether
    const amountToSend = ethers.utils.parseUnits(CCTransAccNum, 18);
    // ���ñ�W
    const signer = provider.getSigner();
    // �s��ERC20�X��
    const tokenContract = new ethers.Contract(contractAddressCC, ['function transfer(address to, uint256 value)'], signer);
    try {
        // �o�eERC20�N��
        const txResponse = await tokenContract.transfer(CCTransAcc, amountToSend); 
        // ������hash
        console.log('Transhash:', txResponse.hash);
        // ���ݥ���T�{
        const receipt = await txResponse.wait();
        // �������϶�
        console.log('Transblock:', receipt.blockNumber);
        document.getElementById("transferCC").innerText = "success";
    } catch (error) {
        document.getElementById("transferCC").innerText = "error";
    }
}

//KM-CC����
async function TransKM() {
    //���select����(��q�u��)
    var select = document.getElementById("Transportation");
    //���select����
    var selectedIndex = select.selectedIndex;
    //���select��value
    var selectedValue = select.options[selectedIndex].value;
    //���select��text
    var selectedText = select.options[selectedIndex].text;
    //���input����(��q�u��)
    var inputElement = document.getElementById("TransKM");
    // ���input��value
    var inputValue = inputElement.value;
    document.getElementById("YourTransportation").innerHTML = "\u4F60\u9078\u64C7\u7684\u4EA4\u901A\u5DE5\u5177\u662F: " + selectedText;
    switch (selectedValue) {
        case "0": //�}��
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u6703\u5F97\u5230: " + sum + " CC";
            break;
        case "1": //����
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u6703\u5F97\u5230: " + sum + " CC";
            break;
        case "2": //����
            sum = inputValue * 0.005;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u6703\u5F97\u5230: " + sum + " CC";
            break;
        case "3": //����
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u9700\u652F\u4ED8: " + sum + " CC";
            break;
        case "4": //�T��
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "\u4F60\u9700\u652F\u4ED8: " + sum + " CC";
            break;
        default:
            alert("\u8ACB\u9078\u64C7\u4EA4\u901A\u5DE5\u5177\u6216\u586B\u5BEB\u516C\u91CC\u6578");
            break;
    }
}
