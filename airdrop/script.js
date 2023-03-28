// Подключаемся к контракту
const contractAddress = "0x4823986D4030Ff7c0cedc014F33BDc364c5bDc55"; //Замените вашим контрактом

// Указываем ABI (Application Binary Interface) контракта
const abi = 
[
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_airdropAmount",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			}
		],
		"name": "Airdropped",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_user",
				"type": "address"
			}
		],
		"name": "addToWhitelist",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "candidate",
				"type": "address"
			}
		],
		"name": "aidropEnable",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "airdropAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "airdropMe",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			}
		],
		"name": "getAirdropped",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getTokensNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
;

// Подключаемся к web3 провайдеру (метамаск)
const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let contract;

//Запрашиваем аккаунты пользователя и подключаемся к первому аккаунту
provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Создаем объект контракта
    contract = new ethers.Contract(contractAddress, abi, signer);
    console.log(contract);
  });
});

async function addToWhitelist() {
    const whiteList = document.getElementById("whiteList").value;  
    const result = await contract.addToWhitelist(whiteList);
    console.log(addToWhitelist); 
    alert("Успешно добавлено");
  }

async function getAirdropped() {
  const recipient = document.getElementById("recipient").value;  
  const result = await contract.getAirdropped(recipient);
  console.log(getAirdropped); 
  document.getElementById("result").innerText ="Токенов отправлено :"+ result;   
}

async function airdropAll() {
  const note = await contract.airdropAll();
  console.log(airdropAll);    
  alert("Успешно отправлено");
}

async function airdropMe() {
    const note = await contract.airdropMe();
    console.log(airdropMe);
    alert("Успешно отправлено");  
  }
