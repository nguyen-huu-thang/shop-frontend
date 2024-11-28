import { createSlice} from '@reducjs/toolkit';
const intiStage = {
    items : [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: intiStage,
    reducers: {
    
    }
});

export default cartSlice.reducers;