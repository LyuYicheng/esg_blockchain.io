// SPDX-License-Identifier: MIT
// WTF Solidity by 0xAA

pragma solidity ^0.8.0;

interface IERC20 {
    /**
     * @dev 釋放條件：當 `value` 單位的貨幣從帳戶 (`from`) 轉移到另一個帳戶 (`to`).
     */
    // 從當前帳戶 ("from") 轉帳到指定帳戶 ("to")，單位為 ("value")
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev 釋放條件：當 `value` 單位的貨幣從帳戶 (`owner`) 授權給另一個帳戶 (`spender`)時.
     */
    // 從當前帳戶 ("owner") 授權到指定帳戶 ("spender")，單位為 ("value")
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev 返回代幣總供給.
     */
    // 返回代幣的總數量(NOTE: 1CC = 1000000000000000000)
    function totalSupply() external view returns (uint256);

    /**
     * @dev 傳回帳戶`account`所持有的代幣數.
     */
    // 輸入想查詢的帳戶 (`account`) 並返回代幣的總數量 (NOTE: 1CC = 1000000000000000000)
    function balanceOf(address account) external view returns (uint256);

    /**
      * @dev 轉帳 `amount` 單位代幣，從呼叫者帳戶到另一個帳戶 `to`.
      *
      * 如果成功，回傳 `true`.
      *
      * 釋放 {Transfer} 事件.
      */
    // 轉帳到指定帳戶 ("to")，單位為 ("amount") 如果成功傳回 true 且釋放event {Transfer}
    function transfer(address to, uint256 amount) external returns (bool);

    /**
      * @dev 回傳`owner`帳戶授權給`spender`帳戶的額度，預設為0。
      *
      * 當{approve} 或 {transferFrom} 被呼叫時，`allowance`會改變.
      */
     //
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
      * @dev 呼叫者帳戶給`spender`帳戶授權 `amount`數量代幣。
      *
      * 如果成功，回傳 `true`.
      *
      * 釋放 {Approval} 事件.
      */
    //
    function approve(address spender, uint256 amount) external returns (bool);

    /**
      * @dev 透過授權機制，從`from`帳戶轉帳`amount`數量代幣到`to`帳戶。 轉帳的部分會從呼叫者的`allowance`中扣除。
      *
      * 如果成功，回傳 `true`.
      *
      * 釋放 {Transfer} 事件.
      */
    //
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

contract ERC20 is IERC20 {
    mapping(address => uint256) public override balanceOf;

    mapping(address => mapping(address => uint256)) public override allowance;

    uint256 public override totalSupply; // 代幣總供給

    string public name; // 名稱
    string public symbol; // 符號

    uint8 public decimals = 18; // 小數位數
    address public owner;

    // @dev 在合約部署的時候實現合約名稱和符號
    //
    constructor(string memory name_, string memory symbol_) {
        name = name_;
        symbol = symbol_;
        owner = msg.sender;
    }

    // @dev 實作`transfer`函數，代幣轉帳邏輯
    //
    function transfer(address recipient, uint256 amount)
        external
        override
        returns (bool)
    {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    // @dev 實作 `approve` 函數, 代幣授權邏輯
    //
    function approve(address spender, uint256 amount)
        external
        override
        returns (bool)
    {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    // @dev 實作`transferFrom`函數，代幣授權轉帳邏輯
    //
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external override returns (bool) {
        allowance[sender][msg.sender] -= amount;
        balanceOf[sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    // @dev 鑄造代幣，從 `0` 地址轉帳給 呼叫者地址
    //
    function mint(uint256 amount) external {
        require(owner == msg.sender);
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
        emit Transfer(address(0), msg.sender, amount);
    }

    // @dev 銷毀代幣，從 呼叫者地址 轉帳給 `0` 地址
    //
    function burn(uint256 amount) external {
        balanceOf[msg.sender] -= amount;
        totalSupply -= amount;
        emit Transfer(msg.sender, address(0), amount);
    }
}
