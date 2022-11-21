import { ethers } from "ethers"

const Wallet=new ethers.Wallet(process.env.WALLET_PRIVATE_KEY,
ethers.getDefaultProvider(process.env.ALCHEMY_URL))
const ValidationCollection="0x60576A64851C5B42e8c57E3E4A5cF3CF4eEb2ED6"
export default async function handler(req, res) {
  try {
   if(req.method!='POST'){
    return res.status(400).json({message:"Please use post request"})
   }
   const walletAddress=req.body.address
   var requestOptions = {
    method: 'GET',
    
  };
   const response=await fetch(`${process.env.ALCHEMY_NFT_URL}/getNFTs/
   ?owner=${walletAddress}&contractAddresses%5B%5D=${ValidationCollection}`,requestOptions)
   .then(data => data.json())
   if(response.ownedNfts.length!=0){
    //console.log(response.ownedNfts)
    response.ownedNfts.map((nft)=>{
      console.log(nft.title)
      if(nft.title=='Alchemy University Early Access'){
         return res.status(200).json({message:"Validation succesful!"})
      }
    })
    
   }else{
    res.status(400).json({message:"Validation unsuccesful!"})
   }
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Internal Server Error!"})
  }
}
