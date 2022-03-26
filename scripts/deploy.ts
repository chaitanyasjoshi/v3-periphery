const hre = require('hardhat')

async function main() {
  const SwapRouter = await hre.ethers.getContractFactory('SwapRouter')
  const swapRouter = await SwapRouter.deploy(process.env.FACTORY, process.env.WETH)

  await swapRouter.deployed()

  console.log('SwapRouter deployed to:', swapRouter.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
