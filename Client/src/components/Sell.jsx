import React, { useState } from 'react'
import { ethers } from "ethers";
import { contractABI, contractAddress } from '../lib';
import { Loading } from './Loader';

const Sell = () => {
    var sold ='Transaction Successful';
    const [DrugDetail, setDrugDetail] = useState('')
    const [DrugID, setDrugID] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [ownership, setOwnership] = useState({
        DrugID: '',
        newAddress: ''
    })

    const getManufacturer = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
               
                //setDrugDetail('')
                //setIsLoading(true)
                sold ='sold'
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const FPDetectionContract = new ethers.Contract(contractAddress, contractABI, signer);
                const DrugInfo = await FPDetectionContract.getDrug(ownership.DrugID)
                console.log(DrugInfo)
                const DrugInfoCleaned =
                {
                    id: DrugInfo.id.toNumber(),
                    name: DrugInfo.name,
                    model: DrugInfo.model,
                    manufacturer: DrugInfo.manufacturer,
                    initialPrice: DrugInfo.price.toNumber(),
                    exists: DrugInfo.exists,
                    curOwner: DrugInfo.curOwner,
                    manufacturedTimestamp: new Date(DrugInfo.manufacturedTimestamp.toNumber() * 1000),
                    owners: DrugInfo.owners.map((owner) => {
                        return {
                            owner: owner.curOwner,
                            timestamp: new Date(owner.curTimestamp.toNumber() * 1000)
                        }
                    })
                }
                setDrugDetail(DrugInfoCleaned)
                setIsLoading(false)
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            setIsLoading(false)
            alert(error);
        }
    }
    const handleInputChange = e => {
        const { name, value } = e.target;
        setOwnership(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


     

    const handleSubmit = (e) => {
        //setDrugID(DrugID)
        e.preventDefault()
        setIsLoading(true)
       // getManufacturer()
        transferOwnership()
    }

    const transferOwnership = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const FPDetectionContract = new ethers.Contract(contractAddress, contractABI, signer);
                const owner_record = await FPDetectionContract.updateOwnership(
                    ownership.DrugID,
                    ownership.newAddress,
                    { gasLimit: 3000000 })
                const receipt = await owner_record.wait()
                const data = receipt.logs[0].data
                const [Drug_id, man_address] = ethers.utils.defaultAbiCoder.decode(
                    ['uint', 'address'], data
                )
                sold='sold'
                console.log("Drug ownership transferred to", man_address)
                setIsLoading(false)
                setOwnership({ DrugID: '', newAddress: '' })
                alert('Transaction Successful')
            } else {
                setIsLoading(false)
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }


    return (
        <>
            {isLoading && <Loading />}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Sell</h1>
                </div>
            </header>
            <main>
            <div className="border-2 border-gray-200 rounded-lg h-auto bg-white">
                <div class="font-sans p-4 text-black w-full  justify-center">  
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div class="grid grid-cols-1gap-2">
                        <form onSubmit={handleSubmit}>
                            <label class="block mb-6">
                                <span class="text-gray-800">Drug Id</span>
                                <input
                                    type="number"
                                    name="DrugID"
                                    value={ownership.DrugID}
                                    onChange={handleInputChange}
                                    class="block w-full mt-2 p-2 rounded-md shadow-sm bg-white text-gray-800 border border-gray-400 focus:bg-gray-200 focus:border-gray-200"
                                    placeholder="Drug ID"
                                    required
                                />
                            </label>
                            <label class="block mb-6">
                                <span class="text-gray-800">Sell</span>
                                <input
                                    name="newAddress"
                                    type="text"
                                    value={ownership.newAddress}
                                    onChange={handleInputChange}
                                    class="block w-full mt-2 p-2 rounded-md shadow-sm bg-white text-gray-800 border border-gray-400 focus:bg-gray-200 focus:border-gray-200"
                                    placeholder="0x0000000000000000000000000000000000000000"
                                    required
                                />
                            </label>
                            <div class="">
                                <button
                                    type="submit"
                                    class="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
                                >
                                    Sell
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </main>
        </>
    )
}

export default Sell