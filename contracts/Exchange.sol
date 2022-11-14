// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import 'hardhat/console.sol';
import './Token.sol';

contract Exchange {
    address public feeAccount;
    uint256 public feePercent;
    uint256 public orderCount;
    mapping(address => mapping(address => uint256)) public tokens;
    mapping(uint256 => _Order) public orders;

    // Events
    event Deposit(address token, address user, uint256 amount, uint256 balance);
    event Withdraw(address token, address user, uint256 amount, uint256 balance);
    event Order(
        uint256 id,
        address user,
        address tokenGet,
        uint256 amountGet,
        address tokenGive, 
        uint256 amountGive,
        uint256 timestamp
        );

    // Structs
    struct _Order{
        uint256 id;
        address user;
        address tokenGet;
        uint256 amountGet;
        address tokenGive;
        uint256 amountGive;
        uint256 timestamp;
    }

    constructor(address _feeAccount, uint256 _feePercent){
        feeAccount = _feeAccount;
        feePercent = _feePercent;
    }

    // -------------------
    // Withdraw & Deposit Token

    // Deposit Tokens
    function depositToken(address _token, uint256 _amount) public {
        require(Token(_token).transferFrom(msg.sender, address(this), _amount));
        // Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] + _amount;
        // Emit a deposit event
        emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }

    // Withdraw Token
    function withdrawToken(address _token, uint256 _amount) public {
        require(tokens[_token][msg.sender] >= _amount);

        // Transfer tokens to user
        Token(_token).transfer(msg.sender, _amount);
        
        // Update user balance
        tokens[_token][msg.sender] = tokens[_token][msg.sender] - _amount;

        // Emit an event
        emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
    }
   
    //    Balance of
    function balanceOf(address _token, address _user) public view returns (uint256){
        return tokens[_token][_user];
    }

    // -------------------
    // Make & Cancel Order
    /**
    Token Give (the token to be sold)
    Token Get (the token to be bought)
     */
    function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) public {
        require(tokens[_tokenGive][msg.sender] >= _amountGive);
       orderCount = orderCount + 1;
       orders[orderCount] =  _Order(1, msg.sender,_tokenGet, _amountGet, _tokenGive, _amountGive, block.timestamp); 
       emit Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, block.timestamp);
    }

}