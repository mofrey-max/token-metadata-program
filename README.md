# token-metadata-program
Create Solana Spl Metadata program to update token metadata credentials

Required Dendencies
# npm install --global typescript
# npm install --save @solana/web3.js
# npm i @project-serum/anchor

# npm i @metaplex-foundation/mpl-token-metadata

To add metadata, update data in intial.js file. Following are three important parts:

1. You can get the path from SOL cli using 'solana config get'
# const myKeypair = loadWalletKey("Your Keypair");

2. 
# const mint = new web3.PublicKey("Your Token Address");

3.
# const dataV2 = {
#   name: " Your Token Name",
#   symbol: " Your Token Symbol",
#   uri: "Image Url upload",
# }

How to Run:
Since its a typescript file, to run with node you can use:
# npm install -g ts-node 

Once installed, run following command:
# ts-node intial.ts

# If the the code has help you remmeber to give the repo a star
