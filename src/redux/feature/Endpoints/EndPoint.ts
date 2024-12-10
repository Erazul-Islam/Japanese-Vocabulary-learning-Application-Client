import { TLession, TResponseRedux } from "../../../utils/global";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllLessons: builder.query({
            query: () => {
                return { url: '/lession', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TLession[]>) => {
                return {
                    data: response.data
                };
            },
        }),
    }),
});


export const {useGetAllLessonsQuery} = authApi