import React, { useState } from 'react'
import { contractABI, contractAddress } from '../lib';
import { ethers } from "ethers";
import { Loading } from './Loader';
import {StartFirebase} from "./firebaseConfig/index"
import {ref, set, get, update, remove, child} from "firebase/database"
import { ConstructorFragment } from 'ethers/lib/utils';

const CreateDrug = () => {

    

    const [isLoading, setIsLoading] = useState(false)
    const [DrugCreated, setDrugCreated] = useState('')

    const [Drug, setDrug] = useState({
        Drug_name: '',
        model: '',
        price: ''
    })

    const handleInputChange = e => {
        const { name, value } = e.target;
        setDrug(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const createDrug = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                setDrugCreated('')
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const FPDetectionContract = new ethers.Contract(contractAddress, contractABI, signer);
                const Drug_record = await FPDetectionContract.createDrug(
                    Drug.Drug_name,
                    Drug.model,
                    Drug.price,
                    { gasLimit: 3000000 })
                const receipt = await Drug_record.wait()
                const data = receipt.logs[0].data
                const [Drug_id, man_address] = ethers.utils.defaultAbiCoder.decode(
                    ['uint', 'address'], data
                )
                setDrugCreated(Drug_id.toNumber())
                console.log("Drug ", Drug_id, "created by", man_address)
                setIsLoading(false)
                setDrug({ Drug_name: '', model: '', price: '' })
            } else {
                setIsLoading(false)
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        createDrug()
    }

    return (
        <>
            {isLoading && <Loading />}
            <div className="border-2 border-gray-200 rounded-lg h-auto bg-gray-800">
                <div class="font-sans p-4 text-black w-full  justify-center">
                    <h3 className="text-xl mb-3 text-white font-bold">
                        Create new Drug
                    </h3>
                    <div class="w-full px-4 py-4 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <label class="block mb-6">
                                <span class="text-gray-200">Drug Name</span>
                                <input
                                    type="text"
                                    name="Drug_name"
                                    value={Drug.Drug_name}
                                    class="block w-full mt-2 p-2 rounded-md shadow-sm"
                                    placeholder="Drug Name"
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label class="block mb-6">
                                <span class="text-gray-200">Model</span>
                                <input
                                    value={Drug.model}
                                    name="model"
                                    type="text"
                                    class="block w-full mt-2 p-2 rounded-md shadow-sm"
                                    placeholder="Drug Model"
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <label class="block mb-6">
                                <span class="text-gray-200">Price</span>
                                <input
                                    value={Drug.price}
                                    name="price"
                                    type="number"
                                    class="block w-full mt-2 p-2 rounded-md shadow-sm"
                                    placeholder="Rs .."
                                    onChange={handleInputChange}
                                    required
                                />
                            </label>
                            <div class="">
                                <button
                                    type="submit"
                                    class="h-10 px-5 text-indigo-100 bg-indigo-700 rounded-lg transition-colors duration-150 focus:shadow-outline hover:bg-indigo-800"
                                >
                                    Create Drug
                                </button>

                            </div>
                            {DrugCreated && <p className='text-normal my-2 text-green-500 font-bold'>Drug with ID {DrugCreated} created Successfully!</p>}
                            <div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateDrug