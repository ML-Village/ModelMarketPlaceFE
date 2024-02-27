import React from 'react';
import { BasePageTemplate } from '@/components/Base';
import {projectParamMapping} from '@/constants/createresource_projectslist';
import { addressShortener } from "@/utils";
import { Card } from 'flowbite-react';
import { FaShoppingCart } from "react-icons/fa";

export const ModelPage = () => {

    const model = {
        projectcoverurl: "/gameimages/pokemonshowdown.jpg" ,
        modelname: "Trainer88" ,
        project: "PokemonShowDown",
        description:"Picks the best move and best Pokemon to battle",
        creator:addressShortener("0x8ed8426df79CA5972DfD09A01647D2EFe02cB901"),
        creatorrating:4.5,
        efficiency:"70.8%",
        floorprice:"1.00 ETH",
        remaining:"768",
        tags: ["pokebattle"]
    }

    return (
        <BasePageTemplate>
            <div>
                <div className="container mx-auto w-3/5 mt-10
                    flex flex-col rounded-md items-center
                    ">
                        <div className="w-full h-[250px] bg-black border border-black rounded-md" 
                            style={{backgroundImage: `url(${model.projectcoverurl})`,}}
                            
                            />

                        {/* title */}
                        <div className="w-full my-6 flex flex-col items-start">

                            <span className="my-2 text-5xl font-bold">
                                <span className="text-sm font-semibold">Model: </span>
                                {model.modelname}</span>


                            <div className="font-semibold mt-2">
                                <span className="mr-2">Collection Id: </span>
                                <span>0x89325895</span> 
                            </div>

                            <div className="font-semibold mt-2">
                                <span className="mr-2">Mint Price: </span>
                                <span>0.88 ETH</span> 
                            </div>

                            <div className="font-semibold">
                                <span className="mr-2">
                                    <span className="mr-2">Model URI: </span>
                                <a href="https://peach-secondary-tuna-132.mypinata.cloud/QmcartyRxQ8vHECPRqAoHCvyaFKJzNgfVW936Mzg8fK3dR"
                                className="text-blue-700"
                                >https://peach-secondary-tuna-132.mypinata.cloud/QmcartyRxQ8vHECPRqAoHCvyaFKJzNgfVW936Mzg8fK3dR</a>
                                </span>
                            </div>

                            <div className="font-semibold">
                                <span className="mr-2">
                                    <span className="mr-2">Cairo Address: </span>
                                <span>0x8e0b43e2c16CC5F54DC00AE49096261522e5aED0</span>
                                </span>
                                </div>
                            </div>


                            <div className="w-full grid grid-cols-4 gap-2 gap-y-4">
                                {
                                    Array.from({length: 88}).map((_,i)=>{
                                        return (
                                            <div className="w-60 rounded-lg h-72 border border-gray-700
                                            flex flex-col justify-start items-center overflow-hidden
                                            " key={''+i.toString()}>
                                                <div className="bg-white w-full h-3/5"

                                                style={{backgroundImage: `url(${model.projectcoverurl})`,
                                                        backgroundSize: "cover",
                                                        backgroundRepeat: "no-repeat",
                                                        backgroundPosition: "center center"
                                                        }}
                                                />
                                                
                                                <div className="w-full px-4 py-2">
                                                    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                                                        {model.modelname} #{545+i}
                                                    </h5>
                                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                                        0.88 ETH
                                                    </p>
                                                </div>

                                                <div className="mt-auto w-full h-12 bg-blue-600
                                                flex flex-row justify-start items-center text-white font-semibold
                                                cursor-pointer
                                                ">
                                                    
                                                    <div className="ml-16">Buy Now</div>
                                                    <FaShoppingCart className="mx-4"/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        
                </div>
            </div>
        </BasePageTemplate>
    )
}
