use starknet::ContractAddress;
use starknet::ClassHash;

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

    fn get_project_id(self: @TContractState, project_address: ContractAddress) -> u256;

    fn get_registerd_project_count(self: @TContractState) -> u256;

    fn get_modelnft_hash(self: @TContractState) -> ClassHash;

    fn set_modelnft_hash(ref self: TContractState, hash: ClassHash);

    // Add register create nft collection function
    fn create_modelnft_collection(ref self: TContractState, 
        collection_name:felt252, collection_symbol: felt252,
        parent_project_address: ContractAddress, max_supply:u256)-> ContractAddress;

}

#[starknet::contract]
mod ProjectRegister {

    use core::serde::Serde;
use mlvillage::ProjectRegister::IProjectRegister;
    use starknet::ContractAddress;
    use starknet::deploy_syscall;
    use starknet::ClassHash;
    use array::ArrayTrait;

    #[derive(Drop, Serde, PartialEq, starknet::Store)]
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
        project_count: u256,
        model_nft_hash: ClassHash
    }

    // #[generate_trait]
    // impl InternalImpl of InternalTrait {
    // }

    #[constructor]
    fn constructor(ref self: ContractState, model_nft_hash: ClassHash) {
        self.model_nft_hash.write(model_nft_hash);
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

        fn get_project_id(self: @ContractState, project_address: ContractAddress) -> u256 {
            self.project_address_to_id.read(project_address)
        }

        fn get_registerd_project_count(self: @ContractState) -> u256 {
            self.project_count.read()
        }

        fn get_modelnft_hash(self: @ContractState) -> ClassHash {
            self.model_nft_hash.read()
        }

        fn set_modelnft_hash(ref self: ContractState, hash: ClassHash) {
            self.model_nft_hash.write(hash);
        }

        // Add register create nft collection function

        fn create_modelnft_collection(ref self: ContractState, 
            collection_name:felt252, collection_symbol: felt252,
            parent_project_address: ContractAddress, max_supply:u256) -> ContractAddress{
            let mut calldata = ArrayTrait::new();

            // name: felt252,
            // symbol: felt252,
            // parent_project_address: ContractAddress,
            // parent_id: u256,
            // max_supply: u256,
            calldata.append(collection_name);
            calldata.append(collection_symbol);
            calldata.append(parent_project_address.into());

            let parent_id_result = self.project_address_to_id.read(parent_project_address);
            parent_id_result.serialize(ref calldata);

            max_supply.serialize(ref calldata);

            let (deployed_collection_address, _) = deploy_syscall(
                self.model_nft_hash.read(), //0x071f996af16f3dda77d0562c44eb732211db795392e51735743730fb531334e6
                88888, 
                calldata.span(), 
                false
            )
            .unwrap();
            
            deployed_collection_address
        }
    }


}