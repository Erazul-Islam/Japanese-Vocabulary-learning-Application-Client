import { TLession, TResponseRedux } from "../../../utils/global";
import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/auth.slice";

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
        getAllUsers: builder.query({
            query: () => {
                return { url: '/auth/all-profile', method: 'GET' };
            },
            transformResponse: (response: TResponseRedux<TUser[]>) => {
                return {
                    data: response.data
                };
            },
        }),
        updateUserRoleIntoAdmin: builder.mutation({
            query: ({ userId, role }) => ({
                url: `/auth/${userId}`,
                method: 'PUT',
                body: { role }
            }),
            transformResponse: (response: TResponseRedux<TUser>) => response.data
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `auth/${id}`,
                method: 'DELETE'
            })
        }),
    }),
});


export const {

    useGetAllLessonsQuery,
    useGetAllUsersQuery,
    useUpdateUserRoleIntoAdminMutation,
    useDeleteUserMutation
} = authApi