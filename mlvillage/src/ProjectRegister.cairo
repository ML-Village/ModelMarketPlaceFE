use starknet::ContractAddress;

#[starknet::interface]
trait IProjectRegister<TContractState> {

    fn register_project(
        ref self: TContractState,
        project_name: ByteArray,
        project_address: ContractAddress,
        project_uri: ByteArray, 
        project_cover_uri: ByteArray,
        ) -> u256;

    fn get_project_name(self: @TContractState, project_id: u256) -> ByteArray;

    fn get_project_address(self: @TContractState, project_id: u256) -> ContractAddress;

    fn get_project_uri(self: @TContractState, project_id: u256) -> ByteArray;

    fn get_project_cover_uri(self: @TContractState, project_id: u256) -> ByteArray;

    fn get_registerd_project_count(self: @TContractState) -> u256;

    // Add register create nft collection function

}

#[starknet::contract]
mod ProjectRegister {

    use starknet::ContractAddress;

    #[derive(Copy, Drop, Serde, PartialEq)]
    struct ProjecRecord {
        project_name: ByteArray,
        project_address: ContractAddress,
        project_uri: ByteArray,
        project_cover_uri: ByteArray
    }

    #[storage]
    struct Storage {
        projects_map: LegacyMap<u256, ProjecRecord>,
        project_address_to_id: LegacyMap<ContractAddress, u256>,
        project_count: u256
    }

    // #[generate_trait]
    // impl InternalImpl of InternalTrait {
    // }

    #[constructor]
    fn constructor(ref self: ContractState){

    }

    #[abi(embed_v0)]
    impl ProjectRegisterImpl of super::IProjectRegister<ContractState> {

        fn register_project(
            ref self: ContractState,
            project_name: ByteArray,
            project_address: ContractAddress,
            project_uri: ByteArray, 
            project_cover_uri: ByteArray,
        ) -> u256 {

            let mut project_id = self.project_count.read();
            project_id += 1;

            let project_record = ProjecRecord {
                project_name: project_name,
                project_address: project_address,
                project_uri: project_uri,
                project_cover_uri: project_cover_uri
            };
            
            self.projects_map.write(project_id, project_record);
            self.project_address_to_id.write(project_address, project_id);
            self.project_count.write(project_id);

            project_id
        }

        fn get_project_name(self: @ContractState, project_id: u256) -> ByteArray {
            self.projects_map.read(project_id).project_name
        }

        fn get_project_address(self: @ContractState, project_id: u256) -> ContractAddress{
            self.projects_map.read(project_id).project_address
        }

        fn get_project_uri(self: @ContractState, project_id: u256) -> ByteArray {
            self.projects_map.read(project_id).project_uri
        }

        fn get_project_cover_uri(self: @ContractState, project_id: u256) -> ByteArray {
            self.projects_map.read(project_id).project_cover_uri
        }

        fn get_registerd_project_count(self: @ContractState) -> u256 {
            self.project_count.read()
        }

        // Add register create nft collection function

    }


}