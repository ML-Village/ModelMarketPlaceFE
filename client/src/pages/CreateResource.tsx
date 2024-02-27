import React, {useState, useEffect} from 'react';
import { CreateNavBar } from '@/components/Navbar';
import { BiDumbbell } from "react-icons/bi";
import { FaBridge } from "react-icons/fa6";
import { HiArrowUpOnSquareStack } from "react-icons/hi2";
import { Status, statuses, projectParamMapping } from '@/constants/createresource_projectslist';

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { TextInput, Spinner } from 'flowbite-react';


export const CreateResource = () => {
    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        null
    )
    const [showProjectRegisterSpinner, setShowProjectRegisterSpinner] = useState(false);
    const [showProjectResourceSubmitSpinner, setShowProjectResourceSubmitSpinner] = useState(false);

    const [ project_address, setProjectAddress ] = useState<string|undefined>(undefined)
    const [ project_url, setProjectUrl ] = useState<string|undefined>(undefined)
    const [ project_cover_path, setProjectCover ] = useState<string|undefined>(undefined)
    
    useEffect(() => {
        setProjectAddress(selectedStatus ? projectParamMapping[selectedStatus.value]?.project_address : undefined)
        setProjectUrl(selectedStatus ? projectParamMapping[selectedStatus.value]?.project_url : undefined)
        setProjectCover(selectedStatus ? projectParamMapping[selectedStatus.value]?.project_cover_path : undefined)
    },[selectedStatus])

    const delayRegisterProjectSpinner = () => {
        setShowProjectRegisterSpinner(true); // Show the spinner
    
        setTimeout(() => {
            setShowProjectRegisterSpinner(false); // Hide the spinner after 5 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    };

    const delayProjectResourceSubmitSpinner = () => {
        setShowProjectResourceSubmitSpinner(true); // Show the spinner
    
        setTimeout(() => {
            setShowProjectResourceSubmitSpinner(false); // Hide the spinner after 5 seconds
        }, 2000); // 2000 milliseconds = 2 seconds
    };


    return (
        <div className="pb-20">
            <CreateNavBar title="Create Project Resources" />
            
            <div className="container mx-auto mt-5 flex justify-between items-start
            px-10 py-4
            ">

                {/* functions div */}
                <div className="w-4/5
                flex flex-col justify-start items-center px-10 gap-4
                ">
                    <div className="w-4/5 my-4
                    text-3xl font-semibold">
                        Pick From A List of Available Project Contracts To Register Model Training and Integration Resources
                    </div>
                    
                    {/* list of shadcn popover */}
                    <div className="
                    border border-black w-4/5 rounded overflow-hidden
                    flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground mx-2 px-2 w-[9rem]
                        
                        ">Parent Project:</span>
                        <Popover 
                        open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" 
                                className="justify-start
                                w-full border-l-black rounded-none
                                "
                                id="parent_project_button"
                                >
                                    {selectedStatus ? <>{selectedStatus.label}</> : <>+ Select Parent Project</>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="p-0 bg-white" side="bottom" align="start">
                                <Command className="">
                                    <CommandInput placeholder="Select Project..." />
                                    <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup>
                                        {statuses.map((status) => (
                                        <CommandItem
                                            key={status.value}
                                            value={status.value}
                                            onSelect={(value) => {
                                            setSelectedStatus(
                                                statuses.find((priority) => priority.value === value) ||
                                                null
                                            )
                                            setOpen(false)
                                            }}
                                        >
                                            {status.label}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        </div>

                    {/* project address input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="contractaddress" placeholder="Project Main Contract" addon="Project_Address" value={project_address} />
                    </div>

                    {/* project url input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="projectsite" placeholder="Project HomePage" addon="Project_URL" value={project_url} />
                    </div>

                    {/* image div of project cover */}
                    <div className="w-4/5 h-32 
                        border border-black/80 rounded-md
                        bg-black
                        " 
                    
                    style={{
                        backgroundImage: `url(${project_cover_path})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center"
                    }}
                    
                    />

                    <div className="w-4/5
                    text-3xl font-semibold flex flex-col gap-2">
                        <p className="text-2xl my-4"> --- OR --- </p>
                        <p className="">Register A New Project Below</p>
                    </div>
                    
                    {/* project address input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="newprojectname" placeholder="New Project Name" addon="New_Project_Name" required />
                    </div>

                    {/* project address input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="newcontractaddress" placeholder="New Project Main Contract" addon="New_Project_Address" required />
                    </div>

                    {/* project url input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="newprojectsite" placeholder="New Project HomePage" addon="New_Project_URL" required />
                    </div>

                    {/* cover url input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="newcoverurl" placeholder="New Cover Page URL Link" addon="New_Cover_URL_Link" required />
                    </div>

                    {/* new project register button */}
                    <div className="flex w-4/5 items-center gap-4">
                        <button className="bg-orange-300 hover:bg-orange-500
                        font-semibold hover:text-white
                        px-4 py-2 rounded-md flex justify-center items-center
                        "
                        onClick={delayRegisterProjectSpinner}
                        >Register New Project</button>
                        <Spinner className={`${!showProjectRegisterSpinner?"hidden":""}`} size="xl" color="warning"
                        aria-label="waiting for project registration" />
                    </div>


                    <div className="w-4/5 my-2 mt-4
                    text-3xl font-semibold flex flex-col gap-2">
                        <p className="">Add a Model Training Library Here</p>
                    </div>

                    {/* training repo input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="traininrepogurl" placeholder="Training Library URL Link" addon="Training_Lib_URL" required />
                    </div>
                    {/* training training docs */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="trainingdocsurl" placeholder="Training Docs URL Link" addon="Training_Docs_URL" required />
                    </div>
                    
                    <br></br>

                    {/* training repo input */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="integrationwrapperaddress" placeholder="Integration Wrapper Address" addon="Integration_Wrapper_Address" required />
                    </div>
                    {/* integration resource docs */}
                    <div className="border border-black w-4/5 rounded-md">
                        <TextInput id="integrationdocsurl" placeholder="Integration Docs URL" addon="Integration_Docs_URL" required />
                    </div>

                    {/* project resource submission button */}
                    <div className="flex w-4/5 items-center gap-4">
                        <button className="bg-green-300 hover:bg-green-500
                        font-semibold hover:text-white
                        px-4 py-2 rounded-md flex justify-center items-center
                        "
                        onClick={delayProjectResourceSubmitSpinner}
                        >Submit Project Resource</button>
                        <Spinner className={`${!showProjectResourceSubmitSpinner?"hidden":""}`} size="xl" color="success"/>
                    </div>

                </div>

                {/* explanation div */}
                <div className="rounded-lg w-[400px]
                px-10 py-10 bg-gray-300 ml-auto
                ">
                    
                    <p className="font-semibold text-lg">
                    If there is a Project Contract deployed, you'll be able to:
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><BiDumbbell /></div>
                        <div className="">Register and Share Python Repositories/Libraries/APIs that provide state outcomes to help train agents and models for the project.</div>
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><FaBridge /></div>
                        <div className="">Deploy and Register Cairo contracts that wrap around listed Giza/Orion Models and Agents so that they integrate back into the parent project contracts.</div>
                    </p>

                    <br></br>

                    <p className="font-semibold text-lg">
                    The community can:
                    </p>

                    <p className="my-2 flex items-center gap-4 justify-between font-semibold text-black/70">
                        <div className="w-2/5 flex justify-center items-center text-xl"><HiArrowUpOnSquareStack /></div>
                        <div className="">Upload, Register and List Models that work with the parent project contracts via Giza/Orion compiled Cairo code.</div>
                    </p>

                </div>

            </div>
        </div>
    )
}
