const hre = require('hardhat')

async function main() {
  const SwapRouter = await hre.ethers.getContractFactory('SwapRouter')
  const swapRouter = await SwapRouter.deploy(process.env.FACTORY, process.env.WETH)
  await swapRouter.deployed()
  console.log('SwapRouter deployed to:', swapRouter.address)

  const NFTDescriptor = await hre.ethers.getContractFactory('NFTDescriptor')
  const descriptor = await NFTDescriptor.deploy()
  await descriptor.deployed()
  console.log('NFTDescriptor deployed to:', descriptor.address)

  const NonfungibleTokenPositionDescriptor = await hre.ethers.getContractFactory('NonfungibleTokenPositionDescriptor', {
    libraries: {
      NFTDescriptor: descriptor.address,
    },
  })
  const nonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
    process.env.WETH,
    '0x434b420000000000000000000000000000000000000000000000000000000000'
  )
  await nonfungibleTokenPositionDescriptor.deployed()
  console.log('NonfungibleTokenPositionDescriptor deployed to:', nonfungibleTokenPositionDescriptor.address)

  const NonfungiblePositionManager = await hre.ethers.getContractFactory('NonfungiblePositionManager')
  const nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
    process.env.FACTORY,
    process.env.WETH,
    nonfungibleTokenPositionDescriptor.address
  )
  await nonfungiblePositionManager.deployed()
  console.log('NonfungiblePositionManager deployed to:', nonfungiblePositionManager.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
