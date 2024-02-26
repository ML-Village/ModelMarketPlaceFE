use starknet::ContractAddress;

#[starknet::interface]
trait IERC721Metadata<TState> {
    fn name(self: @TState) -> felt252;
    fn symbol(self: @TState) -> felt252;
    fn token_uri(self: @TState, token_id: u256) -> ByteArray;
}

#[starknet::interface]
trait IERC721MetadataCamelOnly<TState> {
    fn tokenURI(self: @TState, tokenId: u256) -> ByteArray;
}

#[starknet::interface]
trait IModelNFT<TContractState> {
    // contract state read
    fn supply(self: @TContractState) -> u256;
    fn max_supply(self: @TContractState) -> u256;
    fn base_uri(self: @TContractState) -> felt252;
    fn byte_base_uri(self: @TContractState) -> ByteArray;
    
    //fn content_uri(self: @TContractState, token_id: u256) -> ByteArray;
    fn get_parent_project(self: @TContractState) -> u256;
    fn set_base_uri(ref self: TContractState, base_uri: felt252);
    fn set_byte_base_uri(ref self: TContractState, base_uri: ByteArray);
    
    fn mint_time(self: @TContractState) -> u256;

    // contract state write
    fn mint(ref self: TContractState, recipient: ContractAddress) -> u256;
}

#[starknet::contract]
mod ModelNFT {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    // use openzeppelin::access::ownable::OwnableComponent;
    // use openzeppelin::access::ownable::ownable::OwnableComponent::InternalTrait as OwnableInternalTrait;
    use starknet::ContractAddress;

    // component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);
    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

    // ERC721
    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721CamelOnly = ERC721Component::ERC721CamelOnlyImpl<ContractState>;
    #[abi(embed_v0)]
    impl ERC721MetadataCamelOnly =
        ERC721Component::ERC721MetadataCamelOnlyImpl<ContractState>;
    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    // // Ownable
    // #[abi(embed_v0)]
    // impl OwnableImpl = OwnableComponent::OwnableImpl<ContractState>;
    // impl OwnableInternalImpl = OwnableComponent::InternalImpl<ContractState>;

    // SRC5
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        supply: u256,
        max_supply: u256,
        mint_start_time: u256,
        ERC721_base_uri: ByteArray,
        base_uri: felt252,
        parent_project: u256
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    mod Errors {
        const UNEQUAL_ARRAYS: felt252 = 'Array lengths do not match';

        const ZERO_OWNER: felt252 = 'Model: Owner is zero address';
        const ZERO_FEE_TOKEN_ADDRESS: felt252 = 'Model: fee token addr is 0';
        const ZERO_FEE_TOKEN_AMOUNT: felt252 = 'Model: fee token amount is 0';
        const WHITELIST_MINT_START_TIME_NOT_FUTURE: felt252 = 'Model: time whtlst not future';
        const REGULAR_MINT_START_TIME_BEFORE_WHITELIST_END: felt252 =
            'Model: time reg less whitelst';
        const INCORRECT_MERKLE_ROOT_COUNT: felt252 = 'Model: should have 5 roots';
        const ZERO_MERKLE_ROOT: felt252 = 'Model: no merkle root';
        const INSUFFICIENT_FUND: felt252 = 'Model: insufficient fund';
        const INSUFFICIENT_APPROVAL: felt252 = 'Model: insufficient approval';
        const BEFORE_WHITELIST_MINT: felt252 = 'Model: whtelst mint not begun';
        const AFTER_WHITELIST_MINT: felt252 = 'Model: whitelist mint ended';
        const BEFORE_REGULAR_MINT: felt252 = 'Model: reg mint not started';
        const MULTICALL_NOT_ALLOWED: felt252 = 'Model: no multicall';
        const NOT_IN_MERKLE_TREE: felt252 = 'Model: not in merkletree';
        const ZERO_ADDRESS_SEEDER: felt252 = 'Model: zero addr seeder';
        const ZERO_ADDRESS_DESCRIPTOR: felt252 = 'Model: zero addr descriptor';
        const ONE_TIME_CALL_ONLY: felt252 = 'Model: cant be called twice';
        const MAX_SUPPLY_EXCEEDED: felt252 = 'Model: max supply exceeded';
        const MAX_MINT_EXCEEDED: felt252 = 'Model: maxed wallet mint';
    }

    /// Sets the token `name` and `symbol`.
    /// Mints the `token_ids` tokens to `recipient` and sets
    /// each token's URI.
    #[constructor]
    fn constructor(
        ref self: ContractState,
        name: felt252,
        symbol: felt252,
        parent: u256,
        max_supply: u256,
    ) {
        self.erc721.initializer(name, symbol);
        self.parent_project.write(parent);
        self.max_supply.write(max_supply);
        //self._mint_assets(recipient, token_ids, token_uris);
    }

    // #[abi(embed_v0)]
    // impl ERC721Metadata of IERC721Metadata<ContractState> {
    //     fn name(self: @ContractState) -> felt252 {
    //         self.erc721.ERC721_name.read()
    //     }

    //     fn symbol(self: @ContractState) -> felt252 {
    //         self.erc721.ERC721_symbol.read()
    //     }

    //     fn token_uri(self: @ContractState, token_id: u256) -> ByteArray {
    //         let traits = self.traits(token_id);
    //         match traits {
    //             TokenTrait::Regular(seed) => {
    //                 self.descriptor_regular.read().token_uri(token_id, seed)
    //             },
    //             TokenTrait::Custom(index) => {
    //                 self.descriptor_custom.read().token_uri(token_id, index)
    //             }
    //         }
    //     }
    // }


    // #[abi(embed_v0)]
    // impl ERC721MetadataCamelOnly of IERC721MetadataCamelOnly<ContractState> {
    //     fn tokenURI(self: @ContractState, tokenId: u256) -> ByteArray {
    //         self.token_uri(tokenId)
    //     }
    // }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        // fn _mint_assets(
        //     ref self: ContractState,
        //     recipient: ContractAddress,
        //     mut token_ids: Span<u256>,
        //     mut token_uris: Span<felt252>
        // ) {
        //     assert(token_ids.len() == token_uris.len(), Errors::UNEQUAL_ARRAYS);

        //     loop {
        //         if token_ids.len() == 0 {
        //             break;
        //         }
        //         let id = *token_ids.pop_front().unwrap();
        //         let uri = *token_uris.pop_front().unwrap();

        //         self.erc721._mint(recipient, id);
        //         self.erc721._set_token_uri(id, uri);
        //     }
        // }

        fn ensure_regular_mint_period(ref self: ContractState) {
            // let now = starknet::get_block_timestamp();
            // let mint_start_time = self.mint_start_time.read();
            // assert(now >= mint_start_time.regular, Errors::BEFORE_REGULAR_MINT);
        }

        fn ensure_one_call_per_tx(ref self: ContractState) {
            // let tx_info = starknet::get_tx_info().unbox();
            // let tx_hash = tx_info.transaction_hash;
            // let tx_origin = tx_info.account_contract_address;
            // assert(
            //     self.multicall_tracker.read(tx_origin) != tx_hash, Errors::MULTICALL_NOT_ALLOWED
            // );
            // self.multicall_tracker.write(tx_origin, tx_hash);
        }

        fn _set_base_uri(ref self: ContractState, base_uri: felt252) {
            self.base_uri.write(base_uri)
        }

        fn _set_byte_base_uri(ref self: ContractState, base_uri: ByteArray) {
            self.ERC721_base_uri.write(base_uri)
        }
    }

    #[abi(embed_v0)]
    impl ModelImpl of super::IModelNFT<ContractState> {
        //
        // Contract read
        //

        fn supply(self: @ContractState) -> u256 {
            self.supply.read()
        }

        fn max_supply(self: @ContractState) -> u256 {
            self.max_supply.read()
        }

        fn base_uri(self: @ContractState) -> felt252 {
            self.base_uri.read()
        }

        fn byte_base_uri(self: @ContractState) -> ByteArray {
            self.ERC721_base_uri.read()
        }

        fn get_parent_project(self: @ContractState) -> u256 {
            self.parent_project.read()
        }

        fn set_base_uri(ref self: ContractState, base_uri: felt252) {
            self._set_base_uri(base_uri)
        }

        fn set_byte_base_uri(ref self: ContractState, base_uri: ByteArray) {
            self._set_byte_base_uri(base_uri)
        }
        

        // fn regular_mint_count(self: @ContractState, address: ContractAddress) -> u8 {
        //     self.num_regular_mints.read(address)
        // }

        // fn content_uri(self: @ContractState, token_id: u256) -> ByteArray {
        //     let traits = self.traits(token_id);
        //     match traits {
        //         TokenTrait::Regular(seed) => {
        //             self.descriptor_regular.read().content_uri(token_id, seed)
        //         },
        //         TokenTrait::Custom(index) => {
        //             self.descriptor_custom.read().content_uri(token_id, index)
        //         }
        //     }
        // }

        fn mint_time(self: @ContractState) -> u256 {
            self.mint_start_time.read()
        }

        //
        // Contract write
        //
        fn mint(ref self: ContractState, recipient: ContractAddress) -> u256 {
            // ensure this function can only be called once per transaction
            self.ensure_one_call_per_tx();

            // ensure that its time for regular mint
            self.ensure_regular_mint_period();

            // ensure that caller address has not max minted
            // let caller = starknet::get_caller_address();
            // let num_regular_mint = self.num_regular_mints.read(caller);
            // assert(num_regular_mint < MAX_REGULAR_MINT.into(), Errors::MAX_MINT_EXCEEDED);
            // // update caller's regular mint count 
            // self.num_regular_mints.write(caller, num_regular_mint + 1);

            // get next token id and update supply
            let mut supply = self.supply.read();
            supply += 1;

            // ensure not to exceed max supply
            assert(supply <= self.max_supply.read(), Errors::MAX_SUPPLY_EXCEEDED);

            self.supply.write(supply);

            let token_id: u256 = supply;

            // mint token to recipient and collect fee
            // self.mint_token(:token_id, :caller, :recipient, collect_fee: true);
            // pure mint token
            self.erc721._mint(recipient, token_id);
            // set token uri
            self.erc721._set_token_uri(token_id, self.base_uri.read());

            // if self.caller_won_custom_token() {
            //     self.set_custom_image(token_id);
            // } else {
            //     self.set_regular_image(token_id);
            // }

            token_id.into()
        }

    }

    // #[external(v0)]
    // fn mint(ref self: ContractState) {
    //     let caller = starknet::get_caller_address();
    //     //self.custom.add_token_trait(:token_id, :token_trait);
    //     self.erc721._mint(caller, token_id);
    //     self.erc721._set_token_uri(token_id, self.base_uri);
    // }

    // #[external(v0)]
    // fn set_base_uri(ref self: ContractState, base_uri: felt252) {
    //         self._set_base_uri(base_uri)
    //     }

    // #[external(v0)]
    // fn set_byte_base_uri(ref self: ContractState, base_uri: ByteArray) {
    //         self._set_byte_base_uri(base_uri)
    //     }

}