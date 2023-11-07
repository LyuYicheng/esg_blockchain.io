
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
        document.getElementById("account").innerText = "Your Account: " + accounts[0];
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
        document.getElementById("account").innerText = "Your Account: " + accounts[0];
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
        document.getElementById("account").innerText = "Your Account: " + accounts[0];
        // ��CC��b���s���I��
        document.getElementById('transferCVButton').disabled = false;
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
    document.getElementById("balance").innerText = "Your Money: " + balanceInEther + " ETH";
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
    document.getElementById("CCgetToken").innerText = "ERC-20 CC: " + thisCC + "CC";
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

    document.getElementById("YourTransportation").innerHTML = "Your choice of transportation: " + selectedText;
    switch (selectedValue) {
        case "0": //�}��
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "You will get: " + sum + " CC";
            break;
        case "1": //����
            sum = inputValue * 0.0075;
            document.getElementById("MustpayCC").innerHTML = "You will get: " + sum + " CC";
            break;
        case "2": //����
            sum = inputValue * 0.005;
            document.getElementById("MustpayCC").innerHTML = "You will get: " + sum + " CC";
            break;
        case "3": //����
            sum = inputValue * 0.01;
            document.getElementById("MustpayCC").innerHTML = "You have to pay: " + sum + " CC";
            break;
        case "4": //�T��
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
