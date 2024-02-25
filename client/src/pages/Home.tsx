import React, {useState} from 'react';
import { BasePageTemplate } from '@/components/Base';
import { MdGridOn } from "react-icons/md";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { IoFilter } from "react-icons/io5";

import { Card } from 'flowbite-react';
import { Badge } from 'flowbite-react';
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const Home = () => {
    const [selectedFilter, setSelectedFilter ] = useState("Gaming")

    const filterlist = [
        "Defi",
        "NFT-fi",
        "DEX-trading",
        "Arbitrage",
        "Gaming"
    ]

    return (
        <BasePageTemplate>

            <div>
                {/* Marketing Text */}
                <div className="container mx-auto w-3/5 mt-10
                flex flex-col rounded-md items-center
                ">
                    <div className="border-b-2 py-4">
                        <span className="text-4xl font-bold text-center">
                            Stay Ahead of the Game with AI Models and Agents!
                        </span>
                    </div>

                    {/* filter bar */}
                    <div className="flex flex-nowrap w-full 
                    mt-3
                    ">
                        
                        {/* buttons panel */}
                        <div className="flex gap-1">
                            {
                                filterlist.map((n)=>{
                                    return(
                                        <div className={`flex justify-center items-center 
                                        px-2 py-1 rounded-md cursor-pointer
                                        ${selectedFilter==n? 
                                            "bg-orange-500 text-black font-semibold"
                                            : "bg-orange-200 text-gray-400 hover:text-white hover:bg-orange-300"
                                        }
                                            `}
                                        
                                        onClick={()=>setSelectedFilter(n)}
                                        >
                                                {n}
                                        </div>
                                    )
                                })
                            }
                        </div>
                        
                        {/* end filters */}
                        <div className="flex flex-nowrap ml-auto gap-1">

                            <div className="px-3 py-2 rounded-md border cursor-pointer
                            flex flex-nowrap items-center justify-center gap-1
                            hover:bg-gray-200
                            ">
                                <IoFilter className="text-lg" />
                                <span>Filters</span>
                            </div>
                            
                            <div className="px-2 py-2 rounded-md border cursor-pointer
                            flex flex-nowrap items-center justify-center gap-1
                            hover:bg-gray-200
                            ">
                                <TbDiscountCheckFilled className="text-blue-500 text-lg" />
                                <span>Verified</span>
                            </div>

                            <div className="px-3 py-2 rounded-md border cursor-pointer
                            flex flex-nowrap items-center justify-center gap-1
                            hover:bg-gray-200
                            ">
                                <MdGridOn />
                                <span>View</span>
                            </div>
                        </div>

                    </div>

                    {/* results area */}
                    <div className="mt-5">
                        <Card
                            className="max-w-sm overflow-hidden"
                            renderImage={() => 
                            <img className="cursor-pointer" width={500} height={500} src="/gameimages/influence.png" alt="image 1" />
                            
                        }
                            >
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                MuleMiner08469
                            </h5>

                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                This model helps to optimize mining in Influence.
                            </p>

                            <p className="flex flex-col flex-wrap justify-center">
                                <span>
                                    <span className="mr-1 font-semibold">Creator:</span>
                                    <span className="cursor-pointer border border-gray-300 rounded-md px-2 py-1
                                    bg-yellow-100
                                    ">
                                        PuppetMaster088.eth</span>
                                </span>
                                <span className="flex items-center">
                                    <span className="mr-1 font-semibold">Creator Rating:</span>
                                    <span className="flex flex-nowrap text-yellow-500">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStarHalfAlt />
                                        <FaRegStar />
                                    </span>
                                </span>

                                <span className="flex items-center">
                                    <span className="mr-1 font-semibold">Efficiency:</span>
                                    <span className="">93.8%
                                    </span>
                                </span>

                                <span className="">
                                    <span className="mr-1 font-semibold">Floor Price:</span>
                                    <span>1.88 ETH</span>
                                </span>

                                <span className="">
                                    <span className="mr-1 font-semibold">Remaining Mint:</span>
                                    <span>168</span>
                                </span>
                            </p>

                            <p className="flex flex-wrap items-center">
                                <span className="mr-1 font-semibold">Tags:</span>
                                <Badge className="w-fit cursor-pointer"
                                color="warning">mining</Badge>
                            </p>
                        </Card>
                    </div>

                </div>



            </div>
            

        </BasePageTemplate>
    )
}
