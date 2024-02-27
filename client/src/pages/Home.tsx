import React, {useState} from 'react';
import { BasePageTemplate } from '@/components/Base';
import { MdGridOn } from "react-icons/md";
import { TbDiscountCheckFilled } from "react-icons/tb";
import { IoFilter } from "react-icons/io5";
import { filterlist } from '@/constants/filterlist';
import { Results } from '@/components/Results';

export const Home = () => {
    const [selectedFilter, setSelectedFilter ] = useState("Gaming")

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
                                            : "bg-orange-300 text-gray-500 hover:text-black hover:bg-orange-300"
                                        }
                                            `}
                                        key={`tab-${n}`}
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
                    <Results />

                </div>



            </div>
            

        </BasePageTemplate>
    )
}
