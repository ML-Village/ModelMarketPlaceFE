import React from 'react';
import { BasePageTemplate } from '@/components/Base';
import {projectParamMapping} from '@/constants/createresource_projectslist';
import {useParams } from 'react-router-dom';
import { projectModels } from '@/constants/project_models_listing';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/routing/routes';

import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export const Project = () => {

    const projectnamekey  = useParams()?.id;
    const navigate = useNavigate();

    return (
        <BasePageTemplate>
            <div>
                <div className="container mx-auto w-3/5 mt-10
                    flex flex-col rounded-md items-center
                    ">
                    
                    <div className="w-full h-[250px] bg-black border border-black rounded-md" 
                    style={{backgroundImage: `url(${projectParamMapping[projectnamekey as string]?.project_cover_path})`,}}
                    
                    />
                
                {/* title */}
                <div className="w-full my-6 flex flex-col items-start">

                    <span className="my-2 text-5xl font-bold">{projectParamMapping[projectnamekey as string]?.project_name}</span>
                    

                    <div className="font-semibold mt-2">
                        <span className="mr-2">Project Registration Id: </span>
                        <span>0x938794732090345</span> 
                    </div>

                    <div className="font-semibold">
                        <span className="mr-2">Project Site: </span>
                        <a className="font-normal text-blue-700" href={projectParamMapping[projectnamekey as string]?.project_url}>
                            {projectParamMapping[projectnamekey as string]?.project_url}</a> 
                    </div>

                    <div className="font-semibold">
                        <span className="mr-2">Contract Address: </span>
                        <span>{projectParamMapping[projectnamekey as string]?.project_address}</span>
                        </div>
                </div>


                        {/* results table */}
                        <div className="w-full border flex flex-col gap-1">

                            {
                                projectModels.map((r)=>{

                                    return(
                                        <div className="w-full h-36 py-1 flex 
                                            justify-start items-center rounded-md border border-blue-700
                                            px-4 py-1 overflow-hidden 
                                            hover:ring-2 hover:ring-blue-500 cursor-pointer
                                            "
                                            onClick={()=>navigate(ROUTES.model+`/${r.modelname.toLowerCase()}`)}
                                            >


                                                <div className="w-2/5 flex flex-col justify-center items-start">
                                                    <span>Model Name: <span>{r.modelname}</span></span>
                                                    <span>Model Description: <span className="text-gray-600">{r.description}</span> </span>
                                                    <span>Creator: <span className="rounded-md bg-yellow-300 px-2 py-1">{r.creator}</span></span>
                                                    <span className="flex items-center">Creator Rating: 
                                                        <span className="flex flex-nowrap text-yellow-500">
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStar />
                                                        <FaStarHalfAlt />
                                                        <FaRegStar />
                                                </span></span>
                                                </div>

                                                <div className="w-2/5 flex flex-col justify-center items-start">
                                                    <span>Efficiency: {r.efficiency}</span>
                                                    <span>Floor Price: {r.floorprice}</span>
                                                    <span>Remaining: {r.remaining}</span>
                                                </div>

                                                <div className="h-full w-1/5 bg-gray-800" 
                                                style={{
                                                    backgroundImage: `url(${r.projectcoverurl})`,
                                                    backgroundSize: "contain",
                                                    backgroundRepeat: "no-repeat",
                                                    backgroundPosition: "center center"
                                                }}
                                                
                                                />

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
