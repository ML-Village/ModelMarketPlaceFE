import React from 'react';
import { ResultsCard } from './ResultsCard';
import { availableModels } from '@/constants/results';

export const Results = () => {

    console.log(availableModels)
    return (
        <div className="mt-5 grid grid-cols-3 gap-1 gap-y-2">
                {
                    availableModels.map((r,i)=>{
                        return (
                            <ResultsCard key={`results-${i}`}
                                projectcoverurl={r.projectcoverurl} 
                                project={r.project}
                                modelname={r.modelname} 
                                description={r.description}
                                creator={r.creator}
                                creatorrating={r.creatorrating}
                                efficiency={r.efficiency}
                                floorprice={r.floorprice}
                                remaining={r.remaining}
                                tags={r.tags}
                            
                            />
                        )
                    })
                }
            </div>
    )
}
